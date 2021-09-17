
# --------------------------------------------------
# Criar imagem para node 16 e Alpine

DOCKER_TAG=teste-node16alpine:0.0.1
docker rmi $DOCKER_TAG
docker build -t $DOCKER_TAG .
