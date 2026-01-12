# Perguntas Frequentes (FAQ)

## 🤔 Questões Gerais

### ❓ Quanto tempo leva para criar um repositório?

Geralmente entre **3-5 minutos** após submeter a issue. O processo inclui:
1. Parse do formulário (10s)
2. Validações (20s)
3. Criação do repositório (30s)
4. Estrutura de arquivos (1-2min)
5. Commit inicial (30s)
6. Configurações finais (30s)

### ❓ Posso criar múltiplos repositórios ao mesmo tempo?

Sim! Crie múltiplas issues e elas serão processadas em paralelo. Porém, recomendamos:
- Máximo de **5 repositórios simultâneos**
- Aguarde confirmação antes de criar mais

### ❓ Posso editar a issue após submeter?

Sim, mas **não é recomendado**. O workflow já terá sido disparado com os dados originais. Se precisar mudar:
1. Feche a issue atual
2. Crie uma nova issue com os dados corretos

### ❓ O que acontece se eu fechar a issue antes do workflow terminar?

O workflow continuará executando normalmente. Fechar a issue não cancela o processo. O repositório será criado mesmo assim.

### ❓ Posso cancelar a criação de um repositório?

Sim, há duas formas:
1. **Antes de iniciar:** Feche a issue rapidamente (< 30s)
2. **Durante execução:** Cancele o workflow manualmente

```bash
# Cancelar workflow em execução
gh run list --workflow=repo-generator.yml --limit 1
gh run cancel <run-id>
```

---

## 🚀 Sobre Aplicações

### ❓ Quais stacks são suportadas?

Atualmente:
- ✅ **Java 17** (Spring Boot, Quarkus, Micronaut)
- ✅ **Node.js 24.12.0** (Express, NestJS, Fastify)

Novas stacks em roadmap:
- 🔄 Python 3.12 (FastAPI, Django)
- 🔄 Go 1.21
- 🔄 .NET 8

### ❓ Qual domínio devo escolher?

Depende da área de negócio:

- **CRX (Cross):** Serviços transversais, autenticação, notificações
- **DAT (Dados):** Analytics, relatórios, processamento de dados
- **POS (Post Trading):** Clearing, settlement, custódia
- **TRD (Trading):** Execução de ordens, risk management

Em dúvida? Pergunte no Slack `#devops-automation`

### ❓ Posso mudar o domínio depois?

Tecnicamente sim, mas **não é recomendado**. Mudança de domínio implica:
- Renomear repositório
- Atualizar referências em CI/CD
- Atualizar documentação
- Comunicar equipes

Escolha com cuidado desde o início.

### ❓ O repositório já vem com CI/CD configurado?

Sim! O template inclui:
- ✅ GitHub Actions para build
- ✅ GitHub Actions para testes
- ✅ GitHub Actions para deploy (básico)
- ✅ Dependabot configurado
- ✅ Security scanning habilitado

Você precisará apenas ajustar variáveis de ambiente.

---

## 🏗️ Sobre Infraestrutura

### ❓ Qual tipo de infraestrutura devo escolher?

Depende da sua necessidade:

- **Terraform (AWS/Azure/GCP):** Gerenciar recursos cloud
- **CloudFormation:** Exclusivo AWS, mais integrado
- **Ansible:** Configuração de servidores, automação
- **Kubernetes Manifests:** Aplicações containerizadas
- **Helm Charts:** Pacotes Kubernetes reutilizáveis

### ❓ Posso gerenciar múltiplos ambientes no mesmo repo?

**Sim, recomendado!** Escolha "Multi-ambiente" e organize:

```
environments/
  ├── dev.tfvars
  ├── staging.tfvars
  └── production.tfvars
```

Isso facilita:
- ✅ Versionamento conjunto
- ✅ Promoção de mudanças
- ✅ Consistência entre ambientes

### ❓ O Terraform backend já vem configurado?

Sim, se marcar a opção "Terraform Backend S3 configurado":
- S3 bucket para state
- DynamoDB para lock
- Encryption habilitada
- Versioning ativo

Você só precisa ajustar o bucket name.

### ❓ Como funciona o cost estimation (Infracost)?

Se habilitado, **a cada PR:**
1. Infracost analisa mudanças no Terraform
2. Calcula custo estimado mensal
3. Posta comentário no PR com diferença de custo
4. Permite aprovar/rejeitar baseado no impacto

---

## 🔐 Sobre Segurança e Permissões

### ❓ Quem pode criar repositórios?

Qualquer membro com:
- ✅ Acesso de escrita neste repositório
- ✅ Permissão na organização para criar repos
- ✅ Membro de time autorizado

### ❓ Os repositórios são públicos ou privados?

Você escolhe no formulário:
- **Private:** Apenas membros explícitos
- **Internal:** Todos da organização

**Não criamos repositórios públicos** por política de segurança.

### ❓ Quem tem acesso ao repositório criado?

Inicialmente:
- ✅ Criador da issue (Admin)
- ✅ Time de Platform (Admin)
- ✅ Equipe especificada no formulário (Write)

Adicione mais pessoas em Settings → Collaborators.

### ❓ Posso transferir o repositório para outra organização?

