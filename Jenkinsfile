pipeline {
	agent { label 'angular-docker-label' }
	options { timeout (time: 30) }
	stages {
		stage('install') {
			steps {
				sh 'npm clean-install'
			}
		}
		stage('compile') {
			steps {
				sh 'ng build'
			}
		}
		stage('upload to S3 bucket') {
            steps {
                withAWS(region:'eu-west-3',
					credentials:'f4ca5a16-d516-4a5b-9aca-9bd93f2b28f1') {
					sh 'echo "uploading output to S3 bucket"'
					s3Upload(
                        pathStyleAccessEnabled: true,
                        payloadSigningEnabled: true,
                        file:'dist/Chilbeth',
                        bucket:'chinyere-odinukwe',
                        path:'/'
                    )
				}
            }
        }
	}
}
