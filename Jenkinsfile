pipeline {
    agent any
    triggers {
        githubPush()
    }

    environment {
        // Define environment variables at the top level
        TAG_NAME = ''
        TAG_EXISTS = 'false'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // def buildCause = currentBuild.causes[0].shortDescription
                    // echo "Build triggered by: ${buildCause}"
                    sh 'printenv'
                    echo "Checking out code........"
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yakovperets/zalmans-server.git']]])

                    // Check if TAG_NAME exists
                    TAG_NAME = sh(script: "git tag --contains ${env.GIT_COMMIT}", returnStdout: true).trim()

                    // Remove the leading "v" from the tag name
                    TAG_NAME = TAG_NAME.replaceAll(/[a-zA-Z]/, '')

                    // Create a boolean variable based on the existence of TAG_NAME
                    TAG_EXISTS = TAG_NAME != null && !TAG_NAME.isEmpty()

                    if (TAG_EXISTS.toBoolean()) {
                        echo "GitHub Release Tag Name: ${TAG_NAME}"
                        // Add any other steps you need for when TAG_NAME exists
                    } else {
                        echo "No GitHub Release Tag found."
                        // Add any other steps you need for when TAG_NAME does not exist
                    }
                }
            }
        }

        stage('NextStage') {
            when {
                expression {  TAG_EXISTS.toBoolean() }
            }
            steps {
                // This stage will only execute if TAG_EXISTS is true
                echo "Executing NextStage because TAG_EXISTS is true"
                echo "Using GitHub Release Tag Name in NextStage: ${TAG_NAME}"
                // Add any other steps for the NextStage
            }
        }
    }
}

