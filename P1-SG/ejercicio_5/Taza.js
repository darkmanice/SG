
class Taza extends THREE.Object3D {

  constructor() {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz


// CREACION DE LA TAZA//////////////////////////////////////////////////////////
    var path = new THREE.Shape();
    path.moveTo(0,-2.5);
    path.lineTo(3,-2.5);
    path.lineTo(3,2.5);
    path.lineTo(0,2.5);
    this.points = [];
    this.points = path.getPoints();

    var mat = new THREE.MeshNormalMaterial();
    var geometria_revolucion = new THREE.LatheGeometry (this.points,20);

    var path = new THREE.Shape();
    path.moveTo(0,-2);
    path.lineTo(2.5,-2);
    path.lineTo(2.5,2.5);
    path.lineTo(0,2.5);
    this.points = [];
    this.points = path.getPoints();

    var geometria_revolucion_interior = new THREE.LatheGeometry (this.points,20);

    var geometria_toroide = new THREE.TorusGeometry( 1.5, 0.2, 8, 8, 2*Math.PI );
    geometria_toroide.rotateZ(Math.PI/2);
    geometria_toroide.translate(-2.7,0,0);

    var cuerpo_taza = new ThreeBSP(geometria_revolucion);
    var interior_taza = new ThreeBSP(geometria_revolucion_interior);
    var asa_taza = new ThreeBSP(geometria_toroide);

    var a = asa_taza.subtract(interior_taza);
    var c = cuerpo_taza.subtract(interior_taza);
    var taza = c.union(a);
    this.taza = taza.toMesh(mat);


    this.add(this.taza);

////////////////////////////////////////////////////////////////////////////////

  }

    // Se crea una sección para los controles de la caja
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice

  update () { }
}
