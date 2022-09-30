var utils = require('./main');

module.exports = {
    // Returns all details for specified IFSC code
    get: (code,dataId) => {
        return utils.returnData(code, dataId);
    },

    // Returns Bank Name for specified IFSC code
    getBankName: (code) => {
        return utils.returnData(code, 'BANK');
    },

    // Returns Branch Name for specified IFSC code
    getBranchName: (code) => {
        return utils.returnData(code, 'BRANCH');
    },

    // Returns Bank Code for specified IFSC code
    getBankCode: (code) => {
        return utils.returnData(code, 'BANKCODE');
    },

    // Returns bank's MICR Code for specified IFSC code
    getMicr: (code) => {
        return utils.returnData(code, 'MICR');
    },

    // Returns District for specified IFSC code
    getDistrict: (code) => {
        return utils.returnData(code, 'DISTRICT');
    },

    // Returns City for specified IFSC code
    getCity: (code) => {
        return utils.returnData(code, 'CITY');
    },

    // Returns State for specified IFSC code
    getState: (code) => {
        return utils.returnData(code, 'STATE');
    },

    // Returns Contact Number for specified IFSC code
    getContact: (code) => {
        return utils.returnData(code, 'CONTACT');
    },

    // Returns bank's Address for specified IFSC code
    getAddress: (code) => {
        return utils.returnData(code, 'ADDRESS');
    },

    // Returns true if bank supports UPI for specified IFSC code
    isUpi: (code) => {
        return utils.returnData(code, 'UPI');
    },

    // Returns true if bank supports IMPS for specified IFSC code
    isImps: (code) => {
        return utils.returnData(code, 'IMPS');
    },

    // Returns true if bank supports NEFT for specified IFSC code
    isNeft: (code) => {
        return utils.returnData(code, 'NEFT');
    },

    // Returns true if bank supports RTGS for specified IFSC code
    isRtgs: (code) => {
        return utils.returnData(code, 'RTGS');
    },

}