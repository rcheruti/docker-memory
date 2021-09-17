# Spring 2.5.4

Containers para os testes:
- FROM openjdk:16-alpine
- FROM openjdk:16-slim
- FROM registry.access.redhat.com/ubi8/openjdk-11:1.10-1

Spring para testes:
- 2.5.4
- 2.2.4.RELEASE



Antes JMX: 200m
Depois JMX: 240m (+40m)
- Metaspace: 60m
- CodeCache: 20m
- Min.Heap: 30m
- = Soma: 110m
