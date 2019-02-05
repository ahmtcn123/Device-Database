/** 
 * Database constructor
*/
exports.data = function() {
	var query = "";
	try {
		query = require("./lib/module").rev("/proc/cpuinfo");
	} catch(err) {
		var er = new Error("Cannot parse device data. Data is corrupted")
		throw er
	}
	var db    =  require("./lib/src/database.json");
	var devicePropeties = query.find(e => e.revision !== undefined)
	var found = "";
	try {
		found = db[devicePropeties.revision];
	} catch(err) {
		var er = new Error("Cannot parse device data. Data is corrupted")
		throw er
	}		
	/**
	 * Get device properties
	 * @returns {object} object - Get parsed device data
	 */
	this.getDevice = function() {
		return query.find(e => e.revision !== undefined);
	}

	/**
	 * Get parsed data
	 * @returns {object} object - All parsed data
	 */
	this.getParsed = function() {
		return query;
	}

	/**
	 * Get device properties from database
	 * @returns {object} object - Database result
	 */	
	this.getResult = function() {
		return found == undefined ? null : found;
	}

	/**
	 * Get device result boolean
	 * @returns {boolean} - Boolean
	 */	
	this.found = function() {
		return found == undefined ? false : true;
	}
}