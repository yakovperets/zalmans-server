pipeline {
    agent any
    triggers {
        GenericTrigger(
            genericVariables: [
                [key: 'TAG_NAME', value: '$.ref', defaultValue: 'null']
            ],
            causeString: 'Triggered By Github',
            token: '12345678',
            tokenCredentialId: '',
            printContributedVariables: true,
            printPostContent: true,
            silentResponse: false
        )
    }
    stages {
        stage('ProcessWebHook') {
            steps {
                script {
                    echo "Received a Webhook Request from Github."

                    // Print the full payload
                    echo "Webhook Payload: ${params._webhook_payload}"

                    // Print the extracted tag name
                    echo "Tag Name: $TAG_NAME"

                    // Add additional processing steps as needed
                }
            }
        }
    }
}
