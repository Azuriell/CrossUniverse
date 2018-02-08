var container, camera, scene, renderer, venator, galactica;
var windowHalfRight = window.innerWidth / 1;
var windowHalfTop = window.innerHeight / 1;
var windowHalfBottom = window.innerWidth / -1;
var windowHalfLeft = window.innerHeight / -1;
// let venator = null;

container = document.createElement('div');
document.body.appendChild(container);

// scene
scene = new THREE.Scene();

//camera
camera = new THREE.OrthographicCamera(windowHalfLeft, windowHalfRight, windowHalfTop, windowHalfBottom, 1, 6000);
camera.position.z = 100;
scene.add(camera);

// light
var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
DirectionalLight.position.set(0,0,100);
scene.add(DirectionalLight);
var AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
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