# Guía Completa de Despliegue - Sistema de Siniestros

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración del Entorno](#configuración-del-entorno)
3. [Despliegue Local con Docker](#despliegue-local-con-docker)
4. [Despliegue en Kubernetes](#despliegue-en-kubernetes)
5. [Verificación y Pruebas](#verificación-y-pruebas)
6. [Capturas de Pantalla Obligatorias](#capturas-de-pantalla-obligatorias)
7. [Solución de Problemas](#solución-de-problemas)

## 🔧 Requisitos Previos

### Software Necesario
- **Docker Desktop** v4.15+ (con Kubernetes habilitado)
- **Java 17** JDK
- **Maven 3.8+**
- **Node.js 18+**
- **Git**
- **kubectl** (incluido en Docker Desktop)

### Verificación de Instalación
```bash
# Verificar Docker
docker --version
docker-compose --version

# Verificar Kubernetes
kubectl cluster-info
kubectl get nodes

# Verificar Java y Maven
java -version
mvn --version

# Verificar Node.js
node --version
npm --version
```

## 🛠️ Configuración del Entorno

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd HerreraAlanHerrera_examen
```

### 2. Habilitar Kubernetes en Docker Desktop
1. Abrir Docker Desktop
2. Ir a Settings → Kubernetes
3. Habilitar "Enable Kubernetes"
4. Hacer clic en "Apply & Restart"

### 3. Verificar Cluster Kubernetes
```bash
kubectl get nodes
kubectl get namespaces
```

## 🐳 Despliegue Local con Docker

### Paso 1: Construir y Ejecutar
```bash
# Usar el docker-compose completo
docker-compose -f docker-compose.complete.yml up --build -d

# Verificar el estado
docker-compose -f docker-compose.complete.yml ps
```

### Paso 2: Esperar a que los Servicios Estén Listos
```bash
# Ver logs del backend
docker-compose -f docker-compose.complete.yml logs -f backend

# En otra terminal, ver logs del frontend
docker-compose -f docker-compose.complete.yml logs -f frontend
```

### Paso 3: Acceder a la Aplicación
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/actuator/health

### Paso 4: Probar Funcionalidad
```bash
# Probar API endpoints
curl http://localhost:8080/api/polizas
curl http://localhost:8080/api/proveedores
curl http://localhost:8080/api/siniestros
```

## ☸️ Despliegue en Kubernetes

### Paso 1: Construir Imágenes Docker

```bash
# Construir imagen del backend
docker build -t kubernetescourse/kubernetes-crud-api:0.0.1-SNAPSHOT .

# Construir imagen del frontend
cd frontend
docker build -t siniestros-frontend:latest .
cd ..

# Verificar imágenes
docker images | grep -E "(kubernetes-crud-api|siniestros-frontend)"
```

### Paso 2: Desplegar Infraestructura

```bash
cd k8s

# Dar permisos a los scripts
chmod +x deploy-all.sh
chmod +x cleanup.sh

# Ejecutar despliegue completo
./deploy-all.sh
```

### Paso 3: Verificar Despliegue

```bash
# Ver pods (esperar a que todos estén Running)
kubectl get pods -w

# Ver servicios
kubectl get services

# Ver PVCs
kubectl get pvc

# Ver eventos si hay problemas
kubectl get events --sort-by=.metadata.creationTimestamp
```

### Paso 4: Configurar Acceso

#### Opción A: Port Forwarding
```bash
# Acceder al frontend
kubectl port-forward service/frontend-service 3000:80

# Acceder al backend (para pruebas)
kubectl port-forward service/backend-service 8080:8080
```

#### Opción B: LoadBalancer (si está disponible)
```bash
# Obtener IP del servicio frontend
kubectl get service frontend-service -o wide

# Acceder via IP externa
http://<EXTERNAL-IP>:80
```

#### Opción C: Ingress
```bash
# Aplicar configuración de hosts (Linux/Mac)
echo "127.0.0.1 siniestros.local" | sudo tee -a /etc/hosts

# En Windows, editar C:\Windows\System32\drivers\etc\hosts como administrador
# Agregar: 127.0.0.1 siniestros.local

# Acceder via hostname
http://siniestros.local
```

## ✅ Verificación y Pruebas

### 1. Verificar Estado del Sistema

```bash
# Ver todos los recursos
kubectl get all

# Ver detalles de los pods
kubectl describe pods -l app=backend
kubectl describe pods -l app=frontend
kubectl describe pods -l app=mysql
kubectl describe pods -l app=postgres
```

### 2. Probar Conectividad

```bash
# Probar API desde dentro del cluster
kubectl run test-pod --image=curlimages/curl -it --rm -- /bin/sh

# Dentro del pod:
curl http://backend-service:8080/actuator/health
curl http://backend-service:8080/api/polizas
```

### 3. Probar Operaciones CRUD

#### Crear Datos de Prueba
```bash
# Crear póliza
curl -X POST http://localhost:8080/api/polizas \
  -H "Content-Type: application/json" \
  -d '{
    "numeroPoliza": "POL-001",
    "tipo": "AUTOMOVIL",
    "estado": "ACTIVA"
  }'

# Crear proveedor
curl -X POST http://localhost:8080/api/proveedores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Taller Central",
    "tipo": "TALLER",
    "ciudad": "Bogotá"
  }'

# Crear siniestro
curl -X POST http://localhost:8080/api/siniestros \
  -H "Content-Type: application/json" \
  -d '{
    "numeroCaso": "CAS-001",
    "fecha": "2024-01-15",
    "descripcion": "Accidente automovilístico",
    "montoEstimado": 5000.0,
    "estado": "ABIERTO",
    "polizaId": 1,
    "proveedorId": 1
  }'
```

## 📸 Capturas de Pantalla Obligatorias

### 1. Pods en Ejecución
```bash
kubectl get pods -o wide
```
**Qué capturar**: 
- Todos los pods en estado "Running"
- Columnas: NAME, READY, STATUS, RESTARTS, IP, NODE
- Debe mostrar: mysql, postgres, backend (x2), frontend (x2)

### 2. Services
```bash
kubectl get services -o wide
```
**Qué capturar**:
- Todos los servicios con sus tipos y puertos
- mysql-service (ClusterIP)
- postgres-service (ClusterIP) 
- backend-service (ClusterIP)
- frontend-service (LoadBalancer)

### 3. Frontend Funcionando
**Qué capturar**:
- Navegador en http://localhost:3000
- Interfaz con las tres pestañas: Pólizas, Proveedores, Siniestros
- Mostrar lista de datos existente

### 4. Operaciones CRUD Ejecutándose

#### 4.1 Creación de Póliza
- Captura del modal de "Nueva Póliza"
- Formulario completado con datos
- Resultado exitoso

#### 4.2 Listado de Proveedores
- Captura de la tabla de proveedores
- Mostrar diferentes tipos con badges de colores
- Datos de ejemplo

#### 4.3 Creación de Siniestro
- Captura del modal grande de "Nuevo Siniestro"
- Formulario completo con selección de póliza y proveedor
- Datos relacionados correctamente

#### 4.4 Operaciones de Edición/Eliminación
- Captura mostrando botones de Editar/Eliminar
- Confirmación de eliminación
- Actualización exitosa

## 🔧 Solución de Problemas

### Problemas Comunes y Soluciones

#### 1. Pods en Pending/ImagePullBackOff
```bash
# Verificar imágenes
docker images | grep kubernetescourse

# Si las imágenes no existen, construirlas
docker build -t kubernetescourse/kubernetes-crud-api:0.0.1-SNAPSHOT .
cd frontend && docker build -t siniestros-frontend:latest . && cd ..

# Reiniciar deployment
kubectl rollout restart deployment/backend-deployment
kubectl rollout restart deployment/frontend-deployment
```

#### 2. Problemas de Conexión a Base de Datos
```bash
# Verificar configuración de servicios
kubectl get services

# Verificar credenciales en los pods
kubectl exec -it deployment/backend-deployment -- env | grep -E "(MYSQL|POSTGRES)"

# Probar conexión desde el pod
kubectl exec -it deployment/backend-deployment -- nc -zv mysql-service 3306
kubectl exec -it deployment/backend-deployment -- nc -zv postgres-service 5432
```

#### 3. Frontend no Conecta al Backend
```bash
# Verificar configuración de nginx
kubectl exec -it deployment/frontend-deployment -- cat /etc/nginx/conf.d/default.conf

# Probar conexión desde frontend
kubectl exec -it deployment/frontend-deployment -- curl http://backend-service:8080/actuator/health
```

#### 4. Problemas de Persistent Volumes
```bash
# Verificar PVCs
kubectl get pvc
kubectl describe pvc mysql-pvc
kubectl describe pvc postgres-pvc

# Si están atascados, eliminar y recrear
kubectl delete pvc mysql-pvc postgres-pvc
kubectl apply -f mysql-pvc.yaml
kubectl apply -f postgres-pvc.yaml
```

### Comandos de Diagnóstico

```bash
# Ver logs detallados
kubectl logs -f deployment/backend-deployment --tail=100
kubectl logs -f deployment/frontend-deployment --tail=100

# Ver eventos del namespace
kubectl get events --sort-by=.metadata.creationTimestamp

# Describir recursos problemáticos
kubectl describe pod <pod-name>
kubectl describe service <service-name>

# Ver configuración aplicada
kubectl get deployment backend-deployment -o yaml
kubectl get configmap -o yaml
```

### Reinicio Completo del Sistema

```bash
cd k8s

# Limpiar todo
./cleanup.sh

# Esperar 30 segundos
sleep 30

# Redesplegar
./deploy-all.sh

# Monitorear el despliegue
watch kubectl get pods
```

## 📊 Monitoreo y Mantenimiento

### Verificación de Salud
```bash
# Health checks
kubectl get pods -l app=backend -o jsonpath='{.items[*].status.containerStatuses[*].ready}'

# Ver uso de recursos
kubectl top nodes
kubectl top pods
```

### Escalado
```bash
# Escalar backend
kubectl scale deployment backend-deployment --replicas=3

# Escalar frontend
kubectl scale deployment frontend-deployment --replicas=3
```

### Actualizaciones
```bash
# Actualizar imagen
kubectl set image deployment/backend-deployment backend=kubernetescourse/kubernetes-crud-api:v2.0

# Verificar rollout
kubectl rollout status deployment/backend-deployment

# Revertir si hay problemas
kubectl rollout undo deployment/backend-deployment
```

## 🎯 Checklist Final de Entrega

- [ ] README.md completo y actualizado
- [ ] Todas las capturas de pantalla requeridas
- [ ] Sistema funcionando correctamente
- [ ] API RESTful documentada
- [ ] CRUD completo en todas las entidades
- [ ] Despliegue Docker verificado
- [ ] Despliegue Kubernetes verificado
- [ ] Código fuente en GitHub
- [ ] Documentación de despliegue completa

## 📝 Notas Finales

1. **Tiempo de despliegue**: El despliegue inicial puede tomar 5-10 minutos
2. **Recursos mínimos**: Asegurar al menos 4GB RAM para Docker Desktop
3. **Red**: Verificar conectividad si se usa cloud provider
4. **Persistencia**: Los datos persisten mientras los PVC no se eliminen
5. **Seguridad**: En producción, usar secrets para credenciales

---

**Éxito en tu presentación!** 🚀
