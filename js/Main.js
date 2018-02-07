var container, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
let venator = null;

init();
animate();

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  //camera
  camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / -2, window.innerHeight / 2, 1, 6000);
  camera.position.set(0,0,100);

  // scene
  scene = new THREE.Scene();
  scene.add(camera);

  // light
  var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  DirectionalLight.position.set(0,0,100);
  scene.add(DirectionalLight);

  // model
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function (xhr) { };

  // loader
  var objLoader = new THREE.OBJLoader();

  objLoader.setPath('model/');
  objLoader.load('Venator(1).Obj', function (object) {
    console.log(object);
    venator = object;
    scene.add(venator);
    venator.rotateX(-1.3);
    venator.rotateZ(3.13);

    venator.children[0].geometry.computeFaceNormals();

  // materials
    const path = 'textures/';
    const textureLoader = new THREE.TextureLoader();

    var material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: .8,
      roughness: .5
      // map: textureLoader.load(path + 'Mat_Couleur_0_COLOR.png'),
      // // specularMap: textureLoader.load(path + 'Mat_Couleur_0_SPEC.png'),
      // normalMap: textureLoader.load(path + 'Mat_Couleur_0_NRM.png'),
      // aoMap: textureLoader.load(path + 'Mat_Couleur_0_OCC.png')
    });

    venator.material = material;

    venator.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
  }, onProgress, onError);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}