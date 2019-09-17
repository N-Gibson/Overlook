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

  updateUserHistory(date) {
    $('#user-booking-history-date').append(`<li>${date}</li>`)
  },

  updateRoomHistory(roomNum) {
  $('#user-booking-history-room-number').append(`<li>${roomNum}</li>`)
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

  filterRoomsByType(type) {
    console.log(type)
    // $('#filtered-rooms-type').text(``)

    $(`<div class='bookings-info'>
    <p>Cost Per Night: $ ${type.costPerNight}</p>
    <p>Room Type: ${type.roomType}</p>
    <p>Number of Beds: ${type.numBeds}</p>
    <p>Bed Size: ${type.bedSize}</p>
    <p>Room Number: ${type.number}</p>
    <p>Bidet Available: ${type.bidet}</p>
    <button id='confirm-reservation'>Confirm Reservation</button>
    </div>`).insertAfter('#filtered-rooms-type')
    // NEED To add prices beds, etc... 
  },

  addBookingSubmit(hotel, date, id, roomNumber) {
    hotel.bookReservation(date, roomNumber, id);
  },

  mostRoomsAvail(hotel) {
    $('#most-rooms-available-date').text(`Date with most rooms available: ${hotel.findMostAvailRooms()}`);
  },

  showReservation(currentCustomer, date, costPerNight, roomType, numBeds, bedSize, number, bidet) {
    $('.bookings-info').remove();

    $(`<div>${currentCustomer} just made a resrvation on ${date} :
    <p>Cost Per Night: $ ${costPerNight}</p>
    <p>Room Type: ${roomType}</p>
    <p>Number of Beds: ${numBeds}</p>
    <p>Bed Size: ${bedSize}</p>
    <p>Room Number: ${number}</p>
    <p>Bidet Available: ${bidet}</p>
    </div>`).insertAfter('#filtered-rooms-type')
  },
}