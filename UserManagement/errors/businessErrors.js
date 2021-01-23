module.exports = {
    NOTFOUND: async function NOTFOUND(resource) {
        return {
            apiErrorCode: '404',
            errorMessage: `${resource} not found`
        }
    },
    INSUFFCIENT_BALANCE: {
        apiErrorCode: '400',
        errorMessage: `Insufficient Balance`
    },
    ORDER_DELIVERED: {
        apiErrorCode: '400',
        errorMessage: `order has been delivered`
    },
    TRANSACTION_FAILED: {
        apiErrorCode: '500',
        errorMessage: `the transaction has been failed`
    },
    USER_REGISTERED: {
        apiErrorCode: '400',
        errorMessage: "user is already registered"
    },
    INVALID_CREDENTIALS: {
        apiErrorCode: '400',
        errorMessage: "email or password is incorrect"
    }
}