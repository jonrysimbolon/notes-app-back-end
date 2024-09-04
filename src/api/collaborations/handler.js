class CollaborationsHandler{
  constructor(collaborationService, notesService, validator){
    this._collaborationsService = collaborationService;
    this._notesService = notesService;
    this._validator = validator;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h){
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;
    /*console.log("noteId: ");
    console.log(noteId);
    console.log("userId: ");
    console.log(userId);*/

    await this._notesService.verifyNoteOwner(noteId, credentialId);
    //console.log("masuk sini 1")
    const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);
    //console.log("collaborationId: ");
    //console.log(collaborationId);

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });

    response.code(201);
    return response;
  }

  async deleteCollaborationHandler(request, h){
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;
    /*console.log("noteId: ");
    console.log(noteId);
    console.log("userId: ");
    console.log(userId);*/

    await this._notesService.verifyNoteOwner(noteId, credentialId);
    //console.log("masuk sini 1")
    await this._collaborationsService.deleteCollaboration(noteId, userId);
    //console.log("masuk sini 2");

    return{
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    };
  }
}

module.exports = CollaborationsHandler;