helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

helm install database bitnami/postgresql
helm install database bitnami/postgresql -f values.yaml

postgresql://devsecops:Aushsja34dfgh9345kd@database-postgresql:5432/devsecops