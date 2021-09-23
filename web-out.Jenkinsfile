pipeline {
    agent {
        label "YX_TEST"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout()
        disableConcurrentBuilds()
        timeout(time: 15, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    tools {
        nodejs "NODEJS_14"
    }

    stages {
      stage('clean') {
          steps {
            script {
              cleanWs()
                }
            }
        }
        stage('prepare') {
            steps {
                sh 'node -v'
                script {
                    if (env.BRANCH_NAME == 'master') {
                        env.BUILD_SH = "pnpm dist:out"
                        env.ROOT_PATH = "/Users/xinzhilici/homebrew/var/www/n/out-hospital-patient"
                    } else if (env.BRANCH_NAME == 'test') {
                        env.BUILD_SH = "pnpm prerelease:out"
                        env.ROOT_PATH = "/Users/xinzhilici/homebrew/var/www/n.test/out-hospital-patient"
                    } else if (env.BRANCH_NAME == 'dev') {
                        env.BUILD_SH = "pnpm dev-dist:out"
                        env.ROOT_PATH = "/Users/xinzhilici/homebrew/var/www/n.dev/out-hospital-patient"
                    }
                    env.TARGET_HOST_IP = "172.16.10.126"
                }
            }
        }

        stage('checkout') {
            steps {
                git branch: "${BRANCH_NAME}",
                    credentialsId: "gitlab-ssh-key",
                    url: "git@git.xzlcorp.com:UnitedFrontEnd/xzl-webs.git"
                sh "ls -lat"
            }
        }

        stage('build') {
            steps {
                sh 'npm i -g pnpm --registry=https://registry.npm.taobao.org'
                sh "pnpm install --registry=https://registry.npm.taobao.org"
                sh "${BUILD_SH}"
            }
        }

        stage('deploy') {
            steps {
                script {
                if (env.BRANCH_NAME == 'master') {
                      sh 'AutoBuilder transfer  --rp ./out-hospital-patient --wp *'
                } else {
                    sshagent(credentials: ['jenkins-self-ssh-key']) {
                        sh 'ssh -o StrictHostKeyChecking=no -l xinzhilici ${TARGET_HOST_IP} "rm -rf ${ROOT_PATH} || true"'
                        sh 'ssh -o StrictHostKeyChecking=no -l xinzhilici ${TARGET_HOST_IP} "mkdir -p ${ROOT_PATH} || true"'
                        sh 'scp -o StrictHostKeyChecking=no -r ./out-hospital-patient/* xinzhilici@${TARGET_HOST_IP}:"${ROOT_PATH}"'
                    }
                }
              }
            }
        }


    }

}
