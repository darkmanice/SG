class diamante extends THREE.Object3D {

    // Jerarquía
    // nodo "a" = figura corazón
    // nodo "b" = rotación respecto al eje y del corazón
    // nodo "c" = rotación respecto al eje z (para mantener verticalidad)
    // nodo "d" = transaladar el corazón para que esté a una distancia 
    // nodo "e" = rotación respecto al eje z
    constructor(corX,corY,corZ) {
        super();
        
        this.animado = true;

        var x = 0, y = 0;

        var formaDiamante = new THREE.Shape();
        //formaDiamante.moveTo( x + 2.5, y + 2.5 );
        formaDiamante.lineTo( x + 7, y + 10);
        formaDiamante.lineTo( x , y + 20);
        formaDiamante.lineTo( x - 7, y + 10);
        formaDiamante.lineTo( x , y );
        
        // depth == amount, pero esta última está desaconsejada
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1};

        var geometry = new THREE.ExtrudeBufferGeometry( formaDiamante, extrudeSettings );
        geometry.scale(0.7,0.7,0.7)
        geometry.rotateX(Math.PI)
        geometry.center()
        var mat = new THREE.MeshPhongMaterial({color : 0x2147ce});

        // malla = geometría + material
        // corresponde al nodo "a" y al nodo "b" - ab
        var malla = new THREE.Mesh( geometry, mat );
        
        // Y añadirlo como hijo del Object3D (el this)
        this.malla = malla;
        this.add (this.malla);

        this.position.set(corX,corY,corZ);
        
        // nodos c y d
        this.cd = new THREE.Object3D();
        this.add(this.cd);
        // montamos la jerarquía
        this.cd.add(this.malla);
        
    }
    animacion() {  
        this.cd.rotation.z += 0.01
        this.malla.rotation.y += 0.01;  
    } 
    
    update () {
        if (this.animado){
            this.animacion();
        }
    }
}