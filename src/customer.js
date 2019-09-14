class Customer {
  constructor(users) {
    this.data = users;
    this.currentCustomer = null;
  }

  createCustomer(name) {
    this.currentCustomer = { id: this.data.length + 1, name: name}
    this.data.push(this.currentCustomer);
  }
  
  findCustomer(name) {
    this.currentCustomer = this.data.find(data => data.name === name);
  }
}

export default Customer;