class Circuito {
    constructor(scene1, modeloCircuito, puntoControl, vueltas) {

		var scene = scene1;
		this.scene = scene;
		this.circuito;
		this.numPlataformasAcel = null;
		var that = this;
		var objectLoader = new THREE.GLTFLoader();
		this.aceleradoresAsignados = false;
		this.aceleradores = new Array();
		this.puntosControl = new Array(); //El primero será la meta
		this.puntoControlActual = puntoControl+1;
		this.fin = null;
		this.numVueltasTotal = 2;
        this.numVueltasActual = 0;
		this.respawnCocheAniadido = false;
        if(vueltas != null)
		    this.numVueltasActual = vueltas;

		objectLoader.load(modeloCircuito,  function (circuito){
			that.circuito = circuito;
			that.fisicasCircuito(circuito, scene);
			that.numPlataformasAcel = that.aceleradores.length
			scene.setColisionesPlataformasAceleracion();
			that.aplicarColisionPlataformaFin()
			that.aplicarColisionPuntosControl();

			if (that.numVueltasActual != 0){
				$(document).ready(function(){
					document.addEventListener('keydown', function( ev ) {
						switch ( ev.keyCode ) {
							case 66: // 'B'
								that.posicionarCoche();
								break;
						}
					});
				});
				that.respawnCocheAniadido = true;
			}
			tick();
		}, null, null);

        this.actualizarVueltas();
	}

	fisicasCircuito(circuito, scene){
		var tam = circuito.scene.children.length;
		
		for (var i=0; i<tam; i++){
			var aniade = true;
			var parteCircuito = circuito.scene.children[0];

			var rotacion = false;
			var translacion = false;
			var angulosRotacion;

			if(JSON.stringify(circuito.parser.json.nodes[i]).includes("translation")){
				translacion = true;
				parteCircuito.position.x -= circuito.parser.json.nodes[i].translation[0];
				parteCircuito.position.y -= circuito.parser.json.nodes[i].translation[1];
				parteCircuito.position.z -= circuito.parser.json.nodes[i].translation[2];
			}

			if(JSON.stringify(circuito.parser.json.nodes[i]).includes("rotation")){
				angulosRotacion = new THREE.Euler;
				angulosRotacion.setFromQuaternion(new THREE.Quaternion( circuito.parser.json.nodes[i].rotation[0],
																		circuito.parser.json.nodes[i].rotation[1],
																		circuito.parser.json.nodes[i].rotation[2],
																		circuito.parser.json.nodes[i].rotation[3] ) );
				rotacion = true;

				parteCircuito.rotation.x = 0;
				parteCircuito.rotation.y = 0;
				parteCircuito.rotation.z = 0;
			}
		
			var bounding = new THREE.BoxHelper(parteCircuito);
			bounding.geometry.computeBoundingBox ( ) ;
			var bb = bounding.geometry.boundingBox ;
			var geometriaCollider = new THREE.BoxGeometry(bb.max.x - bb.min.x, bb.max.y - bb.min.y, bb.max.z - bb.min.z) ;

			var matInvisible = new THREE.MeshBasicMaterial({transparent:true, opacity:0});

			var rozamiento = 0.1; //Rozamiento normal (Pista)
			if (circuito.parser.json.nodes[i].name.includes("Terreno")){
				rozamiento = 0.5;
			} else if(circuito.parser.json.nodes[i].name.includes("Aceleracion")){
				rozamiento = 0;
			}
			var matFisico = Physijs.createMaterial(matInvisible, rozamiento , 0.1);
			var collider = new Physijs.BoxMesh (geometriaCollider, matFisico,0);

			if(rotacion){
				collider.rotation.x += angulosRotacion.x;
				collider.rotation.y += angulosRotacion.y;
				collider.rotation.z += angulosRotacion.z;
			}

			if(translacion){
				collider.position.x = circuito.parser.json.nodes[i].translation[0];
				collider.position.y = circuito.parser.json.nodes[i].translation[1];
				collider.position.z = circuito.parser.json.nodes[i].translation[2];
			}

			collider.add(parteCircuito);

			if (circuito.parser.json.nodes[i].name.includes("Aceleracion")){
				this.aceleradores.push(collider);

			} else if (circuito.parser.json.nodes[i].name.includes("PuntoControl")){
				this.puntosControl.push(collider);
				if (!circuito.parser.json.nodes[i].name.includes("PuntoControl"+this.puntoControlActual)){
					aniade = false;
				}
			} else if(circuito.parser.json.nodes[i].name.includes("Fin")){
				this.fin = collider;
			}
			if(aniade){
				scene.add(collider);
			}
		}
	}

	aplicarColisionPlataformasAceleracion(coche){
		if (typeof coche != "undefined" && this.numPlataformasAcel != null && !this.aceleradoresAsignados){
			this.aceleradoresAsignados = true;
			for (var i=0; i<this.numPlataformasAcel; i++){
				this.aceleradores[i].addEventListener ('collision',
					function(){
						coche.pisarPlataformaAceleracion();
					}
				);
			}

		}
	}

	aplicarColisionPuntosControl(){
		var tam = this.puntosControl.length;
		var that = this;
		
		for (var i=0; i<tam; i++){
			this.puntosControl[i].addEventListener ('collision',
				function(){
					that.siguientePuntoControl();
				}
			);
		}
		
	}

	siguientePuntoControl(){
		if (this.numVueltasActual == 0){
			var that = this;
			$(document).ready(function(){	
				document.addEventListener('keydown', function( ev ) {
					switch ( ev.keyCode ) {
						case 66: // 'B'
							that.posicionarCoche();
							break;
					}
				});
			});
		}
		this.scene.remove(this.puntosControl[this.puntoControlActual]);
		this.puntoControlActual = (this.puntoControlActual + 1) % this.puntosControl.length;
		this.scene.add(this.puntosControl[this.puntoControlActual]);
        
		if (this.puntoControlActual == 1){ //Ha dado una vuelta
			this.numVueltasActual++;
            this.actualizarVueltas();

			if(this.numVueltasActual > this.numVueltasTotal){
				window.location.replace("http://localhost:8000/OlympusRacing-RE/resultados.html?" + "tiempo=" + getTiempoEmpleado());
			}
		}
	}

	aplicarColisionPlataformaFin(){
		var that = this;
		this.fin.addEventListener ('collision',
			function(){
				that.posicionarCoche();
			}
		);
	}

	posicionarCoche(){
		this.aceleradoresAsignados = false;
		var indice = (this.puntoControlActual + this.puntosControl.length - 1) % this.puntosControl.length;
		this.scene.respawnCoche(this.puntosControl[indice].position.x, this.puntosControl[indice].position.y, this.puntosControl[indice].position.z, this.puntosControl[indice].rotation.z, (this.puntoControlActual-1), this.numVueltasActual);
	}

    actualizarVueltas(){
        var vueltas = document.getElementById("numVueltas");

        if(this.numVueltasActual == 0){
            vueltas.innerHTML = 1 + "/" + this.numVueltasTotal;
        } else if(this.numVueltasActual > this.numVueltasTotal){
            vueltas.innerHTML = this.numVueltasTotal + "/" + this.numVueltasTotal;
        } else {
            vueltas.innerHTML = this.numVueltasActual + "/" + this.numVueltasTotal;
        }
    }
}
