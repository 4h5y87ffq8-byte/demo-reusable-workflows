# Troubleshooting

## 🔧 Problemas Comuns e Soluções

---

## ❌ Issue Template Não Aparece

### Sintoma
Ao tentar criar uma nova issue, os templates não aparecem ou mostra "No templates available"

### Possíveis Causas
1. Arquivos não estão em `.github/ISSUE_TEMPLATE/`
2. Extensão incorreta (deve ser `.yml` ou `.yaml`)
3. Erro de sintaxe YAML
4. config.yml com problemas

### Solução
```bash
# Verificar localização dos arquivos
ls -la .github/ISSUE_TEMPLATE/

# Validar sintaxe YAML
yamllint .github/ISSUE_TEMPLATE/*.yml

# Verificar no GitHub após commit
git add .github/ISSUE_TEMPLATE/
git commit -m "fix: update issue templates"
git push
```

### ⏱️ Aguarde Cache
- GitHub pode levar até **10 minutos** para atualizar templates
- Limpe o cache do navegador
- Tente em modo anônimo/incógnito

---

## ❌ Workflow Não Executa

### Sintoma
Issue criada mas workflow não inicia automaticamente

### Possíveis Causas
1. Labels incorretas na issue
2. Workflow desabilitado
3. Permissões insuficientes
4. Erro no arquivo `.github/workflows/repo-generator.yml`

### Solução

#### 1. Verificar Labels
A issue deve ter as labels:
- `new-repository`
- `automation`
- `application` OU `infrastructure`

#### 2. Verificar Workflow
```bash
# Ver status dos workflows
gh workflow list

# Ver runs recentes
gh run list --workflow=repo-generator.yml

# Ver detalhes de erro
gh run view <run-id>
```

#### 3. Verificar Permissões
- Token precisa ter escopo `repo` e `workflow`
- Verifique secret `PAT_TOKEN` nas configurações

#### 4. Testar Manualmente
```bash
# Trigger manual do workflow
gh workflow run repo-generator.yml
```

---

## ❌ Título da Issue Não Atualiza

### Sintoma
Título continua como "[NEW APP] - " sem as informações

### Possíveis Causas
1. Step de atualização de título falhou
2. Permissões insuficientes
3. Formato de issue incorreto

### Solução

#### Verificar Logs
```bash
# Ver logs do workflow
gh run view <run-id> --log
```

#### Verificar Step Específico
Procure por erros no step `🏷️ Update Issue Title Dynamically`

#### Atualizar Manualmente
Se necessário, edite o título da issue manualmente seguindo o padrão:
- **App:** `[NEW APP] - nome-repo - stack - deployment`
- **Infra:** `[NEW INFRA] - nome-repo - tipo - ambiente`

---

## ❌ Erro "Repository Already Exists"

### Sintoma
Workflow falha com mensagem que repositório já existe

### Causa
Nome de repositório duplicado na organização

### Solução

1. **Escolha outro nome** ou
2. **Delete o repositório existente** (se não for mais necessário)
3. **Adicione sufixo único**: `-v2`, `-new`, `-2024`

```bash
# Verificar se repositório existe
gh repo view your-org/nome-do-repo
```

---

## ❌ Erro de Parsing do Issue

### Sintoma
```
Error: Unable to parse issue body
```

### Possíveis Causas
1. Formato de issue alterado manualmente
2. Campo obrigatório vazio
3. Caracteres especiais no input

### Solução

#### Recriar Issue
- Feche a issue atual
- Crie uma nova issue
- Use o template sem modificações
- Preencha todos campos obrigatórios

#### Verificar Formato
O parser espera formato específico gerado pelos templates:
```markdown
### Nome do Repositório
valor-aqui

### Stack Tecnológica
Java 17
```

---

## ❌ Permissões Negadas

### Sintoma
```
Error: Resource not accessible by integration
Error: 403 Forbidden
```

### Causa
Token sem permissões adequadas

### Solução

#### Verificar Scopes do Token
O `PAT_TOKEN` precisa de:
- ✅ `repo` (todos sub-scopes)
- ✅ `workflow`
- ✅ `admin:org` (para criar repos na org)

#### Recriar Token
1. Acesse GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Selecione scopes necessários
4. Copie o token
5. Atualize secret `PAT_TOKEN` no repositório

---

## ❌ Timeout na Execução

### Sintoma
Workflow cancela após 60 minutos

### Causa
Processo travado ou muito demorado

### Solução

#### Verificar Logs
```bash
gh run view <run-id> --log | grep -i timeout
```

#### Cancelar e Reexecutar
```bash
# Cancelar run travado
gh run cancel <run-id>

# Reexecutar
gh run rerun <run-id>
```

---

## ❌ Nome Inválido de Repositório

### Sintoma
```
Error: Name is invalid
```

### Causa
Nome não segue regras do GitHub

### Solução

#### Regras GitHub
- Apenas letras, números, hífens e underscores
- Não pode começar ou terminar com hífen
- Máximo 100 caracteres
- Case-insensitive (GitHub converte para lowercase)

#### Use Padrão Correto
```
✅ a5x-app-pos-anteros-receiver
❌ a5x_app_pos_anteros_receiver
❌ a5x app pos anteros receiver
❌ A5X-APP-POS-Anteros-Receiver
```

Ver mais em [Naming Conventions](Naming-Conventions)

---

## 🔍 Debug Avançado

### Habilitar Debug Logging

1. Vá em Settings → Secrets → Actions
2. Adicione secret: `ACTIONS_RUNNER_DEBUG = true`
3. Adicione secret: `ACTIONS_STEP_DEBUG = true`
4. Execute workflow novamente

### Ver Todos Workflows
```bash
# Listar workflows
gh workflow list

# Ver runs com falha
gh run list --status failure

# Ver workflow específico
gh run list --workflow=repo-generator.yml --limit 10
```

### Exportar Logs
```bash
# Download logs completos
gh run view <run-id> --log > workflow-debug.log

# Analisar
cat workflow-debug.log | grep -i error
```

---

## 📞 Ainda Precisa de Ajuda?

Se o problema persistir:

1. 📸 **Capture screenshot** do erro
2. 📋 **Copie logs** do workflow
3. 💬 **Entre em contato:**
   - Slack: `#devops-automation`
   - Issue: [Reportar Bug](../../issues/new?labels=bug)
   - Email: devops-team@company.com

### Informações Úteis para Reportar

Inclua sempre:
- ✅ Link da issue original
- ✅ Link do workflow run com erro
- ✅ Screenshot ou logs completos
- ✅ Passos para reproduzir
- ✅ O que esperava acontecer
- ✅ O que realmente aconteceu

---

**Última atualização:** Janeiro 2026
