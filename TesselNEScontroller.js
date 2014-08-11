//vars
var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port

var pulsePin = gpio.pin['G1']; //Pulse  (red)
var latchPin = gpio.pin['G2']; //Latch  (orange)
var dataPin  = gpio.pin['G3']; //Data   (yellow)

var interval = 1500; //a bit slow so we can see whats going on using console.log.

//init
dataPin.input();

var button = {A:false, B:false, SELECT:false, START:false, UP:false, DOWN:false, LEFT:false, RIGHT:false}; 

//main
setInterval(function () {

	latchIt();

	//send out 8 pulses, after each pulse, when down, 'catch the data pin'
	pulseAndCatch();

},interval);


function latchIt() {

	latchPin.write(true);
	latchPin.write(false);

}

function pulseAndCatch() {
console.log('----------------------------')

	for (i = 0; i < 8; i++) { 
		pulsePin.write(false); //need a falsy first to catch the A button.

		//using a switch for readability... could just simply use the index of an array and put the pin read in it....
		//using ! , then it will show 'true' of 'false'

		switch(i) {
		    case 0:
		        button.A = !dataPin.read();
		        console.log("A read: ",!dataPin.read());
		        break;
		    case 1:
		        button.B = !dataPin.read();
		        console.log("B read: ",!dataPin.read());
		        break;
		    case 2:
		        button.SELECT = !dataPin.read();
		        console.log("SELECT read: ",!dataPin.read());
		        break;
		    case 3:
		        button.START = !dataPin.read();
		        console.log("START read: ",!dataPin.read());
		        break;
		    case 4:
		        button.UP = !dataPin.read();
		        console.log("Up read: ",!dataPin.read());
		        break;
		    case 5:
		        button.DOWN = !dataPin.read();
		        console.log("Down read: ",!dataPin.read());
		        break;
		    case 6:
		        button.LEFT = !dataPin.read();
		        console.log("Left read: ",!dataPin.read());
		        break;
		    case 7:
		        button.RIGHT = !dataPin.read();
		        console.log("Right read: ",!dataPin.read());
		        break;
		    default:
		        console.log('n/a');
		        break;
		}

		pulsePin.write(true); //up again for the next catch

	}
}