const bcrypt = require('bcrypt');
module.exports.hash = (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.validatePass = (loginPassword,savedPassword)=>{
    return await bcrypt.compare(loginPassword, savedPassword);
}