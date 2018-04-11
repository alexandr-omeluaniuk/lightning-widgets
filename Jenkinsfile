#!groovy
import groovy.json.JsonSlurperClassic
pipeline {
    agent any
    tools {
        ant 'Ant 1.10.3'
    }
    stages {
        stage('checkout source') {
            checkout scm
        }
        stage('test') {
            rc = sh returnStatus: true, script: "ant deployCodeRunLocalTests"
            if (rc != 0) {error 'tests or deploy is failed'}
        }
    }
}