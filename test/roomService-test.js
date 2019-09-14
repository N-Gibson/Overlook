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
    expect(roomService.findOrdersByDate(1569477600000)).to.deep.equal([ { userID: 92, date: '2019/09/26', food: 'Tasty Wooden Sandwich', totalCost: 11.15 }, { userID: 48, date: '2019/09/26', food: 'Fantastic Cotton Sandwich', totalCost: 17.61 } ])
  });

  it('should be able to find the cost of room service on a given day', () => {
    expect(roomService.findOrderCost(1569477600000)).to.deep.equal(29);
  })
})