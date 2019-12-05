const validFields = [
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

var Utils = require('./utils.js');

var Validator = function(fieldsOverride) {
	this.fields = Utils.extend(validFields, fieldsOverride);

	return this;
}

/**
 * Validates all the fields inside the given object,
 * also adds the user's Merchant GUID & Password
 */
Validator.prototype.validateObject = function (MerchantGUID, MerchantPassword, fn, data) {
 	let result = {};

	result.fn = fn

	for (let i in data) {
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