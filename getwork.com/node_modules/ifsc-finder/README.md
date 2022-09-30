# IFSC Finder
IFSC Finder is module based on Razorpay's API to get IFSC details. It provides simple way to get bank detailed for specific IFSC code.

![IFSC-Finder](https://user-images.githubusercontent.com/14973225/114267466-638d5a00-9a19-11eb-9541-5a406f8da97e.png)


[![Testcases](https://github.com/surajsnanavare/ifsc_finder/actions/workflows/node.js.yml/badge.svg)](https://github.com/surajsnanavare/ifsc_finder/actions/workflows/node.js.yml) [![Package Publish](https://github.com/surajsnanavare/ifsc_finder/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/surajsnanavare/ifsc_finder/actions/workflows/npm-publish.yml)


# Example Usage 
```JS
var ifsc = require('ifsc-finder');
```

# Documentation
## Installation
Use following command to install IFSC finder 
```JS
npm install ifsc-finder
```

## Basic Usage
If you want to get details (Bank, City, State, etc) for specific ``IFSC_code`` following function will be usefull.

```JS
ifsc.get(IFSC_code).then(function(res){
    console.log(res);
})
```
Different functions are avaiable to get only specific details like Bank Name, Bank Code, City, State, etc. Below is example to get Bank Name for ```IFSC_Code```.

```JS
ifsc.getBankName(IFSC_code).then(function(res){
    console.log(res);
})
```

### Functions to get specific details
- ``` getBankName(IFSC_Code)``` - Returns Bank Name for specified IFSC code
- ``` getBranchName(IFSC_Code)``` - Returns Branch Name for specified IFSC code
- ``` getBankCode(IFSC_Code)``` - Returns Bank Code for specified IFSC code
- ``` getMicr(IFSC_Code)``` - Returns bank's MICR Code for specified IFSC code
- ``` getDistrict(IFSC_Code)``` - Returns District for specified IFSC code
- ``` getCity(IFSC_Code)``` - Returns City for specified IFSC code
- ``` getState(IFSC_Code)``` - Returns State for specified IFSC code
- ``` getContact(IFSC_Code)``` - Returns Contact Number for specified IFSC code
- ``` getAddress(IFSC_Code)``` - Returns bank's Address for specified IFSC code
- ``` isUpi(IFSC_Code)``` - Returns true if bank supports UPI for specified IFSC code
- ``` isImps(IFSC_Code)``` - Returns true if bank supports IMPS for specified IFSC code
- ``` isNeft(IFSC_Code)``` - Returns true if bank supports NEFT for specified IFSC code
- ``` isRtgs(IFSC_Code)``` - Returns true if bank supports RTGS for specified IFSC code

## Advanced Usage
Get only required details like Bank, City, etc. in one function call. See below example:

```JS
var details_list = ['bank','state','Contact']
ifsc.get(IFSC_code, details_list).then(function(res){
    console.log(res);
})

// Output:
{ BANK: 'Credit Suisse Bank', STATE: 'Maharastra', CONTACT: ' 022 6777 3417' } 
```
>  Note : Passing invalid/unsupported detail Id (e.g 'state2') in details list ```ifsc.get()``` will be returned in ``SKIPPED``. See below sample output:
```JS
{ BANK: 'Credit Suisse Bank', STATE: 'Maharastra', CONTACT: ' 022 6777 3417' , SKIPPED: ['state2'] }
```

If you pass single detail instead of details array then ```ifsc.get()``` will return plain string insead of object.

```JS
ifsc.get(IFSC_code, "bank").then(function(res){
    console.log(res);
})

// Output: 
Credt Suisse Bank
```

> **Currently available detail Ids** - CENTRE, IMPS, UPI, ADDRESS, STATE, DISTRICT, RTGS, MICR, NEFT, BRANCH, CITY, CONTACT, MICR, MICR CODE, BANK, BANKCODE, IFSC.
