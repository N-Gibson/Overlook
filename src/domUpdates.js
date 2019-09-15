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

  displayOrders(hotel, date) {
    (hotel.roomServicesData.findOrdersByDate(usableDate))
    $('#orders-by-date').text(`All orders today: ${hotel.roomServicesData.findOrdersByDate(usableDate)}`);
    $('#order-costs-date').text(`Total cost of orders: $${hotel.roomServicesData.findOrderCost(usableDate)}`);
  },
}