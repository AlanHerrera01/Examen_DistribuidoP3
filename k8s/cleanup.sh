#!/bin/bash

echo "Limpiando Sistema de Gestión de Siniestros de Kubernetes..."

# Eliminar en orden inverso
echo "Eliminando Ingress..."
kubectl delete -f ingress.yaml --ignore-not-found=true

echo "Eliminando frontend..."
kubectl delete -f frontend-service.yaml --ignore-not-found=true
kubectl delete -f frontend-deployment.yaml --ignore-not-found=true

echo "Eliminando backend..."
kubectl delete -f backend-service.yaml --ignore-not-found=true
kubectl delete -f backend-deployment.yaml --ignore-not-found=true

echo "Eliminando bases de datos..."
kubectl delete -f mysql-service.yaml --ignore-not-found=true
kubectl delete -f mysql-deployment.yaml --ignore-not-found=true
kubectl delete -f postgres-service.yaml --ignore-not-found=true
kubectl delete -f postgres-deployment.yaml --ignore-not-found=true

echo "Eliminando Persistent Volume Claims..."
kubectl delete -f mysql-pvc.yaml --ignore-not-found=true
kubectl delete -f postgres-pvc.yaml --ignore-not-found=true

echo "¡Limpieza completada!"
