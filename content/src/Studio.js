n3xt.Studio = class extends n3xt.Element {
    constructor(model={
        url: "3d/test-02-3ds.dae",
        uvScale: 1,
        layers: []
    }) { 
        super(model); 
        this.loadedGeometry = function(geo) {

        };
    }

    get geometries() {
        var self = this;
        if(!self.model.url) return [];
        var geo = new n3xt.ExternalGeometry();
        geo.url = self.model.url;
        geo.uvScale = self.model.uvScale;
        geo.loaded = function(geo, threeObj) {
            self.model.layers = geo.layers;
            if(self.loadedGeometry) self.loadedGeometry(geo);
        };
        return [geo];
    }
}

n3xt.StudioFloorGeometry = class extends n3xt.Geometry {
    constructor() {
        super();
        this.uvScale = 0.05;
    }
    instantiate(model, done) {
        var self = this;
        var n3xtMaterial = new n3xt.CheckerboardMaterial();
        n3xtMaterial.threeMaterial(self.uvScale, function(threeMaterial) {
            var floorGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
            var floorMesh = new THREE.Mesh( floorGeometry, threeMaterial );
            floorMesh.receiveShadow = true;
			floorMesh.rotation.x = -Math.PI / 2.0;
            done(floorMesh);
        });
    }
}

n3xt.StudioFloor = class extends n3xt.Element {
    get geometries() {
        return [new n3xt.StudioFloorGeometry()];
    }
}