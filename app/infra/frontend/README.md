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
helm upgrade --install frontend ./helm -f ./helm/values-dev.yaml -n frontend-dev

# Para produção
helm upgrade --install frontend ./helm -f ./helm/values-production.yaml -n frontend-prod