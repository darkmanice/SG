
class Tuerca extends THREE.Object3D {

  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz


// CREACION DE LA TUERCA//////////////////////////////////////////////////////////

    var path = new THREE.Shape();
    path.moveTo(Math.cos(Math.PI/3 * 0) * 2.5,Math.sin(Math.PI/3 * 0) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 1) * 2.5,Math.sin(Math.PI/3 * 1) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 2) * 2.5,Math.sin(Math.PI/3 * 2) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 3) * 2.5,Math.sin(Math.PI/3 * 3) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 4) * 2.5,Math.sin(Math.PI/3 * 4) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 5) * 2.5,Math.sin(Math.PI/3 * 5) * 2.5);
    path.lineTo(Math.cos(Math.PI/3 * 6) * 2.5,Math.sin(Math.PI/3 * 6) * 2.5);

    // depth == amount, pero esta última está desaconsejada
    var mat = new THREE.MeshNormalMaterial();
    var extrudeSettings = { depth: 2, bevelEnabled: false, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1};
    var geometry = new THREE.ExtrudeGeometry (path,extrudeSettings) ;
    geometry.rotateX(Math.PI/2);
    var tuerca = new ThreeBSP(geometry);



    var cilindro = new THREE.Shape();
    cilindro.moveTo(0,-2);
    cilindro.lineTo(1,-2);
    cilindro.lineTo(1,2.5);
    cilindro.lineTo(0,2.5);
    this.points = [];
    this.points = cilindro.getPoints();

    var geometria_revolucion_interior = new THREE.LatheGeometry (this.points,20);
    var interior = new ThreeBSP(geometria_revolucion_interior);


    var grupo_espiral = []
    var geometria_toroide = new THREE.TorusGeometry( 1, 0.1, 16, 16, 2*Math.PI );
    geometria_toroide.rotateX(Math.PI/2);


    var espiral = new ThreeBSP(geometria_toroide);
    grupo_espiral.push(espiral);

    for (var i = 1; i < 11; i++) {
      geometria_toroide.translate(0,-0.2,0);
      espiral = new ThreeBSP(geometria_toroide);
      grupo_espiral.push(espiral);
    }

    var t = tuerca.subtract(interior);

    for (var i = 0; i < grupo_espiral.length; i++) {
      t = t.subtract(grupo_espiral[i]);
    }

    this.tuerca = t.toMesh(mat);

    this.add(this.tuerca);

////////////////////////////////////////////////////////////////////////////////

  }

    // Se crea una sección para los controles de la caja
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice

  update () { }
}
