#!groovy
import groovy.json.JsonSlurperClassic
pipeline {
    agent any
    tools {
        ant 'Ant 1.10.3'
    }
    stages {
        stage('Initialize') {
            steps {
                echo ${env.BRANCH_NAME}
                checkout scm
            }
        }
        stage('Deploy on UAT') {
            when {
                expression { env.BRANCH_NAME == 'origin/uat' }
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
        stage('Run tests on DEV') {
            when {
                expression { env.BRANCH_NAME == 'origin/dev' }
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
    }
}