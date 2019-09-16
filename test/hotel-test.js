import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/hotel.js';
import data from '../test/data-subset.js';

describe('Hotel', () => {
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices, Date.parse(new Date()));
  });
  
  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should track todays date', () => {
    expect(hotel.date).to.equal(Date.parse(new Date()));
  });

  it('should be able to find a specific customer', () => {
    expect(hotel.findCustomer('Brook Christiansen')).to.equal(4);
  })

  it('should return all available rooms', () => {
    expect(hotel.totalRoomsAvailable).to.equal(1)
  });

  it('should return all occupied rooms', () => {
    expect(hotel.checkFilledRooms()).to.deep.equal([ { number: 1, roomType: "residential suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 265.03 }, { number: 3, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 275.99 }, { number: 4, roomType: "junior suite", bidet: false, bedSize: "full", numBeds: 1, costPerNight: 177.03 }, { number: 5, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 2, costPerNight: 246.65 } ])
  });

  it('should be able to return the total daily revinue', () => {
    expect(hotel.calculateDailyRevinue()).to.equal(994);
  });

  it('should return the percent of rooms occupied', () => {
    expect(hotel.calculateRoomsOccupied()).to.equal(80)
  });

  it('should be able to find a room based on type', () => {
    expect(hotel.findRoomsBasedOnType('junior suite')).to.deep.equal([{ number: 4,roomType: "junior suite", bidet: false,bedSize: "full", numBeds: 1, costPerNight: 177.03 }, { number: 5, roomType: "junior suite", bidet: false, bedSize: "king",numBeds: 2, costPerNight: 246.65 }]);
  })
});