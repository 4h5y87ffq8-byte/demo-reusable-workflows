# Convenções de Nomenclatura

## 🎯 Objetivo

Padronizar a nomenclatura de repositórios para facilitar identificação, organização e automação.

---

## 🚀 Repositórios de Aplicação

### Padrão Completo
```
a5x-app-<dominio>-<nome-do-sistema>
```

### Componentes

#### Prefixo Fixo
- **`a5x-app-`** - Identificador padrão para aplicações

#### Domínio (3 letras)
- **`crx`** - Cross (Cross-domain, Transversal)
- **`dat`** - Dados (Data Management, Analytics)
- **`pos`** - Post Trading (Pós-negociação)
- **`trd`** - Trading (Negociação)

#### Nome do Sistema
- Use **apenas hífens (-)** para separar palavras
- ❌ **NÃO use underscores (_)** ou espaços
- Use nomes descritivos e específicos
- Máximo de 50 caracteres

### ✅ Exemplos Corretos

```
✅ a5x-app-pos-anteros-receiver-financial
✅ a5x-app-crx-settlement-api
✅ a5x-app-dat-risk-calculator
✅ a5x-app-trd-order-management
✅ a5x-app-pos-clearing-service
✅ a5x-app-crx-authentication-gateway
```

### ❌ Exemplos Incorretos

```
❌ anteros_receiver_financial          (sem padrão a5x-app-)
❌ a5x-app-pos-anteros receiver        (espaços não permitidos)
❌ a5x-app-POS-Anteros-Receiver        (use lowercase)
❌ a5x-app-anteros-receiver-financial  (falta domínio)
❌ app-pos-anteros-receiver            (prefixo incorreto)
```

---

## 🏗️ Repositórios de Infraestrutura

### Padrão Completo
```
a5x-infra-<tipo>-<nome-descritivo>
```

### Componentes

#### Prefixo Fixo
- **`a5x-infra-`** - Identificador padrão para infraestrutura

#### Tipo
- **`terraform`** - Infraestrutura como código Terraform
- **`k8s`** - Kubernetes manifests
- **`helm`** - Helm charts
- **`ansible`** - Playbooks Ansible
- **`cloudformation`** - CloudFormation templates

#### Nome Descritivo
- Inclua o ambiente ou propósito
- Use hífens para separar palavras
- Seja específico sobre o que gerencia

### ✅ Exemplos Corretos

```
✅ a5x-infra-terraform-eks-production
✅ a5x-infra-terraform-vpc-networking
✅ a5x-infra-k8s-monitoring-stack
✅ a5x-infra-helm-ingress-controller
✅ a5x-infra-terraform-rds-databases
✅ a5x-infra-ansible-server-config
✅ a5x-infra-cloudformation-s3-buckets
```

### ❌ Exemplos Incorretos

```
❌ infra-eks-production              (sem padrão a5x-infra-)
❌ a5x-infra-EKS-Production          (use lowercase)
❌ a5x-infra-terraform_vpc           (use hífens, não underscores)
❌ a5x-infra-production              (falta tipo)
```

---

## 📏 Regras Gerais

### ✅ Faça

- Use **lowercase** (letras minúsculas)
- Use **hífens (-)** para separar palavras
- Seja **descritivo** e **específico**
- Siga o **padrão estabelecido**
- Máximo de **63 caracteres** (limitação Git)

### ❌ Não Faça

- ❌ Usar **UPPERCASE** ou **CamelCase**
- ❌ Usar **underscores (_)**
- ❌ Usar **espaços**
- ❌ Usar **caracteres especiais** (@, #, $, %, etc)
- ❌ Começar ou terminar com **hífen**
- ❌ Usar **nomes genéricos** (api, service, app)

---

## 🏷️ Tags e Topics

Além do nome, use **topics** no repositório:

### Para Aplicações
```
a5x
application
<stack>            # java, nodejs
<deployment>       # ecs, eks, lambda
<domain>           # crx, dat, pos, trd
automated-creation # se criado por automação
```

### Para Infraestrutura
```
a5x
infrastructure
<tipo>             # terraform, k8s, helm, ansible
<cloud>            # aws, azure, gcp
<environment>      # production, staging, dev
automated-creation # se criado por automação
```

---

## 🔍 Busca e Filtros

Com nomenclatura padronizada, você pode facilmente:

### Listar todas aplicações
```bash
gh repo list your-org --topic a5x --topic application
```

### Listar por domínio
```bash
gh repo list your-org --topic pos
```

### Listar infraestrutura Terraform
```bash
gh repo list your-org --topic terraform
```

### Buscar por padrão
```bash
gh repo list your-org | grep "a5x-app-"
```

---

## 📝 Checklist de Validação

Antes de criar um repositório, verifique:

- [ ] Nome segue o padrão `a5x-app-*` ou `a5x-infra-*`
- [ ] Usa apenas lowercase
- [ ] Usa apenas hífens (sem underscores ou espaços)
- [ ] Domínio está correto (para apps)
- [ ] Tipo está especificado (para infra)
- [ ] Nome é descritivo e não genérico
- [ ] Não excede 63 caracteres
- [ ] Não há erros de ortografia

---

## 🆘 Dúvidas?

- Consulte a [página principal](Home) do Wiki
- Entre em contato no Slack: `#devops-automation`
- Abra uma [issue de dúvida](../../issues/new)

---

**Última atualização:** Janeiro 2026
