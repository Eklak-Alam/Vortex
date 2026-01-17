# ========================
# STAGE 1: Build the App
# ========================
# We use a Maven image to compile the Java code
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# 1. Copy only the pom.xml first
# This allows Docker to cache dependencies. If you don't change pom.xml,
# it won't re-download all the jars next time.
COPY pom.xml .

# 2. Download dependencies (Offline mode)
RUN mvn dependency:go-offline

# 3. Copy the actual source code
COPY src ./src

# 4. Build the application (Skip tests to speed up deployment)
RUN mvn clean package -DskipTests

# ========================
# STAGE 2: Run the App
# ========================
# We use a lightweight Alpine JDK image for the final container
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# 5. Copy ONLY the built JAR file from the 'build' stage
# This keeps your final image small (around 150MB instead of 800MB)
COPY --from=build /app/target/*.jar app.jar

# 6. Expose the port
EXPOSE 8080

# 7. Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]