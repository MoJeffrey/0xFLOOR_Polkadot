```shell
# Docker
docker run -itd -p 3000:3000 -v /mnt/g/NodeJs/0xFLOOR_Polkadot:/home --name=Khala node:alpine
docker exec -it Khala sh

docker stop Khala
docker container rm Khala
# 启动
cd /home
npm install
npx ts-node src/index.ts

```
