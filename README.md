# TaskStore

To start the project you need:

## Install docker && docker-compose

To install docker, please visit: https://docs.docker.com/install/

To install docker-compose, please visit: https://docs.docker.com/compose/install/

## Run application via docker-compose

docker compose will create containers : `db`, `frontendangular`, `backendnode`

```
docker-compose up -d
```

**Database** uses `mysql` image and run through port `3306`

**Frontend** uses `node` image and run through port `4200`

**Backend** uses `node` image and run through port `3000`

**_UI:_ http://localhost:4200**
