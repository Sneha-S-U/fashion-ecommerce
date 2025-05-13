pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sneha730/fashion-frontend"
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials-fashionapp"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'frontend', url: 'https://github.com/Sneha-S-U/fashion-ecommerce.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh """
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Docker image built and pushed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
