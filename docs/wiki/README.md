# README - Wiki do Sistema de Automação

## 📚 Bem-vindo ao Wiki

Esta pasta contém toda a documentação do **Sistema de Automação de Repositórios**.

## 📖 Páginas Disponíveis

### 🏠 [Home](Home.md)
Página principal com visão geral do sistema, templates disponíveis e guia de início rápido.

### 📏 [Naming Conventions](Naming-Conventions.md)
Convenções de nomenclatura obrigatórias para repositórios de aplicação e infraestrutura.

### 🔧 [Troubleshooting](Troubleshooting.md)
Guia de resolução de problemas comuns, erros e debugging.

### ❓ [FAQ](FAQ.md)
Perguntas frequentes sobre uso, configuração, segurança e casos de uso.

### 🏗️ [Architecture](Architecture.md)
Documentação técnica da arquitetura, fluxos, componentes e integrações.

---

## 🚀 Como Usar Este Wiki

### Opção 1: Leia Diretamente no Repositório
Navegue pelos arquivos `.md` nesta pasta `docs/wiki/`

### Opção 2: Publique no GitHub Wiki

1. **Habilite o Wiki no GitHub:**
   - Vá em Settings → General
   - Marque "Wikis"

2. **Clone o repositório Wiki:**
   ```bash
   git clone https://github.com/your-org/demo-reusable-workflows.wiki.git
   ```

3. **Copie os arquivos:**
   ```bash
   cp docs/wiki/*.md ../demo-reusable-workflows.wiki/
   cd ../demo-reusable-workflows.wiki
   ```

4. **Commit e push:**
   ```bash
   git add .
   git commit -m "docs: add complete wiki documentation"
   git push origin master
   ```

5. **Acesse:**
   ```
   https://github.com/your-org/demo-reusable-workflows/wiki
   ```

---

## 📝 Estrutura dos Arquivos

```
docs/wiki/
├── README.md                    # Este arquivo
├── Home.md                      # Página inicial do Wiki
├── Naming-Conventions.md        # Convenções de nomenclatura
├── Troubleshooting.md           # Resolução de problemas
├── FAQ.md                       # Perguntas frequentes
└── Architecture.md              # Arquitetura técnica
```

---

## 🔄 Manutenção

### Como Atualizar

1. Edite os arquivos `.md` em `docs/wiki/`
2. Commit no repositório principal
3. Se publicado no Wiki, copie novamente:
   ```bash
   cp docs/wiki/*.md ../demo-reusable-workflows.wiki/
   cd ../demo-reusable-workflows.wiki
   git add .
   git commit -m "docs: update wiki"
   git push
   ```

### Versionamento

- **Repositório:** Versionado junto com o código
- **GitHub Wiki:** Histórico separado (Git próprio)

**Recomendação:** Mantenha `docs/wiki/` como fonte única da verdade.

---

## 🎯 Guia Rápido de Navegação

| Preciso... | Consulte |
|------------|----------|
| Criar meu primeiro repositório | [Home](Home.md) |
| Entender convenções de nome | [Naming Conventions](Naming-Conventions.md) |
| Resolver um erro no workflow | [Troubleshooting](Troubleshooting.md) |
| Saber qual template usar | [FAQ](FAQ.md) |
| Entender como funciona | [Architecture](Architecture.md) |

---

## 📞 Suporte

- 💬 Slack: `#devops-automation`
- 🐛 [Reportar Bug](../../issues/new?labels=bug)
- 💡 [Sugerir Melhoria](../../issues/new?labels=enhancement)

---

**Última atualização:** Janeiro 2026  
**Mantido por:** Platform Engineering Team
