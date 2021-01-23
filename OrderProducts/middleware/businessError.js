class BusinessError extends Error{
    constructor(error) {
        super(error.errorMessage)
        this.code = error.apiErrorCode
        this.name = 'BusinessError'
    }
}

 module.exports = BusinessError