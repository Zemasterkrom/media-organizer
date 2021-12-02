docker-compose down
docker-compose up -d
sleep 1
docker exec  config-mongodb_container-1 bash -c "mongo media-organizer ../scripts/index.mongo.js"
