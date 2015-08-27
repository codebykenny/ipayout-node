var validFields = [
	'MerchantGUID',
	'MerchantPassword',
	'UserName',
	'FirstName',
	'LastName',
	'DateOfBirth',
	'EmailAddress',
	'Address1',
	'Address2',
	'City',
	'State',
	'ZipCode',
	'Country2xFormat',
	'CompanyName',
	'WebsitePassword',
	'PreferredLanguage',
	'IsActivated',
	'CellPhoneNumber',
	'Phone',
	'eWalletID',
	'IsSuspended',
	'IsInfoVerified',
	'IsClosed',
	'CreatedDate',
	'IsAgreedToFees',
	'IsBusiness',
	'IsInvalidEmail',
	'SVCShippingAddress',
	'Amount',
	'CurrencyCode',
	'ItemDescription',
	'MerchantReferenceID',
	'UserReturnURL',
	'MustComplete',
	'IsSubscription',
	'SubscriptionAmount',
	'SubscriptionDaysToStart',
	'RecurringPaymentID',
	'Description',
	'Period',
	'RetParams',
	'StartDate',
	'CancelDueToInactivity',
	'CancelByUser',
	'CancelReason',
	'SSN',
	'CompanyTaxID',
	'GovernmentID',
	'MilitaryID',
	'PassportNumber',
	'DriversLicense',
	'DefaultCurrency',
	'SkipAutoSVCOrder',
	'PartnerBatchID',
	'PoolID',
	'arrAccounts',
	'AllowDuplicates',
	'AutoLoad'
];

var Utils = require('./Utils');

var Validator = function(fieldsOverride) {
	this.fields = Utils.extend(validFields, fieldsOverride);

	return this;
}


Validator.prototype.validateObject = function (MerchantGUID, MerchantPassword, fn, data) {
	var i, result = {};

	result.fn = fn

	for (i in data) {
		if (this.fields.indexOf(i) > -1) {
			//No null variables
			if (data[i]) {
				result[i] = data[i];
			}
		}
	}

	result.MerchantGUID	= MerchantGUID;
	result.MerchantPassword	= MerchantPassword;

	return result;
}



module.exports = new Validator();
