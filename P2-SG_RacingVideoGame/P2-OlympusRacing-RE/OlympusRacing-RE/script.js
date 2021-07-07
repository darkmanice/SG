
/// La escena que tendrá todo lo que se tiene en cuenta al hacer un render
//  Lo que no esté incluido en la escena no será procesado por el renderer
scene = null;

/// La variable que referenciará al renderer
renderer = null;

/// El objeto que referencia a la interfaz gráfica de usuario
gui = null;

/// Se crea y configura un renderer WebGL
/**
 * El renderer recorrerá el grafo de escena para procesarlo y crear la imagen resultante. 
 * Debe hacer este trabajo para cada frame.
 * Si se cambia el grafo de escena después de visualizar un frame, los cambios se verán en el siguiente frame.
 * 
 * @return El renderer
 */
function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  // Se establece un color de fondo en las imágenes que genera el render
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  
  // Se establece el tamaño, se aprovoche la totalidad de la ventana del navegador
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  return renderer;  
}

/// Función que se encarga de renderizar un frame
/**
 * Se renderiza la escena, captada por una cámara.
 */
function render() {
  // Se solicita que La próxima vez que haya que refrescar la ventana se ejecute una determinada función, en este caso la funcion render.
  // La propia función render es la que indica que quiere ejecutarse la proxima vez
  // Por tanto, esta instrucción es la que hace posible que la función  render  se ejecute continuamente y por tanto podamos crear imágenes que tengan en cuenta los cambios que se la hayan hecho a la escena después de un render.
  requestAnimationFrame(render);

  // Se le pide a la escena que se actualice antes de ser renderizada
  scene.update();
  
  // Por último, se le pide al renderer que renderice la escena que capta una determinada cámara, que nos la proporciona la propia escena.
  renderer.render(scene, scene.getCamera());

}

/// Función que actualiza la razón de aspecto de la cámara y el tamaño de la imagen que genera el renderer en función del tamaño que tenga la ventana
function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

// 

/// La función principal
$(function () {
  // El gestor de hebras
  Physijs.scripts.worker = '../libs/physijs_worker.js'
  // El motor de física de bajo nivel, en el cual se apoya Physijs
  Physijs.scripts.ammo   = '../libs/ammo.js'
  
  // Se crea el renderer
  renderer = createRenderer();
  
  // La salida del renderer se muestra en un DIV de la página index.html
  $("#WebGL-output").append(renderer.domElement);
  
  // listeners
  // Cada vez que el usuario cambie el tamaño de la ventana se llama a la función que actualiza la cámara y el renderer
  window.addEventListener ("resize", onWindowResize);

  ///El objeto que contiene la informacion que obtiene desde el menu
  var data = findGetParameter();
  
  // Se crea la escena. La escena es una instancia de nuestra propia clase encargada de crear y gestionar todos los elementos que intervienen en la escena.
  scene = new MyPhysiScene (renderer.domElement, parseInt(data[0]), parseInt(data[1]), parseInt(data[2]), parseFloat(data[3]), parseFloat(data[4]), parseFloat(data[5]), parseFloat(data[6]), parseInt(data[7]), parseInt(data[8]));


  // Finalmente, realizamos el primer renderizado.
  render();
  scene.simulate();
});


function findGetParameter() {

    var now = new URL(location.href).searchParams.get('now');

    if (now != null){
      setDate(parseInt(now));
    } else{
      setDate((new Date()).getTime());
    }
  
    var result = [];

    result[0] = new URL(location.href).searchParams.get('circuito');

    result[1] = new URL(location.href).searchParams.get('coche');

    result[2] = new URL(location.href).searchParams.get('ruedas');

    result[3] = new URL(location.href).searchParams.get('x');

    result[4] = new URL(location.href).searchParams.get('y');

    result[5] = new URL(location.href).searchParams.get('z');

    result[6] = new URL(location.href).searchParams.get('rot');

    result[7] = new URL(location.href).searchParams.get('puntoControl');

    result[8] = new URL(location.href).searchParams.get('vueltas');

    if (result[3] == null){
      result[3] = "0";
    }
    if (result[4] == null){
      result[4] = "0";
    }
    if (result[5] == null){
      result[5] = "0";
    }
    if (result[6] == null){
      result[6] = "0";
    }
    if (result[7] == null){
      result[7] = "-1";
    }
    if(result[8] == null){
        result[8] = 0;
    }
    return result;
}
