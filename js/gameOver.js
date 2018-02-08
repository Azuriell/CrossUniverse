let score = {};
if (JSON.parse(localStorage.getItem("score")) != undefined) {
	score = JSON.parse(localStorage.getItem("score"));
}
score.player1 = score.player1/2;
score.player2 = score.player2/2;

function clearScore(){
	localStorage.clear();
}

$(".scoreJ1").html(score.player1)
$(".scoreJ2").html(score.player2)

