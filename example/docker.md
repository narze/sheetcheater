# Docker Cheatsheet

## Images

### Build & Tag #cli #image

- `docker build -t myapp:latest .` — build image from Dockerfile
- `docker tag myapp:latest myapp:v1` — tag an image
- `docker rmi myapp:v1` — remove image

### Inspect #cli

- `docker images` — list local images
- `docker inspect nginx` — detailed image info
- `docker history nginx` — layer history

## Containers

### Run & Stop #cli #container

- `docker run -d -p 80:80 nginx` — run detached with port mapping
- `docker stop <id>` — stop container
- `docker rm <id>` — remove stopped container
- `docker ps -a` — list all containers

### Exec & Logs #cli

- `docker exec -it <id> bash` — shell into running container
- `docker logs -f <id>` — follow logs
- `docker cp <id>:/app/file .` — copy file from container

## Compose

### Lifecycle #cli #compose

- `docker compose up -d` — start services in background
- `docker compose down` — stop and remove
- `docker compose build` — rebuild images
- `docker compose logs -f` — follow all service logs

### Shortcuts #cli

- `docker compose up --build` — build then start
- `docker compose restart web` — restart single service
- `docker compose exec db psql` — run command in service
