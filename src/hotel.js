import RoomService from './roomService.js';
import Customer from './customer.js'

class Hotel {
  constructor(users, rooms, bookings, roomServices, date) {
    this.customersData = new Customer(users);
    this.hotelData = rooms;
    // this.bookingsData = new Bookings(bookings);
    this.roomServicesData = new RoomService(roomServices);
    this.date = date;
    this.totalRoomsAvailable = this.checkAvailibility().length;
    this.percentOccupied = this.calculateRoomsOccupied();
    this.totalRoomServiceCost = this.roomServicesData.findOrderCost(1569477600000);
  }

  findCustomer(name) {
    console.log(this.bookingsData);
  }

  checkAvailibility() {
    return this.hotelData.filter(room => room.bidet === true)
  }

  checkFilledRooms() {
    return this.hotelData.filter(room => room.bidet === false)
  }

  calculateDailyRevinue() {
    let roomsFilled = this.checkFilledRooms();
    let totalCostPerNight =  roomsFilled.reduce((totalCost, room) => {
      return totalCost += room.costPerNight
    }, 0);
    return Math.round(totalCostPerNight + this.totalRoomServiceCost);
  }

  calculateRoomsOccupied() {
    return (this.checkFilledRooms().length / this.hotelData.length * 100);
  }

}

export default Hotel;