
const { constants }  = require('../config/constants');
const errorHandler = (error,req,res,next)=>{

    const statusCode = res.statusCode ? res.statusCode : 500;

    res.json({message:error.message,stackTrace:error.stack});
    switch(statusCode){
        case constants.VALIDATION_ERROR : 
        res.json({
            title : "Validation error !",
            message : error.message,
            stackTrace : error.stack
        });
        break;
        case constants.NOT_FOUND : 
        res.json({
        title : "Not found !",
        message : error.message,
        stackTrace : error.stack
        })
        break;

        case constants.UNAUTHORIZED : 
        res.json({
        title : "Unauthorized accessed !",
        message : error.message,
        stackTrace : error.stack
        })
        break;

        case constants.FORBIDDEN : 
        res.json({
        title : "Request forbidden !",
        message : error.message,
        stackTrace : error.stack
        })
        break;

        case constants.SERVER_ERROR : 
        res.json({
        title : " Internal server error !",
        message : error.message,
        stackTrace : error.stack
        })
        break;

        default : 
        console.log('No error all good !');
        break;
    }


}

module.exports = errorHandler;