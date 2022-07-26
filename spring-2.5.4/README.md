# Tests with Java Spring

Commands to start and stop container:
```
docker-compose -f docker-compose.yml up -d

docker-compose down
```

---------------------------

Containers for tests:
- FROM openjdk:16-alpine
- FROM openjdk:16-slim

Spring for tests:
- 2.7.2
- 2.5.4
- 2.2.4.RELEASE


---------------------------
### Old data

Before JMX: 200m
After JMX: 240m (+40m)
- Metaspace: 60m
- CodeCache: 20m
- Min.Heap: 30m
- = Sum: 110m
