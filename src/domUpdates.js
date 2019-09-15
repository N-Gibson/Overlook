// To Get the properly formatted date.
import $ from 'jquery';

export default {

  updateSearchCustomerName() { 
    $('#current-customer').text($('#search-customer-input').val());
  },

  updateNewCustomerName() {
    $('#current-customer').text($('#new-customer-input').val());
  },

  searchRoomsByDate(hotel, date) {
    let usableDate = Date.parse(date);
    $('#rooms-at-date').text(`Rooms available on ${date}: ${hotel.bookingsData.findRoomAtDate(usableDate)}`); 
  },

  updateUserHistory(hotel, id) {
    $('#user-booking-history-date').text(`All dates ${$('#current-customer').text()} visited with us: ${hotel.bookingsData.findUserHistoryDates(id)}`);
    $('#user-booking-history-room-number').text(`All rooms ${$('#current-customer').text()} stayed in: ${hotel.bookingsData.findUserHistoryRooms(id)}`);
  },
}