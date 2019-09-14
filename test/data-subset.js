const data = [
   { users: [
    {
    id: 1,
    name: "Matilde Larson"
    },
    {
    id: 2,
    name: "Chadrick Lowe"
    },
    {
    id: 3,
    name: "Christian Sporer"
    },
    {
    id: 4,
    name: "Brook Christiansen"
    },
    {
    id: 5,
    name: "Noemy Little"
    } 
  ]} ,
  { rooms: [
    {
    number: 1,
    roomType: "residential suite",
    bidet: false,
    bedSize: "twin",
    numBeds: 1,
    costPerNight: 265.03
    },
    {
    number: 2,
    roomType: "single room",
    bidet: true,
    bedSize: "full",
    numBeds: 1,
    costPerNight: 228.01
    },
    {
    number: 3,
    roomType: "suite",
    bidet: false,
    bedSize: "twin",
    numBeds: 1,
    costPerNight: 275.99
    },
    {
    number: 4,
    roomType: "junior suite",
    bidet: false,
    bedSize: "full",
    numBeds: 1,
    costPerNight: 177.03
    },
    {
    number: 5,
    roomType: "junior suite",
    bidet: false,
    bedSize: "king",
    numBeds: 2,
    costPerNight: 246.65
    }
  ] },
  { bookings: [
    {
    userID: 4,
    date: "2019/10/19",
    roomNumber: 5
    },
    {
    userID: 29,
    date: "2019/10/19",
    roomNumber: 35
    },
    {
    userID: 9,
    date: "2019/08/16",
    roomNumber: 41
    },
    {
    userID: 88,
    date: "2019/08/16",
    roomNumber: 23
    },
    {
    userID: 52,
    date: "2019/08/16",
    roomNumber: 23
    }
  ] },
  { roomServices: [
    {
    userID: 14,
    date: "2019/07/29",
    food: "Rustic Concrete Sandwich",
    totalCost: 14.9
    },
    {
    userID: 100,
    date: "2019/10/18",
    food: "Rustic Cotton Sandwich",
    totalCost: 17.33
    },
    {
    userID: 92,
    date: "2019/09/26",
    food: "Tasty Wooden Sandwich",
    totalCost: 11.15
    },
    {
    userID: 8,
    date: "2019/08/02",
    food: "Practical Granite Sandwich",
    totalCost: 14.87
    },
    {
    userID: 48,
    date: "2019/09/26",
    food: "Fantastic Cotton Sandwich",
    totalCost: 17.61
    }
  ] }
];

export default data;