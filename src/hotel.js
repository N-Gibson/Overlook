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
      bookingsByDate.forEach(booking => {
        if(booking === room.number) {
          acc += room.costPerNight;
        }
      })
      return acc
    }, 0)
    return (totalRoomServiceCost + roomsBooked).toFixed(2)
  }

  calculateRoomsOccupied(date) {
    let roomsLeft = this.hotelData.length - this.checkFilledRooms(date)
    return ( roomsLeft / this.hotelData.length * 100);
  }

  findRooms(type, date) {
    let availableRooms = this.checkAvailibility(date); 
    let roomByType = availableRooms.filter(room => room.roomType === type).map(room => room.number);
    let foundRooms = availableRooms.reduce((acc, room) => {
      if (roomByType.includes(room.number)) {
        acc.push(room)
      }
      return acc
    }, []);

    console.log('avail rooms', availableRooms)
    console.log('those filtered by type', foundRooms)

    if(foundRooms === []) {
      console.log('in condition', availableRooms)
      return availableRooms;
    } else {
      console.log('found room', foundRooms)
      return foundRooms
    }

    // Revise conditional logic the availableRooms return is never found
  }

  bookReservation(date, roomNum, id) {
    console.log('in right spot')
    this.hotelData.push({date: date, roomNumber: roomNum, userID: id})

    console.log(this.hotelData);
  }

  findMostAvailRooms() {
    let leastFrequent;
    let compare = 0;
    let allBooking = this.bookingsData.bookings.reduce((acc, booking) => {
      if(!acc[booking.date]) {
        acc[booking.date] = 1;
      } else {
        acc[booking.date]++;
      }
      if(acc[booking.date] >= compare) {
        compare = acc[booking.date];
        leastFrequent = booking.date;
      }
      return acc
    }, {})
    return leastFrequent
  }
}

export default Hotel;