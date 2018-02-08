class Bullet{
	constructor(){
		this.isDisp = false;
		this.id		= game.elements.bullet.length -1;
		this.damage = 0;
		this.team 	= 0;
		this.target = null;
		this.hitbox = 4;
		/* Position */
		this.pos		= {x:10, y:5};
		this.angle      = {x:0, y:0, z:0};
		this.size		= {x:30, y:15, z:2};
		this.dist 		= {x:0, y:0};

		/* Mouvements */
		this.velocity = {x:0, y:0};

		/* Caracteristiques */
		this.speed      = 8;
		this.hit 		= true;
	}


	init(){

		this.geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
		if (this.team==1){ // Team Player
			this.material = new THREE.MeshBasicMaterial( {color: 0x3322FF} );
		}else{	// Team Enemy
			this.material = new THREE.MeshBasicMaterial( {color: 0xFF2233} );
		}
		this.obj = new THREE.Mesh( this.geometry, this.material );
		this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
		this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);
		scene.add( this.obj );
	}

	update(){
		this.pos.x -= this.velocity.x*this.speed;
		this.pos.y -= this.velocity.y*this.speed;

		this.outOfScreen();
	}

	render(){
		if(this.isDisp){
			this.obj.position.set(this.pos.x, this.pos.y, this.pos.z);
			this.obj.rotation.set(this.angle.x, this.angle.y, this.angle.z);	
		}
	}

	outOfScreen(){
		if (this.pos.x<windowLeft*1.2) 	this.kill();
		if (this.pos.x>windowRight*1.2) this.kill();
		if (this.pos.y>windowTop*1.2) 	this.kill();
		if (this.pos.y<windowBottom*1.2) this.kill();
	}

	collide(element){
		if(element.team != this.team){
			element.life -= this.damage; 
			this.kill();
		}
	}

	kill(){
		this.isDisp = false;
	    scene.remove( this.obj );
	}

	spawn(pos, angle, damage, team){
		/* Initialisation de la Bullet */
		this.damage = damage;
		this.team 	= team;
		/* Position */
		this.pos	= pos;
		this.angle  = angle;

		if (this.team==1){
			this.velocity = {x:Math.cos(this.angle.z), y:Math.sin(this.angle.z)};
			this.speed = -25;
		}else{
			this.velocity = {x:Math.cos(this.angle.z), y:Math.sin(this.angle.z)};
			this.speed = -25;
		}
		this.init();
		this.isDisp= true;
		this.hit = true;
	}
}