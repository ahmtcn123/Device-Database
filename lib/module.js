const fs = require("fs");

/**
 * Get parsed data
 * @param {string} folder - Parse file
 * @returns {object} object - Parsed data
 */
exports.rev = function(folder){
	return parser(folder);
};

function parser(folder){
	let data = "";
	try{
		data = fs.readFileSync(folder,"utf8");
	}catch(err){
		throw new Error("Cannot parse device data. cpuinfo file not found")
	}

	const obj = (JSON.stringify(data) + "\\r").split("\\n");
	const array = [];
	let objAr = {};

	for(let i=0; i < obj.length; i++){
		function capitalizeFirstLetter(string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		const subData = obj[i].split(":")[1] === undefined ? "" : obj[i].split(":")[1].toString().includes("\\r") ? obj[i].split(":")[1].replace('\\r', "") : obj[i].split(":")[1];
		const subName = obj[i].split(":")[0].toString().includes('"') ? obj[i].split(":")[0].replace('"', "") : obj[i].split(":")[0];
		const subStr = subName.trim().toLowerCase().includes(" ") ? subName.trim().toLowerCase().split(" ")[0] + capitalizeFirstLetter(subName.trim().toLowerCase().split(" ")[1]) : subName.toLowerCase().trim();
		if(subName.toString().includes("\\r")) {
			array.push(objAr);
			objAr = {};
		} else {
			objAr[subStr] = subData.trim()
		}
	}
	return array;
}