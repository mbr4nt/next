n3xt.Material = class {
    constructor() {
        this.textureMapUrl = "textures/test/checkerboard.jpg";
        this.bumpMapUrl = "";
        this.roughness = 0.8;
        this.color = 0xffffff;
        this.metalness = 0.2;
        this.bumpScale = 0.0005;
        this.repeatX = 1;
        this.repeatY = 1;
    }

    threeMaterial(uvScale, done) {
        n3xt.textureMaterial(this, uvScale, done);
    }
}

n3xt.CheckerboardMaterial = class extends n3xt.Material {
    constructor(color=0xffffff) {
        super();
        this.color = color;
    }
}

n3xt.setMaterial = function(node, main, map) {
    if(node instanceof THREE.Mesh) {
        if(map && map[node.name]) {
            node.material = map[node.name];
        }
        //TODO: do this somewhere else
        node.castShadow = true;
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        n3xt.setMaterial(node.children[i], main, map);
      }
    }
}

n3xt.textureMaterial = function(definition, uvScale, done) {
    var material = new THREE.MeshStandardMaterial( {
        roughness: definition.roughness,
        color: definition.color,
        metalness: definition.metalness,
        bumpScale: definition.bumpScale
    });

    var textureLoader = new THREE.TextureLoader();
    textureLoader.load( definition.textureMapUrl, function( map ) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 4;
        map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
        material.map = map;
        material.needsUpdate = true;

        if(!definition.bumpMapUrl) done(material);
        else {
            textureLoader.load( definition.bumpMapUrl, function( map ) {
                map.wrapS = THREE.RepeatWrapping;
                map.wrapT = THREE.RepeatWrapping;
                map.anisotropy = 4;
                map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
                material.bumpMap = map;
                material.needsUpdate = true;

                if(!definition.roughnessMapUrl) done(material);
                else {
                    textureLoader.load( definition.roughnessMapUrl, function( map ) {
                        map.wrapS = THREE.RepeatWrapping;
                        map.wrapT = THREE.RepeatWrapping;
                        map.anisotropy = 4;
                        map.repeat.set( definition.repeatX / uvScale, definition.repeatY / uvScale );
                        material.roughnessMap = map;
                        material.needsUpdate = true;
                        $next.materials.hardwood = floorMat;
    
                        done(material);
                    });
                }
            });
        }

    });
}