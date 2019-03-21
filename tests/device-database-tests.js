const database = require("../index");
const data = new database.data();

// device exists
console.assert(data.found());

// get parsed data
console.assert(data.getParsed());

// get device data
console.assert(data.getDevice());

// get database data
console.assert(data.getResult());

