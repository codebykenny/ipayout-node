const request = require("request");

const Requester = {
	/**
	 * Submits the given request to the context's apiUrl,
	 * then returns body/error of the response
	 */
	makeRequest(callback) {
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
}

module.exports = Requester;
