{{- define "frontend-app.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend-app.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "frontend-app.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend-app.labels" -}}
app.kubernetes.io/name: {{ include "frontend-app.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "frontend-app.selectorLabels" -}}
app: {{ include "frontend-app.name" . }}
{{- end -}}
