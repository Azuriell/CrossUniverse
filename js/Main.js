var container, camera, scene, renderer, venator, galactica;
var windowRight = window.innerWidth*2;
var windowTop = window.innerHeight*2;
var windowBottom = window.innerHeight*-2;
var windowLeft = window.innerWidth*-2;

container = document.createElement('div');
document.body.appendChild(container);

// scene
scene = new THREE.Scene();

//camera
camera = new THREE.OrthographicCamera(windowLeft, windowRight, windowTop, windowBottom, 0.1, 6000);
camera.position.z = 100;
scene.add(camera);

// light
var DirectionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
DirectionalLight1.position.set(0,-300,0);
scene.add(DirectionalLight1);
var DirectionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
DirectionalLight2.position.set(0,300,0);
scene.add(DirectionalLight2);
// var AmbientLight = new THREE.AmbientLight(0xffffff, 2);
// AmbientLight.position.set(0,0,100);
// scene.add(AmbientLight);

renderer = new THREE.WebGLRenderer();
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