var fs = require("fs");
	/**
	 * Get parsed data
	 * @param {string} fldr - Parse file
	 * @returns {object} object - Parsed data
	 */
exports.rev = function(fldr) {
return parser(fldr);
}

function parser(fldr) {
var data = ""
try {
	data = fs.readFileSync(fldr,"utf8");
} catch(err) {
	var er = new Error("Cannot parse device data. cpuinfo file not found")
	throw er
}

var obj = (JSON.stringify(data)+ "\\r").split("\\n") 
var array = [];
var objAr = {};
for(i=0; i < obj.length;i++) {
function capitalizeFirstLetter(string) { return string.charAt(0).toUpperCase() + string.slice(1);};
var subData = obj[i].split(":")[1] == undefined ? "": obj[i].split(":")[1].toString().includes("\\r") ? obj[i].split(":")[1].replace('\\r',"") : obj[i].split(":")[1];
var subName = obj[i].split(":")[0].toString().includes('"') ? obj[i].split(":")[0].replace('"',"") : obj[i].split(":")[0];
var subStr  = subName.trim().toLowerCase().includes(" ") ? subName.trim().toLowerCase().split(" ")[0] + capitalizeFirstLetter(subName.trim().toLowerCase().split(" ")[1]) : subName.toLowerCase().trim();
	if(subName.toString().includes("\\r")) {
		array.push(objAr);
		objAr = {};
	} else {
		objAr[subStr] = subData.trim()
	}
}
return array;
}