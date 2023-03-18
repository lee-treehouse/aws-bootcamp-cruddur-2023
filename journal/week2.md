# Week 2 — Distributed Tracing

Honeycomb first

1. add opentelemetry dependencies to requirements.text and pip3 install in backend.
2. login to honeycomb
3. set honeycomb env vars and confirm them with `env` or `env | grep HONEYCOMB_SERVICE_NAME` and `env | grep HONEYCOMB_API_KEY`
4. review envs - unset `HONEYCOMB_SERVICE_NAME` and specify it for the service directly in docker compose
5. discussion of env variables and parallel shells vs sub shells - interesting discussion
6. found out with docker compose you can have a .env in the root alongside your docker-compose
7. tried to verify my docker-compose was getting the right env with command `docker-compose config` but got error message no configuration file provided: not found
8. realised thanks to stack overflow my docker compose yml was misnamed, corrected to `docker-compose.yml` and now docker-compose config showed .env was being loaded
9. docker compose up, used service and checked honeycomb for data..
10. good conversation about using slim base image for prod, but fully featured base image for local dev for debugging, etc
11. my esampole is not working, but we could exec into the container to look at env and i can see this format looks weird - is it right?
    `OTEL_EXPORTER_OTLP_HEADERS=x-honeycomb-team=19MaB4JbQBrWmMBNTfqNuC`
