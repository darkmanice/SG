 class MySatelites extends THREE.Object3D {
    constructor(gui, camara) {
        super();
        this.createGUI(gui);

        var radioTierra= 3;
        var radioSatelite = 2;

        var texturaTierra = new THREE.TextureLoader().load('../imgs/tierra.jpg');
        var texturaSatelite1 = new THREE.TextureLoader().load('../imgs/putinOso.jpg');
        var texturaSatelite2 = new THREE.TextureLoader().load('../imgs/cara.jpg');
        var texturaSatelite3 = new THREE.TextureLoader().load('../imgs/cara.jpg');

        this.tierra = new THREE.Mesh (new THREE.SphereGeometry (radioTierra, 30, 30), new THREE.MeshPhongMaterial({map: texturaTierra}));  //Tierra
        
        this.satelite1 = new THREE.Mesh (new THREE.SphereGeometry (radioSatelite, 30, 30), new THREE.MeshPhongMaterial({map: texturaSatelite1})); //Satelite 1
        this.satelite1.geometry.rotateY(-Math.PI/2);

        this.satelite2 = new THREE.Mesh (new THREE.SphereGeometry (radioSatelite, 30, 30), new THREE.MeshPhongMaterial({map: texturaSatelite2})); //Satelite 2
        this.satelite2.geometry.rotateY(-Math.PI/2);

        this.satelite3 = new THREE.Mesh (new THREE.SphereGeometry (radioSatelite, 30, 30), new THREE.MeshPhongMaterial({map: texturaSatelite3})); //Satelite 3

        this.satelite1.position.x = 8;
        this.satelite2.position.x = 15;
        this.satelite3.position.x = 22;

        this.satelites = new THREE.Object3D;
        
        this.satelites.add(this.satelite1);
        this.satelites.add(this.satelite2);
        this.satelites.add(this.satelite3);

        this.tierra.add(this.satelites);

        this.add(this.tierra);

        this.tierra.position.y = 5;

        this.satelite1.lookAt(this.tierra.position.x, this.tierra.position.y, this.tierra.position.z);
        this.satelite2.lookAt(camara.position.x, camara.position.y, camara.position.z);

        this.tween = new TWEEN.Tween(this.rotation).to({ y: "+" + Math.PI}, 1000*(360*Math.PI/180));
        this.tween.repeat(Infinity);

        this.tweenSatelite3 = new TWEEN.Tween(this.satelites.children[2].rotation).to({ y: "+" + Math.PI}, 1000*(360*Math.PI/180));
        this.tweenSatelite3.repeat(Infinity);

        this.tween.start();
        this.tweenSatelite3.start();
    }

    createGUI (gui,titleGui) {
        var that = this;
        // Controles para el tamaño, la orientación y la posición de la caja
        this.guiControls = new function () {


            this.reset = function () {

            }
        } 
        
      
    }
    
    update (camara) {
        
        TWEEN.update();
        this.satelite1.lookAt(this.tierra.position.x, this.tierra.position.y, this.tierra.position.z);
        this.satelite2.lookAt(camara.position.x, camara.position.y, camara.position.z);
    }
}
