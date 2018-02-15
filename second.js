// The contents of the tape.
var tape = [];
// The current position of the machine on the tape.
var pos = 0;
// The current state.
var state = b;

// The blank symbol.
var blank = undefined;

// Write symbol sym to the current cell on the tape.
function write(sym) {
	tape[pos] = sym;
}

// Read the symbol under the machine head.
function read() {
	return tape[pos];
}

// Move the machine head right.
function right() {
	pos++;
}

// Move the machine head left.
function left() {
	pos--;
}

// State b.
function b() {
	write('e');
	right();
	write('e');
	right();
	write('0');
	right();
	right();
	write('0');
	left();
	left();
	state = o;
}

// State o.
function o() {
  switch (read()) {
	  case '1':
		  right();
	  	write('x');
		  left();
		  left();
		  left();
		  state = o;
      break;
    case '0':
		  state = q;
      break;
	}
}

// State q.
function q() {
	switch (read()) {
    case '0':
    case '1':
		  right();
		  right();
		  state = q;
	    break;
    case blank:
      write('1');
		  left();
		  state = p;
	    break;
  }
}

// State p.
function p() {
	switch (read()) {
    case 'x':
		  write(blank);
		  right();
		  state = q;
	    break;
    case 'e':
		  right();
		  state = f;
	    break;
    case blank:
      left();
		  left();
		  state = p;
      break;
	}
}

// State f.
function f() {
	switch (read()) {
    case blank:
		  write('0');
		  left();
		  left();
		  state = o;
	    break;
    default:
      right();
		  right();
		  state = f;
      break;
	}
}

// Returns a string representing the tape and state, using '_' for blank.
function tapestr() {
	var conts = [];
	for (var i = 0; i < Math.max(tape.length + 1, pos + 1); i++)
		conts[i] = ((tape[i] == undefined) ? '_' : tape[i]);
	conts = conts.join('');
	conts = conts.slice(0, pos) + state.prototype.constructor.name + conts.slice(pos);
	return conts;
}

// Print the initial tape string.
console.log(tapestr());
// Run the machine through a number of state table lookups.
for (var i = 0; i < 30; i++) {
	// Apply the transition function for the current state and symbol.
	state();
	// Print the tape string.
	console.log(tapestr());
}
