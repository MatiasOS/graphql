## Docker
### Build

To build an image use: 
```bash
$ docker build -t matias/server01:0.0.1 .
$ docker build -t matias/server02:0.0.1 .
```

```bash
$ sh dockerBuild.sh
```
Don't forget the last `dot` 

### Run
### Stack
To run the stack: 
```bash
$ docker deploy -c docker-compose.yml g
```
Must be running at `http://localhost:3000/graphiql`

To see docker services use:
```bash
$ docker service ls 
```
to see logs use:
```bash
$ docker service logs [ID]
```
To stop the stack: 
```bash
$ docker stack rm g
```
### Network
The Docker network is create when the stack is deployed.

### Swarm
To start a local swarm:
```bash
$ docker swarm init
```
### Registry