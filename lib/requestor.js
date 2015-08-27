var request = require("request");


var Requestor = function() {}

Requestor.prototype.makeRequest = function (callback) {
	request.post({
	    uri: this.apiUrl,
	    method: 'POST',
	    body: JSON.stringify(this.validData)
	}, function (err, res, body) {
		if (body) {
			body = JSON.parse(body);

			if (body.IsError) {
				callback(body);
				return;
			}

			if (body.response && parseInt(body.response['m_Code']) < 0) {
				callback(body);
			} else {
				callback(null, body);
			}

			if (err) {
				callback(err);
			}
		}
	});
}

module.exports = new Requestor();
