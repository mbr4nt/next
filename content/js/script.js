/**
 *
 * WebGL With Three.js - Lesson 10 - Drag and Drop Objects
 * http://www.script-tutorials.com/webgl-with-three-js-lesson-10/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Script Tutorials
 * http://www.script-tutorials.com/
 */

sbVertexShader = [
"varying vec3 vWorldPosition;",
"void main() {",
"  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
"  vWorldPosition = worldPosition.xyz;",
"  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
"}",
].join("\n");

sbFragmentShader = [
"uniform vec3 topColor;",
"uniform vec3 bottomColor;",
"uniform float offset;",
"uniform float exponent;",
"varying vec3 vWorldPosition;",
"void main() {",
"  float h = normalize( vWorldPosition + offset ).y;",
"  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( h, exponent ), 0.0 ) ), 1.0 );",
"}",
].join("\n");

var lesson10 = {
  scene: null, camera: null, renderer: null,
  container: null, controls: null,
  clock: null, stats: null,
  plane: null, selection: null, offset: new THREE.Vector3(), objects: [],
  raycaster: new THREE.Raycaster(),

  init: function() {

    // Create main scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xcce0ff, 0.0003);

    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;

    // Prepare perspective camera
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1000;
    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new THREE.Vector3(0,0,-1));

    // Prepare webgl renderer
    this.renderer = new THREE.WebGLRenderer({ antialias:true });
    this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.renderer.setClearColor(this.scene.fog.color);

    // Prepare container
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
    this.container.appendChild(this.renderer.domElement);

    // Events
    THREEx.WindowResize(this.renderer, this.camera);
    // document.addEventListener('mousedown', this.onDocumentMouseDown, false);
    // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    // document.addEventListener('mouseup', this.onDocumentMouseUp, false);

    // Prepare Orbit controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target = new THREE.Vector3(0, 0, 0);
    this.controls.maxDistance = 150;

    // Prepare clock
    this.clock = new THREE.Clock();

    // Prepare stats
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '50px';
    this.stats.domElement.style.bottom = '50px';
    this.stats.domElement.style.zIndex = 1;
    this.container.appendChild( this.stats.domElement );

    // Add lights
    this.scene.add( new THREE.AmbientLight(0x444444));

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(200, 200, 1000).normalize();
    this.camera.add(dirLight);
    this.camera.add(dirLight.target);

    // Display skybox
    this.addSkybox();

    // Plane, that helps to determinate an intersection position
    this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500, 8, 8), new THREE.MeshBasicMaterial({color: 0xffffff}));
    // this.plane.visible = false;
    this.scene.add(this.plane);

    // Add 100 random objects (spheres)
    var object, material, radius;
    var objGeometry = new THREE.SphereGeometry(1, 24, 24);
    for (var i = 0; i < 50; i++) {
      // material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff});
      // material.transparent = true;
      // object = new THREE.Mesh(objGeometry.clone(), material);
      // this.objects.push(object);

      // radius = Math.random() * 4 + 2;
      // object.scale.x = radius;
      // object.scale.y = radius;
      // object.scale.z = radius;

      // object.position.x = Math.random() * 50 - 25;
      // object.position.y = Math.random() * 50 - 25;
      // object.position.z = Math.random() * 50 - 25;

      // this.scene.add(object);
    }

  },
  addSkybox: function() {
    var iSBrsize = 500;
    var uniforms = {
      topColor: {type: "c", value: new THREE.Color(0x0077ff)}, bottomColor: {type: "c", value: new THREE.Color(0xffffff)},
      offset: {type: "f", value: iSBrsize}, exponent: {type: "f", value: 1.5}
    }

    var skyGeo = new THREE.SphereGeometry(iSBrsize, 32, 32);
    skyMat = new THREE.ShaderMaterial({vertexShader: sbVertexShader, fragmentShader: sbFragmentShader, uniforms: uniforms, side: THREE.DoubleSide, fog: false});
    skyMesh = new THREE.Mesh(skyGeo, skyMat);
    this.scene.add(skyMesh);
  },
  onDocumentMouseDown: function (event) {
    // Get mouse position
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Get 3D vector from 3D mouse position using 'unproject' function
    var vector = new THREE.Vector3(mouseX, mouseY, 1);
    vector.unproject(lesson10.camera);

    // Set the raycaster position
    lesson10.raycaster.set( lesson10.camera.position, vector.sub( lesson10.camera.position ).normalize() );

    // Find all intersected objects
    var intersects = lesson10.raycaster.intersectObjects(lesson10.objects);

    if (intersects.length > 0) {
      // Disable the controls
      lesson10.controls.enabled = false;

      // Set the selection - first intersected object
      lesson10.selection = intersects[0].object;

      // Calculate the offset
      var intersects = lesson10.raycaster.intersectObject(lesson10.plane);
      lesson10.offset.copy(intersects[0].point).sub(lesson10.plane.position);
    }
  },
  onDocumentMouseMove: function (event) {
    // event.preventDefault();

    // Get mouse position
    var mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    var mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Get 3D vector from 3D mouse position using 'unproject' function
    var vector = new THREE.Vector3(mouseX, mouseY, 1);
    vector.unproject(lesson10.camera);

    // Set the raycaster position
    lesson10.raycaster.set( lesson10.camera.position, vector.sub( lesson10.camera.position ).normalize() );

    if (lesson10.selection) {
      // Check the position where the plane is intersected
      var intersects = lesson10.raycaster.intersectObject(lesson10.plane);
      // var intersects = lesson10.raycaster.intersectObject(referencePlane());
      // Reposition the object based on the intersection point with the plane
      lesson10.selection.position.copy(intersects[0].point.sub(lesson10.offset));
    } else {
      // Update position of the plane if need
      var intersects = lesson10.raycaster.intersectObjects(lesson10.objects);
      if (intersects.length > 0) {
        // lesson10.plane.position.copy(intersects[0].object.position);
        // lesson10.plane.lookAt(lesson10.camera.position);
      }
    }
  },
  onDocumentMouseUp: function (event) {
    // Enable the controls
    lesson10.controls.enabled = true;
    lesson10.selection = null;
  }
};

