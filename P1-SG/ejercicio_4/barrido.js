class barrido extends THREE.Object3D {

    // Jerarquía
    // nodo "a" = figura corazón
    // nodo "b" = rotación respecto al eje y del corazón
    // nodo "c" = rotación respecto al eje z (para mantener verticalidad)
    // nodo "d" = transaladar el corazón para que esté a una distancia 
    // nodo "e" = rotación respecto al eje z
    constructor(corX,corY,corZ,shape) {
        super();
        
        this.animado = true;

        var x = 0, y = 0;

        var curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -21, 0.5, 20 ),
            new THREE.Vector3( -20, 0, 20 ),
            new THREE.Vector3( -5, -2, 20 ),
            new THREE.Vector3( 5, 2, 20 ),
            new THREE.Vector3( 20, 0, 20 ),
            new THREE.Vector3( 21, -0.5, 20 )
        ] );
        
        var points = curve.getPoints( 50 );

        var curva = new THREE.CatmullRomCurve3( points );

        // depth == amount, pero esta última está desaconsejada
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1, extrudePath: curva };

        var geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
        geometry.center()
        var mat = new THREE.MeshPhongMaterial({color : 0xd7010});

        // malla = geometría + material
        // corresponde al nodo "a" y al nodo "b" - ab
        var malla = new THREE.Mesh( geometry, mat );
        
        // Y añadirlo como hijo del Object3D (el this)
        this.malla = malla;
        this.add (this.malla);
       
        this.malla.rotation.z = Math.PI/2;

        this.position.set(corX,corY,corZ);
        
        
        // nodos c y d
        this.cd = new THREE.Object3D();
        this.cd.position.x = 0;
        this.add(this.cd);
        // montamos la jerarquía
        this.cd.add(this.malla);
        
        // nodo e
        this.e =  new THREE.Object3D();
        // montamos la jerarquía
        this.e.add(this.cd);
        
        this.add(this.e);

        // jerarquía:
        /*      e
                |
               cd
                |
              malla (ab)
        */
    }

    animacion() {  
        //this.e.rotation.y -= 0.01;
        this.cd.rotation.x += 0.01
        this.malla.rotation.y += 0.01;
    } 

    update () {
        if (this.animado){
            this.animacion();
        }
    }


}