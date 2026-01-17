pipeline {
    agent any

    environment {
        // 1. Define Image Names
        BACKEND_IMAGE = "eklakalam/vortex-backend:latest"
        FRONTEND_IMAGE = "eklakalam/vortex-frontend:latest"
        
        // 2. AUTO-DETECT SERVER IP
        // Finds the EC2 Public IP automatically.
        SERVER_IP = sh(script: "curl -s ifconfig.me", returnStdout: true).trim()
    }

    stages {
        // ============================================
        // STAGE 1: CHECKOUT & PREPARE
        // ============================================
        stage('📥 Get Code') {
            steps {
                echo "Fetching latest code..."
                checkout scm
            }
        }

        // ============================================
        // STAGE 2: LOGIN TO DOCKER HUB
        // ============================================
        stage('🔑 Login Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        // ============================================
        // STAGE 3: BUILD & PUSH (The Heavy Lifting)
        // ============================================
        stage('🐳 Build & Push Images') {
            steps {
                script {
                    echo "------------------------------------------------"
                    echo "🔨 Building Backend..."
                    sh "docker build -t $BACKEND_IMAGE ./backend"
                    sh "docker push $BACKEND_IMAGE"

                    echo "------------------------------------------------"
                    echo "🔨 Building Frontend..."
                    
                    // ✨ NGINX OPTIMIZATION:
                    // We point to Port 80 (default HTTP), so we remove ":8081" from the URL.
                    // Nginx will receive this and forward it to the backend internally.
                    echo "🌍 API URL: http://${SERVER_IP}/api/v1"
                    
                    sh """
                    docker build \
                    --build-arg NEXT_PUBLIC_API_URL=http://${SERVER_IP}/api/v1 \
                    -t $FRONTEND_IMAGE ./frontend
                    """
                    sh "docker push $FRONTEND_IMAGE"
                }
            }
        }

        // ============================================
        // STAGE 4: DEPLOY (Local Execution)
        // ============================================
        stage('🚀 Deploy to this Server') {
            steps {
                script {
                    echo "Deploying new version..."
                    
                    sh '''
                    # 1. Export Runtime Secrets (Database Config)
                    export MYSQL_ROOT_PASSWORD=root_secure_password
                    export MYSQL_DATABASE=vortex_db
                    export MYSQL_USER=vortex_user
                    export MYSQL_PASSWORD=user_secure_password
                    
                    # 2. Export Ports (Needed for docker-compose to map correctly)
                    # Note: These are now hidden behind Nginx, but we keep the variables consistent.
                    export BACKEND_PORT=8081
                    export FRONTEND_PORT=3000
                    
                    # 3. Pull latest updates
                    docker-compose pull
                    
                    # 4. Restart Containers (Zero Downtime attempt)
                    docker-compose up -d --remove-orphans
                    '''
                }
            }
        }
    }

    // ============================================
    // POST ACTIONS (Cleanup Only)
    // ============================================
    post {
        always {
            script {
                echo "🧹 Cleaning up Disk Space..."
                // Removes unused images to keep your t2.micro server happy
                sh 'docker image prune -af' 
            }
        }
    }
}