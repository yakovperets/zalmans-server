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
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/yakovperets/zalmans-server.git']]])
                }
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    sh 'docker network ls | grep -q app-network || docker network create app-network'

                    def version = sh(script: 'git describe --tags --abbrev=0', returnStdout: true).trim()

                    sh "docker build -t $DOCKER_IMAGE_NAME --build-arg APP_VERSION=$version ."
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'barakuni', usernameVariable: 'DOCKER_REGISTRY_CREDENTIALS_USR', passwordVariable: 'DOCKER_REGISTRY_CREDENTIALS_PSW')]) {
                        sh "docker login -u $DOCKER_REGISTRY_CREDENTIALS_USR -p $DOCKER_REGISTRY_CREDENTIALS_PSW"

                        def version = sh(script: 'git describe --tags --abbrev=0', returnStdout: true).trim()

                        sh "docker tag $DOCKER_IMAGE_NAME:latest $DOCKER_IMAGE_NAME:$version"
                        sh "docker push $DOCKER_IMAGE_NAME:$version"
                        sh "docker push $DOCKER_IMAGE_NAME:latest
