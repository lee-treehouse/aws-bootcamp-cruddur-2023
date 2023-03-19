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
12. interesting part of video around 1:07 where we use SimpleSpanProcessor, ConsoleSpanExporter to debug why no data is being received at honeycomb
13. using the Console Span Exporter showed me no traces were being created which helped me realise the issue was a copy/paste error - in app.py I was reassigning app after I had attached the instrumentation.
14. tested that automatic tracing was working and added a custom span and attribute

Cloudwatch logs

1. add watchtower to requirements.text and pip install
2. checked that aws cli was already configured (I did this by typing `aws configure` and seeing that defaults were already set, is there a better way?)
3. added watchtower code, ran docker compose up and saw error in backend-flask container "botocore.exceptions.NoRegionError: You must specify a region". I looked up how to check my region with `aws configure get region` and it is set, but hangon if these are all envs set locally that doesn't mean they're set for the container.
4. ah yes amazing.. I updated my .env.example and set my aws env staff and passed it through to the docker compose and now my logs are going to cloudwdatch and I"ve been able to view them there. Now I'll actually watch the video..
