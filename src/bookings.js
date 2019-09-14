class Bookings {
  constructor(bookings) {
    this.bookings = bookings;
  }

  findMostPopularDate() {
    let mostFrequent;
    let compare = 0;
    this.bookings.reduce((acc, booking) => {
      if(!acc[booking.date]) {
        acc[booking.date] = 1;
      } else {
        acc[booking.date]++;
      }
      if(acc[booking.date] > compare) {
        compare = acc[booking.date];
        mostFrequent = booking.date;
      }
      return acc
    }, {})
    return mostFrequent
  }

  // findDateWithMostRoomsAvail() {
  //   // Might need to be in hotel because data is in the wrong set?
  // }

  findRoomAtDate(date) {
    let allRoomNumbers = this.bookings.filter(booking => booking.date === date).map(day => day.roomNumber);
    let roomsWithoutDuplicates = [...new Set(allRoomNumbers)];

    return roomsWithoutDuplicates
  }

  findUserHistory(id) {
    return this.bookings.filter(booking => booking.userID === id)
  }
}

export default Bookings;