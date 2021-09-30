@Library('jenkins-libs-web@master') _

def gitlab = new com.xzlcorp.gitlab()
def tool = new com.xzlcorp.tools()

String projectName = "xzl-webs"

if (true) {
  currentBuild.description = "Trigger by ${env.BUILD_USER}"
}

pipeline {

    agent {
        label 'YX_TEST'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        skipDefaultCheckout()
        disableConcurrentBuilds()
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
    }

    tools {
        nodejs 'NODEJS_14'
    }

    triggers {
        GenericTrigger (
            // 构建时的标题
            causeString: 'Triggered by $ref',
            // 获取POST参数中的变量，key指的是变量名，通过$ref来访问对应的值，value指的是JSON匹配值（参考Jmeter的JSON提取器）
            // ref指的是推送的分支，格式如：refs/heads/master
            genericVariables: [[key: 'ref', value: '$.ref']],
            // 打印获取的变量的key-value，此处会打印如：ref=refs/heads/master
            printContributedVariables: true,
            // 打印POST传递的参数
            printPostContent: true,
            // regexpFilterExpression与regexpFilterExpression成对使用
            // 当两者相等时，会触发对应分支的构建
            regexpFilterExpression: '^refs/heads/(cro|doctor|nurse|out|org)-(dev|test|master)$',
            regexpFilterText: '$ref',
            // 与webhook中配置的token参数值一致
            token: 'xzl-webs-token'
        )
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
              list = env.BRANCH_NAME.split("-");
              env.PROJECT = list[0];
              env.BRANCH = list[1];
              // doctor cro nurse out org
              println("当前构建项目为： ${PROJECT}");
              // dev test master
              println("当前构建分支为： ${BRANCH}");

              if (BRANCH == 'master') {
                env.BUILD_SH = "pnpm dist:${PROJECT}"
                env.SERVER_PATH = "n";
              } else if (BRANCH == 'test') {
                env.BUILD_SH = "pnpm prerelease:${PROJECT}"
                env.SERVER_PATH = "n.test";
              } else if (BRANCH == 'dev') {
                env.BUILD_SH = "pnpm dev-dist:${PROJECT}"
                env.SERVER_PATH = "n.dev";
              }
              env.DIST = "xzl-web-${env.PROJECT}"
              if (env.PROJECT == "cro") {
                env.DIST = "clinical-cro"
              }
              if (env.PROJECT == "out") {
                env.DIST = "out-hospital-patient"
              }
              env.ROOT_PATH = "/Users/xinzhilici/homebrew/var/www/${SERVER_PATH}/${DIST}";
              env.TARGET_HOST_IP = '172.16.10.126'
            }
          }
        }

        stage('checkout') {
          steps {
            git branch: "${BRANCH_NAME}",
            credentialsId: 'gitlab-ssh-key',
            url: 'git@git.xzlcorp.com:UnitedFrontEnd/xzl-webs.git'
            sh 'ls -lat'
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
              if (env.BRANCH == 'master') {
                sh "AutoBuilder transfer  --rp ./${DIST} --wp *"
                } else {
                sshagent(credentials: ['jenkins-self-ssh-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l xinzhilici ${TARGET_HOST_IP} "rm -rf ${ROOT_PATH} || true"'
                    sh 'ssh -o StrictHostKeyChecking=no -l xinzhilici ${TARGET_HOST_IP} "mkdir -p ${ROOT_PATH} || true"'
                    sh 'scp -o StrictHostKeyChecking=no -r ./${DIST}/* xinzhilici@${TARGET_HOST_IP}:"${ROOT_PATH}"'
                }
              }
            }
          }
        }
    }

    post {
      always {
        echo "构建结束"
      }

      success {
        // echo "构建成功"
        script {
          if (env.BRANCH == "master") {
            projectId = gitlab.GetProjectID(projectName)
            tool.PrintMsg("打tag start","blue")
            String tagString = "v${new Date().format("yy.MMdd.HHmmssSSSSSS")}"
            gitlab.CreateTag(projectId, tagString, env.BRANCH_NAME)
            tool.PrintMsg("打tag end","blue")
          }
        }
      }

      failure {
        echo "构建失败"
      }

      aborted {
        echo "构建中断"
      }
    }
}

