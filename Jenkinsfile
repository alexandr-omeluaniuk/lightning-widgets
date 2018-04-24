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
            when {
                branch 'origin/uat'
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
        stage('Run tests on DEV') {
            when {
                branch 'origin/dev'
            }
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }
    }
}