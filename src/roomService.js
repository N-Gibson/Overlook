class RoomService {
  constructor(data) {
    this.roomServiceData = data;
  }

  findOrdersByDate(date) {
    return this.roomServiceData.roomServices.filter(order => Date.parse(order.date) === date)
  }

  findOrderCost(date) {
    return this.roomServiceData.roomServices.filter(order => Date.parse(order.date) === date).reduce((cost, log) => {
      cost += log.totalCost;
      return Math.round(cost)
    }, 0)
  }
}

export default RoomService;