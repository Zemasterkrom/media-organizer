export const environment = {
  production: true,
  frontend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      home: '/media-organizer',

      documents: {
        all: '/media-organizer/documents',
        one: '/media-organizer/documents/:id',
        add: '/media-organizer/documents/add',
        update: '/media-organizer/documents/update/:id',
        delete: '/media-organizer/documents/delete/:id'
      },

      links: {
        all: '/media-organizer/links',
        one: '/media-organizer/links/:id',
        add: '/media-organizer/links/add',
        update: '/media-organizer/links/update/:id',
        delete: '/media-organizer/links/delete/:id'
      },

      notes: {
        all: '/media-organizer/notes',
        one: '/media-organizer/notes/:id',
        add: '/media-organizer/notes/add',
        update: '/media-organizer/notes/update/:id',
        delete: '/media-organizer/notes/delete/:id'
      }
    }
  }
};
