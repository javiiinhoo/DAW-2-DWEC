class Taxi {
  constructor(name, distance, numTravels) {
    this.name = name;
    this.distance = distance;
    this.numTravels = numTravels;
  }
  
  moneyMade() {
    return this.distance * 0.15 + this.numTravels * 3.86;
  }
}
export default Taxi;