class MyPhysiScene extends Physijs.Scene {
    constructor (unRenderer, circuito, coche, ruedas, x, y, z, rot, puntoControl, vueltas){
        super();

        this.renderer = unRenderer;
        this.setGravity(new THREE.Vector3(0, -50, 0));
        this.rayCaster = new THREE.Raycaster();
        this.crearLuces();
        this.crearCamara(unRenderer);

        var myModels = new MyModels();
        this.modeloCircuito = myModels.getCircuito(circuito);
        this.modeloCoche = myModels.getCoche(coche);
        this.modeloRuedas =  myModels.getRueda(ruedas);

        this.circuito = new Circuito(this, myModels.getCircuito(circuito), puntoControl, vueltas);

        this.coche = new Coche(this, this.camara, this.modeloCoche, this.modeloRuedas, x, (y + 2), z, rot);

        this.numCircuito = circuito;
        this.numCoche = coche;
        this.numRuedas = ruedas;
    }

    crearLuces(){
        var luz = new THREE.AmbientLight(0xfdfdda, 0.90);
        this.add(luz);
        this.spotLight = new THREE.SpotLight(0xffffff, 1);
        this.spotLight.position.set(200, 600, 200);
        this.add(this.spotLight);
    }

    crearCamara(unRenderer){
        this.camara = new THREE.PerspectiveCamera(45, (window.innerWidth) / (window.innerHeight), 19, 1000);
        this.camara.near = 10;
        // También se indica dónde se coloca
        this.camara.position.set (20, 10, 20);


        // Y hacia dónde mira
        var look = new THREE.Vector3 (0,0,0);
        this.camara.lookAt(look);
        this.add (this.camara);
        
        // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
        this.camaraControl = new THREE.TrackballControls (this.camara, unRenderer.domElement);
        // Se configuran las velocidades de los movimientos
        this.camaraControl.noRotate = true;
        this.camaraControl.noZoom = true;
        // Debe orbitar con respecto al punto de mira de la cámara
        this.camaraControl.target = look;

        
        
    }

    getCamera () {
	return this.camara;
    }
    
    setCameraAspect (ratio) {
	this.camara.aspect = ratio;
	this.camara.updateProjectionMatrix();
    }


    update () {
        this.camaraControl.update();
        this.coche.update();
        scene.simulate( undefined, 2 );
    }

    getCoche(){
        return this.coche;
    }

    setColisionesPlataformasAceleracion(){
        this.circuito.aplicarColisionPlataformasAceleracion(this.coche);
    }

    respawnCoche(x, y, z, rot, puntoControl, vueltas){
        this.coche.pos(x,y,z,rot)
        //window.location.replace("http://localhost:8000/OlympusRacing-RE/OlympusRacingRE.html?" + "circuito=" + this.numCircuito + "&" + "coche=" + this.numCoche + "&" + "ruedas=" + this.numRuedas + "&" + "x=" + x + "&" + "y=" + y + "&" + "z=" + z + "&" + "rot=" + rot + "&" + "puntoControl=" + puntoControl + "&" + "now=" + getDate() + "&" + "vueltas=" + vueltas);
    }

}
