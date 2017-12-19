class Next {
    init(scene, camera, renderer) {
        this.materials = {};
        this.initMaterials(function() {
            $next.scene = scene;
        });

        this.raycaster = new THREE.Raycaster();

        document.addEventListener( 'mousedown', function(e) {
            
        }, false );
    }

    pick3D() {
        // Get mouse position
        var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Get 3D vector from 3D mouse position using 'unproject' function
        var vector = new THREE.Vector3(mouseX, mouseY, 1);
        vector.unproject(camera);

        // Set the raycaster position
        $next.raycaster.set( camera.position, vector.sub( camera.position ).normalize() );

        // Find all intersected objects
        var intersects = $next.raycaster.intersectObjects($next.children);

        return intersects;
    }

    get mode() {
        return "drawing";
    }

    initMaterials(done) {
        done();
       
    }

    textureMaterial(definition, uvScale, done) {
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

    animate() {
        var scene = this.scene;
        if(!scene) return;

        var mode = this.mode;
        $next.space.elements.forEach(function(element) {
            var geometries = element.geometries;
            geometries.forEach(function(geometry) {
                geometry.element = element;
                if(element.stale) {
                    geometry[mode](function(rootObject) {
                        scene.add(rootObject);
                        $next.children.push(rootObject);
                    });
                }
            });
            element.stale = false;
        });
    }

}

var $next = new Next();

$next.children = [];

$next.TextureMaterialDefinition = class {
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
}

$next.textureMaterials = {};

$next.textureMaterials.BrownWood = class extends $next.TextureMaterialDefinition {
    constructor() {
        super();
        this.textureMapUrl = "textures/test/map.jpg";
        this.bumpMapUrl = "textures/test/bump.jpg";
        this.roughness = "textures/test/roughness.jpg";        
        this.repeatX = 3;
        this.repeatY = 3;
        this.roughness = 0.01;
        this.bumpScale = 0.0001;
    }
}

$next.textureMaterials.HardwoodFloor = class extends $next.TextureMaterialDefinition {
    constructor() {
        super();
        this.textureMapUrl = "textures/hardwood/texture.jpg";
        this.bumpMapUrl = "textures/hardwood/bump.jpg";
        this.roughness = "textures/hardwood/roughness.jpg";
        this.repeatX = 1;
        this.repeatY = 1;
    }
}



$next.Point = class {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

$next.Vector = $next.Point;

$next.Orientation = class {
    constructor(direction=new $next.Vector(), normal=new $next.Vector()) {
    }
}

$next.Position = class {
    constructor(point=new $next.Point(), orientation=new $next.Orientation()) {

    }
}

$next.initParams = function(obj, $, contract) {
    var contractKeys = Object.keys(contract);
    var argumentKeys = Object.keys($ ? Object.keys($) : {});
    contractKeys.forEach(function(key) {
        obj[key] = contract[key];
        if(argumentKeys.indexOf(key) != -1) {
            if($ && $[key]) {
                obj[key] = $[key];
            }
        }
    });
}

$next.Prop = class {
    constructor($){
        $next.initParams(this, $, {
            key:"", 
            label:"", 
            domain:null, 
            on:true, 
            index:0
        });
    }
}

$next.Element = class {
    
    constructor(model){
        this.stale = true;
        this.model = model;
    }

    get name() { return "Generic Element"; }

    get geometries() {
        return null;
    }
}

$next.Geometry = class {
    constructor(model={}, position=new $next.Position()) {
        this.model = model;
        this.position = position;
    }

    /************** 3D modes ************ */
    drawing(done) {
        done(null);
    }

    realistic(done) {
        this.drawing(function(rootObject) {
            done(rootObject);
        });
    }
}


$next.Space = class {
    constructor() {
        this.elements = [];
    }    

    //override if oyu need something fancier
    addToScene(scene=$next.scene, mesh) {
        scene.add(mesh);
    }

    push(element) {
        this.elements.push(element);
    }
}



$next.elements = {};
$next.elements.Floor = class extends $next.Element {
    get name() { "Floor"; }
    get geometries() {
        return [
            new $next.geometries.FloorGeometry(this.model)
        ];
    }
}

$next.geometries = {};
$next.geometries.FloorGeometry = class extends $next.Geometry {
    drawing(done) {
        var floorGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
        var floorMesh = new THREE.Mesh( floorGeometry, new THREE.MeshPhongMaterial({color: 0x444444}));
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = -Math.PI / 2.0;
        done(floorMesh);
    }
}


$next.elements.TestCube = class extends $next.Element {
    get name() {
        return "Cube for testing material UV Scale";
    }

    get geometries() {
        return [
            new $next.geometries.TestCubeGeometry(this.model)
        ];
    }
}

$next.geometries.TestCubeGeometry = class extends $next.Geometry {
    drawing(done) {
        // var def = new $next.TextureMaterialDefinition();
        var def = new $next.textureMaterials.HardwoodFloor();
        $next.textureMaterial(def, 1, function(material) {
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var cube = new THREE.Mesh( geometry, material );
            cube.position.x = 3;
            cube.position.z = .5;
            done(cube);
        });
    }
}

$next.space = new $next.Space();


/*********#####################************************ */

$custom = {};

$custom.Arvere = class extends $next.Element {
    constructor(model={ green: true }) {
        super(model);
    }

    get name() {
        return "Arvere for testing";
    }

    get geometries() {
        return [
            new $custom.ArvereGeometry(this.model)
        ];
    }
}

$custom.ArvereGeometry = class extends $next.Geometry {
    drawing(done) {
        var def = new $next.textureMaterials.BrownWood();

        var layerMap = {
            grometBorder: " Extrusion [4678]",
            grometLid: " Extrusion [4821]",
            tvFrame: " Extrusion [5154]",
            tvScreen: " Extrusion [5555]",
            tableTop: " Joined Solid Geometry [3927]",
            tableTray: " Extrusion [4360]"
        };

        $next.textureMaterial(def, 3.5, function(material) {
            $next.import("3d/test-02-3ds.dae", function(meshes) {
                var overrides = {};
                overrides[layerMap.tableTop] = new THREE.MeshPhongMaterial({color: 0x777777});
                overrides[layerMap.tvFrame] = new THREE.MeshPhongMaterial({color: 0x050505});
                overrides[layerMap.tvScreen] = new THREE.MeshPhongMaterial({color: 0x000000});
                overrides[layerMap.grometBorder] = new THREE.MeshPhongMaterial({color: 0x404040});
                overrides[layerMap.grometLid] = new THREE.MeshPhongMaterial({color: 0x404040});
                $next.setMaterial(meshes, material, overrides);
                done(meshes);
            });
        });

    }
}

$next.setMaterial = function(node, material, map) {
    
    if(node instanceof THREE.Mesh) {
        node.material = material;
        if(map && map[node.name]) {
            node.material = map[node.name];
        }
        //TODO: do this somewhere else
        node.castShadow = true;
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        $next.setMaterial(node.children[i], material, map);
      }
    }
}

$next.import = function(fileUrl, callback) {
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
	} else {
        callback(null);
	}
}

$next.space.push(new $next.elements.Floor());
// $next.space.push(new $next.elements.TestCube());
$next.space.push(new $custom.Arvere());


