import RoomService from './roomService.js';
import Customer from './customer.js';
import Bookings from './bookings.js';

class Hotel {
  constructor(users, rooms, bookings, roomServices, date) {
    this.customersData = new Customer(users);
    this.hotelData = rooms;
    this.bookingsData = new Bookings(bookings);
    this.roomServicesData = new RoomService(roomServices);
    this.date = date;
    // this.totalRoomsAvailable = this.checkAvailibility().length;
    // this.percentOccupied = this.calculateRoomsOccupied();
    // this.totalRoomServiceCost = this.roomServicesData.findOrderCost(Date.parse(date));
  }

  findCustomer(name) {
    return this.customersData.data.find(customer => customer.name === name).id
  }

  checkAvailibility() {
    return this.hotelData.filter(room => room.bidet === true)
  }

  checkFilledRooms() {
    return this.hotelData.filter(room => room.bidet === false)
  }

  calculateDailyRevinue() {
    let totalRoomServiceCost = this.roomServicesData.findOrderCost(Date.parse(date));
    let roomsFilled = this.checkFilledRooms();
    let totalCostPerNight =  roomsFilled.reduce((totalCost, room) => {
      return totalCost += room.costPerNight
    }, 0);
    return Math.round(totalCostPerNight + totalRoomServiceCost);
  }

  calculateRoomsOccupied() {
    return (this.checkFilledRooms().length / this.hotelData.length * 100);
  }

  findRooms(type, date) {
    let roomByNumber = this.hotelData.filter(room => room.roomType === type).map(room => room.number);
    let roomByDate = this.bookingsData.bookings.filter(booking => Date.parse(booking.date) === date)

    return roomByDate.reduce((acc, room) => {
      if (roomByNumber.includes(room.roomNumber)) {
        acc.push(room)
      }
      return acc
    }, []);
  }
}

export default Hotel;