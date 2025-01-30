export default [
  {
    path: '/auth/login',
    object: {
      post: {
        tags: ['Authentication'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  password: {
                    type: 'string',
                    example: '123456',
                  },
                },
                required: ['username', 'password'],
                example: {
                  username: 'John Doe',
                  password: '123456',
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Sucess',
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
                        acces_token: { type: 'string' },
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
                      role: 'string',
                      access_token: 'string',
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
];
