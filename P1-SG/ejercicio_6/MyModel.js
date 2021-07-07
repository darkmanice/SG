 
class MyModel extends THREE.Object3D {
  constructor(gui,titleGui) {
    super();
    
    // Se crea la parte de la interfaz que corresponde a la caja
    // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
      this.createGUI(gui,titleGui);


      var that = this;
      
      var objectLoader = new THREE.OBJLoader();
      var material = new THREE.MTLLoader();
      material.load('../models/porsche911/911.mtl', function (materials){
          objectLoader.setMaterials(materials);
          
          objectLoader.load('../models/porsche911/Porsche_911_GT2.obj', function(object){
              that.modelo = object;
              that.add(that.modelo);
          }, null, null);
      });
      
      this.position.y = 0.6;
  }
  
  createGUI (gui,titleGui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function (){
          this.rotacion = false;
      }
      
 
    
    var that = this;
    // Se crea una sección para los controles de la caja
    var folder = gui.addFolder (titleGui);
    // Estas lineas son las que añaden los componentes de la interfaz
    // Las tres cifras indican un valor mínimo, un máximo y el incremento
    // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
    folder.add (this.guiControls, 'rotacion').name ("Activar rotación").listen().onChange(function(value) {
        that.rotacion = !that.rotacion;
      });
  }
  
  animate () {
      
      if(this.guiControls.rotacion)
          this.rotation.y += 0.02;

  }
  
  update () {
    this.animate();
  }
}
