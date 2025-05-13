pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sneha730/fashion-frontend"
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials-fashionapp"
        EC2_SSH_KEY_ID = "fashion-ecom-deploy-key" 
        EC2_USER = "ubuntu" // depending on your EC2 AMI
        EC2_HOST = "13.201.54.250"
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

        stage('Deploy to EC2') {
            steps {
                sshagent([EC2_SSH_KEY_ID]) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                        docker pull ${DOCKER_IMAGE}:latest
                        docker stop fashion-frontend || true
                        docker rm fashion-frontend || true
                        docker run -d -p 5173:5173 --name fashion-frontend ${DOCKER_IMAGE}:latest
                    EOF
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Deployment completed successfully!"
        }
        failure {
            echo "Pipeline failed. Please check the logs."
        }
    }
}
