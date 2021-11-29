/**
 * This script is to create index inside the collection link of the database media-organizer
 * You can use it with mongo-shell or a tool like Robo3T
 */
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
