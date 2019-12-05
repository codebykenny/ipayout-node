# ipayout-node
[![npm version](https://badge.fury.io/js/ipayout-node.svg)](http://badge.fury.io/js/ipayout-node)

A node.js module for interacting with iPayout eWallet API.

Full iPayout Documentation: https://www.i-payout.com/API/Default.aspx

I created this as an abstraction to the iPayout API making it easier to send and receive requests without having to worry about the nitty gritty.

# Installation

```
	npm install ipayout-node
```

# Usage

  * Require ipayout-node in your project:

    ``` js
    var ipayout = require('ipayout-node')({
      MerchantGUID: 'Your merchant GUID',
      MerchantPassword: 'Your Merchant Password',
      sandbox: true //On production don't include this key
    });
    ```

  * Follow this simple format for all API endpoints.
    * Every `.run(fn, data)` request requires a function name `eg. eWallet_RegisterUser` and the required data.
  
  ``` js
  ipayout
    .run('eWallet_RegisterUser', userData)
    .then(function(response) {
      //success
    }).catch(function(err) {
      //failed
    });
  
  ```
  
# Full Example

``` js
var ipayout = require('ipayout-node')({
    MerchantGUID: 'Your merchant GUID',
    MerchantPassword: 'Your Merchant Password',
    sandbox: true //On production don't include this key
  });
    
    
var userData = {
	'FirstName': 'John',
	'LastName': 'Smith',
	'UserName': 'JohnSmith',
	'EmailAddress': 'John@company.com',
	'DateOfBirth': '1/1/1970',
	'Address1': '1234 W 87th St',
	'City': 'San Francisco',
	'State': 'California',
	'Country2xFormat': 'US',
	'ZipCode': '90210',
	'PreferredLanguage': 'EN'
}

ipayout
  .run('eWallet_RegisterUser', userData)
  .then(function(data) {
		console.log(data);	
	  /*	
      { response: 
        { 
          m_Code: 0,
          m_Text: 'OK',
          LogTransactionID: 0,
          TransactionRefID: 11111,
          ACHTransactionID: 0,
          ProcessorTransactionRefNumber: '',
          CustomerFeeAmount: 0,
          CurrencyCode: null 
        }
      }
    */
	}).catch(function(err) {
    //handle error
  });
```

# Notes

Things to keep in mind:

  * Please read in full the integration guides provided by iPayout at https://www.i-payout.com/API/Default.aspx, they're relatively short and straight to the point so no excuse not to read them.
  
  * ipayout-node validates data given to `.run()` and only known keys are actually sent inside the request
    * Keys must be in the exact format iPayout expects them to be `eg. 'UserName'` capitalized. 
  
  * Dates, such as `DateOfBirth` currently only support string dates (No date objects) `eg."1/1/1970"`.

# Contribution
  I accept Pull-Requests! There are many, many ways to make this abstraction better this is very primitive/preliminary stuff at the moment.
  
  Feel free to add and improve as you wish.
