import chai from 'chai';
const expect = chai.expect;

import RoomService from '../src/roomService.js';
import data from '../test/data-subset.js';

describe('Room Service', () => {
  let roomService;
  beforeEach(() => {
    roomService = new RoomService(data[3].roomServices);
  });

  it('should be a function', () => {
    expect(RoomService).to.be.a('function');
  });

  it('should be able to find orders by date', () => {
    expect(roomService.findOrdersByDate(1569477600000)).to.deep.equal(['Tasty Wooden Sandwich', 'Fantastic Cotton Sandwich'])
  });

  it('should be able to find the cost of room service on a given day', () => {
    expect(roomService.findOrderCost(1569477600000)).to.deep.equal(29);
  });
   
  it('should be able to find the orders of a customer', () => {
    expect(roomService.findOrderByUser(8)).to.deep.equal(['Practical Granite Sandwich'])
  });

  it('should be able to find the cost of orders of a customer', () => {
    expect(roomService.findCostByUser(8)).to.equal(14.87);
  });
})