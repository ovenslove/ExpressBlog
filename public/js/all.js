var cav=document.querySelector('#myCanvas');
var ctx=cav.getContext('2d');
var stepNumber=200;
var startNumber=-50;
var rangeNumber_x=80;
var rangeNumber_y=20;
var startNumber1=-0;
var rangeNumber_x1=120;
var rangeNumber_y1=30;
var startNumber2=-30;
var rangeNumber_x2=70;
var rangeNumber_y2=30;
dorwWord();


setInterval(function () {
	stepNumber>120?stepNumber--:stepNumber;
	startNumber>-4*rangeNumber_x?startNumber--:startNumber=0;
	startNumber1>-4*rangeNumber_x1?startNumber1--:startNumber1=0;
	startNumber2>-4*rangeNumber_x2?startNumber2--:startNumber2=0;
	ctx.clearRect(0,0,350,250);
	drowLine(stepNumber,startNumber,rangeNumber_x,rangeNumber_y);
	drowLine(stepNumber,startNumber1,rangeNumber_x1,rangeNumber_y1);
	drowLine(stepNumber,startNumber2,rangeNumber_x2,rangeNumber_y2);
	dorwWord();
},16);

function drowLine(step,start,range_x,range_y) {
	ctx.fillStyle="rgba(154,170,233,0.4)";
	ctx.strokeStyle="rgba(35,72,212,0.6)";
	ctx.Alpha=.4;
	ctx.beginPath();
	ctx.moveTo(start,step);
	for(var count=0; count<4;count++){
		ctx.bezierCurveTo(start+(1.5+ count*4)*range_x,step-range_y,start+(2.5+ count*4)*range_x,step+range_y,start+(4+ count*4)*range_x,step);
	}
	ctx.lineTo(start+16*range_x,500);
	ctx.lineTo(0,500);
	ctx.stroke();
	ctx.closePath();
	ctx.fill();

}

function dorwWord() {
	ctx.fillStyle="#333";
	ctx.strokeStyle="#ddd";
	ctx.beginPath();
	ctx.moveTo(50,0);
	ctx.lineTo(125,100);
	ctx.lineTo(200,0);
	ctx.lineTo(100,0);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(50,250);
	ctx.lineTo(50,100);
	ctx.lineTo(125,200);
	ctx.lineTo(200,100);
	ctx.lineTo(200,250);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(250,50);
	ctx.lineTo(250,100);
	ctx.lineTo(350,100);
	ctx.lineTo(350,50);
	ctx.lineTo(250,50);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(250,150);
	ctx.lineTo(250,200);
	ctx.lineTo(350,200);
	ctx.lineTo(350,150);
	ctx.lineTo(250,150);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(0,250);
	ctx.lineTo(50,250);
	ctx.lineTo(50,100);
	ctx.lineTo(125,200);
	ctx.lineTo(200,100);
	ctx.lineTo(200,250);
	ctx.lineTo(350,250);
	ctx.lineTo(350,200);
	ctx.lineTo(250,200);
	ctx.lineTo(250,150);
	ctx.lineTo(350,150);
	ctx.lineTo(350,100);
	ctx.lineTo(250,100);
	ctx.lineTo(250,50);
	ctx.lineTo(350,50);
	ctx.lineTo(350,0);
	ctx.lineTo(200,0);
	ctx.lineTo(125,100);
	ctx.lineTo(50,0);
	ctx.lineTo( 0,0);
	ctx.stroke();

}
function say(word) {
	// body...
	console.log('我说了'+word);
}
say('你是谁');
