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

// Return true iff the symbol in the current cell is sym.
function read(sym) {
	return sym == tape[pos] ? true : false;
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
	if (read('1')) {
		right();
		write('x');
		left();
		left();
		left();
		state = o;
	}
	else if (read('0')) {
		state = q;
	}
}

// State q.
function q() {
	if (read('0') || read('1')) {
		right();
		right();
		state = q;
	}
	else if (read(blank)) {
		write('1');
		left();
		state = p;
	}
}

// State p.
function p() {
	if (read('x')) {
		write(blank);
		right();
		state = q;
	}
	else if (read('e')) {
		right();
		state = f;
	}
	else if (read(blank)) {
		left();
		left();
		state = p;
	}
}

// State f.
function f() {
	if (read(blank)) {
		write('0');
		left();
		left();
		state = o;
	}
	else {
		right();
		right();
		state = f;
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
for (var i = 0; i < 300; i++) {
	// Apply the transition function for the current state and symbol.
	state();
	// Print the tape string.
	console.log(tapestr());
}
