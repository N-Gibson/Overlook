import RoomService from '../src/roomService.js';

class Hotel {
  constructor(users, rooms, bookings, roomServices, date) {
    this.usersData = users;
    this.roomsData = rooms;
    this.bookingsData = bookings;
    this.roomServicesData = roomServices;
    this.date = date;
    this.totalRoomsAvailable = this.checkAvailibility().length;
    this.totalRoomsOccupied = this.checkFilledRooms();
    // this.totalRoomServiceCost = roomService.totalCost;
  }

  findCustomer(id) {
    // filter through all classes data? Need to update the dom with ever class.
  }

  checkAvailibility() {
    return this.roomsData.filter(room => room.bidet === true)
  }

  checkFilledRooms() {
    return this.roomsData.filter(room => room.bidet === false)
  }

  calculateDailyRevinue() {
    let totalCostPerNight =  this.totalRoomsOccupied.reduce((totalCost, room) => {
      return totalCost += room.costPerNight
    }, 0);
    // return totalCostPerNight + this.totalRoomServiceCost;
  }

  calculateRoomsOccupied() {
    return (this.checkFilledRooms().length / this.hotelData.rooms.length * 100);
  }

}

export default Hotel;