function referencePlane() {
  return new THREE.PlaneGeometry(1000,1000, 0, 0);
}

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
  if($next) {
    var ball = $next.space.objects[0];
    if(ball) {
      // if(ball.model.radius < 50) {
      //   ball.model.radius ++;
      //   ball.stale = true;
      // }
    }
    $next.refresh();
  }
}

// Update controls and stats
function update() {
  var delta = lesson10.clock.getDelta();

  lesson10.controls.update(delta);
  lesson10.stats.update();
}

// Render the scene
function render() {
  if (lesson10.renderer) {
    lesson10.renderer.render(lesson10.scene, lesson10.camera);
  }
}

// Initialize lesson on page load
function initializeLesson() {
  lesson10.init();
  animate();
  testBalls();
}

if (window.addEventListener)
  window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
  window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;


/*******************my stuff***************** */
var $next = {};

//functions
$next.functions = {};

//this makes an array of a type
$next.functions.array = function(ofType) {
  //for now just return empty array
  return [];
};

$next.functions.new = function(typeName, defaults) {
  
  if(!defaults) defaults = {};
  
  var instance = jQuery.extend($next.contracts[typeName](), defaults);
  return instance;
}

$next.functions.updateObject = function(obj) {
  //TODO: inject
  if(!lesson10) return;
  var prim = obj.get3D();
  if(obj.stale || obj.model.stale) {
    lesson10.scene.remove(prim);
    obj.prims = null;
    var prim = obj.get3D();
    obj.stale = false;
    obj.model.stale = false;
  }
  lesson10.objects.push(prim);
  lesson10.scene.add(prim);
}

function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

