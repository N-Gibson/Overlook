import chai from 'chai';
const expect = chai.expect;

import Bookings from '../src/bookings.js';
import data from '../test/data-subset.js';

describe('Bookings', () => {
  let bookings;
  beforeEach(() => {
    bookings = new Bookings(data[2].bookings)
  });

  it('should be a function', () => {
    expect(Bookings).to.be.a('function');
  });

  it('should be able to find the most popular booking date', () => {
    expect(bookings.findMostPopularDate()).to.equal('2019/08/16')
  });
})