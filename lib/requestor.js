const request = require("request");

const Requester = {
	/**
	 * Submits the given request to the context's apiUrl,
	 * then returns a promise with body/error of the response
	 */
	makeRequest(apiUrl, validData) {
		return new Promise((resolve, reject) => {
			request.post({
				uri: apiUrl,
				method: 'POST',
				body: JSON.stringify(validData)
			}, function (err, res, body) {
				if (body) {
					body = JSON.parse(body);
		
					if (body.IsError) {
						reject(body);
						return;
					}
		
					if (body.response && parseInt(body.response['m_Code']) < 0) {
						reject(body);
					} else {
						resolve(body);
						return;
					}
		
					if (err) {
						reject(err);
						return;
					}
				}
			});
		});
	}
}

module.exports = Requester;
