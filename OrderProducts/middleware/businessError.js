const {INSUFFCIENT_BALANCE} = require("../errors/businessErrors")
class BusinessError extends Error{
    constructor(error) {
        super(error.errorMessage)
        this.code = error.apiErrorCode
        this.name = 'BusinessError'
    }
}

// module.exports = BusinessError;


// class ExtendableError extends Error {
//   constructor(message) {
//     super();
//     this.message = message;
//     this.stack = (new Error()).stack;
//     this.name = this.constructor.name;
//   }
// }    

// // now I can extend

// class MyError extends ExtendableError {
//   constructor(m) {   
//     super(m);
//   }
// }

var myerror = new BusinessError(INSUFFCIENT_BALANCE);
console.log(myerror.message);
/* console.log(myerror instanceof Error);
console.log(myerror.name);
console.log(myerror.stack); */