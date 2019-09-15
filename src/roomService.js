class RoomService {
  constructor(data) {
    this.roomServiceData = data;
  }
  
  findOrdersByDate(date) {
    return this.roomServiceData.filter(order => Date.parse(order.date) === date).map(order => order.food);
  }

  findOrderCost(date) {
    return this.roomServiceData.filter(order => Date.parse(order.date) === date).reduce((cost, log) => {
      cost += log.totalCost;
      return Math.round(cost)
    }, 0)
  }

  findOrderByUser(id) {
    return this.roomServiceData.filter(order => order.userID == id).map(breakdown => breakdown.food)
  }
}

export default RoomService;