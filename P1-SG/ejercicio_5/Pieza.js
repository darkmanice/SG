
class Pieza extends THREE.Object3D {

  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz


// CREACION DE LA PIEZA//////////////////////////////////////////////////////////

    var path = new THREE.Shape();
    path.moveTo(0,0);
    path.lineTo(3,0);
    path.lineTo(3,0.5);
    path.lineTo(1,0.5);
    path.quadraticCurveTo(1,0.5,0.5,1);
    path.lineTo(0.5,3);
    path.lineTo(0,3);
    path.lineTo(0,0);

    // depth == amount, pero esta última está desaconsejada
    var mat = new THREE.MeshNormalMaterial();
    var extrudeSettings = { depth: 1, bevelEnabled: false, bevelSegments: 10, steps: 10, bevelSize: 1, bevelThickness: 1};
    var geometry = new THREE.ExtrudeGeometry (path,extrudeSettings) ;
    var pieza = new ThreeBSP(geometry);

    var cilindro = new THREE.Shape();
    cilindro.moveTo(0,-2);
    cilindro.lineTo(0.2,-2);
    cilindro.lineTo(0.2,2.5);
    cilindro.lineTo(0,2.5);
    this.points = [];
    this.points = cilindro.getPoints();

    var geometria_revolucion_interior = new THREE.LatheGeometry (this.points,20);
    geometria_revolucion_interior.rotateZ(Math.PI/2);
    geometria_revolucion_interior.translate(0,2.5,0.5);
    var interior = new ThreeBSP(geometria_revolucion_interior);

    var geometria_revolucion_interior2 = new THREE.LatheGeometry (this.points,20);
    geometria_revolucion_interior2.translate(2.5,0,0.5);
    var interior2 = new ThreeBSP(geometria_revolucion_interior2);

    var t = pieza.subtract(interior);
    t = t.subtract(interior2);
    this.pieza = t.toMesh(mat);

    this.add(this.pieza);

////////////////////////////////////////////////////////////////////////////////

  }

    // Se crea una sección para los controles de la caja
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice

  update (){}
}
