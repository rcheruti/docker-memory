ARG image=openjdk:16-alpine
FROM ${image}

COPY ./target/*.jar app.jar

EXPOSE 8080

ENV java_config=" -XX:+UnlockExperimentalVMOptions -XX:MaxHeapFreeRatio=2 -XX:MinHeapFreeRatio=1 "

CMD java $java_config -jar app.jar
