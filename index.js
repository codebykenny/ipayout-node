var Validator = require('./lib/Validator')
var Requestor = require('./lib/Requestor')


var API = function(options) {
	if (!(this instanceof API)) {
		return new API(options);
	}

	if (!options) {
		throw Error ('API Must be initiated with options');
	}

	if (!options.MerchantGUID) {
		throw Error ('API Must be initiated with MerchantGUID.');
	}

	if (!options.MerchantPassword) {
		throw Error ('API Must be initiated with MerchantPassword.');
	}

	this.MerchantGUID		= options.MerchantGUID;
	this.MerchantPassword	= options.MerchantPassword

	if (options.sandbox && options.sandbox === true) {
		this.apiUrl	= 'https://testewallet.com/eWalletWS/ws_JsonAdapter.aspx';
	} else {
		this.apiUrl	= 'https://www.i-payout.net/eWalletWS/ws_eWallet.asmx';
	}
}

API.prototype.run = function(fn, data) {
	var validData;

	if (!fn) {
		this.error = 'No eWallet API function referenced.';
		return this;
	}

	if (!data) {
		this.error = 'Command called with no data.'
		return this;
	}

	validData = Validator.validateObject(this.MerchantGUID, this.MerchantPassword, fn, data);

	if (!validData) {
		this.error = 'The data provided was not valid.'
		return this;
	}

	this.validData = validData;

	return this;
}

API.prototype.then = function (callback) {
	if (this.error) {
		callback(this.error);

		return;
	}

	if (!this.validData) {
		callback('Did not find any valid data for this request.');
		return;
	}

	Requestor.makeRequest.call(this, callback);
}

module.exports = API;
