class miPeon extends THREE.Object3D {

    constructor(gui,esPeonCompleto, esLinea) {
        super();
        this.esLinea = esLinea;
        this.esPeonCompleto = esPeonCompleto;
        this.gui = gui;
        //var that = this;
        /************************************************************************ */
        //Puntos Peon
        /************************************************************************ */
        this.points = [];
        this.points.push( new THREE.Vector3( 0, 0, 0 ));
        this.points.push( new THREE.Vector3( 6, 0, 0 ));
        this.points.push( new THREE.Vector3( 6, 1, 0 ));
        this.points.push( new THREE.Vector3( 4, 1, 0 ));
        this.points.push( new THREE.Vector3( 4, 2, 0 ));
        this.points.push( new THREE.Vector3( 5, 2, 0 ));
        this.points.push( new THREE.Vector3( 5.5, 2.5, 0 ));
        this.points.push( new THREE.Vector3( 5.5, 2.7, 0 ));
        this.points.push( new THREE.Vector3( 6, 3.2, 0 ));
        this.points.push( new THREE.Vector3( 4, 3.5, 0 ));
        this.points.push( new THREE.Vector3( 2, 10, 0 ));
        this.points.push( new THREE.Vector3( 2.3, 10.4, 0 ));
        this.points.push( new THREE.Vector3( 2.7, 10.8, 0 ));
        this.points.push( new THREE.Vector3( 3.2, 11.2, 0 ));
        this.points.push( new THREE.Vector3( 3.8, 11.6, 0 ));
        this.points.push( new THREE.Vector3( 4.5, 12, 0 ));
        this.points.push( new THREE.Vector3( 4.2, 12.4, 0 ));
        this.points.push( new THREE.Vector3( 4.1, 12.8, 0 ));
        this.points.push( new THREE.Vector3( 4, 13.2, 0 ));
        this.points.push( new THREE.Vector3( 1, 13.6, 0 ));
        this.points.push( new THREE.Vector3( 1.6, 14, 0 ));
        this.points.push( new THREE.Vector3( 2.1, 14.4, 0 ));
        this.points.push( new THREE.Vector3( 2.5, 14.8, 0 ));
        this.points.push( new THREE.Vector3( 2.8, 15.2, 0 ));
        this.points.push( new THREE.Vector3( 3, 15.6, 0 ));
        this.points.push( new THREE.Vector3( 3.1, 16, 0 ));
        this.points.push( new THREE.Vector3( 3, 16.4, 0 ));
        this.points.push( new THREE.Vector3( 2.8, 16.8, 0 ));
        this.points.push( new THREE.Vector3( 2.5, 17.2, 0 ));
        this.points.push( new THREE.Vector3( 2.1, 17.6, 0 ));
        this.points.push( new THREE.Vector3( 1.6, 18, 0 ));
        this.points.push( new THREE.Vector3( 1, 18.4, 0 ));
        this.points.push( new THREE.Vector3( 0.3, 18.8, 0 ));
        this.points.push( new THREE.Vector3( 0, 18.9, 0 ));
        /************************************************************************ */
        //Fin puntos Peon
        /************************************************************************ */
        var mat = new THREE.MeshNormalMaterial();
        mat.side = THREE.DoubleSide;
        mat.flatShading = true;
        mat.needsUpdate = true;
        var peon;
        var line;
        
        // Crear ejes
        this.axis = new THREE.AxesHelper (7);
        this.add (this.axis);

        // si es la línea que marca el perfil
        if (esLinea){
            // para ver la línea 
            var lineGeometry = new THREE.Geometry();
            lineGeometry.vertices = this.points;
            
            var line = new THREE.Line (lineGeometry, mat);

            // crear el material y la geometría de figura por revolución
            // Y añadirlo como hijo del Object3D (el this)
            this.line = line;
            this.add (this.line);
            this.position.set (-20,0,0);
        }
        
        // si no es la línea (es una figura)
        else {

            // para el peón que puede variar de "ángulo"
            if (!esPeonCompleto){
                peon = new THREE.Mesh (new THREE.LatheGeometry (this.points,gui.guiControls.resolucion,0.0, this.gui.guiControls.angulo), mat);
            }

            // para el peón que no puede variar su ángulo (completo)
            else {
                peon = new THREE.Mesh (new THREE.LatheGeometry (this.points,gui.guiControls.resolucion,0.0, 6.3), mat);
            }
            
            this.peon = peon;
            this.add (this.peon);
    
            if (!esPeonCompleto){
                this.position.set (0,0,0);
            }
            else {
                this.position.set (20,0,0);
            }
        }  
    }

    update () {
        // para cambiar los segmentos del cono, crear una nueva geometría y asignarla a la geometría del mesh
        this.angulo_anterior;
        this.resolucion_anterior;

        if (!this.esPeonCompleto){
            if (this.resolucion_anterior != this.gui.guiControls.resolucion || this.angulo_anterior != this.gui.guiControls.angulo){
                this.peon.geometry = new THREE.LatheGeometry (this.points,this.gui.guiControls.resolucion,0.0, this.gui.guiControls.angulo);
                this.resolucion_anterior = this.gui.guiControls.resolucion;
                this.angulo_anterior = this.gui.guiControls.angulo;
        
            }
        }
        else {
            if (this.resolucion_anterior != this.gui.guiControls.resolucion){
                this.peon.geometry = new THREE.LatheGeometry (this.points,this.gui.guiControls.resolucion,0.0, 6.3);
                this.resolucion_anterior = this.gui.guiControls.resolucion;
                this.angulo_anterior = this.gui.guiControls.angulo;
            }
        }

}


}