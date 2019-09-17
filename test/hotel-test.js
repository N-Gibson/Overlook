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
    expect(hotel.checkAvailibility('2019/10/19')).to.deep.equal([ { bedSize: "twin", bidet: false, costPerNight: 265.03, numBeds: 1, number: 1, roomType: "residential suite" }, { bedSize: "full", bidet: true, costPerNight: 228.01, numBeds: 1, number: 2, roomType: "single room" }, { bedSize: "twin", bidet: false, costPerNight: 275.99, numBeds: 1, number: 3, roomType: "suite" }, { bedSize: "full", bidet: false, costPerNight: 177.03, numBeds: 1, number: 4, costPerNight: 177.03,roomType: "junior suite" }])
  });

  it('should return all occupied rooms', () => {
    expect(hotel.checkFilledRooms('2019/10/19')).to.equal(1)
  });

  it('should be able to return the total daily revinue', () => {
    expect(hotel.calculateDailyRevinue('2019/10/19')).to.equal('263.98');
  });

  it('should return the percent of rooms occupied', () => {
    expect(hotel.calculateRoomsOccupied('2019/10/19')).to.equal(80)
  });

  it('should be able to find a room based on type date and availability', () => {
    expect(hotel.findRooms('hotel', '2019/10/19')).to.deep.equal([{ number: 1, roomType: "residential suite", bidet: false,bedSize: "twin", numBeds: 1, costPerNight: 265.03 }]);
  });

  it('should be able to find the date with the most rooms available', () => {
    expect(hotel.findMostAvailRooms()).to.equal('2019/08/16');
  });
});