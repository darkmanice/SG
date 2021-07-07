 class MyBolaElipse extends THREE.Object3D {
    constructor(gui, titleGui) {
        super();
        this.createGUI(gui, titleGui);

        var radioCilindro = 5.0;

        this.radioX = 4;
        this.alturaCilindro = 2;
        this.seccionesCilindro = 30;

        this.radioEsfera = 0.8;


        var geometry = new THREE.CylinderGeometry(this.radioX, this.radioX, this.alturaCilindro, this.seccionesCilindro);

        var material = new THREE.MeshNormalMaterial();
        material.transparent = true;
        material.opacity = 0.4;
        material.flatShading = false;
        material.needsUpdate = true;

        this.ellipse = new THREE.Mesh(geometry, material);

        var esferaMat = new THREE.MeshNormalMaterial();
        esferaMat.flatShading = false;
        esferaMat.needsUpdate = true;

        this.esfera = new THREE.Mesh (new THREE.SphereGeometry (this.radioEsfera, 30, 30), esferaMat);
        this.esfera.position.x = this.radioX
        this.esfera.receiveShadow = true;
        this.esfera.castShadow = true;

        this.nodoGirador = new THREE.Object3D;
        this.nodoGirador.add(this.esfera);

        this.nodoEmpujador = new THREE.Object3D;
        this.nodoEmpujador.add(this.nodoGirador);

        this.add(this.nodoEmpujador);
        this.add(this.ellipse);

        this.position.y = 1;

        this.tweenGiro = new TWEEN.Tween(this.nodoGirador.rotation).to({ y: "+" + 2*Math.PI}, 4000);
        this.tweenGiro.repeat(Infinity);
        this.tweenGiro.start();

        var that = this;
        var origen = { p : 1};
        var destino = { p : - 1};
        
        this.tweenEmpuje = new TWEEN.Tween(origen)
            .to(destino, 2000)
            .easing (TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function(){ that.nodoEmpujador.position.x = that.guiControls.desfase*origen.p})
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }

     createGUI (gui,titleGui) {
        // Controles para el radio de la elipse
        this.guiControls = new function () {
          
          this.desfase = 0;
          
      }
         
         var that = this;
         
         var folder = gui.addFolder (titleGui);
         
         folder.add (this.guiControls, 'desfase', 0, 10.0, 0.1).name ('Extensión: ').listen().onChange(function(valor){
             var escalado = (that.radioX+that.guiControls.desfase)/that.radioX;
             
             var geometry = new THREE.CylinderGeometry(that.radioX, that.radioX, that.alturaCilindro, that.seccionesCilindro);
             geometry.scale(escalado,1,1);
             
             that.children[1].geometry = geometry;
         });
     }
     
     update () {
         TWEEN.update();
     }
 }
