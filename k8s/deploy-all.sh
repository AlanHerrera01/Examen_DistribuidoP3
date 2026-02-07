#!/bin/bash

echo "Desplegando Sistema de Gestión de Siniestros en Kubernetes..."

# Aplicar todos los manifiestos
echo "Creando Persistent Volume Claims..."
kubectl apply -f mysql-pvc.yaml
kubectl apply -f postgres-pvc.yaml

echo "Desplegando bases de datos..."
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-service.yaml
kubectl apply -f postgres-deployment.yaml
kubectl apply -f postgres-service.yaml

echo "Esperando a que las bases de datos estén listas..."
kubectl wait --for=condition=ready pod -l app=mysql --timeout=300s
kubectl wait --for=condition=ready pod -l app=postgres --timeout=300s

echo "Desplegando backend..."
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml

echo "Esperando a que el backend esté listo..."
kubectl wait --for=condition=ready pod -l app=backend --timeout=300s

echo "Desplegando frontend..."
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

echo "Configurando Ingress..."
kubectl apply -f ingress.yaml

echo "Verificando despliegue..."
kubectl get pods
kubectl get services
kubectl get ingress

echo "¡Despliegue completado!"
echo "Para verificar el estado: kubectl get pods -w"
echo "Para acceder a la aplicación, verifica el servicio frontend o ingress"
