#!/bin/sh
set -uex
docker build -t docker_issue/31587 .
cid=$(docker run -d docker_issue/31587)
sleep 2
docker logs $cid
docker exec $cid sh -c 'echo -e test2 >> /file'
docker exec $cid cat /file
sleep 3
docker logs $cid
docker stop $cid
docker start $cid
sleep 2
docker logs $cid
docker stop $cid
