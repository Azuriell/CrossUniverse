class Player{
  constructor(pos, life_max, angle, size, speed, model){
    /* Position */
    this.pos    = pos;
    this.angle  = angle;
    this.size   = size;

    /* Mouvements */
    this.rotation = {x:0, y:0, z:0};    
    this.velocity = {x:0, y:0, z:0};

    /* Caracteristiques */
    this.life       = life_max;
    this.life_max   = life_max;
    this.speed      = speed;
    this.hitbox     = this.size.height;

    /* Loader */
    this.venator = null;
    this.model = model;

    this.objLoader = new THREE.OBJLoader();
    this.objLoader.setPath('model/');
    this.objLoader.load(this.model, function (object){ 
      // scene.add(this.object);
      this.venator = object;
      this.venator.rotateX(-1.3);
      this.venator.rotateZ(3.13);

      this.venator.children[0].geometry.computeFaceNormals();

      // materials
      const path = 'textures/';
      const textureLoader = new THREE.TextureLoader();

      var material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: .8,
        roughness: .5
      });

      this.venator.material = material;

      this.venator.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });  
    }, this.onProgress, this.onError);

    /* init */
    this.init();
  }
  init(){
    scene.add(this.venator);
    // this.objLoader.position.set(this.pos.x,this.pos.y,this.pos.z);
    // this.objLoader.rotation.set(this.angle.x,this.angle.y,this.angle.z);
  }

  update(){
    //boundaries
    if (this.pos.x+this.velocity.x>=leftBound+this.size.height && this.pos.x+this.velocity.x<=rightBound-this.size.height) {
      this.pos.x+=this.velocity.x;
    };
    if (this.pos.y+this.velocity.y>=bottomBound+this.size.height*3 && this.pos.y+this.velocity.y<=topBound-this.size.height) {
      this.pos.y+=this.velocity.y;
    }

    this.angle.x+=this.rotation.x;
    this.angle.y+=this.rotation.y;

    // Direction du "regard" du vaisseau
    if (this.velocity.x!=0) this.angle.z = Math.atan(this.velocity.y/this.velocity.x);
    if (this.velocity.x<0) this.angle.z += Math.PI;

    this.velocity.x=this.velocity.x/1.08;
    this.velocity.y=this.velocity.y/1.08;
  }

  render(){
    this.object.position.set(this.pos.x,this.pos.y,this.pos.z);

    this.object.rotation.set(this.angle.x,this.angle.y,this.angle.z);   
  }

  onProgress(xhr){
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  onError(xhr){}
}