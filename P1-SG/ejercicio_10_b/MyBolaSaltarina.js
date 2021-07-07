 class MyBolaSaltarina extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);

        var radioCilindro = 5.0;
        this.alturaCilindro = 10.0;
        this.seccionesCilindro = 30;

        var radioEsfera = 0.8;

        //Cilindro
        var cylinderGeom = new THREE.CylinderGeometry (radioCilindro, radioCilindro, this.alturaCilindro, this.seccionesCilindro);
        //cylinderGeom.translate(0, this.alturaCilindro/2, 0);
        // Como material se crea uno a partir de un color
        var cylinderMat = new THREE.MeshNormalMaterial();
        cylinderMat.transparent = true;
        cylinderMat.opacity = 0.4;

        cylinderMat.flatShading = false;
        cylinderMat.needsUpdate = true;
        // Ya podemos construir el Mesh
        var cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);

        this.cylinder = cylinder;

        this.add (this.cylinder);

        var esferaMat = new THREE.MeshNormalMaterial();
        esferaMat.flatShading = false;
        esferaMat.needsUpdate = true;

        this.esfera = new THREE.Mesh (new THREE.SphereGeometry (radioEsfera, 30, 30), esferaMat);
        this.esfera.position.x = radioCilindro;

        this.esfera.receiveShadow = true;
        this.esfera.castShadow = true;

        this.nodoGirador = new THREE.Object3D;
        this.nodoGirador.add(this.esfera);

        this.nodoEmpujador = new THREE.Object3D;
        this.nodoEmpujador.add(this.nodoGirador);

        this.add(this.nodoEmpujador);

        this.position.y = this.alturaCilindro/2;

        this.tweenGiro = new TWEEN.Tween(this.nodoGirador.rotation).to({ y: "+" + Math.PI}, 4000);
        this.tweenGiro.repeat(Infinity);
        this.tweenGiro.start();

        var that = this;
        var origen = { p : -this.alturaCilindro/2 + 1};
        var destino = { p : this.alturaCilindro/2 - 1};

        this.tweenEmpuje = new TWEEN.Tween(origen)
            .to(destino, 1000)
            .easing (TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function(){ that.nodoEmpujador.position.y = origen.p; })
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }

    createGUI (gui,titleGui) {
      // Controles para el radio del cilindro
      this.guiControls = new function () {
        
        this.radioCilindro = 5.0;

      }

      var that = this;

      var folder = gui.addFolder (titleGui);

      folder.add (this.guiControls, 'radioCilindro', 2.0, 13.0, 0.1).name ('Radio del Cilindro : ').listen().onChange(function(value) {
        that.cylinder.geometry = new THREE.CylinderGeometry(that.guiControls.radioCilindro, that.guiControls.radioCilindro, that.alturaCilindro, that.seccionesCilindro);
        that.esfera.position.x = that.guiControls.radioCilindro;
      });
    }
        
    update () {
        
        TWEEN.update();
    }
}
