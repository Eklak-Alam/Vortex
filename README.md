# VORTEX V1: CODEBASE & ARCHITECTURE EXPLAINED

1. PROJECT OVERVIEW
-------------------
Vortex is a production-grade full-stack application designed to demonstrate 
modern DevOps principles. It solves the common problem of "it works on my 
machine" by containerizing the entire stack (Frontend, Backend, Database, 
and Proxy) and automating the deployment using Jenkins.


2. FRONTEND ARCHITECTURE (Next.js)
----------------------------------
Location: /frontend

The client-side is built with Next.js 14. Unlike traditional React apps, 
Next.js requires environment variables to be present at *build time* because 
it compiles JavaScript into static optimization.

* The Dockerfile Strategy:
  To make the frontend dynamic without hardcoding IP addresses, the Dockerfile 
  accepts a build argument called 'NEXT_PUBLIC_API_URL'.
  
  - ARG: Catches the variable passed from Jenkins during the build command.
  - ENV: Sets it as a system environment variable so the Next.js compiler 
         can "bake" the API URL into the final static files.


3. BACKEND ARCHITECTURE (Spring Boot)
-------------------------------------
Location: /backend

The server-side logic is powered by Java Spring Boot. It exposes a RESTful 
API on port 8081.

* Database Connection:
  The application does not connect to 'localhost'. Instead, it connects to 
  the hostname 'mysql_db'. This is possible because Docker provides an 
  internal DNS service.

* Security:
  The backend port (8081) is not exposed to the host machine in the final 
  production setup. It is only accessible internally by the Nginx container, 
  preventing direct external attacks on the API.


4. THE GATEKEEPER (Nginx Reverse Proxy)
---------------------------------------
Location: /nginx/vortex.conf

Nginx acts as the single entry point for the application, listening on 
standard HTTP Port 80.

* Routing Logic:
  1. Root (/): Requests are forwarded to the 'frontend' container on port 
     3000. Headers are upgraded to support WebSockets, ensuring Next.js 
     hot-reloading features work correctly.
     
  2. API (/api): Requests are forwarded to the 'backend' container on port 
     8081. Nginx attaches the 'X-Real-IP' header so the backend can log 
     the actual user's IP address instead of the internal Docker IP.


5. ORCHESTRATION (Docker Compose)
---------------------------------
File: docker-compose.yml

This file acts as the blueprint for the infrastructure. It defines four 
services: frontend, backend, mysql_db, and nginx.

* Networking: 
  All services share a custom bridge network called 'vortex-network'.

* Port Management (Expose vs Ports): 
  The frontend and backend use 'expose' instead of 'ports'. This means they 
  are accessible to other containers (like Nginx) but invisible to the 
  outside world. Only Nginx maps 80:80, ensuring a secure and clean URL.

* Health Checks: 
  The database includes a health check to ensure it is fully ready before 
  the backend attempts to connect, preventing crash-loops on startup.


6. AUTOMATION PIPELINE (Jenkins)
--------------------------------
File: Jenkinsfile

The CI/CD pipeline automates the "Commit to Deploy" process. It runs directly 
on the EC2 instance.

* Dynamic IP Injection:
  The pipeline executes a shell script ('curl -s ifconfig.me') to detect 
  the server's current public IP address. This IP is passed into the 
  frontend build process automatically. This eliminates the need for manual 
  configuration changes if the server IP rotates.

* Optimization:
  The pipeline includes a 'post { always { ... } }' block that runs 
  'docker image prune -af'. This automatically deletes unused Docker layers 
  after every deployment, preventing the limited disk space of the AWS 
  t2.micro instance from filling up.