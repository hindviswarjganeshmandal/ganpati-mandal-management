const bcrypt = require("bcrypt");

(async()=>{

const password = await bcrypt.hash("123456",10);

console.log(password);

})();