// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: any = {
  production: false,
  backend: {
    protocol: 'http',
    host: 'localhost',
    port: '3000',
    endpoints: {
      documents: {
        all: '/document/all',
        one: '/document/findById/:id',
        add: '/document/add',
        update: '/document/update/:id',
        delete: '/document/delete/:id'
      },

      links: {
        all: '/link/all',
        one: '/link/findById/:id',
        add: '/link/add',
        update: '/link/update/:id',
        delete: '/link/delete/:id'
      },

      notes: {
        all: '/note/all',
        one: '/note/findById/:id',
        add: '/note/add',
        update: '/note/update/:id',
        delete: '/note/delete/:id'
      }
    }
  },
  frontend: {
    protocol: 'http',
    host: 'localhost',
    port: '4200',
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
