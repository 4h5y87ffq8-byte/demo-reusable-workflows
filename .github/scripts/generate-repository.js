const https = require('https');
const { execSync } = require('child_process');

// Configurações do ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG_NAME = process.env.ORG_NAME;
const REPO_NAME = process.env.REPO_NAME;
const REPO_DESCRIPTION = process.env.REPO_DESCRIPTION;
const STACK = process.env.STACK;
const DEPLOYMENT = process.env.DEPLOYMENT;
const DATABASE = process.env.DATABASE;
const CI_CD = process.env.CI_CD;
const VISIBILITY = process.env.VISIBILITY?.toLowerCase() || 'private';
const FEATURES = process.env.FEATURES || '';
const TEAM = process.env.TEAM || '';

console.log('🚀 Iniciando geração de repositório...');
console.log(`📦 Nome: ${REPO_NAME}`);
console.log(`💻 Stack: ${STACK}`);
console.log(`🚀 Deployment: ${DEPLOYMENT}`);

// Mapeamento de templates
const TEMPLATE_MAP = {
  'Java (Spring Boot)': {
    template: 'template-java-springboot',
    workflows: ['feature-java.yml', 'develop-java.yml']
  },
  'Node.js (Express)': {
    template: 'template-nodejs-express',
    workflows: ['feature-frontend.yml']
  },
  'Python (FastAPI)': {
    template: 'template-python-fastapi',
    workflows: ['feature-python.yml']
  },
  '.NET Core': {
    template: 'template-dotnet-core',
    workflows: ['feature-dotnet.yml']
  },
  'Go': {
    template: 'template-go',
    workflows: ['feature-go.yml']
  }
};

// Mapeamento de deployment
const DEPLOYMENT_MAP = {
  'AWS ECS (Container)': {
    terraform: 'ecs',
    dockerfile: true,
    workflows: ['deploy-ecs.yml']
  },
  'AWS EKS (Kubernetes)': {
    terraform: 'eks',
    kubernetes: true,
    workflows: ['deploy-eks.yml']
  },
  'AWS Lambda (Serverless)': {
    terraform: 'lambda',
    serverless: true,
    workflows: ['deploy-lambda.yml']
  },
  'On Premise': {
    terraform: null,
    dockerfile: true,
    workflows: ['deploy-on-premise.yml']
  }
};

/**
 * Faz requisição HTTP para a API do GitHub
 */
function makeGitHubRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'User-Agent': 'GitHub-Repo-Generator',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} - ${body}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

/**
 * Cria um novo repositório
 */
async function createRepository() {
  console.log('📝 Criando repositório...');
  
  const repoData = {
    name: REPO_NAME,
    description: REPO_DESCRIPTION || `Repositório ${STACK} - ${DEPLOYMENT}`,
    private: VISIBILITY === 'private',
    auto_init: true,
    has_issues: true,
    has_projects: true,
    has_wiki: false
  };

  try {
    const repo = await makeGitHubRequest('POST', `/orgs/${ORG_NAME}/repos`, repoData);
    console.log(`✅ Repositório criado: ${repo.html_url}`);
    return repo;
  } catch (error) {
    // Se não for uma organização, tenta criar como repositório pessoal
    console.log('⚠️  Não é uma organização, criando como repositório pessoal...');
    const repo = await makeGitHubRequest('POST', '/user/repos', repoData);
    console.log(`✅ Repositório criado: ${repo.html_url}`);
    return repo;
  }
}

/**
 * Gera estrutura de arquivos baseada no template
 */
function generateFileStructure(stack, deployment) {
  const template = TEMPLATE_MAP[stack];
  const deployConfig = DEPLOYMENT_MAP[deployment];
  
  const files = [];

  // README.md
  files.push({
    path: 'README.md',
    content: generateReadme(stack, deployment)
  });

  // .gitignore
  files.push({
    path: '.gitignore',
    content: generateGitignore(stack)
  });

  // Dockerfile
  if (deployConfig?.dockerfile) {
    files.push({
      path: 'Dockerfile',
      content: generateDockerfile(stack)
    });
  }

  // docker-compose.yml
  if (FEATURES.includes('Docker e Docker Compose')) {
    files.push({
      path: 'docker-compose.yml',
      content: generateDockerCompose(stack, DATABASE)
    });
  }

  // Workflows do GitHub Actions
  if (CI_CD.includes('GitHub Actions')) {
    template.workflows.forEach(workflow => {
      files.push({
        path: `.github/workflows/${workflow}`,
        content: generateWorkflow(workflow, stack, deployment)
      });
    });
  }

  // Configuração do projeto (application.properties, package.json, etc)
  files.push({
    path: getConfigFilePath(stack),
    content: generateConfig(stack, DATABASE)
  });

  // Terraform
  if (FEATURES.includes('Terraform (Infraestrutura como Código)') && deployConfig?.terraform) {
    files.push({
      path: 'infra/main.tf',
      content: generateTerraform(deployConfig.terraform)
    });
  }

  // Pre-commit hooks
  if (FEATURES.includes('Pre-commit Hooks')) {
    files.push({
      path: '.github/hooks/pre-commit',
      content: generatePreCommitHook(stack)
    });
  }

  return files;
}

