pipeline {
    agent any

    environment {
        PROJECT_NAME = 'myproject'
        COMPOSE_FILE = 'docker-compose.yml'
        IMAGE_NAME = 'myapp-image'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    sh "docker-compose -p ${PROJECT_NAME} -f ${COMPOSE_FILE} up -d --build"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment succeeded!'
        }
        failure {
            echo '❌ Build or deployment failed!'
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