$next.functions.refresh = function() {
  // lesson10.objects.splice(0,lesson10.objects.length);
  lesson10.objects = [];
  $next.space.objects.forEach(function(obj) {
    // lesson10.objects.push(obj);
    $next.functions.updateObject(obj);
  });
};

/***********shortcuts ******** */
$n = $next;

$next.array = $next.functions.array;
$next.new = $next.functions.new;
$next.refresh = $next.functions.refresh;

/**************contracts********** */

//I'll keep one example of each in here
$next.contracts = {};

//point 
$next.contracts.point = function() {
  return {
    x:0, y:0, z:0
  };
};

//vector
$next.contracts.vector = function() {
  return $next.contracts.point();
};

//orientation
$next.contracts.orientation = function() {
  return {
    direction: $next.contracts.vector(),
    normal: $next.contracts.vector()
  };
};

//position
$next.contracts.position = function() {
  return {
    origin: $next.contracts.point(),
    orientation: $next.contracts.orientation()
  };
};

//box
$next.contracts.box = function() { 
  return {
    position: $next.contracts.position(),
    width:0,
    depth:0,
    height:0
  };
};

//sphere
$next.contracts.sphere = function() { return {
  position: $next.new("position"),
  radius: 0,
  coco: "oi",
  domains: {
    radius: function() { return [10,20,30]; },
    coco: function() { return ["oi", "tio"]; }
  }
}; };

//space
$next.contracts.space = function() { return {
  objects: $next.array("object"),
  push: function(item) {
    this.objects.push(item);
  }
}; };
$next.space = $next.contracts.space();

//prim
$next.contracts.prim = function() { return {
  create: function() { /*create the instance of the 3d obj*/ },
  prepare: function(instance) { /*set properties here*/ },
  finalize: function(instance) { /*not sure what for yet*/ }
}; };

//object
$next.contracts.object = function(model) { return {
  model: model, /* data model */
  position: $next.new("position"),
  parent: null, 
  prims: null,
  build3D: function() {
    //build your 3d here
  },
  get3D: function() {
    if(!this.prims) {
      this.prims = this.build3D();
    }
    return this.prims;
  },
  localBound: $next.new("box"),
  stale: false /* set to true when in need of a refresh */
}; };

/**************** objects ************ */
$next.objects = {};

$next.objects.ball = function(model) { 
  console.log(model);
  var obj = $next.contracts.object(model);
  obj.build3D = function() {
    var material = new THREE.MeshPhongMaterial({color: 0xff00ff});
    material.transparent = true;
    var objGeometry = new THREE.SphereGeometry(1, 24, 24);
    var prim = new THREE.Mesh(objGeometry.clone(), material);

    radius = model.radius;
    prim.scale.x = radius;
    prim.scale.y = radius;
    prim.scale.z = radius;

    prim.position.x = model.position.origin.x;
    prim.position.y = model.position.origin.y;
    prim.position.z = model.position.origin.z;

    return prim;

  };
  return obj;
 };

 /****************prop box*************** */
 $next.ui = {};

 $next.ui.propBox = function(model) {
    
    var gui = new dat.GUI();
    var propKeys = Object.keys(model);
    var domains = model["domains"];
    if(!domains) return null;

    propKeys.forEach(function (propKey) {
      if(propKey == "domains") return;

      var domainFunction = domains[propKey];
      if(!domainFunction) return;

      //TODO: pretty name
      console.log(model, model[propKey]);
      gui.add(model, propKey, domainFunction()).name(propKey).onChange(function() {
        console.log(model);
        model.stale = true;
      });
    });

    return gui;
 };







/************* gambiarra test code ************* */
function testBalls() {
  var ballModel = $next.new("sphere");
  ballModel.radius = 10;
  var myBall = $next.objects.ball(ballModel);
  
  $next.space.push(myBall);
  $next.refresh();

  var props = $next.ui.propBox(ballModel);
  props.open();
}
