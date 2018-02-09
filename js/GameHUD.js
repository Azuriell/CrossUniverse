let life = {};
if (JSON.parse(localStorage.getItem("life")) != undefined) {
	life = JSON.parse(localStorage.getItem("life"));
}

function clearScore(){
	localStorage.clear();
}

$(".lifej1").html(life.player1);
$(".lifej2").html(life.player2);
