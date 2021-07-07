
class Movil extends THREE.Object3D {

  constructor(gui) {
    super();

    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui);

    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
    this.sphere = new THREE.Mesh( geometry, material );

    this.sphere.position.x = 7;
    this.add( this.sphere );

    this.giro = new THREE.Object3D();
    this.giro.add(this.sphere)
    this.add(this.giro)

    this.clock = new THREE.Clock();
    this.delta = 0;

  }


  createGUI (gui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.marcas_segundo = 1;
    }

    gui.add(this.guiControls, 'marcas_segundo', -12, 12, 1).name ('Velocidad(marcas/s): ').listen();


  }

  update () {
    this.delta = this.clock.getDelta();
    this.giro.rotation.y += (Math.PI/6) * this.guiControls.marcas_segundo * this.delta;
  }
}
