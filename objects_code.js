// Various ways of creating and working with objects.
// Example game where there are people in cars, and those cars have to move because one is trying to get away.

// First iteration: Object Literals
var amy = {loc: 1}
amy.loc++;
var ben = {loc: 9}
ben.loc++;

// Second iteration: External function to modify object literals.
// Want to get the incrementation duplication taken care of.
// Create generalized code which can be used to handle the incrementation.
// Adding another object (function) which handles the behavior.
// Benifits:
//   Now logic doesn't need to be retyped.
//   Changes to the function affect all times it's used, easier to maintain.

var move = function(car) {
	car.loc++;
};

var amy = {loc: 1}
move(amy);
var ben = {loc: 9}
move(ben);

// Third iteration: Decorator pattern
// Remove the logic which adds the .loc property to each object
// The carlike function is a decorator.  It takes in an object, augments it and returns it.
// Is more general in that it can work with any object whether or not that has a .loc property.
// Common to use adjectives in decorator function names.

var carlike = function(obj, loc) {
	// Do stuff to obj and return
	obj.loc = loc;
	return obj;
};

var move = function(car) {
	car.loc++;
};

var amy = carlike({}, 1)
amy.move();
var ben = carlike({}, 9)
ben.move();

// Fourth iteration: Functional pattern
// Place the logic which adds properties to an object directly into a function which creates the object with those properties.
// Function builds the object which is augumented, decorator takes in existing object and augments it.
// Function renamed and refactored.

var Car = function(loc) {
	var obj = {loc: loc}
	obj.move = function() {
		obj.loc++;
	}
	return obj;
}

// Factor out methods
// Problem here is that methods have to be listed in two places and kept straight
var Car = function(loc) {
	var obj = {loc: loc}
	obj.move = move;
	return obj;
}

var move = function() {
	this.loc++;
}

// Place methods in an object and add all in one big batch
// Now only need to update method info in one place (the .methods object)
var Car = function(loc) {
	var obj = {loc: loc}
	extend(obj, Car.methods);
	return obj;
}

Car.methods = {
	move: function() {
		this.loc++;
	},
	on: function() {/*...*/},
	off: function() {/*...*/}
}


var amy = Car(1)
amy.move();
var ben = Car(9)
ben.move();

// Fifth iteration: Prototypal Classes
// Build objects so that they delegate to the constructors methods object instead of copying the methods.
// Above using an object literal so you can't change the prototype.  Use the Object.create function and explicitly set it to delegate to the methods.  Can dispense with the extend call.

var Car = function(loc) {
	obj Object.create(Car.methods);
	this.loc = loc;
	return obj;
}

Car.methods = {
	move: function() {
		this.loc++;
	},
	on: function() {/*...*/},
	off: function() {/*...*/}
}

// Refactor to use the built in .prototype object
var Car = function(loc) {
	obj Object.create(Car.prototype);
	this.loc = loc;
	return obj;
}

Car.prototype.move = function() {
	this.loc++;
}

var amy = Car(1)
amy.move();
var ben = Car(9)
ben.move();

console.log(car.prototype.constructor); // Car
console.log(amy.constructor);           // Car
console.log(amy instanceof Car);		// True


// Sixth iteration: Pseudoclassical
// Minor update, use the 'new' keyword to cut out some repetive code.

var Car = function(loc) {
	this.loc = loc;
}

Car.prototype.move = function() {
	this.loc++;
}

var amy = new Car(1);
amy.move();
var ben = new Car(9);
ben.move();

// Seventh iteration: Functional Superclasing and Subclassing.
// To start code is set back to an earlier functional version.
// Want to create a new version of Car that represents a cop.

var Car = function(loc) {
	var obj = {loc: loc}
	obj.move = function() {
		obj.loc++;
	}
	return obj;
}

var Van = function(loc) {
	var obj = Car(loc);
	obj.grab = function {/*...*/}
	return obj;
}

var Cop = function(loc) {
	var obj = Car(loc);
	obj.call = function {/*...*/}
	return obj;
}

var amy = Car(1);
amy.move();
var ben = Van(9)
ben.move();
var cal = Cop(1);
cal.move();


// Eighth iteration: Pseudoclassical subclassing.
// Returning to pseudoclassical version.

var Car = function(loc) {
	this.loc = loc;
}

Car.prototype.move = function() {
	this.loc++;
}

var Van = function(loc) {
	Car.call(this, loc);
}

Van.prototype = Object.create(Car.prototype);
Van.prototype.constructor = Van;
Van.prototype.grab = function() {/*...*/};

var amy = new Car(1);
amy.move();

var ben = new Van(9);
ben.move();
ben.grab();
