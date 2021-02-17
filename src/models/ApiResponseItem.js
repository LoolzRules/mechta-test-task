export default class ApiResponseItem {
  constructor(respItem) {
    this.city = respItem.city;
    this.type = respItem.type;
    this.available = respItem.available;
    this.price = respItem.price;
  }
}