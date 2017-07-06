// orc.js

const rp = require('request-promise');
const loadJsonFile = require('load-json-file');

export default(_opt) => {

    return new Promise(function(resolve, reject) {
        // content-type checking
        if (_opt["content-type"] !== "application/json" && _opt["content-type"] !== "application/octet-stream") {

            const err = new Error("Unsupport content type, the content type can be either application/json or application/octet-stream, multipart/form-data is not support now")

            reject(err);

        }





            let uri = "https://westus.api.cognitive.microsoft.com/vision/v1.0" + "/ocr"+"?language="+_opt.language;

            if (_opt["detect-orientation"]) {
              uri += "&detectOrientation=true";
            }

            let options = {
                "uri": uri,
                "method": "POST",
                "type": "POST",
                "headers": {
                    "Content-Type": "",
                    "Ocp-Apim-Subscription-Key": ""
                },
                "body": ""
            };

            options.headers["Ocp-Apim-Subscription-Key"] = _opt["Ocp-Apim-Subscription-Key"];

            switch (_opt["content-type"]) {
                case "application/json":
                    options.headers["Content-Type"] = 'application/json';
                    options.body = '{"url":"' + _opt.url + '"}';
                    break;
                case "application/octet-stream":
                    options.headers["Content-Type"] = 'application/octet-stream';
                    options.body = _opt.body;
                    break;

                    // multipart/form-data is not working dur the lack of document

                    // case "multipart/form-data":
                    //     options.headers["Content-Type"] = 'multipart/form-data';
                    //     options.body = _opt.form;
                    //     break;
            }

            rp(options).then(function(result) {

                resolve(JSON.parse(result));

            }).catch(function(err) {

                reject(err);

            }).done();

        });


};