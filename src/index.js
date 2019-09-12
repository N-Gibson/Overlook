// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';
import Hotel from '../src/hotel.js';
import domUpdates from '../src/domUpdates.js';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let hotel; 

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
.then(data => hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices));
  
$(document).ready(() => {
  $('#hotel-content, #customer-content, #bookings-content, #room-service-content').hide();

  $('<p id="welcome-content">Welcome to the Overlook Hotel</p>').insertAfter('main');

  $('#hotel').click(() => {
    $('#welcome-content').remove();
    $('#customer-content, #bookings-content, #room-service-content').hide();
    $('#hotel-content').show();
  });

  $('#customer').click(() => {
    $('#welcome-content').remove();
    $('#hotel-content, #bookings-content, #room-service-content').hide();
    $('#customer-content').show();
  });

  $('#bookings').click(() => {
    $('#welcome-content').remove();
    $('#hotel-content, #customer-content, #room-service-content').hide();
    $('#bookings-content').show();
  });

  $('#room-service').click(() => {
    $('#welcome-content').remove();
    $('#hotel-content, #customer-content, #bookings-content').hide()
    $('#room-service-content').show();
  });

});