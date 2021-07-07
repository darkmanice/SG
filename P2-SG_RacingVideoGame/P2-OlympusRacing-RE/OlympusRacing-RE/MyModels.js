class MyModels {
    constructor (){
        this.modelosCoches = ['../models/coche.glb', '../models/coche2.glb'];
        this.modelosRuedas = ['../models/rueda.glb', '../models/rueda2.glb'];
        this.modelosCircuitos = ['../models/circuito.glb', '../models/circuito2.glb'];

        this.imagenesCoches = ['../images/coche.png', '../images/coche2.png'];
        this.imagenesRuedas = ['../images/rueda.png', '../images/rueda2.png'];
        this.imagenesCircuitos = ['../images/circuito.png', '../images/circuito2.png'];
    }

    getNumCoches(){
        return this.modelosCoches.length;
    }

    getNumRuedas(){
        return this.modelosRuedas.length;
    }

    getNumCircuitos(){
        return this.modelosCircuitos.length;
    }

    getCoche(num){
        return this.modelosCoches[num];
    }

    getRueda(num){
        return this.modelosRuedas[num];
    }

    getCircuito(num){
        return this.modelosCircuitos[num];
    }

    getImgCoche(num){
        return this.imagenesCoches[num];
    }

    getImgRueda(num){
        return this.imagenesRuedas[num];
    }

    getImgCircuito(num){
        return this.imagenesCircuitos[num];
    }
}
