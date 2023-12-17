pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        DOCKER_IMAGE_NAME = 'yakovperets/zalmans-server'
        DOCKER_REGISTRY_CREDENTIALS = credentials('barakuni')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url: 'https://github.com/program-training/Class5-store-back']]])
                }
            }
        }

        // stage('Lint') {
        //     steps {
        //         script {
        //             // Install linting dependencies
        //             sh 'npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint'
                    
        //             // Run linting
        //             sh 'npm run lint'
        //         }
        //     }
        // }

        stage('Build and Test') {
            steps {
                script {
                    // Create the network if it doesn't exist
                    sh 'docker network ls | grep -q app-network || docker network create app-network'
                    // Print the current directory
                    sh 'pwd'

                    // Print the contents of productsDal.ts
                    sh 'cat src/products/dal/productsDal.ts'
 
                    // Build the Docker image for Node.js server
                    sh 'docker build -t $DOCKER_IMAGE_NAME .'

                    // Run unit tests or any other testing commands here
                    // sh 'npm install'
                    // sh 'npm test'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    withCredentials([string(credentialsId: 'barakuni', variable: 'DOCKER_REGISTRY_CREDENTIALS')]) {
                        sh "docker login -u $DOCKER_REGISTRY_CREDENTIALS_USR -p $DOCKER_REGISTRY_CREDENTIALS_PSW"
                    }

                    // Push the Docker image to Docker Hub
                    sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker push $DOCKER_IMAGE_NAME:$BUILD_NUMBER"
                    sh "docker push $DOCKER_IMAGE_NAME:latest"
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup
                sh 'docker network rm app-network'
            }
        }
    }
}
