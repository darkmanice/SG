 
class MyTorus extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
    this.createGUI(gui,titleGui);
    
    // Un Mesh se compone de geometría y material
    var toroGeom = new THREE.TorusGeometry (1.5,0.2,8,6);
    // Como material se crea uno a partir de un color
    var toroMat = new THREE.MeshNormalMaterial();
    
    // Ya podemos construir el Mesh
    var toro = new THREE.Mesh (toroGeom, toroMat);
   // this.cone = cone;
    // Y añadirlo como hijo del Object3D (el this)
    this.toro = toro;
    this.add (this.toro);

    // Y unos ejes. Imprescindibles para orientarnos sobre dónde están las cosas
    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
  }
  
  createGUI (gui,titleGui) {
    // Controles para el tamaño, la orientación y la posición de la caja
    this.guiControls = new function () {
      this.sizeX = 1.0;
      this.sizeY = 1.0;
      this.sizeZ = 1.0;

      this.segmentosRadiales = 8.0;
      this.segmentosTubulares = 6.0;
      
      // Un botón para dejarlo todo en su posición inicial
      // Cuando se pulse se ejecutará esta función.
      this.reset = function () {
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.segmentosRadiales = 8.0;
        this.segmentosTubulares = 6.0;
      }
    } 
    var that = this;
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'sizeX', 0.1, 5.0, 0.1).name ('Tamaño X : ').listen();
    folder.add (this.guiControls, 'sizeY', 0.1, 5.0, 0.1).name ('Tamaño Y : ').listen();
    folder.add (this.guiControls, 'sizeZ', 0.1, 5.0, 0.1).name ('Tamaño Z : ').listen();
    
    folder.add (this.guiControls, 'segmentosRadiales', 5.0, 30.0, 1.0).name ('Segmentos Radiales: ').listen().onChange(function(value) {
      that.toro.geometry = new THREE.TorusGeometry(1,0.4, that.guiControls.segmentosRadiales, that.guiControls.segmentosTubulares);
    });
    folder.add (this.guiControls, 'segmentosTubulares', 3.0, 20.0, 1.0).name ('Segmentos Tubulares: ').listen().onChange(function(value) {
      that.toro.geometry = new THREE.TorusGeometry(1,0.4, that.guiControls.segmentosRadiales, that.guiControls.segmentosTubulares);
    });
    folder.add (this.guiControls, 'reset').name ('[ Reset ]');
  }
 
  
  animacion() {
    this.toro.rotation.y += 0.01;
    this.toro.rotation.x += 0.01;
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación

    this.animacion();

    this.toro.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);

  }

  
}