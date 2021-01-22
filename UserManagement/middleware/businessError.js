class BusinessError extends Error{
    constructor(category, resource) {
        let message;
        let status;
        switch (category){
            case 0:
                message = `${resource} not found`
                status = 404
                break;
            case 1:
                message = `Insufficient ${resource}`
                status = 400
                break;
        }
        
        super(message)
        this.status = status;
        this.name = 'BusinessError'
    }
}

module.exports = BusinessError;