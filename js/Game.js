var game = {  
  elements :{
    player :[]
  },
  score:0,
  gameOver:false,

  init(){
    //Création de l'instance du Joueur 1
    this.elements.player.push( new Player({x:500,y:0,z:0},100,{x:-1.3,y:0,z:3.13},{width:32,height:12,depth:10},1,"Venator.obj",1) );
     //Création de l'instance du Joueur 2
    this.elements.player.push( new Player({x:-500,y:0,z:0},100,{x:-1.3,y:0,z:3.13},{width:32,height:12,depth:10},1,"Galactica.obj",2) );
  },
  update(){
    var player1 = this.elements.player[0];
    for (var prop in this.elements){
      /* update de chaque player */
      for (var i = this.elements[prop].length - 1; i >= 0; i--) {
        this.elements[prop][i].update(player1.pos);
      }
    }
    if (inputs.isDown(inputs.UP)) player1.moveUp();
    if (inputs.isDown(inputs.LEFT)) player1.moveLeft();
    if (inputs.isDown(inputs.DOWN)) player1.moveDown();
    if (inputs.isDown(inputs.RIGHT)) player1.moveRight();
    // Gestion du score
    // Gestion des inputs
    // GameOver
  },
  render(){
    for (var prop in this.elements){
      /* update de chaque player */
      for (var i = this.elements[prop].length - 1; i >= 0; i--) {
        this.elements[prop][i].render();
      }
    }
  }
}