#!/bin/sh

# Substitui as variáveis de ambiente do GitLab nas configurações
if [ -f .env.production ]; then
    # Substitui variáveis do GitLab CI/CD
    export $(cat .env.production | xargs)
fi

# Executa o comando original
exec "$@"