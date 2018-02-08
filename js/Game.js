var game = {  
  elements :{
    player :[]
  },
  score:0,
  gameOver:false,

  init(){
    //Création de l'instance du Joueur 2
    this.elements.player.push( new Player({x:-2000,y:0,z:0},100,{x:0,y:0,z:0},{width:32,height:12,depth:10},1,"Galactica.obj",2) );
    //Création de l'instance du Joueur 1
    this.elements.player.push( new Player({x:2000,y:0,z:0},100,{x:0,y:0,z:3.13},{width:0,height:100,depth:0},1,"Venator.obj",1) );
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