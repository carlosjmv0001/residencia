{{- define "backend-app.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "backend-app.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "backend-app.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "backend-app.labels" -}}
app.kubernetes.io/name: {{ include "backend-app.name" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "backend-app.selectorLabels" -}}
app: {{ include "backend-app.name" . }}
{{- end -}}
