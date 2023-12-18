pipeline {
    agent any
    triggers {
        githubPush()
    }
    environment {
        DOCKER_IMAGE_NAME = 'yakovperets/zalmans-server'
        DOCKER_REGISTRY_CREDENTIALS_ID = credentials('barakuni')
        TAG = sh(script: 'git describe --tags', returnStdout: true).trim()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'echo $TAG ;'
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yakovperets/zalmans-server.git']]])
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Create the network if it doesn't exist
                    sh 'docker network ls | grep -q app-network || docker network create app-network'

                    // Build the Docker image for Node.js server
                    sh "docker build -t $DOCKER_IMAGE_NAME ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([usernamePassword(credentialsId: DOCKER_REGISTRY_CREDENTIALS_ID, usernameVariable: 'DOCKER_REGISTRY_CREDENTIALS_USR', passwordVariable: 'DOCKER_REGISTRY_CREDENTIALS_PSW')]) {
                        sh "docker login -u $DOCKER_REGISTRY_CREDENTIALS_USR -p $DOCKER_REGISTRY_CREDENTIALS_PSW"
                    }

                    // Tag and push the Docker image to Docker Hub
                    sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$TAG"
                    sh "docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker push $DOCKER_IMAGE_NAME:$TAG"
                    sh "docker push $DOCKER_IMAGE_NAME:latest"
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup
                sh 'docker network ls | grep -q app-network && docker network rm app-network || true'
                sh 'docker system prune -f'
                cleanWs()
            }
        }
    }
}
