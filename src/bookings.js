class Bookings {
  constructor(bookings) {
    this.data = bookings;
  }

  findMostPopularDate() {
    let mostFrequent;
    let compare = 0;
    this.data.reduce((acc, booking) => {
      if(!acc[booking.date]) {
        acc[booking.date] = 1;
        console.log('making key: ', acc)
      } else {
        acc[booking.date]++;
        console.log('incrementing value: ', acc)
      }
      if(acc[booking.date] > compare) {
        compare = acc[booking.date];
        mostFrequent = booking.date;
      }
      return acc
    }, {})
    return mostFrequent
  }
}

export default Bookings;