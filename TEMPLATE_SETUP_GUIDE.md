# 🎯 Guia de Setup dos Template Repositories

Este guia explica como criar os **Template Repositories** externos que o sistema de automação usa para gerar novos repositórios.

---

## 📋 Pré-requisitos

- Acesso de admin na organização GitHub
- Permissão para criar repositórios
- Git e GitHub CLI (`gh`) instalados

---

## 🏗️ Templates Necessários

Você precisa criar **3 repositórios template** na sua organização:

1. **template-java-17** - Para aplicações Java/Spring Boot
2. **template-nodejs-24** - Para aplicações Node.js/TypeScript
3. **template-terraform-aws** - Para infraestrutura Terraform AWS

---

## 📦 1. Template: template-java-17

### Criar Repositório

```bash
# Criar repositório
gh repo create your-org/template-java-17 \
  --public \
  --description "Template para aplicações Java 17 com Spring Boot" \
  --clone

cd template-java-17
```

### Estrutura de Arquivos

Crie a seguinte estrutura:

```
template-java-17/
├── README.md
├── pom.xml
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── company/
│   │   │           └── DOMAIN_PLACEHOLDER/
│   │   │               ├── Application.java
│   │   │               └── controller/
│   │   │                   └── HealthController.java
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       └── db/
│   │           └── migration/
│   │               └── V1__initial_schema.sql
│   └── test/
│       └── java/
│           └── com/
│               └── company/
│                   └── DOMAIN_PLACEHOLDER/
└── .github/
    └── workflows/
        └── ci.yml
```

### Conteúdo dos Arquivos Principais

#### `README.md`

```markdown
# REPO_NAME_PLACEHOLDER

## 📋 Descrição

DESCRIPTION_PLACEHOLDER

## 🚀 Stack

- Java 17
- Spring Boot 3.2
- Maven 3.9
- Deployment: DEPLOYMENT_PLACEHOLDER
- Domain: DOMAIN_PLACEHOLDER

## 🛠️ Instalação

\`\`\`bash
mvn clean install
\`\`\`

## 🏃 Executar

\`\`\`bash
mvn spring-boot:run
\`\`\`

## 🐳 Docker

\`\`\`bash
docker compose up
\`\`\`

---

**Team:** TEAM_PLACEHOLDER
```

#### `pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.12</version>
    </parent>

    <groupId>com.company.DOMAIN_PLACEHOLDER</groupId>
    <artifactId>REPO_NAME_PLACEHOLDER</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>REPO_NAME_PLACEHOLDER</name>
    <description>DESCRIPTION_PLACEHOLDER</description>

    <properties>
        <java.version>17</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- Adicione outras dependências -->
    </dependencies>
</project>
```

### Commit e Push

```bash
git add .
git commit -m "feat: initial Java 17 template structure"
git push origin main
```

### Marcar como Template

```bash
# Via GitHub CLI
gh repo edit your-org/template-java-17 --enable-template

# Ou via interface web:
# Settings → Check "Template repository"
```

---

## 📦 2. Template: template-nodejs-24

### Criar Repositório

```bash
gh repo create your-org/template-nodejs-24 \
  --public \
  --description "Template para aplicações Node.js 24 com TypeScript" \
  --clone

cd template-nodejs-24
```

### Estrutura de Arquivos

```
template-nodejs-24/
├── README.md
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── src/
│   ├── index.ts
│   ├── config/
│   │   └── index.ts
│   ├── controllers/
│   ├── services/
│   ├── routes/
│   └── middlewares/
└── .github/
    └── workflows/
        └── ci.yml
```

### Conteúdo dos Arquivos Principais

#### `package.json`

```json
{
  "name": "REPO_NAME_PLACEHOLDER",
  "version": "1.0.0",
  "description": "DESCRIPTION_PLACEHOLDER",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc",
    "test": "jest"
  },
  "keywords": ["DOMAIN_PLACEHOLDER", "typescript"],
  "author": "TEAM_PLACEHOLDER",
  "engines": {
    "node": ">=24.12.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/express": "^4.17.21",
    "typescript": "^5.3.3",
    "tsx": "^4.7.0"
  }
}
```

### Commit e Marcar como Template

```bash
git add .
git commit -m "feat: initial Node.js 24 template structure"
git push origin main

