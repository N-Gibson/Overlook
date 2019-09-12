import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel.js';
import hotelSubset from '../test/hotel-data-subset.js';

describe('Hotel', () => {
  let newHotel;
  beforeEach(() => {
    newHotel = new Hotel(hotelSubset);
  });
  
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should track todays date', () => {
    expect(hotel.date).to.equal(Date.parse(new Date()));
  });

  // it('should be able to find a specific customer', () => {
  //   expect(hotel.findCustomer())
  // })

  it('should return all available rooms', () => {
    expect(hotel.totalRoomsAvailable).to.deep.equal([{ number: 2, roomType: 'single room', bidet: true, bedSize: 'full', numBeds: 1, costPerNight: 228.01 } ])
  });

  it('should return all occupied rooms', () => {
    expect(hotel.totalRoomsOccupied).to.deep.equal([ { number: 1, roomType: "residential suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 265.03 }, { number: 3, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 275.99 }, { number: 4, roomType: "junior suite", bidet: false, bedSize: "full", numBeds: 1, costPerNight: 177.03 }, { number: 5, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 2, costPerNight: 246.65 } ])
  });

  it.skip('should be able to return the total daily revinue', () => {
    expect(calculateDailyRevinue()).to.equal()
  });

  it('should return the percent of rooms occupied', () => {
    expect(hotel.calculateRoomsOccupied()).to.equal(80)
  })
});