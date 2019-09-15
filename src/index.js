// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Hotel from './hotel.js';
import domUpdates from './domUpdates.js';
import Customer from './customer.js';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/moroccan-background.png';

const date = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`;
let hotel, customer; 

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
  .then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
  .then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
  .then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices')
  .then(response => response.json()),
])
.then(data => {
  console.log(data);
  hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices, date);
});
  
$(document).ready(() => {
  $('#hotel-content, #customer-content, #bookings-content, #room-service-content').hide();

  $(`<p>Todays Date: ${date}</p>`).insertAfter('#todays-date');

  $('#splash-button').click(() => {
    $('#welcome-content').remove();
  })

  $('#hotel').click(() => {
    // $('#welcome-content').remove();
    $('#customer-content, #bookings-content, #room-service-content').hide();
    $('#rooms-available').text(`${hotel.totalRoomsAvailable}`);
    $('#percent-rooms-occupied').text(`${hotel.percentOccupied}%`);
    $('#total-daily-revinue').text(`$ ${hotel.calculateDailyRevinue()}`)
    $('#hotel-content').show();
  });

  $('#customer').click(() => {
    // $('#welcome-content').remove();
    $('#hotel-content, #bookings-content, #room-service-content').hide();
    $('#customer-content').show();
  });

  $('#bookings').click(() => {
    // $('#welcome-content').remove();
    $('#hotel-content, #customer-content, #room-service-content').hide();
    $('#bookings-content').show();
    $('#most-popular-booking-date').text(`Most popular booking date: ${hotel.bookingsData.findMostPopularDate()}`);
    if($('#current-customer').text() !== 'All') {
      domUpdates.updateUserHistory(hotel, $('#customer-id').text());
    }
  });

  $('#search-date').click(() => {
  $('#date-with-most-available').text(domUpdates.searchRoomsByDate(hotel, $('#date').val()));
  });

  $('#room-service').click(() => {
    $('#welcome-content').remove();
    $('#search-users-orders').hide()
    $('#hotel-content, #customer-content, #bookings-content').hide()
    $('#room-service-content').show();
    domUpdates.displayOrders(hotel, date);


    if($('#current-customer').text() !== 'All') {
      $('#search-users-orders').show();
      $('#search-orders-users-name').text($('#current-customer').text());
      domUpdates.searchOrderByUser(hotel);
      domUpdates.findCostByUser(hotel);
      $('#search-orders-users-button').click(() => {
        domUpdates.findCostByUserAtDate(hotel, date, $('#customer-id').text());
      })
    }
  });

  $('#search-orders-button').click(() => {
    domUpdates.searchOrders(hotel, $('#search-orders-date').val());
  });

  $('#search-customer-button').click(() => {
    domUpdates.updateSearchCustomerName();
    hotel.customersData.findCustomer($('#current-customer').text())
    if (hotel.customersData.currentCustomer === undefined) {
      $('.customer-information').text('Customer not found. Please add a new customer!')
    } else {
      // Need to do some bug fixing here the name wont update after an invalid user has been inputted. 

      $('#customer-name').text(`Name: ${hotel.customersData.currentCustomer.name}`);
      $('#customer-id').text(`${hotel.customersData.currentCustomer.id}`);
    }
  });

  $('#add-customer-button').click(() => {
    domUpdates.updateNewCustomerName();
    $('.customer-information');
    hotel.customersData.createCustomer($('#current-customer').text());
    $('#customer-name').text(`Name: ${hotel.customersData.currentCustomer.name}`);
    $('#customer-id').text(`ID: ${hotel.customersData.currentCustomer.id}`);
  });

});