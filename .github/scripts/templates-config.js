/**
 * Configuração centralizada para o gerador de repositórios
 * Edite este arquivo para personalizar templates, stacks e deployments
 */

module.exports = {
  /**
   * Mapeamento de Stacks Tecnológicas
   */
  stacks: {
    'Java (Spring Boot)': {
      template: 'template-java-springboot',
      language: 'java',
      version: '17',
      packageManager: 'maven',
      workflows: ['feature-java.yml', 'develop-java.yml'],
      dockerfile: true,
      defaultPort: 8080,
      testFramework: 'JUnit',
      qualityTools: ['checkstyle', 'pmd', 'spotbugs'],
      configFiles: [
        {
          path: 'pom.xml',
          type: 'maven'
        },
        {
          path: 'src/main/resources/application.properties',
          type: 'properties'
        }
      ]
    },
    'Node.js (Express)': {
      template: 'template-nodejs-express',
      language: 'javascript',
      version: '20',
      packageManager: 'npm',
      workflows: ['feature-frontend.yml'],
      dockerfile: true,
      defaultPort: 3000,
      testFramework: 'Jest',
      qualityTools: ['eslint', 'prettier'],
      configFiles: [
        {
          path: 'package.json',
          type: 'npm'
        },
        {
          path: '.eslintrc.json',
          type: 'eslint'
        }
      ]
    },
    'Python (FastAPI)': {
      template: 'template-python-fastapi',
      language: 'python',
      version: '3.11',
      packageManager: 'pip',
      workflows: ['feature-python.yml'],
      dockerfile: true,
      defaultPort: 8000,
      testFramework: 'pytest',
      qualityTools: ['pylint', 'black', 'mypy'],
      configFiles: [
        {
          path: 'requirements.txt',
          type: 'pip'
        },
        {
          path: 'pyproject.toml',
          type: 'poetry'
        }
      ]
    },
    '.NET Core': {
      template: 'template-dotnet-core',
      language: 'csharp',
      version: '8.0',
      packageManager: 'nuget',
      workflows: ['feature-dotnet.yml'],
      dockerfile: true,
      defaultPort: 5000,
      testFramework: 'xUnit',
      qualityTools: ['StyleCop', 'FxCop'],
      configFiles: [
        {
          path: 'Program.cs',
          type: 'csharp'
        },
        {
          path: 'appsettings.json',
          type: 'json'
        }
      ]
    },
    'Go': {
      template: 'template-go',
      language: 'go',
      version: '1.21',
      packageManager: 'go',
      workflows: ['feature-go.yml'],
      dockerfile: true,
      defaultPort: 8080,
      testFramework: 'go test',
      qualityTools: ['golint', 'go vet'],
      configFiles: [
        {
          path: 'go.mod',
          type: 'gomod'
        },
        {
          path: 'main.go',
          type: 'go'
        }
      ]
    }
  },

  /**
   * Mapeamento de Ambientes de Deploy
   */
  deployments: {
    'AWS ECS (Container)': {
      provider: 'aws',
      service: 'ecs',
      terraform: 'ecs',
      dockerfile: true,
      kubernetes: false,
      serverless: false,
      workflows: ['deploy-ecs.yml'],
      requiredSecrets: [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'AWS_REGION',
        'ECR_REPOSITORY'
      ],
      infrastructure: [
        'task-definition.json',
        'infra/ecs/main.tf'
      ]
    },
    'AWS EKS (Kubernetes)': {
      provider: 'aws',
      service: 'eks',
      terraform: 'eks',
      dockerfile: true,
      kubernetes: true,
      serverless: false,
      workflows: ['deploy-eks.yml'],
      requiredSecrets: [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY',
        'KUBE_CONFIG'
      ],
      infrastructure: [
        'k8s/deployment.yaml',
        'k8s/service.yaml',
        'infra/eks/main.tf'
      ]
    },
    'AWS Lambda (Serverless)': {
      provider: 'aws',
      service: 'lambda',
      terraform: 'lambda',
      dockerfile: false,
      kubernetes: false,
      serverless: true,
      workflows: ['deploy-lambda.yml'],
      requiredSecrets: [
        'AWS_ACCESS_KEY_ID',
        'AWS_SECRET_ACCESS_KEY'
      ],
      infrastructure: [
        'serverless.yml',
        'infra/lambda/main.tf'
      ]
    },
    'On Premise': {
      provider: 'on-premise',
      service: 'vm',
      terraform: null,
      dockerfile: true,
      kubernetes: false,
      serverless: false,
      workflows: ['deploy-on-premise.yml'],
      requiredSecrets: [
        'SSH_KEY',
        'SERVER_HOST',
        'DEPLOY_USER'
      ],
      infrastructure: [
        'deploy.sh'
      ]
    },
    'Azure Container Instances': {
      provider: 'azure',
      service: 'aci',
      terraform: 'azure-aci',
      dockerfile: true,
      kubernetes: false,
      serverless: false,
      workflows: ['deploy-azure-aci.yml'],
      requiredSecrets: [
        'AZURE_CREDENTIALS',
        'ACR_REGISTRY'
      ],
      infrastructure: [
        'infra/azure/main.tf'
      ]
    },
    'Google Cloud Run': {
      provider: 'gcp',
      service: 'cloudrun',
      terraform: 'cloudrun',
      dockerfile: true,
      kubernetes: false,
      serverless: true,
      workflows: ['deploy-cloudrun.yml'],
      requiredSecrets: [
        'GCP_PROJECT_ID',
        'GCP_SA_KEY'
      ],
      infrastructure: [
        'infra/gcp/main.tf'
      ]
    }
  },

  /**
   * Mapeamento de Bancos de Dados
   */
  databases: {
    'PostgreSQL': {
      type: 'relational',
      dockerImage: 'postgres:15-alpine',
      defaultPort: 5432,
      defaultDatabase: 'appdb',
      environment: {
        POSTGRES_DB: '${DB_NAME}',
        POSTGRES_USER: '${DB_USER}',
        POSTGRES_PASSWORD: '${DB_PASSWORD}'
      },
      volumeMount: '/var/lib/postgresql/data',
      connectionString: 'postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}'
    },
    'MySQL': {
      type: 'relational',
      dockerImage: 'mysql:8',
      defaultPort: 3306,
      defaultDatabase: 'appdb',
      environment: {
        MYSQL_DATABASE: '${DB_NAME}',
        MYSQL_ROOT_PASSWORD: '${DB_PASSWORD}'
      },
      volumeMount: '/var/lib/mysql',
      connectionString: 'mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}'
    },
    'MongoDB': {
      type: 'nosql',
      dockerImage: 'mongo:7',
      defaultPort: 27017,
      defaultDatabase: 'appdb',
      environment: {
        MONGO_INITDB_DATABASE: '${DB_NAME}'
      },
      volumeMount: '/data/db',
      connectionString: 'mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}'
    },
    'Redis': {
      type: 'cache',
      dockerImage: 'redis:7-alpine',
      defaultPort: 6379,
      defaultDatabase: null,
      environment: {},
      volumeMount: '/data',
      connectionString: 'redis://${DB_HOST}:${DB_PORT}'
    },
    'DynamoDB': {
      type: 'nosql',
      provider: 'aws',
      dockerImage: 'amazon/dynamodb-local',
      defaultPort: 8000,
      defaultDatabase: null,
      environment: {},
      volumeMount: null,
      connectionString: null
    }
  },

  /**
   * Features Opcionais
   */
  features: {
    docker: {
      name: 'Docker e Docker Compose',
      files: ['Dockerfile', 'docker-compose.yml', '.dockerignore']
    },
    terraform: {
      name: 'Terraform (Infraestrutura como Código)',
      files: ['infra/main.tf', 'infra/variables.tf', 'infra/outputs.tf']
    },
    sonarqube: {
      name: 'SonarQube (Análise de Qualidade)',
      files: ['sonar-project.properties', 'docker-compose.sonar.yml']
    },
    owasp: {
      name: 'OWASP Dependency Check (Segurança)',
      files: ['.github/workflows/security-scan.yml']
    },
    jacoco: {
      name: 'Jacoco (Cobertura de Código)',
      files: ['pom.xml'] // adiciona plugin
    },
    precommit: {
      name: 'Pre-commit Hooks',
      files: ['.github/hooks/pre-commit', '.husky/pre-commit']
    },
    badges: {
      name: 'README com badges',
      files: ['README.md'] // adiciona badges
    },
    contributing: {
      name: 'Contributing Guidelines',
      files: ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md']
    }
  },

  /**
   * Configurações de Workflows CI/CD
   */
  cicd: {
    'GitHub Actions (Completo - Feature, Develop, Release)': {
      provider: 'github',
      workflows: [
        '.github/workflows/feature.yml',
        '.github/workflows/develop.yml',
        '.github/workflows/release.yml',
        '.github/workflows/hotfix.yml'
      ],
      branches: {
        feature: 'feature/*',
        develop: 'develop',
        release: 'release/*',
        main: 'main'
      }
    },
    'GitHub Actions (Básico - Build e Test)': {
      provider: 'github',
      workflows: [
        '.github/workflows/ci.yml'
      ],
      branches: {
        main: 'main'
      }
    },
    'Jenkins': {
      provider: 'jenkins',
      workflows: ['Jenkinsfile'],
      branches: {}
    },
    'GitLab CI': {
      provider: 'gitlab',
      workflows: ['.gitlab-ci.yml'],
      branches: {}
    }
  },

  /**
   * Templates de Arquivos Padrão
   */
  defaultFiles: {
    readme: true,
    gitignore: true,
    license: false,
    changelog: true,
    contributing: false,
    codeOfConduct: false,
    pullRequestTemplate: true,
    issueTemplates: true
  },

  /**
   * Configurações de Segurança
   */
  security: {
    enableDependabot: true,
    enableCodeScanning: true,
    enableSecretScanning: true,
    branchProtection: {
      main: {
        requirePullRequest: true,
        requiredReviews: 1,
        requireStatusChecks: true,
        enforceAdmins: false
      }
    }
  },

  /**
   * Badges para README
   */
  badges: {
    build: '![Build Status](https://img.shields.io/github/actions/workflow/status/{owner}/{repo}/ci.yml?branch=main)',
    coverage: '![Coverage](https://img.shields.io/codecov/c/github/{owner}/{repo})',
    license: '![License](https://img.shields.io/github/license/{owner}/{repo})',
    version: '![Version](https://img.shields.io/github/v/release/{owner}/{repo})',
    issues: '![Issues](https://img.shields.io/github/issues/{owner}/{repo})',
    pullRequests: '![Pull Requests](https://img.shields.io/github/issues-pr/{owner}/{repo})',
    stars: '![Stars](https://img.shields.io/github/stars/{owner}/{repo})',
    lastCommit: '![Last Commit](https://img.shields.io/github/last-commit/{owner}/{repo})'
  },

  /**
   * Configurações de Notificação
   */
  notifications: {
    slack: {
      enabled: false,
      webhook: process.env.SLACK_WEBHOOK_URL
    },
    email: {
      enabled: false,
      recipients: []
    },
    teams: {
      enabled: false,
      webhook: process.env.TEAMS_WEBHOOK_URL
    }
  }
};
