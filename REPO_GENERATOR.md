# 🤖 Sistema de Geração Automática de Repositórios

Sistema completo para criar repositórios GitHub a partir de templates, baseado em issues estruturadas.

## 🎯 Visão Geral

Este sistema permite que desenvolvedores criem novos repositórios completos através de uma issue no GitHub, eliminando a necessidade de configuração manual e garantindo padronização.

### Fluxo de Trabalho

```
┌─────────────────┐
│ Desenvolvedor   │
│ Cria Issue      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Preenche Form   │
│ - Stack         │
│ - Deployment    │
│ - Features      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Workflow        │
│ Automático      │
│ é Acionado      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Repositório     │
│ é Criado        │
│ Automaticamente │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Notificação     │
│ com Link        │
└─────────────────┘
```

## 📋 Componentes do Sistema

### 1. Issue Template (`new-repository.yml`)

Formulário estruturado com campos:

- **Nome do Repositório**: Nome desejado (validado)
- **Descrição**: Propósito do repositório
- **Stack Tecnológica**: Java, Node.js, Python, .NET, Go
- **Ambiente de Deploy**: ECS, EKS, Lambda, On Premise, etc.
- **Banco de Dados**: PostgreSQL, MySQL, MongoDB, etc.
- **Pipeline CI/CD**: GitHub Actions, Jenkins, GitLab CI
- **Features Adicionais**: Docker, Terraform, SonarQube, etc.
- **Visibilidade**: Público ou Privado
- **Time/Squad**: Responsável pelo projeto

### 2. Workflow Automático (`repo-generator.yml`)

Workflow que:
- ✅ Detecta abertura de issues com label `new-repository`
- 📝 Parseia os dados do formulário
- 🔍 Valida as informações
- 🏗️ Gera o repositório via script Node.js
- 💬 Comenta na issue com progresso e resultado
- 🏷️ Adiciona labels de status
- 🔒 Fecha a issue automaticamente após sucesso

### 3. Script Gerador (`generate-repository.js`)

Script Node.js que:
- 🔧 Cria o repositório via GitHub API
- 📦 Gera estrutura de arquivos baseada no template
- 🐳 Adiciona Dockerfile e docker-compose.yml
- 🔄 Configura workflows do GitHub Actions
- 🏗️ Cria arquivos de infraestrutura (Terraform)
- 📝 Gera README completo com badges
- ⚙️ Configura pre-commit hooks

## 🚀 Configuração Inicial

### Passo 1: Configurar PAT Token

É necessário um Personal Access Token com permissões para criar repositórios:

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token (classic)"
3. Selecione os escopos:
   - `repo` (Full control of private repositories)
   - `workflow` (Update GitHub Action workflows)
   - `admin:org` (se for criar em uma organização)
4. Copie o token gerado

### Passo 2: Adicionar Secret no Repositório

1. Vá em Settings → Secrets and variables → Actions
2. Clique em "New repository secret"
3. Nome: `PAT_TOKEN`
4. Valor: Cole o token gerado
5. Clique em "Add secret"

### Passo 3: Instalar Dependência do Parser

O workflow usa `stefanbuck/github-issue-parser`. Nenhuma ação adicional necessária, pois é uma action pública.

### Passo 4: Copiar Arquivos para o Repositório

```bash
# Estrutura necessária
.github/
├── ISSUE_TEMPLATE/
│   └── new-repository.yml
├── workflows/
│   └── repo-generator.yml
└── scripts/
    └── generate-repository.js
```

## 📖 Como Usar

### Para Desenvolvedores

1. **Criar Nova Issue**
   - Acesse: Repository → Issues → New Issue
   - Selecione: "🚀 Novo Repositório"

2. **Preencher Formulário**
   ```
   Nome do Repositório: meu-servico-api
   Descrição: API de gerenciamento de usuários
   Stack: Java (Spring Boot)
   Deployment: AWS ECS (Container)
   Database: PostgreSQL
   CI/CD: GitHub Actions (Completo)
   Features: ✓ Docker, ✓ Terraform, ✓ SonarQube
   Visibilidade: Private
   Time: Backend Squad
   ```

3. **Submeter Issue**
   - O sistema validará os dados
   - Em ~2-5 minutos o repo será criado
   - Você receberá notificação com o link

4. **Acessar Novo Repositório**
   - Link será postado como comentário na issue
   - Repositório já terá toda estrutura configurada

### Para Administradores

1. **Monitorar Criações**
   - Visualize issues com label `new-repository`
   - Acompanhe execuções em Actions tab

2. **Customizar Templates**
   - Edite `TEMPLATE_MAP` em `generate-repository.js`
   - Adicione novos stacks ou deployments

3. **Adicionar Features**
   - Expanda array de features no issue template
   - Implemente geração de arquivos correspondentes

## 🎨 Templates Disponíveis

### Stacks

| Stack | Template | Workflows | Features |
|-------|----------|-----------|----------|
| Java (Spring Boot) | ✅ | feature, develop, deploy | Maven, Docker, ECS |
| Node.js (Express) | ✅ | feature, deploy | npm, Docker, ECS |
| Python (FastAPI) | ✅ | feature, deploy | pip, Docker, Lambda |
| .NET Core | 🚧 | TBD | NuGet, Docker |
| Go | 🚧 | TBD | go mod, Docker |

### Deployments

| Target | Terraform | Workflows | Docker |
|--------|-----------|-----------|--------|
| AWS ECS | ✅ | deploy-ecs.yml | ✅ |
| AWS EKS | ✅ | deploy-eks.yml | ✅ |
| AWS Lambda | ✅ | deploy-lambda.yml | ❌ |
| On Premise | ❌ | deploy-on-premise.yml | ✅ |
| Azure ACI | 🚧 | TBD | ✅ |
| GCP Cloud Run | 🚧 | TBD | ✅ |

