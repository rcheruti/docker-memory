
# --------------------------------------------------
# Criar imagem para Golang 17 e Alpine

DOCKER_TAG=teste-go17alpine:0.0.1
docker rmi $DOCKER_TAG
docker build -t $DOCKER_TAG .
