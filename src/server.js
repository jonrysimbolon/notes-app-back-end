const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  // Middleware untuk menangani error secara lengkap
  /*server.ext('onPreResponse', (request, h) => {
    const response = request.response;

    if (response.isBoom) {
      console.error(response);
      return h.response({
        statusCode: response.output.statusCode,
        error: response.output.payload.error,
        message: response.message,
        stack: response.stack,
      }).code(response.output.statusCode);
    }

    return h.continue;
  });*/

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
