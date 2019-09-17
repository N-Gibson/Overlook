// To Get the properly formatted date.
import $ from 'jquery';

export default {

  updateSearchCustomerName(hotel) { 
    $('.customer-information').html(`<div class='customer-information'>
    <p id='customer-name'></p>
    <p id='customer-id'></p>
    </div>`);
    $('#current-customer').text($('#search-customer-input').val());
    $('#customer-name').text(`Name: ${hotel.customersData.currentCustomer.name}`);
    $('#customer-id').text(`${hotel.customersData.currentCustomer.id}`);
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
    let usableDate = Date.parse(date);
    (hotel.roomServicesData.findOrdersByDate(usableDate))
    $('#orders-by-date').text(`All orders today: ${hotel.roomServicesData.findOrdersByDate(usableDate)}`);
    $('#order-costs-date').text(`Total cost of orders: $${hotel.roomServicesData.findOrderCost(usableDate)}`);
  },

  searchOrders(hotel, date) {
    let usableDate = Date.parse(date);
    $('#search-orders-results').text(`All orders on ${date}: ${hotel.roomServicesData.findOrdersByDate(usableDate)}`);
  },

  searchOrderByUser(hotel) {
    $('#specified-customers-order').text(`${$('#current-customer').text()} has ordered: ${hotel.roomServicesData.findOrderByUser($('#customer-id').text())}`)
  },

  findCostByUser(hotel) {
    $('#specified-customer-cost').text(`${$('#current-customer').text()}'s expendatures: $${hotel.roomServicesData.findCostByUser($('#customer-id').text())}`)
  },

  findCostByUserAtDate(hotel, date, id) {
    let usableDate = Date.parse(date);
    $('#user-cost-at-date').text(`${$('#current-customer').text()}'s bill from ${date} is: ${hotel.roomServicesData.findOrdersOfUserAtDate(id, usableDate)}`);
  },

  filterRoomsByType(hotel, type, date) {
    $('#filtered-rooms-type').text(`${$('#specify-type').val()}'s available: ${hotel.findRooms(type.toLowerCase(), date).map(room => room.number)}`);

    // NEED To add prices beds, etc... 
  },

  addBookingSubmit(hotel, date, id, roomNumber) {
    hotel.bookReservation(date, roomNumber, id);
  },

  mostRoomsAvail(hotel) {
    $('#most-rooms-available-date').text(`Date with most rooms available: ${hotel.findMostAvailRooms()}`);
  }

}