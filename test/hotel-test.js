import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel.js';
import hotelSubset from '../test/hotel-data-subset.js';

describe('Hotel', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(hotelSubset);
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should have todays date', () => {
    expect(hotel.date).to.equal('');
  })
});