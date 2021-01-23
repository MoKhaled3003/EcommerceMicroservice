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
                message = `Insufficient Balance`
                status = 400
                break;
            case 2:
                message = `the ${resource} has been delivered`
                status = 400
                break;    
            case 3:
                message = `${resource} has been failed`
                status = 500
                break;        
        }
        
        super(message)
        this.status = status;
        this.name = 'BusinessError'
    }
}

module.exports = BusinessError;