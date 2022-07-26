
# --------------------------------------------------
# Criar imagem para Spring 2.2.4.RELEASE e Alpine
SPRING_VERSION=2.2.4.RELEASE
mvn -Dspring-version=2.2.4.RELEASE clean package

DOCKER_TAG=teste-jdk16alpine-spring-2.2.4:0.0.1
docker rmi $DOCKER_TAG
docker build --build-arg image=openjdk:16-alpine -t $DOCKER_TAG .


# --------------------------------------------------
# Criar imagem para Spring 2.5.4 e Alpine
SPRING_VERSION=2.5.4
mvn -Dspring-version=$SPRING_VERSION clean package

DOCKER_TAG=teste-jdk16alpine-spring-${SPRING_VERSION}:0.0.1
docker rmi $DOCKER_TAG
docker build --build-arg image=openjdk:16-alpine -t $DOCKER_TAG .

# Criar imagem com Debian Slim
DOCKER_TAG=teste-jdk16slim-spring-${SPRING_VERSION}:0.0.1
docker rmi $DOCKER_TAG
docker build --build-arg image=openjdk:16-slim -t $DOCKER_TAG .

# Criar imagem com ubi8/openjdk-11
DOCKER_TAG=teste-jdk11-ubi8-redhat-spring-${SPRING_VERSION}:0.0.1
docker rmi $DOCKER_TAG
docker build --build-arg image=registry.access.redhat.com/ubi8/openjdk-11:1.10-1 -t $DOCKER_TAG .
