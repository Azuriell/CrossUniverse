class Player{
  constructor(pos, life_max, angle, speed, model){
    /* Position */
    this.pos    = pos;
    this.angle  = angle;

    /* Mouvements */
    this.rotation = {x:0, y:0, z:0};    
    this.velocity = {x:0, y:0, z:0};

    /* Caracteristiques */
    this.life       = life_max;
    this.life_max   = life_max;
    this.speed      = speed;
    this.hitbox     = this.size.height;

    /* Loader */
    this.model = model;
    this.objLoader = new THREE.OBJLoader();
    this.objLoader.setPath('model/');
    this.objLoader.load(model, function (object) {
      var venator = null;
      console.log(object);
      venator = object;
      scene.add(venator);
      // venator.rotateX(-1.3);
      // venator.rotateZ(3.13);

      venator.children[0].geometry.computeFaceNormals();

      // materials
      const path = 'textures/';
      const textureLoader = new THREE.TextureLoader();

      var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: .8,
        roughness: .5
      });

      venator.material = material;

      venator.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });
    }, this.onProgress, this.onError);

    /* init */
    this.init();
  }
  init(){
    // scene.add(this.);
  }

  onProgress(xhr){
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  onError(xhr){}
}