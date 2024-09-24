const ClientError = require('../../exceptions/ClientError');
 
class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
 
    this.postUploadImageHandler = this.postUploadImageHandler.bind(this);
  }
 
  async postUploadImageHandler(request, h) {
    const { data } = request.payload;
    this._validator.validateImageHeaders(data.hapi.headers);
 
    //const filename = await this._service.writeFile(data, data.hapi); //local
    const fileLocation = await this._service.writeFile(data, data.hapi); //remote
 
    const response = h.response({
    status: 'success',
      data: {
        //fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`, //local
        fileLocation, //remote
      },
    });
    response.code(201);
    return response;
  }
}
 
module.exports = UploadsHandler;