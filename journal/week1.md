# Week 1 — App Containerization

get frontend running locally and test at http://localhost:3000/
create frontend dockerfile, build image, run container

get backend running locally and test at http://localhost:4567/api/activities/home
create backend dockerfile, build image, run container

tried making changes and they did not reload - this may come with the docker compose
and the var mount or something? that will be my next step to investigate

ok I've started up my docker compose
(first I replaced the env vars to \* instead of the gitpod urls)
it's up - can i make a live change now?
Yes

Ok, next steps are going to involve setting up the db and go beyond what was in the first video.

interesting things
-t name
resolves to -t name:latest
so latest is like the default tag

docker extension in vs code
so easy to exec into running container

"Ports" as tab in vs code terminal - does it relate to this extension?
https://code.visualstudio.com/docs/remote/ssh

running docker compose up by right clicking on docker compose file (does not run detached tho)