Sim, mas requer aprovação:
1. Abra issue solicitando transferência
2. Justifique o motivo
3. Aguarde aprovação do Platform Team
4. Transferência será feita manualmente

---

## 📝 Sobre Nomenclatura

### ❓ Por que o nome precisa seguir padrão específico?

Padronização facilita:
- ✅ **Organização:** Fácil encontrar repositórios
- ✅ **Automação:** Scripts e ferramentas funcionam
- ✅ **Billing:** Rastreamento de custos por domínio
- ✅ **Governança:** Auditorias e compliance

### ❓ Posso usar underscores ao invés de hífens?

**Não recomendado.** Hífens são padrão:
- URLs mais amigáveis
- Melhor SEO (se exposto)
- Convenção Git/GitHub
- Evita problemas em shells

Mas tecnicamente, GitHub aceita ambos.

### ❓ O que acontece se eu usar nome incorreto?

O workflow pode:
- ⚠️ **Alertar:** Comentário com aviso
- ❌ **Falhar:** Se muito fora do padrão
- ✅ **Sugerir:** Nome correto alternativo

**Melhor:** Siga o padrão desde o início! Ver [Naming Conventions](Naming-Conventions).

---

## 🔧 Problemas Técnicos

### ❓ Workflow falhou, o que fazer?

1. **Verifique os logs:**
   ```bash
   gh run view <run-id> --log
   ```

2. **Consulte:** [Troubleshooting](Troubleshooting)

3. **Reexecute:**
   ```bash
   gh run rerun <run-id>
   ```

4. **Se persistir:** Abra issue de bug

### ❓ Como atualizar o template do meu repositório?

Templates evoluem. Para atualizar:

```bash
cd meu-repositorio

# Adicionar template como remote
git remote add template https://github.com/your-org/repo-templates

# Fetch changes
git fetch template

# Merge seletivo (cuidado!)
git merge template/main --allow-unrelated-histories
```

**Recomendação:** Faça em branch separada e teste antes!

### ❓ Posso personalizar o template antes de criar?

Não diretamente. Mas você pode:
1. Criar repositório com template padrão
2. Fazer suas customizações
3. Enviar PR melhorando o template para todos

---

## 🎯 Casos de Uso

### ❓ Preciso criar microserviço, qual template usar?

**Template de Aplicação:**
- Stack: Escolha Java 17 ou Node.js 24.12.0
- Deploy: AWS EKS (Kubernetes)
- Domínio: Depende da função do microserviço

### ❓ Preciso criar API Gateway, qual template?

**Template de Aplicação:**
- Stack: Node.js 24.12.0 (mais comum para gateways)
- Deploy: AWS EKS ou Lambda
- Domínio: CRX (Cross - serviço transversal)

### ❓ Preciso gerenciar cluster EKS, qual template?

**Template de Infraestrutura:**
- Tipo: Terraform (AWS)
- Ambiente: Multi-ambiente
- Recursos: Marque Compute (ECS, EKS, Lambda)

### ❓ Preciso criar frontend React, qual template?

**Template de Aplicação:**
- Stack: Node.js 24.12.0
- Deploy: AWS ECS (se SSR) ou S3+CloudFront
- Domínio: Depende do produto

---

## 📊 Métricas e Auditoria

### ❓ Como ver quantos repositórios já foram criados?

```bash
# Via CLI
gh repo list your-org --topic automated-creation --limit 1000

# Via API
curl -H "Authorization: token $TOKEN" \
  "https://api.github.com/orgs/your-org/repos?per_page=100" | \
  jq '[.[] | select(.topics[] | contains("automated-creation"))] | length'
```

### ❓ Existe relatório de uso?

Em desenvolvimento! Em breve teremos dashboard com:
- 📊 Repositórios criados por mês
- 📈 Stacks mais populares
- 🏷️ Distribuição por domínio
- ⏱️ Tempo médio de criação

---

## 💡 Sugestões e Melhorias

### ❓ Como sugiro uma melhoria no template?

1. Abra issue: [Feature Request](../../issues/new?labels=enhancement)
2. Descreva a melhoria
3. Justifique o valor
4. Aguarde avaliação do Platform Team

### ❓ Posso contribuir com código?

**Sim!** Pull Requests são bem-vindos:
1. Fork o repositório
2. Crie branch feature/sua-melhoria
3. Implemente e teste
4. Abra PR com descrição detalhada
5. Aguarde review

### ❓ Qual o roadmap de novas features?

Em planejamento para 2026:
- 🔄 Suporte Python e Go
- 🔄 Templates de frontend (React, Vue, Angular)
- 🔄 Integração com Backstage
- 🔄 Dashboard de métricas
- 🔄 Auto-scaling de recursos
- 🔄 Testes E2E automáticos

---

## 📞 Contato

### ❓ Onde encontro mais ajuda?

- 📚 [Home do Wiki](Home)
- 🔧 [Troubleshooting](Troubleshooting)
- 📏 [Naming Conventions](Naming-Conventions)
- 💬 Slack: `#devops-automation`
- 📧 Email: devops-team@company.com

### ❓ Posso agendar sessão de onboarding?

Sim! Entre em contato no Slack para agendar:
- 👥 Sessão em grupo (quinzenais)
- 🎯 Sessão individual (sob demanda)

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0  
**Mantido por:** Platform Engineering Team
