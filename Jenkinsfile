pipeline {
    agent any
    triggers {
        githubPush()
    }
    parameters {
        string(name: 'TAG_NAME', defaultValue: '', description: 'Enter the tag name')
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'printenv'
                    echo "Checking out code......"
                    def pullRequestBranch = env.GITHUB_PR_SOURCE_BRANCH ?: 'main'
                    checkout([$class: 'GitSCM', branches: [[name: "*/${pullRequestBranch}"]], userRemoteConfigs: [[url:'https://github.com/yakovperets/zalmans-server.git']]])

                    // Create and push a new commit with a tag
                    if (params.TAG_NAME) {
                        sh "git commit --allow-empty -m 'Commit for tag ${params.TAG_NAME}'"
                        sh "git tag -a ${params.TAG_NAME} -m 'Tagging release ${params.TAG_NAME}'"
                        sh "git push origin ${pullRequestBranch} --tags"
                    } else {
                        echo "No tag name provided. Skipping tag creation."
                    }
                }
            }
        }
    }
}
