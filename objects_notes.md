* Course information
  * Udacity: https://classroom.udacity.com/courses/ud015
  * Taught by Marcus Phillips from Hack Reactor.
* Scopes
  * Lexical Scope
    * Describes the regions where you can refer to a variable by name without getting access errors.
    * It only concerns areas of code where different variables will have meaning.
    * In programs with no functions all variables are stored in global scope.
	* Variables at the root are in the global scope.
	* Can reference a variable from anywhere in that lexical scope.
	* A new lexical scope is created every time you create a new function deffinition.
	* You can access variables from outside an inner scope as well as variables created within it.  Can't access something from the inner scope from the outer scope.
	* JS can set values to undeclared variables, this kind of assignment puts it in the global scope.
	* Not all curly braces affect scoping, only functional braces create a scope.
  * Execution contexts (in memory scopes)
  	* In memory structures, where the action is.
  	* Holds variables and data.
  	* Work as nested data structures with variables available as they are created and needed.
  	* Interpreter runs into and out of contexts as needed as the program runs.  Each execution context acts like it's own little issolated program.  This is why one execution context is not equal to another that has been created by the same function.
  	* As programs run it builds internal data stores which keep track of the data variables available to different function objects.  This causes the interpreter to build many contexts as needed
  	* New EC is made for each run of a function.
  	* As the interpreter runs it builds up a new key-value mapping inside the EC in order to keep track of the value bound to the variable.
  	* When the interpreter hit's a function it ignores it until it's needed to run and just adds it to memory.
  	* In memory scopes and in memory objects are keept separate by the interpreter.
  	* Access to execution contexts is very limited.  You can't access them directly, iterate over them, store them or most anything else you can do with normal objects.
  * Execution contexts vs Lexial Scopes
    * EC are built up as the program runs, not as it's typed.
    * For each lexical scope there may be many in memory scopes, or there may be none.  It all depends on function execution.

* Closures
  * Each function has access to all variables from all functions (outer scopes) that surround it.
  * A closure is any function that that somehow remains available after those outer scopes have returned.
  * Allow you to store a reference to a specific function invocation, keep it around for use after it's outer scopes have returned.
  * Simple way to do this is to have one function which, when called, returns another function.  That inner function will have access to all variables in it's scope.
  * Can set a function to equal a variable or store it in an array.  That way the function and its context can be used even outside it's defining scope.  When it's invoked, it's invoked with that context.


* The 'this' Keyword
  * 'this' is an identifier that gets a value bound to it, much like a variable.
  * The variable isn't defined explicitly, it's bound to the correct object automatically.
  * Rules for determing the value of 'this' are designed to support intuition about which object should be focal when invoking a method or constructor.
  * What it's not bound to:
    * The function object in memory it appears in.
    * An instance of that function (sometimes, not always.)
    * An object in memory that contains the function object.  (What if the function is a property of two different objects?  It would have to choose which it belongs to.)
    * An object created by the literal 'this' appears within.
    * A scope created by the function when it is invoked.  Perhaps 'this' refers to that execution context but JavaScript doesn't give direct access to execution contexts.
  * What it is bound to: 
    * When a function is called as a property of an object, the 'this' keyword refers to that specific object.
    * Just look left of the dot. (simplified rule)
    * Because of this it doesn't tie the function to any specific object, that function could be stored on multiple objects.
    * Everything is determined at calltime
  * Input parameters only have bindings when the function is actually run.
  * 'this' behaves like a positional parameter in most ways.
  * Using 'this' as a parameter of a method invocation.
  * If there is no object that the function is bound to, it's bound by default to the global object and it's scope.  This is similar to how there is a default for missing positional parameters (undefined.)
  * If a function isn't stored as a parameter of an object, can it be used as a method of a particular object?  There isn't any key to refer to but it can be done.
    * .call
    * All functions have a .call method.
    * .call takes an additional, first parameter which is the object for 'this'
    * fn.call(targetObject, paramA, paramB);
    * If .call is used on a function that is already bound to an object (obj.fn.call(secondObj, a,b);) then the target of .call overrides and takes presidence.
  * Using 'this' when a function is passed as a callback.
    * when a function is passed with no values as params, they are set to 'undefined/'
    * 'this' binding, what matters is if the function was bound to anything.  If there is no object it defaults to the global object, just like any other unbound function.
    * When passing a callback as a property of a method, the value of 'this' isn't in the function definition or where the function is looked up on the object.  What matters is where the function is invoked.  Only the calltime state matters.  If the callback is invoked as a free function in the function using it, it will still be bound to global.
    * Takeaway: assume that the callback will be bound as a global function unless you're damn sure it's not that way in the function using it.
    * Loosing parameter bindings can lead to problems, there is little control over the bindings as they are designed to be controlled in the context of the function using the callback.
    * To get around this, pass a different function with no params, within the custom code put the custom code, along with the function bound to the desired object.  This way you can control the bindings:
      setTimeout(function() {
      				fn.method();
      			}, 1000);
  * 'this' in the local scope.
    * Might expect it to be undefined like any other undefined variable.
    * Has been historically defined as bound to the global object.  This is changed in more recent specs.
  * 'new' keyword changes the binding.  When it's used the 'this' value will be bound to an entirely new object created at runtime.

