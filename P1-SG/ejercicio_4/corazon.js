class corazon extends THREE.Object3D {

    // Jerarquía
    // nodo "a" = figura corazón
    // nodo "b" = rotación respecto al eje y del corazón
    // nodo "c" = rotación respecto al eje z (para mantener verticalidad)
    // nodo "d" = transaladar el corazón para que esté a una distancia 
    constructor(corX,corY,corZ) {
        super();
        
        this.animado = true;

        var x = 0, y = 0;

        var heartShape = new THREE.Shape()
        heartShape.moveTo( x + 2.5, y + 2.5 )
        heartShape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y )
        heartShape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5 )
        heartShape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 )
        heartShape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 )
        heartShape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y )
        heartShape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

        this.shape = heartShape;
        // depth == amount, pero esta última está desaconsejada
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1};

        var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );

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