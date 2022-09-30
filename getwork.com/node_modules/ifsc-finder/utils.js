
const axios = require('axios');
var conf = require('./config');

// Make HTTP request to Razorpay to get IFSC details
exports.callRazorpay = function(code) {
    return axios.get(conf.base_url + code)
    .then(function (response) {
        switch (response) {
            case "Not Found":
                conf.response.status = 404;
                break;

            default:
                conf.response.status = 200;
                break;
        }
       conf.response.data = response.data;
       return conf.response;
    })
    .catch(function (error) {
        conf.response.status = error.response.status;
        conf.response.err = error.response.statusText;
        return conf.response;
    })
}

exports.trasnformDataId= function(id){
    return id.toUpperCase();
}
