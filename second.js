// The contents of the tape.
var tape = [];
// The current position of the machine on the tape.
var pos = 0;
// The current state;
var state = b;

// Writes a symbol to the current cell on the tape.
function write(sym) {
	tape[pos] = sym;
}

// Returns true iff the symbol in the current cell is sym.
function read(sym) {
	return sym == tape[pos] ? true : false;
}

// Erases the symbol in the current cell of the tape.
function erase() {
	delete tape[pos];
}

// Returns true iff the current cell is blank.
function blank() {
	return typeof(tape[pos]) == 'undefined' ? true : false;
}

// State.
function b() {
	write('e');
	pos++;
	write('e');
	pos++;
	write('0');
	pos++;
	pos++;
	write('0');
	pos--;
	pos--;
	state = o;
}

// State.
function o() {
	if (read('1')) {
		pos++;
		write('x');
		pos--;
		pos--;
		pos--;
		state = o;
	}
	else if (read('0')) {
		state = q;
	}
}

// State.
function q() {
	if (read('0') || read('1')) {
		pos++;
		pos++
		state = q;
	}
	else if (blank()) {
		write('1');
		pos--;
		state = p;
	}
}

// State.
function p() {
	if (read('x')) {
		erase();
		pos++;
		state = q;
	}
	else if (read('e')) {
		pos++
		state = f;
	}
	else if (blank()) {
		pos--;
		pos--;
		state = p;
	}
}

// State.
function f() {
	if (read('0') || read('1')) {
		pos++;
		pos++;
		state = f;
	}
	else if (blank()) {
		write('0');
		pos--;
		pos--;
		state = o;
	}
}

// Returns a string representing the tape.
// Uses '_' for blank.
function tapestr() {
	conts = [];
	for (var i = 0; i < tape.length; i++)
		conts[i] = ((typeof(tape[i]) == 'undefined') ? '_' : tape[i]);
	conts = conts.slice(0, pos).concat([state.prototype.constructor.name]).concat(conts.slice(pos));
	return conts.join('');
}

for (var i = 0; i < 1000; i++) {
	state();
	console.log(tapestr());
}
