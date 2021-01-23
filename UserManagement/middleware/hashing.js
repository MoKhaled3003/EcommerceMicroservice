const bcrypt = require('bcryptjs');
module.exports.hash = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports.validatePass = async (loginPassword,savedPassword)=>{
    return await bcrypt.compare(loginPassword, savedPassword);
}