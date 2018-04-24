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
                checkout scm
            }
        }
        stage('Deploy on UAT') {
            echo $BRANCH_NAME
            when {
                expression { $BRANCH_NAME == 'uat' }
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
        stage('Run tests on DEV') {
            echo $BRANCH_NAME
            when {
                expression { $BRANCH_NAME == 'dev' }
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
    }
}