# Simple Clickthrough 

```sh
export PGUSER=webstats
export PGPASSWORD=webstats
export PGDATABASE=webstats
export PGHOST=localhost

docker run --name db \
    --rm \
    -e POSTGRES_USER=${PGUSER} \
    -e POSTGRES_PASSWORD=${PGPASSWORD} \
    -p 5432:5432 \
    -v ${PWD}:/docker-entrypoint-initdb.d \
    -it postgres

# Testing INSERT
# deno run --unstable --allow-read --allow-net --allow-env app/test-insert.ts

# Running API
deno run --unstable --allow-read --allow-net --allow-env app/main.ts
```

