@'
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Check') {
            steps {
                sh 'test -f app/index.html'
                sh 'test -f app/style.css'
                sh 'test -f app/script.js'
                echo 'Application files verified'
            }
        }

        stage('Test') {
            steps {
                sh 'test -s app/index.html'
                echo 'HTML test passed'
            }
        }
    }

    post {
        success {
            echo 'Campus Lost & Found CI pipeline passed!'
        }
        failure {
            echo 'Pipeline failed. Check the build console output.'
        }
    }
}
'@ | Set-Content -Path .\Jenkinsfile -Encoding ascii