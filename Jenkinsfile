pipeline {
    agent any

    environment {
        // Simple Environment Setup
        DOCKER_IMAGE_BACKEND = "eklakalam/vortex-backend:latest"
        DOCKER_IMAGE_FRONTEND = "eklakalam/vortex-frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Pull Updates') {
            steps {
                script {
                    sh 'docker-compose pull'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Inject Secrets & New Port Config
                    sh '''
                    export MYSQL_ROOT_PASSWORD=root_secure_password
                    export MYSQL_DATABASE=vortex_db
                    export MYSQL_USER=vortex_user
                    export MYSQL_PASSWORD=user_secure_password
                    
                    # BACKEND PORT (Now 8081)
                    export BACKEND_PORT=8081
                    export FRONTEND_PORT=3000

                    # Frontend connects to Backend on Port 8081 now!
                    export NEXT_PUBLIC_API_URL=http://$(curl -s ifconfig.me):8081/api/v1
                    
                    docker-compose up -d --remove-orphans
                    '''
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}