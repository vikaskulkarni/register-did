FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD zuul-service-vk.jar .
EXPOSE 8081
EXPOSE 8181
ENTRYPOINT ["java","-jar","zuul-service-vk.jar"]
