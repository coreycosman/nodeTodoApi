const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const {generateMessage} = require('../../server/utils/message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'admin'
    var text = 'hello'
    expect(generateMessage(from, text)).include({
      from,
      text
    })
    expect(generateMessage(from, text).createdAt).to.exist

    expect(generateMessage(from, text).createdAt).to.be.a('number')
  });
});
