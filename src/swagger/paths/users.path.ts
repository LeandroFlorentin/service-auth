export default [
  {
    path: '/users/me',
    object: {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        tags: ['Users'],
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number', example: 'number' },
                    message: { type: 'string', example: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: {
                          type: 'object',
                          properties: {
                            number: 'string',
                          },
                        },
                        createdAt: { type: 'string' },
                        updatedAt: { type: 'string' },
                      },
                    },
                  },
                  example: {
                    status: 'number',
                    message: 'string',
                    data: {
                      id: 'number',
                      username: 'string',
                      email: 'string',
                      role: ['string'],
                      createdAt: 'string',
                      updatedAt: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/create',
    object: {
      post: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Users'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'John doe2',
                  },
                  email: {
                    type: 'string',
                    example: 'JohnDoe@hotmail.com.ar',
                  },
                  password: {
                    type: 'string',
                    example: 'J123456',
                  },
                  role: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    example: ['USER'],
                  },
                },
                required: ['username', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'number', example: 'number' },
                    message: { type: 'string', example: 'string' },
                    data: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: {
                          type: 'object',
                          properties: {
                            number: 'number',
                          },
                        },
                      },
                    },
                  },
                  example: {
                    status: 'number',
                    message: 'string',
                    data: {
                      id: 'number',
                      username: 'string',
                      email: 'string',
                      role: ['string'],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/update',
    object: {
      put: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        tags: ['Users'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'John doe2',
                  },
                  email: {
                    type: 'string',
                    example: 'JohnDoe@hotmail.com.ar',
                  },
                  password: {
                    type: 'string',
                    example: 'J123456',
                  },
                  role: {
                    type: 'array',
                    items: {
                      type: 'string',
                      example: 'USER',
                    },
                  },
                },
                required: ['username', 'email', 'password'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    status: 'number',
                    message: 'string',
                    data: {},
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    path: '/users/delete',
    object: {
      delete: {
        security: [
          {
            bearerAuth: [],
          },
        ],
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'query',
            required: true,
            schema: { type: 'integer' },
            example: 1,
          },
        ],
        responses: {
          200: {
            description: 'success',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  example: {
                    status: 'number',
                    message: 'string',
                    data: {},
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];