* Prototype Chains
  * Mechanism for making objects which resemble other objects.  Allows one object to use the properties of another object by delegating the failed lookups on the first to the second.
  * Propery lookup
  	* Interpreter first looks at the object in question and looks for the property, if it finds it it uses it.
  	* If interpreter looks for a property on an object that the object doesn't have the object returns 'undefined.'
    * If the program needs an object that looks like another object you can make a new one, then copy over all the properties.
      * Copy is one time thing, the objects aren't kept in sync.
      * Simple, won't be repeated.
    * Alernative way of making another object.
      * Make a new object and give it a link to the previous one so that changes to one affect the other.
      * If the property can't be found on the new object, the interpreter looks to the origional one as a fallback.
      * New object doesn't make a direct copy of the properties, it just points to the previous one for those values.
      * Dynamic, ongoing, changes to the old affect the new.
      * var newObj = Object.create(oldObj);
      * Can add custom properties to the new object that the old one doesn't have.
      * Properties present on neither object are still 'undefined.'
  * End of the chain.
    * All objects in JS eventually delegate to the Object.prototype.  It has the basic properties of all objects.
    * All object callthroughs pass through to the Object.prototype.
    * Functions stored higher up on the chain are used in the context of the initial object however.  So the 'this' value refers to that object, even if the property is stored several steps up.
  * .constructor
    * Property of the Object.prototype.
    * Points to a different object, .constructor != .prototype
    * When you ask an object for .constructor it runs up the chain, and returns the .constructor function.  Querying the .constrctor will tell you what kind of Object you're using and where it delegates.
  * Some objects don't delegate directly to Object.
    * Array objects delegate to Array.prototype which delegates to Object.prototype.

Object Decorator Pattern
  * Aid with code reuse, the practice of writing generalized software that can be reused.
  * Basic idea: Take an object, pass it through a function which returns the object with any additional properties added.
  * Generally used to add functionality to an object that already has some.
  * Common to use adjectives in decorator function names.
  * Can add anything, including new methods.
  * Works with 'this.'  When a method is added using a decorator function this. will refer to the object which is decorated.
  * Placing a function definition into the decorator function.
    * Simplifies, more readable.
    * This causes a new function object to be created every time the decorator is used.  This can have memory consequences.
    * Why is this?  When new objects are created by a maker function, they may look and do the same things, but they aren't the same and operate independently.  If a maker function returns a new function object, they will be different as well.  The same thing is occuring when a function is added to an object as part of a decorator.
    * Memory is an issue but there is an advantage.  When the function is created by the decorator function, that function has access to a unique closure scope created by the decorator.  Because of this, the 'this.' variable isn't even needed.  You can instead refer to the object itself, and the function will be bound to that object and stay there.  If 'this' is used it needs to be bound to a new value of 'this' every time the method is invoked.

Functional Classes (Functional Class Pattern)
  * A 'class' is just the notion of a category of things that you'd like to build and all the code that supports it.
  * Diference between classes and decorators.
    * When already creating a function to make objects, simply tell the function to make the objects with the properties you want.
  * Conventional to name with capital letter.
  * Function that makes the objects is called a constructor.
  * Object that is returned is an instance.
  * Creating the function to create instances of the class is called the "Functional Class Pattern."
  * Same problem as decorator, functions added to objects within the constructor create new instances of those functions everytime a new object is created.
    * If you move the function outside the constructor you have to have it work on 'this' since it no longer has closure scope.
    * Keeping the method functions outside of the constructor requires duplication.  Need to list the function once when it's created, then again when it's added as a property.
    * Can store all methods in an object and iterate over them, adding them all at once.
    * Best to store the methods object as a property of the constructor.  Keeps them tied together and keeps the methods object out of the global scope.
    * Functions are just specialized objects which can store properties.  Invoking a function just makes the lines within execute.  It doesn't interact with it's properties.

Prototypal Classes
  * Basically the same as using the functional pattern, but relying on the prototype chain (objects delegating failed lookups to ther objects.)
  * Functions, being objects, all have a built in prototype object.
  * For starters, can build objects so that they delegate to the constructors methods object instead of copying the methods.
    * To do this need to use Object.create to point to the object to delegate to.
  * There is an official method to support this pattern.  Whenever a function is created it automatically comes with a .prototype object.  
    * To add methods to it simply add them to Obj.prototype as properties of that object.
    * Then, in the constructor function have the Object created delegate to that prototype object.
    * .prototype has no special rules, it's just an ordinary object.
    * Except!!!! .prototype objects all come with a built in .constructor property.  This property points back to the the function that .prototype is part of.  This serves to identify the constructor.
  * Eronious assumptions
    * The constructor function doesn't delegate to prototype, but the objects it makes do.  The constructor delegates to Function.
    * Instantiated objects only delegate to prototype because it's called in Object.create.
  * A different constructor function could use another functions prototype to delegate it's objects to.
  * Prototype thus has an ambiguous double meaning.
    * Constructor functions have the prototype property.
    * Instance objects can delegate to a prototype property.
  * instanceof operator
    * Checks to see if the right operands .prototype object can be found in the left operands prototype chain.
    * Not much use if using the functional pattern.
  * With this pattern there is no real way to mix methods into the function body itself.  For this to work the functions have to be defined on the prototype object.

