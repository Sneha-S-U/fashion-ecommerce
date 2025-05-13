pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sneha730/fashion-frontend"
        DOCKER_CREDENTIALS_ID = "dockerhub-credentials"
        EC2_SSH_KEY_ID = "fashion-ecom-deploy-key"
        EC2_USER = "ec2-user" // or "ubuntu" depending on your EC2 AMI
        EC2_HOST = "your-ec2-public-ip"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-username/fashion-ecommerce.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dir('frontend') { // adjust if frontend is in a subfolder
                        sh "docker build -t ${DOCKER_IMAGE}:latest ."
                    }
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
                        docker run -d -p 80:80 --name fashion-frontend ${DOCKER_IMAGE}:latest
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
