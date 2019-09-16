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

  checkAvailibility(date) {
    let usableDate = Date.parse(date); 
    let bookingsByDate = this.bookingsData.bookings.filter(booking => Date.parse(booking.date) === usableDate).map(room => room.roomNumber);

    return this.hotelData.reduce((acc, room) => {
        if(!bookingsByDate.includes(room.number)) {
          acc.push(room);
        }
      return acc
    }, [])
  }

  checkFilledRooms(date) {
    return this.hotelData.length - this.checkAvailibility(date).length;
  }

  calculateDailyRevinue(date) {
    let usableDate = Date.parse(date); 
    let bookingsByDate = this.bookingsData.bookings.filter(booking => Date.parse(booking.date) === usableDate).map(room => room.roomNumber);
    let totalRoomServiceCost = this.roomServicesData.findOrderCost(Date.parse(date));

    let roomsBooked = this.hotelData.reduce((acc, room) => {
      if(bookingsByDate.includes(room.number)) {
        acc =+ room.costPerNight;
      }
      return acc
    }, 0)
    return totalRoomServiceCost + roomsBooked
  }

  calculateRoomsOccupied(date) {
    let roomsLeft = this.hotelData.length - this.checkFilledRooms(date)
    return ( roomsLeft / this.hotelData.length * 100);
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

  bookReservation(roomNum) {
    return this.hotelData.find(hotel => hotel.roomNumber === roomNum)
  }
}

export default Hotel;