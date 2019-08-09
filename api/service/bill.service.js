const fs = require('fs');
const config = require("../config/settings");
class BillService {
  constructor(logger) {
    this.logger = logger;
  }

  static findHourDifference(time1, time2) {
    const HOUR_IN_MILLIS = 60 * 60 * 1000;
    const dateString = "July 23, 2019 ";
    const dateOne = new Date(dateString + time1);
    const dateTwo = new Date(dateString + time2);

    return (dateTwo - dateOne) / HOUR_IN_MILLIS;
  }

  handleFileData(filePath) {
    return new Promise((resolve, reject) => {
      resolve("todo")
    });
  }


}

module.exports = BillService;
