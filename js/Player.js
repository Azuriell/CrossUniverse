class Player{
  constructor(pos, life_max, angle, size, speed, model, playerNumber, damage){
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
    this.playerNumber = playerNumber;
    this.damage   = damage;
    this.canShoot = true;
    this.coolDown = 0;

    /* Obj */
    this.model = model;
    this.obj   = null;

    /* init */
    this.init();

  }

  onLoad(object){
    venator = object;
    scene.add(venator);
    // galactica.position.set(400,0,0);
    // galactica.rotation.set(-1.3,1.56,2.88);
    // console.log(venator);

    venator.children[0].geometry.computeFaceNormals();

    // materials
    // const path = 'textures/';
    // const textureLoader = new THREE.TextureLoader();

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
    localStorage.setItem('playerObj',JSON.stringify(venator));
  }

  onProgress(xhr){
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  }

  onError(xhr){}

  // Movement
  moveLeft(){
    this.velocity.x+=this.speed/-1;
  }
  moveRight(){
    this.velocity.x+=this.speed/1;
  }
  moveUp(){
    this.velocity.y+=this.speed/1;
  }
  moveDown(){
    this.velocity.y+=this.speed/-1;
  }

  init(){
    this.objLoader = new THREE.OBJLoader();
    this.objLoader.setPath('model/');
    this.objLoader.load(this.model, this.onLoad, this.onProgress, this.onError);
    this.obj = JSON.parse(localStorage.getItem('playerObj'));
    // scene.add(this.venator);
  }

  update(){
    //boundaries
    // console.log(this.obj)
    if (this.pos.x+this.velocity.x>=windowLeft+this.size.height && this.pos.x+this.velocity.x<=windowRight-this.size.height) {
      this.pos.x+=this.velocity.x;
    };
    if (this.pos.y+this.velocity.y>=windowBottom+this.size.height*3 && this.pos.y+this.velocity.y<=windowTop-this.size.height) {
      this.pos.y+=this.velocity.y;
    }

    this.angle.y+=this.rotation.y;

    // Direction du "regard" du vaisseau
    if (this.velocity.x!=0) this.angle.z = Math.atan(this.velocity.y/this.velocity.x);
    if (this.velocity.x<0) this.angle.z += Math.PI;

    this.velocity.x=this.velocity.x/1.08;
    this.velocity.y=this.velocity.y/1.08;

    if(!this.canShoot){
      this.coolDown ++;
      if (this.coolDown >= 100){
        this.coolDown = 0;
        this.canShoot = true;
      }
    }
  }

  render(){
    if (scene.children[this.playerNumber+2]) {
      scene.children[this.playerNumber+2].position.set(this.pos.x,this.pos.y,this.pos.z);
      scene.children[this.playerNumber+2].rotation.set(this.angle.x,this.angle.y,this.angle.z); 
    }  
  }

  shoot(){
    if(this.canShoot){
      let pos = Object.assign({},this.pos);
      let angle = Object.assign({},this.angle);
      for (var i = 0; i < game.elements.bullet.length; i++) {
        if(!game.elements.bullet[i].isDisp){
          game.elements.bullet[i].spawn(pos, angle, this.damage, this.playerNumber);
          this.canShoot = false;
          break;
        }
      }
    }
  }
}