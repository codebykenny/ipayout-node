var Validator = require('./lib/validator.js');
var Requestor = require('./lib/requestor.js');

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
		this.apiUrl	= 'https://i-payout.net/eWalletWS/ws_JsonAdapter.aspx';
	}
}

API.prototype.run = function(fn, data) {
	var validData;

	if (!fn) {
		this.error = 'No eWallet API function referenced.';
		return;
	}

	if (!data) {
		this.error = 'Command called with no data.'
		return;
	}

	validData = Validator.validateObject(this.MerchantGUID, this.MerchantPassword, fn, data);

	if (!validData) {
		this.error = 'The data provided was not valid.'
		return;
	}

	this.validData = validData;

	return Requestor.makeRequest(this.apiUrl, this.validData);
}

module.exports = API;