### Databases

- ✅ PostgreSQL
- ✅ MySQL
- ✅ MongoDB
- ✅ Redis
- ✅ DynamoDB
- ⚪ Nenhum

## 🔧 Customização

### Adicionar Nova Stack

1. Edite `generate-repository.js`:

```javascript
const TEMPLATE_MAP = {
  // ... existentes ...
  'Ruby (Rails)': {
    template: 'template-ruby-rails',
    workflows: ['feature-ruby.yml', 'deploy-ruby.yml']
  }
};
```

2. Implemente funções específicas:

```javascript
function generateRubyGemfile() {
  return `source 'https://rubygems.org'
gem 'rails', '~> 7.0'
# ...
`;
}
```

3. Adicione ao issue template em `new-repository.yml`:

```yaml
- type: dropdown
  id: stack
  attributes:
    options:
      # ... existentes ...
      - Ruby (Rails)
```

### Adicionar Novo Deployment Target

1. Edite `DEPLOYMENT_MAP`:

```javascript
const DEPLOYMENT_MAP = {
  // ... existentes ...
  'Heroku': {
    terraform: null,
    dockerfile: true,
    workflows: ['deploy-heroku.yml'],
    procfile: true
  }
};
```

2. Implemente geração de arquivos específicos:

```javascript
if (deployConfig?.procfile) {
  files.push({
    path: 'Procfile',
    content: `web: ${getStartCommand(stack)}`
  });
}
```

### Personalizar README Gerado

Edite a função `generateReadme()`:

```javascript
function generateReadme(stack, deployment) {
  return `# ${REPO_NAME}

## 🎯 Seu Template Customizado

${REPO_DESCRIPTION}

## 📊 Arquitetura

[Adicione diagramas aqui]

...
`;
}
```

## 🔐 Segurança

### Permissões Necessárias

O `PAT_TOKEN` precisa de:
- ✅ `repo` - Criar repositórios
- ✅ `workflow` - Criar workflows
- ✅ `admin:org` - Se for organização

### Validações Implementadas

- ✅ Nome de repositório válido (sem espaços/caracteres especiais)
- ✅ Verificação de repositório existente
- ✅ Validação de campos obrigatórios
- ✅ Sanitização de inputs

### Boas Práticas

1. **Nunca commite tokens** no código
2. **Use secrets** do GitHub para credenciais
3. **Limite permissões** do token ao mínimo necessário
4. **Rotacione tokens** periodicamente
5. **Monitore logs** de criação de repositórios

## 📊 Monitoramento

### Visualizar Criações

```bash
# Listar issues de criação de repos
gh issue list --label "new-repository"

# Ver execuções do workflow
gh run list --workflow=repo-generator.yml
```

### Métricas

Adicione ao workflow para coletar métricas:

```yaml
- name: 📊 Send Metrics
  run: |
    curl -X POST $METRICS_ENDPOINT \
      -d "repo_created=$REPO_NAME" \
      -d "stack=$STACK" \
      -d "deployment=$DEPLOYMENT"
```

## 🐛 Troubleshooting

### Erro: "Repository already exists"

**Causa**: Já existe um repo com esse nome

**Solução**: 
- Use outro nome
- Delete o repo existente (se apropriado)
- Adicione sufixo único (ex: `-v2`)

### Erro: "Resource not accessible by token"

**Causa**: PAT_TOKEN sem permissões adequadas

**Solução**:
1. Regere o token com escopos corretos
2. Atualize a secret `PAT_TOKEN`
3. Execute novamente o workflow

### Erro: "Parse error in issue body"

**Causa**: Formato do issue template incompatível

**Solução**:
- Verifique sintaxe YAML do template
- Garanta que todos campos required estão preenchidos
- Use issue parser v3

### Repositório criado mas vazio

**Causa**: Erro na criação de arquivos via API

**Solução**:
- Verifique logs do workflow
- Confirme que base64 encoding está correto
- Teste criação manual via API

## 🚀 Melhorias Futuras

### Planejado

- [ ] Suporte a monorepos
- [ ] Templates para micro frontends
- [ ] Integração com Backstage
- [ ] Webhook para notificações Slack
- [ ] Dashboard de repositórios criados
- [ ] Validação de nomes via API
- [ ] Preview do README antes de criar
- [ ] Testes automatizados do gerador

### Em Consideração

- [ ] Suporte a GitLab
- [ ] CLI para criação local
- [ ] Templates community-driven
- [ ] Marketplace de templates
- [ ] Versionamento de templates

## 📚 Recursos Adicionais

### Documentação Relacionada

- [GitHub Issue Forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms)
- [GitHub REST API](https://docs.github.com/en/rest/repos/repos#create-a-repository-for-the-authenticated-user)
- [GitHub Actions](https://docs.github.com/en/actions)
- [stefanbuck/github-issue-parser](https://github.com/stefanbuck/github-issue-parser)

### Exemplos

- Ver: `examples/` (TBD)
- Templates completos
- Issues de exemplo
- Workflows customizados

## 🤝 Contribuindo

Para adicionar novos templates ou melhorar o sistema:

1. Fork o repositório
2. Crie branch: `git checkout -b feature/novo-template`
3. Implemente mudanças
4. Teste localmente
5. Commit: `git commit -m 'Add Ruby on Rails template'`
6. Push: `git push origin feature/novo-template`
7. Abra Pull Request

## 📄 Licença

Este sistema é parte do framework de DevOps interno.

---

**Documentação gerada em:** ${new Date().toISOString().split('T')[0]}
**Versão:** 1.0.0
