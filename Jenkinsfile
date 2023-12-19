pipeline {
    // ...

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
