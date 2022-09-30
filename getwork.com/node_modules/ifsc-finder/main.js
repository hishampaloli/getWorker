var utils = require('./utils');

function getDataList(response, id) {
    dataResult = {};
    SKIPPED = [];
    id.forEach(id => {
        data_id = utils.trasnformDataId(id);
        if (response.data.hasOwnProperty(data_id)) {
            dataResult[data_id] = response.data[data_id];
        } else {
            SKIPPED.push(data_id);
        }
    });
    if (SKIPPED.length !== 0) {
        dataResult.SKIPPED = SKIPPED;
    }
    return dataResult;
}

function processId(response, id) {
    id_type = typeof (id);

    switch (id_type) {
        case 'string':
            data_id = utils.trasnformDataId(id);
            return response.data.hasOwnProperty(data_id) ? response.data[data_id] : 'Not Found';
            break;

        case 'object':
            try {
                return getDataList(response, id);
            } catch (err) {
                console.log(err);
                return 'Error'
            }
            break;

        default:
            return 'Type Error';
            break;
    }
}

// Find requested data from IFSC details
exports.returnData = function (code, id) {
    /**
     * code : IFSC code
     * id : Key of data requested e.g BRANCH, STATE,etc
     */
    return utils.callRazorpay(code).then((response) => {
        try {
            switch (response.status) {
                case 404:
                    return "Not Found!";
                    break;

                case 200:
                    if (id == null)
                        return response.data;
                    else
                        return processId(response, id);
                    break;
                default:
                    return 'Error';
            }
        } catch (err) {
            return null;
        }
    })
}
