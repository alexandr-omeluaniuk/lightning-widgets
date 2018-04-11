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
        stage('Build') {
            steps {
                rc = sh returnStatus: true, script: "ant deployCodeRunLocalTests"
                if (rc != 0) {
                    error 'tests or deploy is failed'
                }
            }
        }
    }
}