pipeline {
    agent any

    environment {
        // 1. Define Image Names
        BACKEND_IMAGE = "eklakalam/vortex-backend:latest"
        FRONTEND_IMAGE = "eklakalam/vortex-frontend:latest"
        
        // 2. AUTO-DETECT SERVER IP (Fixes the localhost issue automatically)
        // This command runs on the EC2 and gets its own Public IP
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
                    // We build directly. If this fails, the pipeline stops (Acting as a Sanity Check)
                    sh "docker build -t $BACKEND_IMAGE ./backend"
                    sh "docker push $BACKEND_IMAGE"

                    echo "------------------------------------------------"
                    echo "🔨 Building Frontend..."
                    echo "🌍 Injection API URL: http://${SERVER_IP}:8081/api/v1"
                    
                    // CRITICAL FIX: We inject the REAL IP, not localhost
                    sh """
                    docker build \
                    --build-arg NEXT_PUBLIC_API_URL=http://${SERVER_IP}:8081/api/v1 \
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
                    
                    // No SSH needed! Jenkins runs this directly on the server.
                    sh '''
                    # 1. Export Runtime Secrets (Database Config)
                    export MYSQL_ROOT_PASSWORD=root_secure_password
                    export MYSQL_DATABASE=vortex_db
                    export MYSQL_USER=vortex_user
                    export MYSQL_PASSWORD=user_secure_password
                    
                    # 2. Export Ports (Aligning with your Backend Config)
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
    // POST ACTIONS (Notifications & Cleanup)
    // ============================================
    post {
        always {
            script {
                echo "🧹 Cleaning up Disk Space..."
                // Remove unused images to keep t2.micro happy
                sh 'docker image prune -af' 
            }
        }
        success {
            script {
                echo "✅ Deployment Successful!"
                // Optional: Send Email (Requires Jenkins Email Plugin)
                // mail to: 'eklakalam420@gmail.com',
                //      subject: "✅ Deploy Success: Vortex",
                //      body: "Your pipeline finished successfully on Server ${SERVER_IP}"
            }
        }
        failure {
            script {
                echo "❌ Deployment Failed!"
                // mail to: 'eklakalam420@gmail.com',
                //      subject: "❌ Deploy Failed: Vortex",
                //      body: "Check Jenkins logs immediately."
            }
        }
    }
}