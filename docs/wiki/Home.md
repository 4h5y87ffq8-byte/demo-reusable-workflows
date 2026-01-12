# Sistema de Automação de Repositórios

## 🎯 Visão Geral

Sistema automatizado para criação de repositórios via GitHub Issues Forms. Criado para padronizar e agilizar a criação de novos repositórios de aplicação e infraestrutura na organização.

## ✨ Características

- ✅ Criação automatizada de repositórios
- ✅ Templates padronizados (Aplicação e Infraestrutura)
- ✅ Validação de nomenclatura
- ✅ Estrutura de projeto pré-configurada
- ✅ GitHub Actions integrado
- ✅ Títulos dinâmicos nas issues
- ✅ Comentários automáticos com status

## 📋 Templates Disponíveis

### 🚀 Aplicação
Para criar repositórios de aplicação (APIs, Frontends, Backends, Microserviços)

**Tecnologias suportadas:**
- Java 17
- Node.js 24.12.0

**Ambientes de Deploy:**
- AWS ECS (Container)
- AWS EKS (Kubernetes)
- AWS Lambda (Serverless)
- On Premise

**Domínios:**
- CRX (Cross)
- DAT (Dados)
- POS (Post Trading)
- TRD (Trading)

### 🏗️ Infraestrutura
Para criar repositórios de infraestrutura como código (IaC)

**Tipos suportados:**
- Terraform (AWS, Azure, GCP, Multi-Cloud)
- CloudFormation (AWS)
- Ansible
- Kubernetes Manifests
- Helm Charts

**Ambientes:**
- Multi-ambiente (dev/stg/prd)
- Produção
- Staging
- Desenvolvimento

## 🚀 Como Usar

### Passo 1: Criar uma Issue
1. Acesse a aba [Issues](../../issues) do repositório
2. Clique em **"New Issue"**
3. Escolha o template apropriado:
   - **🚀 Novo Repositório - Aplicação**
   - **🏗️ Novo Repositório - Infraestrutura**

### Passo 2: Preencher o Formulário
Complete todos os campos obrigatórios:
- Nome do repositório (sem prefixos, use hífens)
- Descrição
- Stack/Tipo de infraestrutura
- Ambiente/Deploy target
- Visibilidade

### Passo 3: Submeter
- Marque a confirmação de termos
- Clique em **"Submit new issue"**

### Passo 4: Aguardar
- O workflow será executado automaticamente
- O título da issue será atualizado com as informações
- Você receberá comentários com o progresso
- O repositório será criado em até 5 minutos

## 📖 Documentação Adicional

- [Convenções de Nomenclatura](Naming-Conventions)
- [Guia de Troubleshooting](Troubleshooting)
- [Perguntas Frequentes (FAQ)](FAQ)
- [Detalhes do Template de Aplicação](Application-Template)
- [Detalhes do Template de Infraestrutura](Infrastructure-Template)
- [Arquitetura do Sistema](Architecture)

## 🆘 Suporte

Precisa de ajuda?
- 💬 Canal Slack: `#devops-automation`
- 🐛 [Reportar Bug](../../issues/new?labels=bug)
- 💡 [Sugerir Melhoria](../../issues/new?labels=enhancement)

## 🔐 Permissões Necessárias

Para criar repositórios, você precisa:
- ✅ Acesso de escrita neste repositório
- ✅ Permissão para criar repositórios na organização
- ✅ Fazer parte de um time autorizado

## 📊 Estatísticas

Para ver repositórios criados pelo sistema:
```bash
gh repo list your-org --topic automated-creation --limit 100
```

## 🔄 Atualizações Recentes

- ✅ Títulos dinâmicos nas issues
- ✅ Separação em templates de App e Infra
- ✅ Seleção de domínio para aplicações
- ✅ Validação aprimorada de nomenclatura
- ✅ Melhoria nos comentários de status

---

**Última atualização:** Janeiro 2026