/**
 * Gera conteúdo do README
 */
function generateReadme(stack, deployment) {
  const badges = FEATURES.includes('README com badges') ? `
![Build Status](https://img.shields.io/github/actions/workflow/status/${ORG_NAME}/${REPO_NAME}/build.yml?branch=main)
![License](https://img.shields.io/github/license/${ORG_NAME}/${REPO_NAME})
![Coverage](https://img.shields.io/badge/coverage-0%25-red)
` : '';

  return `# ${REPO_NAME}

${badges}

## 📋 Descrição

${REPO_DESCRIPTION || `Aplicação ${stack} com deploy em ${deployment}`}

## 🚀 Stack Tecnológica

- **Linguagem/Framework:** ${stack}
- **Deployment:** ${deployment}
- **Database:** ${DATABASE}
${TEAM ? `- **Team:** ${TEAM}` : ''}

## 📦 Pré-requisitos

${getPrerequisites(stack)}

## 🛠️ Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/${ORG_NAME}/${REPO_NAME}.git
cd ${REPO_NAME}

${getInstallCommands(stack)}
\`\`\`

## 🏃 Executando o Projeto

\`\`\`bash
${getRunCommands(stack)}
\`\`\`

## 🐳 Docker

\`\`\`bash
# Build
docker build -t ${REPO_NAME} .

# Run
docker run -p 8080:8080 ${REPO_NAME}

# Com Docker Compose
docker compose up
\`\`\`

## 🧪 Testes

\`\`\`bash
${getTestCommands(stack)}
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
${getProjectStructure(stack)}
\`\`\`

## 🚀 Deploy

${getDeployInstructions(deployment)}

## 🤝 Contribuindo

${FEATURES.includes('Contributing Guidelines') ? 'Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes.' : 'Pull requests são bem-vindos!'}

## 📄 Licença

${FEATURES.includes('README com badges') ? 'Este projeto está sob a licença MIT.' : ''}

---

**Gerado automaticamente pelo Sistema de Templates** 🤖
`;
}

/**
 * Gera .gitignore apropriado
 */
function generateGitignore(stack) {
  const common = `
# IDEs
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Secrets
.env
.env.local
*.pem
*.key
secrets/
`;

  const stackSpecific = {
    'Java (Spring Boot)': `
# Java
target/
*.class
*.jar
*.war
!gradle/wrapper/gradle-wrapper.jar
.gradle/
build/
`,
    'Node.js (Express)': `
# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
dist/
.npm
`,
    'Python (FastAPI)': `
# Python
__pycache__/
*.py[cod]
*$py.class
.Python
venv/
env/
.pytest_cache/
`,
  };

  return common + (stackSpecific[stack] || '');
}

/**
 * Gera Dockerfile
 */
function generateDockerfile(stack) {
  const dockerfiles = {
    'Java (Spring Boot)': `FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
`,
    'Node.js (Express)': `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["node", "index.js"]
`,
    'Python (FastAPI)': `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
`
  };

  return dockerfiles[stack] || dockerfiles['Java (Spring Boot)'];
}

/**
 * Gera docker-compose.yml
 */
function generateDockerCompose(stack, database) {
  const dbServices = {
    'PostgreSQL': `
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${REPO_NAME}
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: \${DB_PASSWORD:-changeme}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
`,
    'MySQL': `
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: ${REPO_NAME}
      MYSQL_ROOT_PASSWORD: \${DB_PASSWORD:-changeme}
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
`,
    'MongoDB': `
  db:
    image: mongo:7
    environment:
      MONGO_INITDB_DATABASE: ${REPO_NAME}
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
`,
    'Redis': `
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
`
  };

  const appPort = stack.includes('Java') ? '8080' : '3000';

  return `version: '3.8'

services:
  app:
    build: .
    ports:
      - "${appPort}:${appPort}"
    environment:
      - NODE_ENV=development
      - DB_HOST=db
    depends_on:
      - db
${dbServices[database] || ''}

volumes:
  ${database.toLowerCase()}_data:
`;
}

