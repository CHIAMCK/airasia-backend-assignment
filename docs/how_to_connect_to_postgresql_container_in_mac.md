# How to connec to postgresql container in MAC

1. Get the docker machine ip address

    ```docker-machine ip default```
2. Add it to .envrc

    ```export DATABASE_HOST=192.168.99.100```

3. make sure postgresql is not running in your local machine

4. create database, docker-compose exec db psql postgres --user=postgres
   CREATE DATABASE api;

\du --> show database users
