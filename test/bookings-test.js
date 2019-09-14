import chai from 'chai';
const expect = chai.expect;

import Bookings from '../src/bookings.js';
import data from '../test/data-subset.js';

describe('Bookings', () => {
  let bookings;
  beforeEach(() => {
    bookings = new Bookings(data[2].bookings);
  });

  it('should be a function', () => {
    expect(Bookings).to.be.a('function');
  });

  it('should be able to find the most popular booking date', () => {
    expect(bookings.findMostPopularDate()).to.equal('2019/08/16');
  });

  // it('should be able to find the date with the most rooms available', () => {
  //   expect(bookings.findDateWithMostRoomsAvail()).to.equal();
  // });

  it('should be able to find a room given a date', () => {
    expect(bookings.findRoomAtDate("2019/08/16")).to.deep.equal([ 41, 23 ]);
  });

  it('should find all bookings given a user id', () => {
    expect(bookings.findUserHistory(88)).to.deep.equal([{ userID: 88, date: '2019/08/16', roomNumber: 23 }]);
  })
})