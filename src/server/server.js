require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const loadModel = require('../services/loadModel');
const InputError = require('../exceptions/InputError');

(async () => {
  const server = Hapi.server({
    port: 3001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  server.ext('onPreResponse', function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      if (response.message === 'Unsupported Media Type') {
        const newResponse = h.response({
          status: 'fail',
          message: 'Terjadi kesalahan dalam melakukan prediksi',
        });
        newResponse.code(400);
        return newResponse;
      }
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(413);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server start at: ${server.info.uri}`);
})();