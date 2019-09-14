class Customer {
  constructor(users) {
    this.data = users;
  }

  createCustomer(name) {
    this.data.push({ id: this.data.length + 1, name: name});
  }
  
  findCustomer(name) {
    return this.data.filter(data => data.name === name);
  }
}

export default Customer;