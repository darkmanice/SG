 
class MyCylinder extends THREE.Object3D {
    constructor(gui,titleGui) {
      super();
      
      // Se crea la parte de la interfaz que corresponde al Cono
      // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);
      
      this.axis = new THREE.AxesHelper (5);
      this.add (this.axis);
      // Un Mesh se compone de geometría y material
     
      var cylinderGeom = new THREE.CylinderGeometry (1, 1, 1, 3);
      // Como material se crea uno a partir de un color
      var cylinderMat = new THREE.MeshNormalMaterial();
      // Ya podemos construir el Mesh
      var cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.cylinder = cylinder;

      this.add (this.cylinder);
      // Las geometrías se crean centradas en el origen.
    }
    
    createGUI (gui,titleGui) {
      // Controles para el tamaño del Cilindro
      this.guiControls = new function () {
        
        this.sizeX = 1.0;
        this.sizeY = 1.0;
        this.sizeZ = 1.0;

        this.nCarasL = 3.0;

        this.reset = function () {
          this.sizeX = 1.0;
          this.sizeY = 1.0;
          this.sizeZ = 1.0;
          
          this.nCarasL = 3.0;
        }
      }
      var that = this;
      // Se crea una sección para los controles del cilindro
      var folder = gui.addFolder (titleGui);
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'sizeX', 1.0, 5.0, 0.1).name ('Tamaño X : ').listen();
      folder.add (this.guiControls, 'sizeY', 1.0, 5.0, 0.1).name ('Tamaño Y : ').listen();
      folder.add (this.guiControls, 'sizeZ', 1.0, 5.0, 0.1).name ('Tamaño Z : ').listen();
      folder.add (this.guiControls, 'nCarasL', 3.0, 32.0, 1.0).name ('Número de caras laterales : ').listen().onChange(function(value) {
        that.cylinder.geometry = new THREE.CylinderGeometry(1, 1, 1, that.guiControls.nCarasL);
      });
      folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }
    
    animate () {
        this.cylinder.rotation.x += 0.01;
        this.cylinder.rotation.y += 0.01;
    }
    
    update () {
      // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
      // Primero, el escalado
      // Segundo, la rotación en Z
      // Después, la rotación en Y
      // Luego, la rotación en X
      // Y por último la traslación
      this.animate();
      this.cylinder.scale.set (this.guiControls.sizeX,this.guiControls.sizeY,this.guiControls.sizeZ);
      
    }
  }