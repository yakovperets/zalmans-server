pipeline {
    agent any

    triggers {
        githubPullRequests sourceBranchFilter: 'main', triggerPhrase: 'retest', onlyTriggerPhrase: false
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
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url: 'https://github.com/yakovperets/zalmans-server.git']]])
                }
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Create the network if it doesn't exist
                    sh 'docker network ls | grep -q app-network || docker network create app-network'

                    // Get the version from the Git tag
                    def version = sh(script: 'git describe --tags --abbrev=0', returnStdout: true).trim()

                    // Uncomment and add necessary commands for testing
                    // sh 'npm install'
                    // sh 'npm test'

                    // Build the Docker image for Node.js server with the version as a build argument
                    sh "docker build -t $DOCKER_IMAGE_NAME --build-arg APP_VERSION=$version ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'barakuni', usernameVariable: 'DOCKER_REGISTRY_CREDENTIALS_USR', passwordVariable: 'DOCKER_REGISTRY_CREDENTIALS_PSW')]) {
                        // Login to Docker Hub
                        sh "docker login -u $DOCKER_REGISTRY_CREDENTIALS_USR -p $DOCKER_REGISTRY_CREDENTIALS_PSW"

                        // Tag the Docker image with the version
                        sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$version"

                        // Push the Docker image to Docker Hub
                        sh "docker push $DOCKER_IMAGE_NAME:$version"
                        sh "docker push $DOCKER_IMAGE_NAME:latest"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                // Cleanup
                sh 'docker network rm app-network'
                sh 'docker logout'
            }
        }
    }
}
