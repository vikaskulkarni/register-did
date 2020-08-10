FROM openjdk:8-jdk-alpine
VOLUME /tmp
ADD eureka-service-vk.jar .
EXPOSE 8761
ENTRYPOINT ["java","-jar","eureka-service-vk.jar"]
