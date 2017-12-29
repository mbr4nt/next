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
        this.layers = null;
        this.loaded = function(geo, threeObj) { };
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
        var self = this;
        self.mainMaterial.threeMaterial(self.uvScale, function(threeMaterial){
            self.import(self.url, function(meshes) {
                if(self.layers == null) {
                    self.layers = {};
                    meshes.traverse(function(obj){
                        if(obj instanceof THREE.Mesh) {
                            var layerInfo = {
                                name: obj.name,
                                alias: obj.name,
                                on: true
                            };
                            self.layers[layerInfo.name] = layerInfo;
                        }
                    });
                }

                self.materialMap = {};
                var layerKeys = Object.keys(self.layers);
                layerKeys.forEach(function(layerKey) {
                    var layer = self.layers[layerKey];
                    if(layer && layer.on) {
                        self.materialMap[layer.name] = new n3xt.CheckerboardMaterial(self.aliasToColor(layer.alias));
                    }
                });

                self.instantiateMaterialMap(function(threeMaterialMap) {
                    n3xt.setMaterial(meshes, threeMaterial, threeMaterialMap);
                    if(self.loaded) self.loaded(self, meshes);
                    done(meshes);
                });
            });
        });
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return parseInt(color, 16);
    }

    hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
           hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    } 
    
    aliasToColor(alias){
        var i = this.hashCode(alias);
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
    
        return parseInt("00000".substring(0, 6 - c.length) + c, 16);
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

