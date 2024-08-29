const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GEt',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;
