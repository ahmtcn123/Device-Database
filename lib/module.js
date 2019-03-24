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

var {
	readFileSync
} = require("fs");
/**
 * Construct parser
 * @param {string} fldr - Parse file
 */
exports.rev = function (fldr) {
	/**
	 * Parser v1
	 * @returns {object} object - Parsed data
	 */
	this.parserV1 = function () {
		var data = "";
		try {
			data = readFileSync(fldr, "utf8");
		} catch (err) {
			var er = new Error("Cannot parse device data. cpuinfo file not found");
			er.code = "nocpuinfo";
			throw er;
		};

		var obj = ((JSON.stringify(data) + "\\r").split("\\n"));
		obj.push("\\r");
		var array = [];
		var objAr = {};
		for (i = 0; i < obj.length; i++) {
			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
			var subData = obj[i].split(":")[1] == undefined ? "" : obj[i].split(":")[1].toString().includes("\\r") ? obj[i].split(":")[1].replace('\\r', "") : obj[i].split(":")[1];
			var subName = obj[i].split(":")[0].toString().includes('"') ? obj[i].split(":")[0].replace('"', "") : obj[i].split(":")[0];
			var subStr = subName.trim().toLowerCase().includes(" ") ? subName.trim().toLowerCase().split(" ")[0] + capitalizeFirstLetter(subName.trim().toLowerCase().split(" ")[1]) : subName.toLowerCase().trim();
			if (subStr.toString().includes("\\r")) {
				array.push(objAr);
				objAr = {};
			} else {
				objAr[subStr.replace("\\t", "").replace("\\t", "")] = subData.trim()
			};
		}
		return array;
	}
	/**
	 * Parser v2
	 * @returns {object} object - Parsed data
	 */
	this.parserV2 = function () {
		var data = "";
		try {
			data = readFileSync(fldr, "utf8");
		} catch (err) {
			var er = new Error("Cannot parse device data. cpuinfo file not found");
			er.code = "nocpuinfo";
			throw er;
		};

		var obj = ((JSON.stringify(data) + "\\r").split("\\n"));
		obj.push("\\r");
		var obj = ((JSON.stringify(data) + "\\r").split("\\n"));
		newDt = {};
		var details = {
			processorLength: 0
		};
		for (i = 0; i < obj.length; i++) {
			function capitalizeFirstLetter(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
			var subData = obj[i].split(":")[1] == undefined ? "" : obj[i].split(":")[1].toString().includes("\\r") ? obj[i].split(":")[1].replace('\\r', "") : obj[i].split(":")[1];
			var subName = obj[i].split(":")[0].toString().includes('"') ? obj[i].split(":")[0].replace('"', "") : obj[i].split(":")[0];
			var subStr = subName.trim().toLowerCase().includes(" ") ? subName.trim().toLowerCase().split(" ")[0] + capitalizeFirstLetter(subName.trim().toLowerCase().split(" ")[1]) : subName.toLowerCase().trim();
			var ob = subStr.replace("\\t", "").replace("\\t", "")
			if (ob == "processor") {
				details.processorLength++
				var cur = details.processorLength;
				newDt["cpu" + cur] = {};
			} else if (ob == "\\r") {} else if (ob == "hardware" || ob == "revision" || ob == "serial") {
				newDt["device"] == undefined ? newDt["device"] = {} : "";
				newDt["device"][ob] = subData.trim().includes('"') ? subData.trim().replace('"',""): subData.trim();
				newDt["device"]["cpuLength"] = details.processorLength;
			} else {
				newDt["cpu" + details.processorLength][ob] = subData.trim();
			}
		}
		return newDt;
	}
};