#!/bin/bash

# Script de validação do sistema de geração de repositórios
# Execute este script para verificar se tudo está configurado corretamente

set -e

echo "🔍 Validando Sistema de Geração de Repositórios..."
echo "=================================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. Verificar estrutura de diretórios
echo "📁 Verificando estrutura de diretórios..."
REQUIRED_DIRS=(
    ".github"
    ".github/ISSUE_TEMPLATE"
    ".github/workflows"
    ".github/scripts"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        success "Diretório existe: $dir"
    else
        error "Diretório não encontrado: $dir"
        exit 1
    fi
done
echo ""

# 2. Verificar arquivos necessários
echo "📄 Verificando arquivos necessários..."
REQUIRED_FILES=(
    ".github/ISSUE_TEMPLATE/new-repository.yml"
    ".github/workflows/repo-generator.yml"
    ".github/scripts/generate-repository.js"
    ".github/scripts/templates-config.js"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        success "Arquivo existe: $file"
    else
        error "Arquivo não encontrado: $file"
        exit 1
    fi
done
echo ""

# 3. Validar sintaxe YAML
echo "🔍 Validando sintaxe YAML..."
if command -v yamllint &> /dev/null; then
    for yaml_file in .github/ISSUE_TEMPLATE/*.yml .github/workflows/*.yml; do
        if [ -f "$yaml_file" ]; then
            if yamllint "$yaml_file" 2>/dev/null; then
                success "YAML válido: $yaml_file"
            else
                warning "YAML com avisos: $yaml_file (não crítico)"
            fi
        fi
    done
else
    warning "yamllint não instalado - pulando validação YAML"
fi
echo ""

# 4. Validar sintaxe JavaScript
echo "🔍 Validando sintaxe JavaScript..."
if command -v node &> /dev/null; then
    for js_file in .github/scripts/*.js; do
        if [ -f "$js_file" ]; then
            if node --check "$js_file" 2>/dev/null; then
                success "JavaScript válido: $js_file"
            else
                error "Erro de sintaxe em: $js_file"
                exit 1
            fi
        fi
    done
else
    error "Node.js não instalado - necessário para o gerador"
    exit 1
fi
echo ""

# 5. Verificar GitHub CLI
echo "🔍 Verificando GitHub CLI..."
if command -v gh &> /dev/null; then
    success "GitHub CLI instalado: $(gh --version | head -1)"
    
    # Verificar autenticação
    if gh auth status &> /dev/null; then
        success "GitHub CLI autenticado"
    else
        warning "GitHub CLI não autenticado - execute: gh auth login"
    fi
else
    warning "GitHub CLI não instalado (opcional mas recomendado)"
fi
echo ""

# 6. Verificar secrets necessários
echo "🔐 Verificando configuração de secrets..."
if command -v gh &> /dev/null && gh auth status &> /dev/null; then
    REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "unknown")
    
    if [ "$REPO" != "unknown" ]; then
        echo "Repositório atual: $REPO"
        
        # Verificar se PAT_TOKEN existe (não conseguimos ver o valor)
        if gh secret list 2>/dev/null | grep -q "PAT_TOKEN"; then
            success "Secret PAT_TOKEN configurado"
        else
            error "Secret PAT_TOKEN NÃO configurado!"
            echo ""
            echo "Para configurar:"
            echo "1. Gere um token em: https://github.com/settings/tokens"
            echo "2. Selecione escopos: repo, workflow, admin:org"
            echo "3. Execute: gh secret set PAT_TOKEN"
            echo ""
        fi
    fi
else
    warning "Não foi possível verificar secrets (GitHub CLI não disponível)"
fi
echo ""

# 7. Verificar issue template
echo "📝 Validando issue template..."
ISSUE_TEMPLATE=".github/ISSUE_TEMPLATE/new-repository.yml"

# Verificar campos obrigatórios
REQUIRED_FIELDS=(
    "repo_name"
    "stack"
    "deployment_target"
    "database"
)

for field in "${REQUIRED_FIELDS[@]}"; do
    if grep -q "id: $field" "$ISSUE_TEMPLATE"; then
        success "Campo encontrado: $field"
    else
        error "Campo obrigatório não encontrado: $field"
        exit 1
    fi
done
echo ""

# 8. Verificar workflow
echo "⚙️  Validando workflow..."
WORKFLOW_FILE=".github/workflows/repo-generator.yml"

# Verificar jobs essenciais
if grep -q "jobs:" "$WORKFLOW_FILE"; then
    success "Jobs definidos no workflow"
else
    error "Jobs não encontrados no workflow"
    exit 1
fi

# Verificar trigger correto
if grep -q "issues:" "$WORKFLOW_FILE"; then
    success "Trigger de issues configurado"
else
    error "Trigger de issues não configurado"
    exit 1
fi
echo ""

# 9. Testar carregamento do config
echo "🔧 Testando configuração de templates..."
if node -e "const config = require('./.github/scripts/templates-config.js'); console.log('Stacks:', Object.keys(config.stacks).length)" 2>/dev/null; then
    success "Arquivo de configuração carregado com sucesso"
else
    error "Erro ao carregar arquivo de configuração"
    exit 1
fi
echo ""

# 10. Resumo final
echo "=================================================="
echo "📊 RESUMO DA VALIDAÇÃO"
echo "=================================================="
echo ""

# Contar arquivos
TOTAL_FILES=$(find .github -type f | wc -l)
echo "Total de arquivos em .github/: $TOTAL_FILES"

# Verificar dependências opcionais
echo ""
echo "Dependências Opcionais:"
command -v yamllint &> /dev/null && echo "  ✅ yamllint" || echo "  ⚪ yamllint (não instalado)"
command -v gh &> /dev/null && echo "  ✅ gh (GitHub CLI)" || echo "  ⚪ gh (não instalado)"
command -v jq &> /dev/null && echo "  ✅ jq" || echo "  ⚪ jq (não instalado)"

echo ""
echo "=================================================="
success "Sistema validado com sucesso! ✨"
echo "=================================================="
echo ""
echo "🎯 Próximos Passos:"
echo "1. Configure o secret PAT_TOKEN (se ainda não configurou)"
echo "2. Crie uma issue de teste usando o template"
echo "3. Acompanhe a execução em Actions"
echo ""
echo "📚 Documentação:"
echo "- Guia Rápido: QUICKSTART.md"
echo "- Documentação Completa: REPO_GENERATOR.md"
echo ""
