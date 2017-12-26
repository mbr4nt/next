n3xt.TestElement = class extends n3xt.Element {
    constructor(model = {
        radius: 2
    }) { super(model); }

    fetch3D(done) {
        var geometry = new THREE.SphereGeometry( this.model.radius, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        var sphere = new THREE.Mesh( geometry, material );

        done(sphere);
    }
}