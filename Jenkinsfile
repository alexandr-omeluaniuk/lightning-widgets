#!groovy
import groovy.json.JsonSlurperClassic
node {
    tools {
        ant 'Ant 1.10.3'
    }
    stage('checkout source') {
        checkout scm
    }
    stage('test') {
        rc = sh returnStatus: true, script: "ant deployCodeRunLocalTests"
        if (rc != 0) {error 'tests or deploy is failed'}
    }
}