Pseudoclassical Patterns
  * Attempts to mimic classical systems by adding some syntatic sugar.
  * When making classes the Object.create, delegation to prototype and return of the object can get repeatitive.
  * new keyword
    * When placed in front of a function invocation the function runs in constructor mode.
    * The interpreter inserts the .create, delegation and return lines.
    * Steps
      * Create an object that delegates to .prototype.
      * Assigns that object to 'this'
      * Runs any other assignments to the value.
      * Return the created object.
  * Object relationships are the same as the prototypal pattern.  JS engines do tend to apply performance optimizations when using pseudoclassical pattern.
  * Styles of writing classes
    * Class definitions tend to be in two parts.
    * Parts of the objects which are similar - protoype.
    * Parts of the objects which are unique  - function body.
    * In the functional pattern everything generally appears in the function body.

Functional Superclassing and Subclassing
  * Creating instance groups which are similar, but not identical to other instance groups.
  * Bad ideas
    * Could just use .call to inject methods at runtime but then any function can have those methods.
    * Could also just copy all code into a new constructor and modify it slightly.
  * Create one 'superclass' constructor that does the common work, and create 'subclass' functions which do the more specific work.
  * To implement
    * Create a superclass and subclass.  Put the actual object creation in the superclass.
    * In the subclass, have it first create a new superclass object.
    * Add properties to that object.
    * Return the object.
  * Both super and subclasses can instantiate new objects.

Pseudoclassical subclassing
  * Create classes in the normal fashion.
  * Incorrect metods of subclassing
    * Repeat code from superclass constructor in subclass constructor.
    * Want to run superclass function in subclass function to create a new object to modify.
      * Simply call 'new superclass' function in the subclass.  But doing this will create a new superclass and subclass object at the same time, thus filling memory.  The 'this' variables will point to the new superclass instance (or subclass instance) but not both.
      * Try running 'new superclass' and assigning it to the 'this' value but JavaScript doesn't let you do that to this, and you still end up with two objects.
      * Call superclass function without 'new.'  All that does is invoke the superclass function in the global scope and the resultant object is bound to the global scope, not the subclass.  All properties of that object are now global.
  * Really just need to run the superclass constructor in the correct context.
  * .call method will run the superclass in any context desired.
    * Superclass.call(this, superclassVars);
    * 'this' refers to the new instance, thus the superclass function runs in the same context as the subclass.
    * Can be confusing because 'this' appears in two places, but they are refering to different contexts.
    * Problem:  properties on the superclass prototype are still unavailable because the subclass objects don't delegate to the superclass prototype.  Without redirection all function objects delegate to Object.prototype.  Currently the diferention code in the subclass call to the diferention code in the superclass but the prototype code (the similar stuff) isn't yet connected.
  * Have to make subclass prototype delegate to superclass prototype.
    * Can't update the subclass prototype directly to the superclass prototype. (Subclass.__proto__ = Superclass.prototype)  Not allowed in JavaScript.
    * Have to override the subclasses native prototype object with a new object.  Can do this because the instance delegation is only setup when the constructor runs.  The reassignment occurs first.
    * Subclass.prototype = Superclass.prototype won't work because JavaScript won't actually copy the properties, instead it will just have both variables point to the same prototype object.  Modifying either modifies both.
    * To do this use Object.create
    * Subclass.prototype = Object.create(Superclass.prototype);
    * Using object.create will create a new object which delegates to the superclass prototype object.  This way failed lookups will fall through to the superclass prototype.
    * Warning!  Don't use Object.create with the superclass, use it with the superclasses prototype.
    * There was a time when it was common to set Subclass.prototype equal to a call of the superclass.
      * This would create unnecessary extra objects.
      * Also no good way to pass arguments so all are run with undefined.  Trying to call methods which rely on information passed in as constructor arguments throws errors.
      * There is a lot of documentation that uses this pattern, be careful.
  * Adding methods to the subclass prototype.
    * Nothing special, just add them.
    * But remember, the origional prototype object wasn't empty, it had the .constructor property.  Need to readd that.
    * Otherwise calls to .constructor will fall through, delegate to the superclass prototype .constructor and return the wrong object type.
    * Need to add the .constructor property and set it equal to the subclass constructor function (without calling it.)



