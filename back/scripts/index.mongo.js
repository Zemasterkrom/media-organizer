use media-organizer;

db.getCollection('links').createIndex(
    { name: 1},
    { unique: true }
);

db.getCollection('notes').createIndex(
    { name: 1},
    { unique: true }
);

db.getCollection('docs').createIndex(
    { name: 1},
    { unique: true }
);
