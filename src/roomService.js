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
      return cost;
    }, 0)
  }

  findOrderByUser(id) {
    return this.roomServiceData.filter(order => order.userID == id).map(breakdown => breakdown.food)
  }

  findCostByUser(id) {
    return this.roomServiceData.filter(order => order.userID == id).reduce((cost, breakdown) => {
      cost += breakdown.totalCost
      return cost
    }, 0);
  }

  findOrdersOfUserAtDate(id, date) {
    return this.roomServiceData.filter(order => order.userID == id).filter(breakdown => Date.parse(breakdown.date) === date).reduce((cost, log) => {
      cost += log.totalCost
      return cost
    }, 0);
  }

  addOrder(date, food, cost, id) {
    let numId = parseInt(id);
    this.roomServiceData.push({date: date, food: food, totalCost: cost, userID: numId})
  }
}

export default RoomService;