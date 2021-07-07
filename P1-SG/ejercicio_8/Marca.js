
class Marca extends THREE.Object3D {

  constructor(valorx,valory,valorz) {
    super();

    var geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var sphere = new THREE.Mesh( geometry, material );

    sphere.position.set(valorx,valory,valorz);

    this.add( sphere );

  }


  update () {}
}
