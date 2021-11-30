// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: any = {
  production: false,
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
        update: '/media-organizer/documents/update',
        delete: '/media-organizer/documents/delete'
      },

      links: {
        all: '/media-organizer/links',
        one: '/media-organizer/links/:id',
        add: '/media-organizer/links/add',
        update: '/media-organizer/links/update',
        delete: '/media-organizer/links/delete/:id'
      },

      notes: {
        all: '/media-organizer/notes',
        one: '/media-organizer/notes/:id',
        add: '/media-organizer/notes/add',
        update: '/media-organizer/notes/update',
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