gh repo edit your-org/template-nodejs-24 --enable-template
```

---

## 📦 3. Template: template-terraform-aws

### Criar Repositório

```bash
gh repo create your-org/template-terraform-aws \
  --public \
  --description "Template para infraestrutura Terraform AWS" \
  --clone

cd template-terraform-aws
```

### Estrutura de Arquivos

```
template-terraform-aws/
├── README.md
├── main.tf
├── variables.tf
├── outputs.tf
├── versions.tf
├── .gitignore
├── environments/
│   ├── dev.tfvars
│   ├── staging.tfvars
│   └── prod.tfvars
└── .github/
    └── workflows/
        ├── terraform-plan.yml
        └── terraform-apply.yml
```

### Conteúdo dos Arquivos Principais

#### `main.tf`

```hcl
# REPO_NAME_PLACEHOLDER
# DESCRIPTION_PLACEHOLDER

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  
  backend "s3" {
    bucket         = "terraform-state-DOMAIN_PLACEHOLDER"
    key            = "REPO_NAME_PLACEHOLDER/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  
  default_tags {
    tags = {
      Project     = "REPO_NAME_PLACEHOLDER"
      ManagedBy   = "Terraform"
      Team        = "TEAM_PLACEHOLDER"
      Environment = var.environment
    }
  }
}
```

### Commit e Marcar como Template

```bash
git add .
git commit -m "feat: initial Terraform AWS template structure"
git push origin main

gh repo edit your-org/template-terraform-aws --enable-template
```

---

## ⚙️ Configurar Workflow

Após criar os 3 templates, atualize o arquivo `repo-generator.yml`:

```yaml
env:
  GITHUB_ORG: 'your-org'  # ← Alterar aqui!
  TEMPLATE_JAVA_17: 'template-java-17'
  TEMPLATE_NODEJS_24: 'template-nodejs-24'
  TEMPLATE_TERRAFORM_AWS: 'template-terraform-aws'
```

---

## 🔑 Configurar Secrets

O workflow precisa de um **Personal Access Token** com permissões:

```bash
# Criar PAT no GitHub:
# Settings → Developer settings → Personal access tokens → Tokens (classic)

# Scopes necessários:
- repo (full control)
- workflow
- admin:org (repo creation)
```

Adicione como secret no repositório:
```
Settings → Secrets and variables → Actions → New repository secret
Name: PAT_TOKEN
Value: ghp_xxxxxxxxxxxx
```

---

## ✅ Verificar Setup

```bash
# Listar templates criados
gh repo list your-org --topic template

# Verificar se estão marcados como template
gh repo view your-org/template-java-17 --json isTemplate

# Testar criação de repo a partir do template
gh repo create your-org/test-repo \
  --template your-org/template-java-17 \
  --private \
  --clone
```

---

## 📝 Placeholders Suportados

O sistema substitui automaticamente:

- `REPO_NAME_PLACEHOLDER` → Nome completo do repo (ex: `a5x-app-pos-anteros-receiver`)
- `DESCRIPTION_PLACEHOLDER` → Descrição fornecida na issue
- `DOMAIN_PLACEHOLDER` → Domínio (ex: `pos`, `crx`, `dat`, `trd`)
- `DEPLOYMENT_PLACEHOLDER` → Ambiente de deploy
- `TEAM_PLACEHOLDER` → Time responsável
- `OWNER_PLACEHOLDER` → Nome da organização

---

## 🎯 Próximos Passos

1. Crie os 3 template repositories
2. Adicione conteúdo completo (Dockerfile, CI/CD, etc)
3. Marque como template
4. Configure o PAT_TOKEN
5. Atualize `repo-generator.yml` com sua org
6. Teste criando uma issue!

---

## 📚 Recursos

- [GitHub Template Repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [Naming Conventions](../docs/wiki/Naming-Conventions.md)

---

**Última atualização:** Janeiro 2026
