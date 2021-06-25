const ApiError = require('../exeptions/api-errprs');

module.exports = function (error, req, res, next) {
    console.log(error);
    if(error instanceof ApiError) {
        return res.status(error.status)
            .json({message: error.message, errors: error.errors});
    }
    res.status(500).json({message: 'Unexpected: \n' + error.message})
}