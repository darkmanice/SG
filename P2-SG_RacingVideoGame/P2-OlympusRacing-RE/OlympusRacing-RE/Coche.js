	 class Coche{
    constructor(scene1, camara1, modeloCoche, modeloRueda, posX, posY, posZ, rot) {

		this.relojAceleracion = new THREE.Clock();

		this.acelerarPlataforma = false;
		var scene = scene1;
		this.vehicle;
		this.input;
        this.camara = camara1;
		var that = this;
		
        var objectLoader = new THREE.GLTFLoader();
		var objectLoader2 = new THREE.GLTFLoader();
		objectLoader.load(modeloCoche,  function (car){
			car.scene.children[0].geometry.translate(0,-0.3,0);
			objectLoader2.load(modeloRueda,  function (wheel){
				var mesh = new Physijs.BoxMesh(car.scene.children[0].geometry,car.scene.children[0].material);

				mesh.rotation.y = rot - Math.PI/2;
				mesh.position.y = posY;
				mesh.position.x = posX;
				mesh.position.z = posZ;

				mesh.castShadow = mesh.receiveShadow = true;
				that.vehicle = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
					14.88,
					1.83,
					0.28,
					500,
					10.5,
					5000
				), null, null);

				that.ajustarCamara(-27,  12, 0);
				that.camara.lookAt( that.vehicle.mesh.position);
				that.vehicle.mesh.add(that.camara);
				that.vehicle.wheels = new Array()
				scene.add( that.vehicle );
				wheel.scene.children[0].geometry.scale(0.4, 0.2, 0.4);
				wheel.scene.children[0].geometry.rotateZ(Math.PI/2);
				
				for ( var i = 0; i < 4; i++ ) {
					that.vehicle.addWheel(
						wheel.scene.children[0].geometry,
						wheel.scene.children[0].material,
						new THREE.Vector3(
								i < 2 ? 1.2 : -1.25,
								-0.7,
								i % 2 === 0 ? -1.1 : 1.1
						),
						new THREE.Vector3( 0, -1, 0 ),
						new THREE.Vector3( 0, 0, 1 ),
						0.3,
						0.7	,
						i < 2 ? true : false
					);
				}
				that.input = {
					power: null,
					direction: null,
					steering: 0,
					marcha_atras: false
				};
				$(document).ready(function(){
				document.addEventListener('keydown', function( ev ) {
					switch ( ev.keyCode ) {
						case 65: // Giro izq 'A'
							that.input.direction = 1;
							break;

						case 87: // Acelerar 'W'
							that.input.power = true;
							that.input.marcha_atras = false;
							break;

						case 68: // Giro dcha 'D'
							that.input.direction = -1;
							break;

						case 88: // Marcha atras 'X'
							that.input.power = true;
							that.input.marcha_atras = true;
							break;
						case 83: // Frenar 'S'
							that.input.power = false;
							break;
						case 82: // camara Trasera 'R'
						that.ajustarCamara(27,  12, 0);
							break;
					}
				});
				document.addEventListener('keyup', function( ev ) {
					switch ( ev.keyCode ) {
						case 65: // Giro izq 'A'
							that.input.direction = null;
							break;

						case 87: // Acelerar 'W'
							that.input.power = null;
							that.input.marcha_atras = null;
							break;

						case 68: // Giro dcha 'D'
							that.input.direction = null;
							break;

						case 88: // Marcha atras 'X'
							that.input.power = null;
							that.input.marcha_atras = null;
							break;
						case 83: // Frenar 'S'
							that.input.power = null;
							break;
						case 82: // camara Trasera 'R'
						that.ajustarCamara(-27,  12, 0);
							break;
					}
				});
				});
				scene.setColisionesPlataformasAceleracion();
			});
		}, null, null);
	}
    
	update () {
		
		var input = this.input;
		var vehicle = this.vehicle;
		if ( input && vehicle ) {
			if ( input.direction !== null) {
				input.steering += input.direction / 100;
				if ( input.steering < -.35 ) input.steering = -.35;
				if ( input.steering > .35 ) input.steering = .35;
			}
			if ( input.direction == null && input.steering != 0) { //volver las ruedas a pos inicial
				var anterior = input.steering;
				if (input.steering < 0){
					input.steering += 0.05;
				}
				else{
					input.steering -= 0.05;
				}
				if ( anterior < 0 && input.steering > 0 || anterior > 0 && input.steering < 0){
					input.steering = 0;
				}
			}
			vehicle.setSteering( input.steering, 0 );
			vehicle.setSteering( input.steering, 1 );

			if (!this.acelerarPlataforma){
				if ( input.power === true ) {
					vehicle.setBrake( 0, 2 );
					vehicle.setBrake( 0, 3 );
					if(!input.marcha_atras){	 //Acelera
						vehicle.applyEngineForce( 300 );
					} else{ 					 //Marcha atras

						vehicle.applyEngineForce( -100 );
					}
				} else if ( input.power === false ) {
					vehicle.setBrake( 20, 2 );
					vehicle.setBrake( 20, 3 );
				} else {
					vehicle.applyEngineForce( 0 );
				}
			} else{
				vehicle.applyEngineForce( 600 );
				if(this.relojAceleracion.getElapsedTime() > 1){
					
					this.dejarPlataformaAceleracion();
				}
			}
			this.camara.lookAt( this.vehicle.mesh.position);
		}
	}
	
	getVehicle(){
		return this.vehicle;
	}

	ajustarCamara(x, y, z){
		this.camara.position.x = x;
		this.camara.position.y = y;
		this.camara.position.z = z;
	}

	pisarPlataformaAceleracion(){
		this.acelerarPlataforma = true;
		this.relojAceleracion.start();
	}

	dejarPlataformaAceleracion(){
		this.relojAceleracion.stop();
		this.acelerarPlataforma = false;	
	}

	pos(x,y,z,rot){
		var velocidadCero = new THREE.Vector3();
		this.vehicle.mesh.setLinearVelocity(velocidadCero);

		this.vehicle.mesh.rotation.y = rot - Math.PI/2;
		this.vehicle.mesh.rotation.x = 0;
		this.vehicle.mesh.rotation.z = 0;
		
		this.vehicle.mesh.position.x = x;
		this.vehicle.mesh.position.y = y+2;
		this.vehicle.mesh.position.z = z;
		
		this.ajustarCamara(-27,  12, 0);
		this.vehicle.mesh.__dirtyPosition = true;
		this.vehicle.mesh.__dirtyRotation = true;
	}
}
