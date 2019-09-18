import $ from 'jquery';
import Hotel from './hotel.js';
import domUpdates from './domUpdates.js';
import Customer from './customer.js';

import './css/base.scss';

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
  hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices, date);
});
  
$(document).ready(() => {
  $('#hotel-content, #customer-content, #bookings-content, #room-service-content').hide();
  $(`<p class='today-date-display'>Todays Date: ${date}</p>`).insertAfter('#todays-date');
  $('#splash-button').click(() => {
    $('#welcome-content').remove();
  })
  $('.make-booking-form').hide();

  $('#hotel').click(() => {
    $('#customer-content, #bookings-content, #room-service-content').hide();
    $('#rooms-available').text(`${hotel.checkAvailibility(date).length}`);
    $('#percent-rooms-occupied').text(`${hotel.calculateRoomsOccupied(date)}%`);
    $('#total-daily-revinue').text(`$ ${hotel.calculateDailyRevinue(date)}`)
    $('#hotel-content').show();
  });

  $('#customer').click(() => {
    $('#hotel-content, #bookings-content, #room-service-content').hide();
    $('#customer-content').show();
  });

  $('#bookings').click(() => {
    $('.bookings-headers').hide();
    if($('#current-customer').text() !== 'All') {
      $('#booking-error').remove();
      $('.bookings-headers').show();
      $('#create-booking').show();
    } else {
      $('#create-booking').hide()
    }
    $('#hotel-content, #customer-content, #room-service-content').hide();
    $('#bookings-content').show();
    $('#most-popular-booking-date').text(`Most popular booking date: ${hotel.bookingsData.findMostPopularDate()}`);
    domUpdates.mostRoomsAvail(hotel);
  });

  $('#confirm-reservation').click((e) => {
    domUpdates.addBookingSubmit(hotel, $('#specify-date').val(), $('#room-number-input').val(), $('#customer-id').text());
  });

  $('#create-booking').click(() => {
    if($('#current-customer').text() !== 'All') {
    $('.make-booking-form').toggle();
    }
  });

  $('#filter-rooms-by-type').click(() => {
    $('.bookings-info').remove();
    if($('#specify-type').val() !== '' && $('#specify-date').val() !== '') {
      hotel.findRooms($('#specify-type').val(), $('#specify-date').val()).map(room => domUpdates.filterRoomsByType(room));
    } else {
      $('<p>Fill out both areas').insertAfter('#filtered-rooms-type');
    }
  });

  $('main').click((e) => {
    if(e.target.id === 'confirm-reservation') {
      hotel.bookReservation($('#specify-date').val(), e.target.parentElement.children[4].innerHTML.split(' ')[2], $('#customer-id').text())

      domUpdates.showReservation($('#current-customer').text(), $('#specify-date').val(), e.target.parentElement.children[0].innerHTML.split(' ')[4], e.target.parentElement.children[1].innerHTML.split(' ')[2], e.target.parentElement.children[2].innerHTML.split(' ')[3], e.target.parentElement.children[3].innerHTML.split(' ')[2], e.target.parentElement.children[4].innerHTML.split(' ')[2], e.target.parentElement.children[5].innerHTML.split(' ')[2]);

      $(`<div class='room-service-order-options'>
      <select id='select'>
      </select>
      <button id='order-food-item'>Order</button>
      </div>`).insertAfter('#booking-confirmation');

      hotel.roomServicesData.roomServiceData.map(option => domUpdates.addOrderMenu(option))

      hotel.bookingsData.findUserHistoryDates($('#customer-id').text()).map(date => domUpdates.updateUserHistory(date));
        
      hotel.bookingsData.findUserHistoryRooms($('#customer-id').text()).map(room => domUpdates.updateRoomHistory(room));
    }

    if(e.target.id === 'order-food-item') {
      let foodItem = $('#select').val();
      let food = hotel.roomServicesData.roomServiceData.find(item => item.food === foodItem);
  
      hotel.roomServicesData.addOrder(date, food.food, food.totalCost, $('#customer-id').text())

      $('#total-daily-revinue').text(`$ ${hotel.calculateDailyRevinue(date)}`)
      domUpdates.searchOrderByUser(hotel);
      domUpdates.findCostByUser(hotel);
      domUpdates.displayOrders(hotel, date);
    }
  });

  $('#search-date').click(() => {
  $('#date-with-most-available').text(domUpdates.searchRoomsByDate(hotel, $('#date').val()));
  });

  $('#room-service').click(() => {
    if($('#current-customer').text() !== 'All') {
      $('#room-service-no-cust').remove()
    }
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
    hotel.customersData.findCustomer($('#search-customer-input').val())
    if (hotel.customersData.currentCustomer === undefined) {
      $('#customer-name').text('Customer not found.')
      $('#customer-id').text('Customer ID not found.')
    } else {
      domUpdates.updateSearchCustomerName(hotel);
    }
    if($('#current-customer').text() !== 'All') {
      $(`<div class='room-service-order-options'>
      <select id='select'>
      </select>
      <button id='order-food-item'>Order</button>
      </div>`).insertAfter('#search-users-orders');

      hotel.roomServicesData.roomServiceData.map(option => domUpdates.addOrderMenu(option));

      hotel.bookingsData.findUserHistoryDates($('#customer-id').text()).map(date => domUpdates.updateUserHistory(date));
        
      hotel.bookingsData.findUserHistoryRooms($('#customer-id').text()).map(room => domUpdates.updateRoomHistory(room));
    }
  });

  $('#add-customer-button').click(() => {
    domUpdates.updateNewCustomerName();
    $('.customer-information');
    hotel.customersData.createCustomer($('#current-customer').text());
    $('#customer-name').text(`Name: ${hotel.customersData.currentCustomer.name}`);
    $('#customer-id').text(`${hotel.customersData.currentCustomer.id}`);
    if($('#current-customer').text() !== 'All') {
      $(`<div class='room-service-order-options'>
      <select id='select'>
      </select>
      <button id='order-food-item'>Order</button>
      </div>`).insertAfter('#search-users-orders');
      hotel.roomServicesData.roomServiceData.map(option => domUpdates.addOrderMenu(option))

      hotel.bookingsData.findUserHistoryDates($('#customer-id').text()).map(date => domUpdates.updateUserHistory(date));
        
      hotel.bookingsData.findUserHistoryRooms($('#customer-id').text()).map(room => domUpdates.updateRoomHistory(room));
    }
  });
});