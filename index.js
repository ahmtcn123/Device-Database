// Copyright 2019, Project Ann: Ahmetcan Aksu
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** 
 * Database constructor
 */
exports.data = function () {
	var query = "";
	try {
		query = require("./lib/module").rev("/proc/cpuinfo");
	} catch (err) {
		var er = new Error("Cannot parse device data. Data is corrupted");
		er.code = "brokenData";
		throw er;
	};
	var db = require("./res/database.json");
	var devicePropeties = query.find(e => e.revision !== undefined);
	var found = "";
	try {
		found = db[devicePropeties.revision] == undefined ? db[devicePropeties.serial.slice(0,8)] :db[devicePropeties.revision];
	} catch (err) {
		var er = new Error("Cannot parse device data. Data is corrupted");
		er.code = "brokenData";
		throw er;
	};
	/**
	 * Get device properties
	 * @returns {object} object - Get parsed device data
	 */
	this.getDevice = function () {
		return query.find(e => e.revision !== undefined);
	};

	/**
	 * Get parsed data
	 * @returns {object} object - All parsed data
	 */
	this.getParsed = function () {
		return query;
	};

	/**
	 * Get device properties from database
	 * @returns {object} object - Database result
	 */
	this.getResult = function () {
		return found;
	};

	/**
	 * Get device result boolean
	 * @returns {boolean} - Boolean
	 */
	this.found = function () {
		return found !== undefined;
	};
};