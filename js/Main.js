var container, camera, scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

container = document.createElement('div');
document.body.appendChild(container);

//camera
camera = new THREE.OrthographicCamera(window.innerWidth / -2, windowHalfX, window.innerHeight / -2, windowHalfY, 1, 6000);
camera.position.set(0,0,100);

// scene
scene = new THREE.Scene();
scene.add(camera);

// light
var DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
DirectionalLight.position.set(0,0,100);
scene.add(DirectionalLight);

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

game.init();

function render(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  game.update();
  game.render();
}
render();