# 🚀 Setup Runner Ubuntu - Guia de Instalação

Este guia descreve como instalar todos os pré-requisitos necessários para executar os workflows do repositório em um runner Ubuntu.

## 📋 Pré-requisitos Instalados

O script `setup-runner-ubuntu.sh` instala:

### ☕ Java & Maven
- OpenJDK 11, 17 e 21 (Temurin distribution)
- Apache Maven (última versão disponível no apt)
- Cache Maven configurado em `~/.m2/repository`

### 🟢 Node.js & npm
- Node.js LTS (via NodeSource)
- npm (gerenciador de pacotes)
- Cache npm configurado em `~/.npm`

### 🐳 Docker
- Docker Engine (última versão estável)
- Docker Compose Plugin
- Docker Buildx Plugin
- Configuração para uso sem sudo

### ☁️ AWS CLI
- AWS CLI v2 (última versão)
- Necessário para autenticação com ECR e deploy ECS

### 🔧 Ferramentas Adicionais
- **yq**: Processador YAML (usado para ler `.a5x_devops`)
- **jq**: Processador JSON
- **git**: Controle de versão

## 🛠️ Instalação

### Opção 1: Instalação Automática (Recomendado)

```bash
# Tornar o script executável
chmod +x setup-runner-ubuntu.sh

# Executar o script
./setup-runner-ubuntu.sh
```

### Opção 2: Instalação via wget/curl

```bash
# Baixar e executar diretamente
wget -qO- https://raw.githubusercontent.com/SEU_USER/SEU_REPO/main/setup-runner-ubuntu.sh | bash

# Ou usando curl
curl -fsSL https://raw.githubusercontent.com/SEU_USER/SEU_REPO/main/setup-runner-ubuntu.sh | bash
```

## ⚙️ Configurações Pós-Instalação

### 1. Docker sem sudo

Após a instalação, é necessário reiniciar a sessão ou executar:

```bash
newgrp docker
```

Para testar:

```bash
docker run hello-world
```

### 2. Configurar AWS Credentials

Para os workflows que usam AWS (ECR, ECS), configure as credenciais:

```bash
aws configure
```

Ou configure via variáveis de ambiente:

```bash
export AWS_ACCESS_KEY_ID="sua-access-key"
export AWS_SECRET_ACCESS_KEY="sua-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

### 3. Configurar GitHub Runner (Self-Hosted)

Se estiver configurando um self-hosted runner:

```bash
# 1. Baixar o runner
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# 2. Configurar o runner
./config.sh --url https://github.com/SEU_USER/SEU_REPO --token SEU_TOKEN

# 3. Instalar como serviço
sudo ./svc.sh install
sudo ./svc.sh start
```

## 🔍 Verificação da Instalação

Execute os seguintes comandos para verificar se tudo foi instalado corretamente:

```bash
# Java
java -version
javac -version
mvn -version

# Node.js
node --version
npm --version

# Docker
docker --version
docker compose version
docker ps

# AWS
aws --version

# Ferramentas
git --version
yq --version
jq --version
```

## 📦 Dependências dos Workflows

### Java Workflows
- **develop-java.yml**: Maven, Docker, AWS CLI
- **feature-java.yml**: Maven, OWASP Dependency Check

### Frontend Workflows
- **feature-frontend.yml**: Node.js, npm

### Ferramentas Comuns
- **export-yaml-env action**: yq (já instalado pelo script)
- **docker-build-push action**: Docker
- **aws-auth-ecr action**: AWS CLI

## 🐛 Troubleshooting

### Erro: "docker: permission denied"
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

### Erro: "mvn: command not found"
```bash
# Reinstalar Maven
sudo apt-get update
sudo apt-get install -y maven
```

### Erro: "AWS credentials not configured"
```bash
# Configurar AWS
aws configure
# Ou definir secrets no GitHub
```

### Erro: Java version incompatível
```bash
# Listar versões instaladas
update-java-alternatives --list

# Alternar versão
sudo update-alternatives --config java
sudo update-alternatives --config javac
```

## 📊 Requisitos de Sistema

### Mínimo Recomendado
- **CPU**: 2 cores
- **RAM**: 4GB
- **Disco**: 20GB livres
- **OS**: Ubuntu 20.04 LTS ou superior

### Recomendado para Produção
- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Disco**: 50GB+ SSD
- **OS**: Ubuntu 22.04 LTS

## 🔒 Segurança

### Secrets Necessários

Configure os seguintes secrets no GitHub:

```yaml
AWS_ACCESS_KEY_ID: "AKIAXXXXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION: "us-east-1"
AWS_ACCOUNT_ID: "123456789012"
```

### Permissões AWS Necessárias

O usuário IAM precisa das seguintes permissões:

- `ecr:GetAuthorizationToken`
- `ecr:BatchCheckLayerAvailability`
- `ecr:GetDownloadUrlForLayer`
- `ecr:BatchGetImage`
- `ecr:PutImage`
- `ecr:InitiateLayerUpload`
- `ecr:UploadLayerPart`
- `ecr:CompleteLayerUpload`
- `ecs:DescribeServices`
- `ecs:DescribeTaskDefinition`
- `ecs:RegisterTaskDefinition`
- `ecs:UpdateService`

## 📝 Notas Adicionais

### Cache de Dependências

Os workflows usam cache para acelerar builds:

- **Maven**: `~/.m2/repository`
- **npm**: `~/.npm` e `node_modules`

### Versões Específicas

Para instalar versões específicas:

```bash
# Java específico
sudo apt-get install openjdk-17-jdk

# Node.js específico
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Maven específico
wget https://archive.apache.org/dist/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz
tar xzf apache-maven-3.9.5-bin.tar.gz
sudo mv apache-maven-3.9.5 /opt/maven
echo 'export PATH=/opt/maven/bin:$PATH' >> ~/.bashrc
```

## 🔄 Atualização

Para atualizar os componentes:

```bash
# Atualizar sistema
sudo apt-get update && sudo apt-get upgrade -y

# Atualizar AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --update

# Atualizar Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Atualizar Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io
```

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs do workflow no GitHub Actions
2. Execute os comandos de verificação acima
3. Consulte a documentação oficial de cada ferramenta
4. Abra uma issue no repositório

## 📚 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Installation](https://docs.docker.com/engine/install/ubuntu/)
- [AWS CLI Installation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [Node.js Installation](https://nodejs.org/en/download/package-manager/)
- [Maven Installation](https://maven.apache.org/install.html)
