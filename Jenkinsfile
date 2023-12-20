pipeline {
    agent any
    triggers {
        githubPush()
    }
    
    // Define tagExists and TAG_NAME at the pipeline level
    def tagExists = false
    def TAG_NAME = ''

    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'printenv'
                    echo "Checking out code........"
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yakovperets/zalmans-server.git']]])
                    
                    // Check if TAG_NAME exists
                    TAG_NAME = sh(script: "git tag --contains ${env.GIT_COMMIT}", returnStdout: true).trim()
                    
                    // Remove the leading "v" from the tag name
                    TAG_NAME = TAG_NAME.replaceAll(/[a-zA-Z]/, '')
                    
                    // Create a boolean variable based on the existence of TAG_NAME
                    def hasTagName = TAG_NAME != null && !TAG_NAME.isEmpty()

                    // Set the tagExists and TAG_NAME variables at the pipeline level
                    tagExists = hasTagName

                    if (tagExists) {
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
                expression { tagExists }
            }
            steps {
                // This stage will only execute if tagExists is true
                echo "Executing NextStage because tagExists is true"
                echo "Using GitHub Release Tag Name in NextStage: ${TAG_NAME}"
                // Add any other steps for the NextStage
            }
        }
    }
}
