helm/
  Chart.yaml
  values.yaml
  values-dev.yaml
  values-production.yaml
  templates/
    deployment.yaml
    service.yaml
    ingress.yaml

# Para dev
helm upgrade --install backend ./helm -f ./helm/values-dev.yaml -n backend-dev

# Para produção
helm upgrade --install backend ./helm -f ./helm/values-production.yaml -n backend-prod