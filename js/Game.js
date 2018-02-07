var game = {  
  venator: null,
  elements :{
    player :[]
  },

  init(){
    this.elements.player.push( new Player({x:0,y:100,z:0},100,{x:-1.3,y:0,z:3.13},{width:32,height:12,depth:10},1,"Venator(1).Obj") )
  },
  update(){},
  render(){}
}