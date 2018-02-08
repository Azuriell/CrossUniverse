var game = {  
  elements :{
    player :[],
    bullet: []
  },
  score:{
    player1:0,
    player2:0
  },
  gameOver:false,

  init(){
    //Création de l'instance du Joueur 2
    this.elements.player.push( new Player({x:-1000,y:0,z:0},50,{x:0,y:0,z:0},{width:0,height:150,depth:0},0.35,"Galactica.obj",2,10));
    //Création de l'instance du Joueur 1
    this.elements.player.push( new Player({x:1000,y:0,z:0},60,{x:0,y:0,z:3.13},{width:0,height:250,depth:0},0.25,"Venator.obj",1,20));
    //Pool de projectilles
    for (let i = 0; i < 200; i++) {
      this.elements.bullet.push( new Bullet() );
    }
  },
  update(){
    // Contrôle Player1
    var player1 = this.elements.player[0];
    for (var prop in this.elements){
      for (var i = this.elements[prop].length - 1; i >= 0; i--) {
        this.elements[prop][i].update(player1.pos);
      }
    }
    if (inputs.isDown(inputs.Z)) player1.moveUp();
    if (inputs.isDown(inputs.Q)) player1.moveLeft();
    if (inputs.isDown(inputs.S)) player1.moveDown();
    if (inputs.isDown(inputs.D)) player1.moveRight();

    if(inputs.isDown(inputs.SHOOT1)) player1.shoot();

    // Contrôle Player2
    var player2 = this.elements.player[1];
    for (var prop in this.elements){
      for (var i = this.elements[prop].length - 1; i >= 0; i--) {
        this.elements[prop][i].update(player2.pos);
      }
    }
    if (inputs.isDown(inputs.UP)) player2.moveUp();
    if (inputs.isDown(inputs.LEFT)) player2.moveLeft();
    if (inputs.isDown(inputs.DOWN)) player2.moveDown();
    if (inputs.isDown(inputs.RIGHT)) player2.moveRight();

    if(inputs.isDown(inputs.SHOOT2)) player2.shoot();

    //vérifie la défaite
    if (this.endGame) {
      if (JSON.parse(localStorage.getItem("score")) != undefined) {
        let score = JSON.parse(localStorage.getItem("score"))
        this.score.player1 += score.player1;
        this.score.player2 += score.player2;
        console.log(this.score);
      }
      localStorage.setItem("score",JSON.stringify(this.score));
      window.location.replace("./GameOver.html");
    }
    this.collide();
  },
  render(){
    for (var prop in this.elements){
      /* update de chaque player */
      for (var i = this.elements[prop].length - 1; i >= 0; i--) {
        this.elements[prop][i].render();
      }
    }
  },
  collide(){
    for (let i = 0; i < this.elements.bullet.length; i++) {
      let bullet = this.elements.bullet[i];
      let target;
      if(bullet.isDisp){
        let circle1 = {radius: bullet.hitbox, 
                       x: bullet.pos.x, 
                       y: bullet.pos.y
        };
        if (bullet.team == 1) {
          target = this.elements.player[0];
        }else if(bullet.team == 2){
          target = this.elements.player[1];
        }
        let circle2 = {radius: target.hitbox, 
                       x: target.pos.x, 
                       y: target.pos.y
        };

        let dx = circle1.x - circle2.x;
        let dy = circle1.y - circle2.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < circle1.radius + circle2.radius && bullet.hitbox) {
          bullet.hit=false;
          bullet.collide(target);
        }
      }
    }
  }
}