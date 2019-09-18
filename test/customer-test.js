import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/customer.js';
import data from '../test/data-subset.js';

describe('Customer', () => {
  let customer;
  beforeEach(() => {
    customer = new Customer(data[0].users);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be able to create a customer', () => {
    customer.createCustomer('Brad Friedel');

    expect(customer.data).to.deep.equal([{ id: 1, name: 'Matilde Larson' }, { id: 2, name: 'Chadrick Lowe' }, { id: 3, name: 'Christian Sporer' }, { id: 4, name: 'Brook Christiansen' }, { id: 5, name: 'Noemy Little' }, { id: 6, name: 'Brad Friedel' }]);

    customer.createCustomer('Michael Ballack');
    
    expect(customer.data).to.deep.equal([{ id: 1, name: 'Matilde Larson' }, { id: 2, name: 'Chadrick Lowe' }, { id: 3, name: 'Christian Sporer' }, { id: 4, name: 'Brook Christiansen' }, { id: 5, name: 'Noemy Little' }, { id: 6, name: 'Brad Friedel' }, { id: 7, name: 'Michael Ballack'}]);
  });

  it('should be able to find a specific customer', () => {
    customer.findCustomer('Chadrick Lowe')
    expect(customer.currentCustomer).to.deep.equal({ id: 2, name: "Chadrick Lowe" });
  })
})