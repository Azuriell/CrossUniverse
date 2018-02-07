var game = {  
  venator: null,
  elements :{
    player :[]
  },
  score:0,
  gameOver:false,

  init(){
    //Création de l'instance du Joueur 1
    this.elements.player.push( new Player({x:0,y:100,z:0},100,{x:-1.3,y:0,z:3.13},{width:32,height:12,depth:10},1,"Venator(1).Obj") );
    //Création de l'instance du Joueur 2
    // this.elements.player.push( new Player({x:0,y:-100,z:0},100,{x:-1.3,y:0,z:3.13},{width:32,height:12,depth:10},1,"Venator(1).Obj") );

  },
  update(){
    // Gestion du score
    // Gestion des inputs
    // GameOver
  },
  render(){
    //update des players
  }
}