/**
 * Gera workflow do GitHub Actions
 */
function generateWorkflow(workflowFile, stack, deployment) {
  return `name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup
        ${getSetupAction(stack)}
      
      - name: Build
        run: ${getBuildCommand(stack)}
      
      - name: Test
        run: ${getTestCommands(stack)}
`;
}

/**
 * Helpers para gerar conteúdo específico por stack
 */
function getPrerequisites(stack) {
  const prereqs = {
    'Java (Spring Boot)': '- Java 17+\n- Maven 3.8+',
    'Node.js (Express)': '- Node.js 18+\n- npm ou yarn',
    'Python (FastAPI)': '- Python 3.11+\n- pip',
  };
  return prereqs[stack] || '- Docker';
}

function getInstallCommands(stack) {
  const commands = {
    'Java (Spring Boot)': 'mvn clean install',
    'Node.js (Express)': 'npm install',
    'Python (FastAPI)': 'pip install -r requirements.txt',
  };
  return commands[stack] || 'docker build -t app .';
}

function getRunCommands(stack) {
  const commands = {
    'Java (Spring Boot)': 'mvn spring-boot:run',
    'Node.js (Express)': 'npm start',
    'Python (FastAPI)': 'uvicorn main:app --reload',
  };
  return commands[stack] || 'docker run app';
}

function getTestCommands(stack) {
  const commands = {
    'Java (Spring Boot)': 'mvn test',
    'Node.js (Express)': 'npm test',
    'Python (FastAPI)': 'pytest',
  };
  return commands[stack] || 'echo "No tests"';
}

function getProjectStructure(stack) {
  const structures = {
    'Java (Spring Boot)': `src/
├── main/
│   ├── java/
│   └── resources/
└── test/`,
    'Node.js (Express)': `src/
├── routes/
├── controllers/
└── models/`,
  };
  return structures[stack] || 'src/';
}

function getDeployInstructions(deployment) {
  const instructions = {
    'AWS ECS (Container)': 'Deploy automático via GitHub Actions para AWS ECS após merge na branch main.',
    'AWS EKS (Kubernetes)': 'Deploy via kubectl ou Helm charts no cluster EKS.',
    'AWS Lambda (Serverless)': 'Deploy usando Serverless Framework ou SAM.',
    'On Premise': 'Build Docker image e deploy no servidor on-premise.',
  };
  return instructions[deployment] || 'Veja documentação de deploy.';
}

function getConfigFilePath(stack) {
  const paths = {
    'Java (Spring Boot)': 'src/main/resources/application.properties',
    'Node.js (Express)': 'package.json',
    'Python (FastAPI)': 'requirements.txt',
  };
  return paths[stack] || 'config.yml';
}

function generateConfig(stack, database) {
  // Implementação simplificada
  return `# Configuration for ${stack} with ${database}`;
}

function generateTerraform(type) {
  return `# Terraform configuration for ${type}
terraform {
  required_version = ">= 1.0"
}
`;
}

function generatePreCommitHook(stack) {
  return `#!/bin/bash
echo "Running pre-commit checks..."
${getTestCommands(stack)}
`;
}

function getSetupAction(stack) {
  const actions = {
    'Java (Spring Boot)': 'uses: actions/setup-java@v4\n        with:\n          distribution: temurin\n          java-version: 17',
    'Node.js (Express)': 'uses: actions/setup-node@v4\n        with:\n          node-version: 20',
  };
  return actions[stack] || '';
}

function getBuildCommand(stack) {
  return getInstallCommands(stack);
}

/**
 * Cria arquivos no repositório
 */
async function createFiles(owner, repo, files) {
  console.log(`📝 Criando ${files.length} arquivos...`);
  
  for (const file of files) {
    try {
      const content = Buffer.from(file.content).toString('base64');
      await makeGitHubRequest('PUT', `/repos/${owner}/${repo}/contents/${file.path}`, {
        message: `Add ${file.path}`,
        content: content
      });
      console.log(`✅ Criado: ${file.path}`);
    } catch (error) {
      console.error(`❌ Erro ao criar ${file.path}:`, error.message);
    }
  }
}

/**
 * Função principal
 */
async function main() {
  try {
    // 1. Criar repositório
    const repo = await createRepository();
    
    // 2. Aguardar propagação
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 3. Gerar estrutura de arquivos
    const files = generateFileStructure(STACK, DEPLOYMENT);
    
    // 4. Criar arquivos no repositório
    await createFiles(ORG_NAME, REPO_NAME, files);
    
    console.log('✅ Repositório criado e configurado com sucesso!');
    console.log(`🔗 ${repo.html_url}`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

main();
