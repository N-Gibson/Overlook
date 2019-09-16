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
      return cost
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
    // Need to do some debugging here the numbers are coming in undefinded (the dates are different when they really arent)
    
    return this.roomServiceData.filter(order => order.userID == id).filter(breakdown => Date.parse(breakdown.date) === date).reduce((cost, log) => {
      cost += log.totalCost
      return cost
    }, 0);
  }
}

export default RoomService;