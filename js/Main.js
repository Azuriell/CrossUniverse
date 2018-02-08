var container, camera, scene, renderer, venator, galactica;
var windowRight = window.innerWidth*2;
var windowTop = window.innerHeight*2;
var windowBottom = window.innerHeight*-2;
var windowLeft = window.innerWidth*-2;
// let venator = null;

container = document.createElement('div');
document.body.appendChild(container);

// scene
scene = new THREE.Scene();

//camera
camera = new THREE.OrthographicCamera(windowLeft, windowRight, windowTop, windowBottom, 0.1, 6000);
// camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 6000 );
camera.position.z = 100;
scene.add(camera);

// light
var DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
DirectionalLight.position.set(0,100,0);
scene.add(DirectionalLight);
var AmbientLight = new THREE.AmbientLight(0xffffff, 2);
AmbientLight.position.set(0,0,100);
scene.add(AmbientLight);

renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
game.init();

function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  game.update();
  game.render();
}
render();