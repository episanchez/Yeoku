var Aspect = require('../lib/aspect/aspect');
var ComponentType = require('../lib/component/componentType');
var Component = require('../lib/component/component');
var util = require('util');

var IteratingSystem = require('../lib/system/iteratingSystem');
var IntervalIteratingSystem = require('../lib/system/intervalIteratingSystem');
var exp = module.exports;

/**
 * Components without ComponentManager (it is not compatible with ComponentManager)
 */

// bad Component
exp.BasicComp = function(){
	Component.call(new ComponentType(0, 'BasicComp', this));
	this.life = 0;
	this.mana = 0;

	function setMana(mana){
		this.mana = mana;
	};

	function getMana(){
		return this.mana;
	};

	function setLife(life){
		this.life = life;
	};

	function getLife(){
		return this.life;
	};
};

util.inherits(exp.BasicComp, Component);

// Good Component
var ExtendComp = exp.ExtendComp = function(){
	Component.call(new ComponentType(1,'ExtendComp', this));
	this.strength = 0;
	this.magic = 0;
};

ExtendComp.prototype.setStrength = function(strength){
	this.strength = strength;
};

ExtendComp.prototype.setMagic = function(magic){
	this.magic = magic;
};

ExtendComp.prototype.getStrength = function(){
	return this.strength;
};

ExtendComp.prototype.getMagic = function(){
	return this.magic;
};

util.inherits(ExtendComp, Component);


/**
 * Systems Example
 */

var BasicSystem = exp.BasicSystem = function(){
	IteratingSystem.call(this);

	this._name = "BasicSystem";
};

util.inherits(BasicSystem, IteratingSystem);

BasicSystem.prototype.initialize = function(){
	this.buildAspectWithComponentsTypeName(["BasicComp"], [], ["ExtendComp"]);
	IteratingSystem.prototype.initialize.call(this);
};

BasicSystem.prototype.processEntity = function(entity){

};

var ExtendSystem = exp.ExtendSystem = function(){
	IntervalIteratingSystem.call(this, 100);

	this._name = "ExtendSystem";
};

util.inherits(ExtendSystem, IntervalIteratingSystem);

ExtendSystem.prototype.initialize = function(){
	this.buildAspectWithComponentsTypeName(["ExtendComp"], [], ["BasicComp"]);

	IntervalIteratingSystem.prototype.initialize.call(this);
};
ExtendSystem.prototype.processEntity = function(entity){

};