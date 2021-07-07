 class MyPendulo extends THREE.Object3D {
    constructor(gui) {
        super();
        this.createGUI(gui);

        this.clock = new THREE.Clock();
        this.delta = 0;

        var alturaVerde = 4;
        var anchoVerde = 4;
        var alturaRojo = 5;
        var anchoRojo = 4;

        var anchoPendulo = 2;
        var alturaPendulo = 10;
        
        var cajaVerdeSup = new THREE.Mesh (new THREE.BoxGeometry (anchoVerde, alturaVerde, anchoVerde), new THREE.MeshPhongMaterial({color:0x008F39}));  //Caja verde superior
        var cajaRoja = new THREE.Mesh (new THREE.BoxGeometry(anchoRojo, alturaRojo, anchoRojo), new THREE.MeshPhongMaterial({color:0xFF2D00})); //Caja roja
        var cajaVerdeInf = new THREE.Mesh (new THREE.BoxGeometry (anchoVerde, alturaVerde, anchoVerde), new THREE.MeshPhongMaterial({color:0x008F39}));  //Caja verde inferior

        var visela1 = new THREE.Mesh (new THREE.CylinderGeometry (1,1,0.5,10), new THREE.MeshPhongMaterial({color:0xFFD854}));
        visela1.rotateX(Math.PI/2);
        visela1.position.z = anchoRojo/2 + anchoPendulo/4 - 0.25;

        var visela2 = new THREE.Mesh (new THREE.CylinderGeometry (0.5,0.5,0.5,10), new THREE.MeshPhongMaterial({color:0xFFD854}));
        visela2.rotateX(Math.PI/2);
        visela2.position.z = anchoRojo/2 + anchoPendulo/2;

        var pendulo = new THREE.BoxGeometry (anchoPendulo, alturaPendulo, anchoPendulo/2);
        pendulo.translate(0, -alturaPendulo/2 , 0);
        var material = new THREE.MeshPhongMaterial({color:0x666666});
        this.pendulo = new THREE.Mesh(pendulo, material);
        this.pendulo.position.y = -alturaRojo*0.1 - alturaVerde/2;
        this.pendulo.position.z = anchoRojo/2 + anchoPendulo/4;

        
        this.cajaArriba = cajaVerdeSup;
                
        //Caja del medio
        this.cajaMedio = cajaRoja;
        
        //Caja de abajo      
        this.cajaAbajo = cajaVerdeInf;

        this.cajaAbajo.position.y = -(alturaRojo + alturaVerde);
        this.add(this.cajaAbajo);

        this.cajaMedio.position.y = -alturaVerde/2 - alturaRojo/2;
        this.add(this.cajaMedio);
        this.add(this.cajaArriba);

        this.pendulo.position.y = -alturaRojo*0.1 - alturaVerde/2 - alturaPendulo/2 + 1;

        this.cajaArriba.add(visela1);
        this.padre = new THREE.Object3D;
        this.add(this.padre);
        this.padre.add(this.pendulo);
        this.padre.add(visela2);

        
        this.padre.children[0].position.y =  1;
        this.padre.position.y += -alturaRojo*0.1 - alturaVerde/2;

        this.alturaRojo = alturaRojo;
        this.alturaVerde = alturaVerde;
        this.alturaPendulo = alturaPendulo;
        this.alturaRojoCopia
    }

    createGUI (gui,titleGui) { //Quitar titleGUI
        var that = this;
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {
            this.escalado = 1;
            this.giro = 0;
            this.escalado2 = 1;
            this.giro2 = 0;
            this.posicion = 10;
            this.pendulo1 = false;
            this.pendulo2 = false;
            this.velocidad1 = 0;
            this.velocidad2 = 0;
            this.derecha = true;
            this.derecha2 = true;

            this.reset = function () {

                this.escalado = 1;
                this.giro = 0;
                this.escalado2 = 1;
                this.giro2 = 0;
                this.posicion = 10;
                this.pendulo1 = false;
                this.pendulo2 = false;
                this.velocidad1 = 0;
                this.velocidad2 = 0;
                this.derecha = true;
                this.derecha2 = true;
            }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder ("Controles péndulo 1");
        
        folder.add (this.guiControls, 'escalado', 1.0, 2.0, 0.1).name ('Escalado: ').listen();

        folder.add(this.guiControls, 'giro', -0.7, 0.7, 0.01).name ("Giro: ").listen().onChange(function(valor){
            if(giro == 0.7)
                that.guiControls.derecha1 = false;
            else if (giro == -0.7)
                that.guiControls.derecha1 = true;
        });

        var folder2 = gui.addFolder("Controles péndulo 2");

        folder2.add (this.guiControls, 'escalado2', 1.0, 2.0, 0.1).name ('Escalado: ').listen();

        folder2.add (this.guiControls, 'giro2', -0.7, 0.7, 0.01).name ('Giro: ').listen().onChange(function(valor){
            if(giro2 == 0.7)
                that.guiControls.derecha2 = false;
            else if (giro2 == -0.7)
                that.guiControls.derecha2 = true;
        });

        folder2.add (this.guiControls, 'posicion', 10, 90, 1).name ('Posición (%)').listen();
        
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
        folder2.add (this.guiControls, 'reset').name ('[ Reset ]');

        var folder3 = gui.addFolder ("Animación");

        folder3.add (this.guiControls, 'pendulo1').name ('Péndulo 1').listen().onChange(function(valor){
            this.pendulo1 = !this.pendulo1;
        });
        
        folder3.add (this.guiControls, 'velocidad1', 0, 2, 0.1).name ('Velocidad (rad/s)').listen()
        
        folder3.add (this.guiControls, 'pendulo2').name ('Péndulo 2').listen().onChange(function(valor){
            this.pendulo2 = !this.pendulo2;
        });

        folder3.add (this.guiControls, 'velocidad2', 0, 2, 0.1).name ('Velocidad (rad/s)').listen()
    }
    
     animate () {
         this.delta = this.clock.getDelta();
         
        if(this.guiControls.pendulo1){
            if(this.guiControls.derecha){
                this.guiControls.giro += this.guiControls.velocidad1*this.delta;
            } else
                this.guiControls.giro -= this.guiControls.velocidad1*this.delta;

            if(this.guiControls.giro >= 0.7){
                this.guiControls.derecha = false;
                if(this.guiControls.giro > 0.7)
                    this.guiControls.giro = 0.7;
            } else if(this.guiControls.giro <= -0.7){
                this.guiControls.derecha = true;
                if(this.guiControls.giro < -0.7)
                    this.guiControls.giro = -0.7;
            }            
        }


        if(this.guiControls.pendulo2){
            if(this.guiControls.derecha2){
                this.guiControls.giro2 += this.guiControls.velocidad2*this.delta;
            } else
                this.guiControls.giro2 -= this.guiControls.velocidad2*this.delta;

            if(this.guiControls.giro2 >= 0.7){
                this.guiControls.derecha2 = false;
                if(this.guiControls.giro2 > 0.7)
                    this.guiControls.giro2 = 0.7;
            } else if(this.guiControls.giro2 <= -0.7){
                this.guiControls.derecha2 = true;
                if(this.guiControls.giro2 < -0.7)
                    this.guiControls.giro2 = -0.7;
            }            
        }
    }
    
    update () {
        this.animate();

        this.cajaMedio.scale.set (1,this.guiControls.escalado,1);
        this.cajaMedio.position.y = -this.guiControls.escalado*this.alturaRojo/2 - this.alturaVerde/2;
        this.cajaAbajo.position.set (0, -this.guiControls.escalado*this.alturaRojo - this.alturaVerde, 0);
        this.rotation.z = this.guiControls.giro;
        this.padre.rotation.z = this.guiControls.giro2;
        this.pendulo.scale.y = this.guiControls.escalado2;
        this.padre.position.y = -this.guiControls.posicion/100*this.alturaRojo*this.guiControls.escalado - this.alturaVerde/2;

    }
}
