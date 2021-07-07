class pica extends THREE.Object3D {

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

        var heartShape = new THREE.Shape()
        heartShape.moveTo( x + 2.5, y + 2.5 )
        heartShape.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y )
        heartShape.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5 )
        heartShape.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 )
        heartShape.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 )
        heartShape.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y )
        heartShape.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );

        // depth == amount, pero esta última está desaconsejada
        var extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1};

        var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );

        geometry.rotateX(Math.PI)
        geometry.rotateZ(Math.PI);
        geometry.center()
        var mat = new THREE.MeshPhongMaterial({color : 0x932525});

        // malla = geometría + material
        // corresponde al nodo "a" y al nodo "b" - ab
        var malla = new THREE.Mesh( geometry, mat );
        
        // Y añadirlo como hijo del Object3D (el this)
        this.malla = malla;
        this.add (this.malla);

        // base 
        var points = [];
        points.push( new THREE.Vector3( 0, 0, 0 ));
        points.push( new THREE.Vector3( 1, 0, 0 ));
        points.push( new THREE.Vector3( 0.9, 1, 0 ));
        points.push( new THREE.Vector3( 0.6, 2, 0 ));
        points.push( new THREE.Vector3( 0.5, 3, 0 ));
        points.push( new THREE.Vector3( 0.4, 4, 0 ));
        points.push( new THREE.Vector3( 0.2, 5, 0 ));

        var geometriaPie = new THREE.LatheGeometry(points);
        
        geometriaPie.center();
        geometriaPie.translate(0,-7.0, 0);
        // Create the final object to add to the scene
        this.pie = new THREE.Mesh( geometriaPie, mat );
        this.add(this.pie);
        this.pie.add(this.malla)
        this.position.set(corX,corY,corZ);

        // nodos c y d
        this.cd = new THREE.Object3D();
        this.add(this.cd);
        // montamos la jerarquía
        this.cd.add(this.pie);

    }

    animacion() {  
        this.cd.rotation.z += 0.01
        this.pie.rotation.y += 0.01;
    } 

    update () {
        if (this.animado){
            this.animacion();
        }
    }


}