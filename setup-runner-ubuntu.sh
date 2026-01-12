#!/bin/bash
set -e

echo "🚀 Instalando pré-requisitos para runners Ubuntu..."

# Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt-get update
sudo apt-get upgrade -y

# Instalar dependências básicas
echo "📦 Instalando dependências básicas..."
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common \
    wget \
    git \
    unzip

# ============================================
# JAVA & MAVEN
# ============================================
echo "☕ Instalando Java JDK e Maven..."

# Instalar OpenJDK (Temurin/Eclipse Adoptium)
sudo apt-get install -y openjdk-17-jdk openjdk-11-jdk openjdk-21-jdk

# Instalar Maven
sudo apt-get install -y maven

# Verificar instalação
java -version
mvn -version

# ============================================
# NODE.JS & NPM
# ============================================
echo "🟢 Instalando Node.js e npm..."

# Adicionar repositório NodeSource (versão LTS)
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# Instalar Node.js
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version

# ============================================
# DOCKER
# ============================================
echo "🐳 Instalando Docker..."

# Adicionar chave GPG oficial do Docker
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Adicionar repositório do Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Iniciar e habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Verificar instalação
docker --version
docker compose version

# ============================================
# AWS CLI
# ============================================
echo "☁️ Instalando AWS CLI..."

# Baixar e instalar AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip

# Verificar instalação
aws --version

# ============================================
# FERRAMENTAS ADICIONAIS
# ============================================
echo "🔧 Instalando ferramentas adicionais..."

# yq (para processar YAML)
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64
sudo chmod +x /usr/local/bin/yq
yq --version

# jq (para processar JSON)
sudo apt-get install -y jq
jq --version

# ============================================
# CONFIGURAÇÕES FINAIS
# ============================================
echo "⚙️ Aplicando configurações finais..."

# Criar diretórios de cache (similar ao GitHub Actions)
mkdir -p ~/.m2/repository
mkdir -p ~/.npm

# Configurar limites de arquivos abertos
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

echo ""
echo "✅ Instalação concluída com sucesso!"
echo ""
echo "📋 Resumo das versões instaladas:"
echo "================================"
java -version 2>&1 | head -1
mvn -version | head -1
node --version
npm --version
docker --version
docker compose version
aws --version
yq --version
jq --version
echo ""
echo "⚠️  IMPORTANTE: Reinicie a sessão ou execute 'newgrp docker' para usar Docker sem sudo"
echo ""
