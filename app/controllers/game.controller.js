const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

class GameController {
  constructor(logger, service) {
    this.logger = logger;
    this.billService = service;
  }

  static validateFile(fileType) {
    return fileType === 'text/csv';
  }

  receiveFile(req, res) {
    this.logger.info(req.files);
    if (!req.files) {
      return Response.failure(res, {message: 'timetable file is required'}, HttpStatus.BAD_REQUEST);
    }

    const {timetable_file} = req.files;
    if (!timetable_file) {
      return Response.failure(res, {message: 'timetable file is required'}, HttpStatus.BAD_REQUEST);
    }

    if (!GameController.validateFile(timetable_file.type)) {
      return Response.failure(res, {message: 'file is not a csv file'}, HttpStatus.BAD_REQUEST);
    }

    this.billService.handleFileData(`${timetable_file.path}`)
      .then(result => {
        if (!result) {
          return Response.failure(res, {message: result}, HttpStatus.BAD_REQUEST);
        }
        const paths = result.toString().split('/');
        const fileUrl = `/output/${paths[paths.length - 1]}`;

        return Response.success(res, {message: fileUrl}, HttpStatus.ACCEPTED);
      })
      .catch(err => {
        this.logger.error(err);
        return Response.failure(res, {message: "An error occurred, please try again later"}, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

}

module.exports = GameController;
