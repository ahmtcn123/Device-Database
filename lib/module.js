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

var {readFileSync} = require("fs");
/**
 * Get parsed data
 * @param {string} fldr - Parse file
 * @returns {object} object - Parsed data
 */
exports.rev = function (fldr) {
	return parser(fldr);
};
function parser(fldr) {
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
};