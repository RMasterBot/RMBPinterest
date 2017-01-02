module.exports = {
  endpoints:[
    {
      method: 'get',
      url: '/v1/me/',
      description: 'Return authenticated user information',
      scope: 'read_public',
      parameters: {
        required: [],
        optional: []
      }
    },
    {
      method: 'get',
      url: '/v1/me/boards/',
      description: 'Return authenticated user’s public boards',
      scope: 'read_public',
      parameters: {
        required: [],
        optional: []
      }
    },
    {
      method: 'get',
      url: '/v1/me/boards/suggested/',
      description: 'Returns the boards that Pinterest would suggest to the authenticated user if they were to save the specified Pin',
      scope: 'read_public',
      parameters: {
        required: ['pin'],
        optional: []
      }
    },
    {
      method: 'get',
      url: '/v1/me/likes/',
      description: 'Return authenticated user’s Pins liked',
      scope: 'read_public',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/pins/',
      description: 'Return authenticated user’s Pins',
      scope: 'read_public',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/search/boards/',
      description: 'Searches the authenticated user’s board names (but not Pins on boards)',
      scope: 'read_public',
      parameters: {
        required: ['query'],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/search/pins/',
      description: 'Searches the authenticated user’s Pin descriptions',
      scope: 'read_public',
      parameters: {
        required: ['query'],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/followers/',
      description: 'Returns the users who follow the authenticated user',
      scope: 'read_relationships',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/following/boards/',
      description: 'Returns the boards that the authenticated user follows',
      scope: 'read_relationships',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/following/interests/',
      description: 'Returns the topics (e.g, modern architecture, Sherlock) that the authenticated user follows',
      scope: 'read_relationships',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/me/following/users/',
      description: 'Returns the users that the authenticated user follows',
      scope: 'read_relationships',
      parameters: {
        required: [],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/boards/<board>/',
      description: 'Returns the specified board',
      scope: 'read_public',
      parameters: {
        required: ['board'],
        optional: []
      }
    },
    {
      method: 'get',
      url: '/v1/boards/<board>/pins/',
      description: 'Returns list of Pins on the board',
      scope: 'read_public',
      parameters: {
        required: ['board'],
        optional: ['cursor']
      }
    },
    {
      method: 'get',
      url: '/v1/pins/<pin>/',
      description: 'Returns Pin information',
      scope: 'read_public',
      parameters: {
        required: ['pin'],
        optional: []
      }
    },
    {
      method: 'post',
      url: '/v1/me/following/boards/',
      description: 'Makes the authenticated user follow the specified board',
      scope: 'write_relationships',
      parameters: {
        required: ['board'],
        optional: []
      }
    },
    {
      method: 'post',
      url: '/v1/me/following/users/',
      description: 'Makes the authenticated user follow the specified user',
      scope: 'write_relationships',
      parameters: {
        required: ['user'],
        optional: []
      }
    },
    {
      method: 'post',
      url: '/v1/boards/',
      description: 'Creates a board for the authenticated user',
      scope: 'write_public',
      parameters: {
        required: ['name'],
        optional: ['description']
      }
    },
    {
      method: 'post',
      url: '/v1/pins/',
      description: 'Creates a Pin for the authenticated user (1 of 3 image parameters is required)',
      scope: 'write_public',
      parameters: {
        required: ['board', 'note', 'image', 'image_url', 'image_base64'],
        optional: ['link']
      }
    },
    {
      method: 'patch',
      url: '/v1/boards/<board>/',
      description: 'Changes the chosen board’s name and/or description',
      scope: 'write_public',
      parameters: {
        required: ['board'],
        optional: ['name', 'description']
      }
    },
    {
      method: 'patch',
      url: '/v1/pins/<pin>/',
      description: 'Changes the board, description and/or link of the Pin',
      scope: 'write_public',
      parameters: {
        required: ['pin'],
        optional: ['board', 'note', 'link']
      }
    },
    {
      method: 'delete',
      url: '/v1/me/following/boards/<board>/',
      description: 'Makes the authenticated user unfollow the specified board',
      scope: 'write_relationships',
      parameters: {
        required: ['board'],
        optional: []
      }
    },
    {
      method: 'delete',
      url: '/v1/me/following/users/<user>/',
      description: 'Makes the authenticated user unfollow the specified user',
      scope: 'write_relationships',
      parameters: {
        required: ['user'],
        optional: []
      }
    },
    {
      method: 'delete',
      url: '/v1/boards/<board>/',
      description: 'Deletes the specified board',
      scope: 'write_public',
      parameters: {
        required: ['board'],
        optional: []
      }
    },
    {
      method: 'delete',
      url: '/v1/pins/<pin>/',
      description: 'Deletes the specified Pin',
      scope: 'write_public',
      parameters: {
        required: ['pin'],
        optional: []
      }
    }
  ],
  parameters:[
    {
      name: 'fields',
      type: 'string',
      description: 'Choose what attributes will be return. For nested ressource use "board(id,name)"'
    },
    {
      name: 'limit',
      type: 'int',
      description: 'Set limit when using pagination (max 100)'
    },
    {
      name: 'board',
      type: 'string',
      description: 'Board format <username/board>'
    },
    {
      name: 'query',
      type: 'string',
      description: 'String to search'
    },
    {
      name: 'cursor',
      type: 'string',
      description: 'Use with pagination'
    },
    {
      name: 'user',
      type: 'string',
      description: 'The username'
    },
    {
      name: 'pin',
      type: 'string',
      description: 'The ID (unique string of numbers and letters) of the Pin'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Board Name'
    },
    {
      name: 'description',
      type: 'string',
      description: 'Board description'
    },
    {
      name: 'note',
      type: 'string',
      description: 'Pin description'
    },
    {
      name: 'link',
      type: 'string',
      description: 'The URL the Pin will link to when you click through'
    },
    {
      name: 'image',
      type: 'string',
      description: 'Filepath - Upload the image you want to pin using multipart form data'
    },
    {
      name: 'image_url',
      type: 'string',
      description: 'Link to the image that you want to Pin'
    },
    {
      name: 'image_base64',
      type: 'string',
      description: 'Link of a Base64 encoded image'
    }
  ]
};