
var moment = require('moment');
var createdAt = 1234;
var someTimestamp = moment().valueOf();

var date = moment(someTimestamp);

// date.add(1, 'years').subtract(1, 'year')
console.log(date.format('MMM Do, YYYY, h:mm a'))













// var getMonthName = function () {
//   var months = ['Jan', 'Feb', 'Mar', "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
//   var date = new Date();
//   var month = date.getMonth()
//   return months[month]
  //
  // if (month === 0) {
  //   return months[0]
  // } else if (month === 1) {
  //   return months[1]
  // } else if (month === 2) {
  //   return months[2]
  // } else if (month === 3) {
  //   return months[3]
  // } else if (month === 4) {
  //   return months[4]
  // } else if (month === 5) {
  //   return months[5]
  // } else if (month === 6) {
  //   return months[6]
  // } else if (month === 7) {
  //   return months[7]
  // } else if (month === 8) {
  //   return months[8]
  // } else if (month === 9) {
  //   return months[9]
  // } else if (month === 10) {
  //   return months[10]
  // } else if (month === 11) {
  //   return months[11]
  // } else if (month === 12) {
  //   return months[12]
  // }
// }
