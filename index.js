/**
 * Database constructor
 */
exports.data = function() {
	/** @namespace e.revision */
	const modules = require("./lib/module");
	let query = "";
	try{
		query = modules.rev("/proc/cpuinfo");
	}catch(err){
		throw new Error("Cannot parse device data. Data is corrupted")
	}
	const db = require("./lib/resources/database.json");
	const deviceProperties = query.find(e => e.revision !== undefined);
	let found = "";
	try{
		found = db[deviceProperties.revision];
	}catch(err){
		throw new Error("Cannot parse device data. Data is corrupted")
	}

	/**
	 * Get device properties
	 * @returns {object} object - Get parsed device data
	 */
	this.getDevice = function(){
		return query.find(e => e.revision !== undefined);
	};

	/**
	 * Get parsed data
	 * @returns {object} object - All parsed data
	 */
	this.getParsed = function(){
		return query;
	};

	/**
	 * Get device properties from database
	 * @returns {object} object - Database result
	 */	
	this.getResult = function(){
		return found === undefined ? null : found;
	};

	/**
	 * Get device result boolean
	 * @returns {boolean} - Boolean
	 */	
	this.found = function(){
		return found !== undefined;
	};
};