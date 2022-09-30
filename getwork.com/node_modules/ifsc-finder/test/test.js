var assert = require('chai').assert;
var utils = require('./utils');
var ifsc = require('../index');
const { expect } = require('chai');

var utils = new utils;
const IFSC_CODE = 'KKBK0001779';

describe('Get(IFSC_CODE)', function () {

  it('Should return all IFSC details as object', async function () {
    var result = await ifsc.get(IFSC_CODE);
    assert.equal(typeof (result), 'object');
    expect(result).to.eql({ 
      RTGS: true,
      IMPS: true,
      CONTACT: '+9199999999999',
      ADDRESS: 'SHOP NO 104 FIRST FLOOR SUNIT CAPITAL SENAPATI BAPAT ROAD OPP MEMORIAL HOSPITAL PUNE 411016',
      STATE: 'MAHARASHTRA',
      NEFT: true,
      DISTRICT: 'PUNE',
      MICR: '411485032',
      CENTRE: 'PUNE',
      SWIFT: '',
      ISO3166: 'IN-MH',
      UPI: true,
      CITY: 'PUNE',
      BRANCH: 'SENAPATI BAPAT ROAD BRANCH',
      BANK: 'Kotak Mahindra Bank',
      BANKCODE: 'KKBK',
      IFSC: 'KKBK0001779' }
    );
  });

  it('Should return object with 17 keys', async function () {
    var result = await ifsc.get(IFSC_CODE);
    var keysCount = utils.countObjectKeys(result);
    assert.equal(keysCount, 17);
  });
});

describe('Get(IFSC_CODE,"bank")', function () {
  it('Should return only String', async function () {
    var result = await ifsc.get(IFSC_CODE, 'bank');
    assert.equal(typeof(result), 'string');
  });

  it('Should return only Bank Name', async function () {
    var result = await ifsc.get(IFSC_CODE, 'bank');
    assert.equal(result, 'Kotak Mahindra Bank');
  });
});

describe('Get(IFSC_CODE, ["bank"])', function () {
  it('Should return object with single key', async function () {
    var result = await ifsc.get(IFSC_CODE, ['bank']);
    var keysCount = utils.countObjectKeys(result);
    assert.equal(typeof(result), 'object');
    expect(keysCount).to.equal(1);
    
  });

  it('Should return only Bank Name but as object', async function () {
    var result = await ifsc.get(IFSC_CODE, ['bank']);
    expect(result).to.eql({ BANK: 'Kotak Mahindra Bank' })
  });
});

describe('Get indivisual IFSC details', function () {
  
  it('Sould return BankName as "String"', async function(){
    var result = await ifsc.getBankName(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'Kotak Mahindra Bank');
  })
  
  it('Sould return BranchName as "String"', async function(){
    var result = await ifsc.getBranchName(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'SENAPATI BAPAT ROAD BRANCH');
  })
  
  it('Sould return BankCode as "String"', async function(){
    var result = await ifsc.getBankCode(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'KKBK');
  })
  
  it('Sould return Micr as "String"', async function(){
    var result = await ifsc.getMicr(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'411485032');
  })
  
  it('Sould return District as "String"', async function(){
    var result = await ifsc.getDistrict(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'PUNE');
  })
  
  it('Sould return City as "String"', async function(){
    var result = await ifsc.getCity(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'PUNE');
  })
  
  it('Sould return State as "String"', async function(){
    var result = await ifsc.getState(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'MAHARASHTRA');
  })
  
  it('Sould return Contact as "String"', async function(){
    var result = await ifsc.getContact(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'+9199999999999');
  })
  
  it('Sould return Address as "String"', async function(){
    var result = await ifsc.getAddress(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('string');
    assert.equal(result,'SHOP NO 104 FIRST FLOOR SUNIT CAPITAL SENAPATI BAPAT ROAD OPP MEMORIAL HOSPITAL PUNE 411016');
  })
  
  it('Sould return isUpi as "Boolean"', async function(){
    var result = await ifsc.isUpi(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('Boolean');
    assert.equal(result,true);
  })
  
  it('Sould return isImps as "Boolean"', async function(){
    var result = await ifsc.isImps(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('Boolean');
    assert.equal(result,true);
  })
  
  it('Sould return isNeft as "Boolean"', async function(){
    var result = await ifsc.isNeft(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('Boolean');
    assert.equal(result,true);
  })
  
  it('Sould return isRtgs as "Boolean"', async function(){
    var result = await ifsc.isRtgs(IFSC_CODE);
    var resultType = typeof(result);
    expect(result).to.be.a('Boolean');
    assert.equal(result,true);
  })
});
