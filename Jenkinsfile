#!groovy
import groovy.json.JsonSlurperClassic
pipeline {
    agent any
    tools {
        ant 'Ant 1.10.3'
    }
    stages {
        when {
            branch 'uat'
        }
        stage('Initialize UAT') {
            steps {
                checkout scm
            }
        }
        stage('Deploy on UAT') {
            steps {
                sh 'ant uatDeployCodeRunLocalTests'
            }
        }

    }
    stages {
        when {
            branch 'dev'
        }
        stage('Initialize DEV') {
            steps {
                checkout scm
            }
        }
        stage('Run tests on DEV') {
            steps {
                sh 'ant devRunTests'
            }
        }
    }
}