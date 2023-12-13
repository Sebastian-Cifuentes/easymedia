# Easymedia Backend

1. Clone project
2. Execute ```npm i```
3. Clone the ```.env.template``` file and rename to ```.env```
4. Change entorno variables / be sure to put your user and password for your postgres sql.
5. Load the DB
```
docker-compose up -d
```
6. Run project with: ```npm run start:dev```

# Note

- For running this project you must have these: docker / nestjs.
- To look the api docs, you can access to http://localhost:3000