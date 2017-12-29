n3xt.Geometry = class {
    constructor() {
        this.uvScale = 1;
    }

    instantiate(model, done) {
        done(null);
    }
}

n3xt.ExternalGeometry = class extends n3xt.Geometry {
    constructor() {
        super();
        this.url = "";
        this.mainMaterial = new n3xt.CheckerboardMaterial();
        this.materialMap = {
            layerName: new n3xt.CheckerboardMaterial()
        };
    }

    //use this to have different layer names here than what's in the the 3d file
    layerAlias(friendlyName) {
        return friendlyName;
    }

    instantiate(model, done) {
        console.log(model, "modis");
        var self = this;
        self.mainMaterial.threeMaterial(self.uvScale, function(threeMaterial){
            self.instantiateMaterialMap(function(threeMaterialMap) {
                self.import(self.url, function(meshes) {
                    n3xt.setMaterial(meshes, threeMaterial, threeMaterialMap);
                    done(meshes);
                });
            });
        });
    }

    instantiateMaterialMap(done) {
        var self = this;
        var keys = Object.keys(self.materialMap);
        var threeMaterialMap = { };
        async.map(keys, function(key, done) {
            var n3xtMaterial = self.materialMap[key];
            n3xtMaterial.threeMaterial(self.uvScale, function(threeMaterial) {
                done(null, {
                    key: key,
                    threeMaterial: threeMaterial,
                    n3xtMaterial: n3xtMaterial
                });
            });
        }, function(err, materialInfo) {
            materialInfo.forEach(function(info) {
                threeMaterialMap[info.key] = info.threeMaterial;
            });
            done(threeMaterialMap);
        });
    }

    import(fileUrl, callback) {
        if (fileUrl.indexOf(".obj") >= 0) {
            // instantiate a loader
            var loader = new THREE.OBJLoader();
    
            // load a resource
            loader.load(
                // resource URL
                fileUrl,
                // Function when resource is loaded
                callback
            );
        }
        else if(fileUrl.indexOf(".dae") >= 0) {
            var loader = new THREE.ColladaLoader();
            loader.load(fileUrl, function(result) {
                callback(result.scene);
            });
        } else if(fileUrl.indexOf(".fbx") >= 0) {
            var manager = new THREE.LoadingManager();
            var loader = new THREE.FBXLoader(manager);
            loader.load(fileUrl, function (geometry) {
                console.log("volto");
                var material = new THREE.MeshNormalMaterial()
                var mesh = new THREE.Mesh(geometry, material)
                callback(mesh);
            });
        } else if(fileUrl.indexOf(".dxf") >= 0) {
            var loader = new DXFLoader(THREE);
            loader.load(fileUrl, function (geometry) {
                callback(geometry);
            });
        } else {
            callback(null);
        }
    }
}

