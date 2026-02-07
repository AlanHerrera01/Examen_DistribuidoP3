# Sistema de Gestión de Siniestros - Aplicación Distribuida

## Descripción del Proyecto

Sistema completo para la gestión de siniestros de seguros, implementado con una arquitectura de microservicios distribuidos. El sistema permite registrar y gestionar siniestros vinculados a pólizas de seguro y proveedores de servicios (talleres, clínicas, grúas).

### Arquitectura

- **Backend**: Spring Boot 3 con Java 17
- **Frontend**: React 18 con Bootstrap 5
- **Base de Datos**: MySQL (Pólizas y Proveedores) + PostgreSQL (Siniestros)
- **Contenerización**: Docker
- **Orquestación**: Kubernetes

## Modelo de Datos

### Entidades Independientes

#### Póliza
- `id`: Identificador único
- `numeroPoliza`: Número único de póliza
- `tipo`: Tipo de póliza
- `estado`: Estado de la póliza

#### Proveedor
- `id`: Identificador único
- `nombre`: Nombre del proveedor
- `tipo`: Tipo (TALLER/CLÍNICA/GRÚA)
- `ciudad`: Ciudad del proveedor

### Entidad Dependiente

#### Siniestro
- `id`: Identificador único
- `numeroCaso`: Número único de caso
- `fecha`: Fecha del siniestro
- `descripcion`: Descripción del incidente
- `montoEstimado`: Monto estimado del daño
- `estado`: Estado (ABIERTO/EN_PROCESO/CERRADO)
- `polizaId`: FK → Póliza
- `proveedorId`: FK → Proveedor

## API Endpoints

### Pólizas
- `GET /api/polizas` - Listar todas las pólizas
- `GET /api/polizas/{id}` - Obtener póliza por ID
- `POST /api/polizas` - Crear nueva póliza
- `PUT /api/polizas/{id}` - Actualizar póliza
- `DELETE /api/polizas/{id}` - Eliminar póliza

### Proveedores
- `GET /api/proveedores` - Listar todos los proveedores
- `GET /api/proveedores/{id}` - Obtener proveedor por ID
- `GET /api/proveedores/tipo/{tipo}` - Filtrar por tipo
- `GET /api/proveedores/ciudad/{ciudad}` - Filtrar por ciudad
- `POST /api/proveedores` - Crear nuevo proveedor
- `PUT /api/proveedores/{id}` - Actualizar proveedor
- `DELETE /api/proveedores/{id}` - Eliminar proveedor

### Siniestros
- `GET /api/siniestros` - Listar todos los siniestros
- `GET /api/siniestros/{id}` - Obtener siniestro por ID
- `GET /api/siniestros/caso/{numeroCaso}` - Buscar por número de caso
- `GET /api/siniestros/poliza/{polizaId}` - Filtrar por póliza
- `GET /api/siniestros/proveedor/{proveedorId}` - Filtrar por proveedor
- `GET /api/siniestros/estado/{estado}` - Filtrar por estado
- `POST /api/siniestros` - Crear nuevo siniestro
- `PUT /api/siniestros/{id}` - Actualizar siniestro
- `DELETE /api/siniestros/{id}` - Eliminar siniestro

## Requisitos Previos

- Docker Desktop instalado
- Kubernetes cluster (minikube, Docker Desktop K8s, o cloud K8s)
- kubectl configurado
- Maven 3.8+
- Node.js 18+
- Git

## Despliegue con Docker

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd HerreraAlanHerrera_examen
```

### 2. Construir y ejecutar todos los servicios
```bash
docker-compose -f docker-compose.complete.yml up --build -d
```

### 3. Verificar el estado
```bash
docker-compose -f docker-compose.complete.yml ps
```

### 4. Acceder a la aplicación
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Health Check: http://localhost:8080/actuator/health

## Despliegue con Kubernetes

### 1. Construir imágenes Docker
```bash
# Backend
docker build -t kubernetescourse/kubernetes-crud-api:0.0.1-SNAPSHOT .

# Frontend
cd frontend
docker build -t siniestros-frontend:latest .
cd ..
```

### 2. Desplegar en Kubernetes
```bash
cd k8s

# Opción 1: Usar el script de despliegue
chmod +x deploy-all.sh
./deploy-all.sh

# Opción 2: Aplicar manualmente
kubectl apply -k .
```

### 3. Verificar el despliegue
```bash
# Ver pods
kubectl get pods -w

# Ver servicios
kubectl get services

# Ver ingress (si está configurado)
kubectl get ingress
```

### 4. Acceder a la aplicación
```bash
# Si usas LoadBalancer
kubectl port-forward service/frontend-service 3000:80

# Si usas Ingress, configura tu hosts file:
echo "127.0.0.1 siniestros.local" | sudo tee -a /etc/hosts
```

## Estructura del Proyecto

```
HerreraAlanHerrera_examen/
├── src/main/java/com/example/kubernetescrudapi/
│   ├── controller/          # Controladores REST
│   ├── service/            # Lógica de negocio
│   ├── repository/         # Repositorios JPA
│   ├── model/              # Entidades JPA
│   │   ├── mysql/          # Entidades MySQL
│   │   └── postgres/       # Entidades PostgreSQL
│   ├── config/             # Configuración de datasources
│   └── exception/          # Manejo de excepciones
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # Servicios API
│   │   └── App.js          # Aplicación principal
│   ├── Dockerfile          # Dockerfile del frontend
│   └── nginx.conf          # Configuración Nginx
├── k8s/                    # Manifiestos Kubernetes
│   ├── mysql-deployment.yaml
│   ├── postgres-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── *-service.yaml      # Servicios
│   ├── *-pvc.yaml          # Persistent Volume Claims
│   ├── ingress.yaml        # Ingress configuration
│   ├── kustomization.yaml  # Kustomize config
│   ├── deploy-all.sh       # Script de despliegue
│   └── cleanup.sh          # Script de limpieza
├── docker-compose.yml      # Docker Compose básico
├── docker-compose.complete.yml  # Docker Compose completo
├── Dockerfile              # Dockerfile del backend
└── pom.xml                # Maven configuration
```

## Capturas de Pantalla Requeridas

### 1. Pods en Ejecución
```bash
kubectl get pods -o wide
```
*Captura mostrará todos los pods running: mysql, postgres, backend (2 réplicas), frontend (2 réplicas)*

### 2. Services
```bash
kubectl get services
```
*Captura mostrará los servicios ClusterIP y LoadBalancer*

### 3. Frontend Funcionando
*Captura de la interfaz web en http://localhost:3000 mostrando las pestañas de Pólizas, Proveedores y Siniestros*

### 4. Operaciones CRUD
*Capturas de:*
- *Creación de una nueva póliza*
- *Listado de proveedores*
- *Creación de un siniestro vinculando póliza y proveedor*
- *Edición y eliminación de registros*

## Pruebas del Sistema

### 1. Pruebas de API
```bash
# Probar backend
curl http://localhost:8080/api/polizas
curl http://localhost:8080/api/proveedores
curl http://localhost:8080/api/siniestros
```

### 2. Pruebas de Base de Datos
```bash
# MySQL
docker exec -it mysql-db mysql -u root -p123 -e "USE kubernetes_crud_db; SHOW TABLES;"

# PostgreSQL
docker exec -it postgres-db psql -U postgres -d siniestros_db -c "\dt"
```

## Monitoreo y Logs

### Docker
```bash
# Ver logs de contenedores
docker-compose -f docker-compose.complete.yml logs -f backend
docker-compose -f docker-compose.complete.yml logs -f frontend
```

### Kubernetes
```bash
# Ver logs de pods
kubectl logs -f deployment/backend-deployment
kubectl logs -f deployment/frontend-deployment

# Ver eventos
kubectl get events --sort-by=.metadata.creationTimestamp
```

## Limpieza

### Docker
```bash
docker-compose -f docker-compose.complete.yml down -v
```

### Kubernetes
```bash
cd k8s
chmod +x cleanup.sh
./cleanup.sh
```

## Troubleshooting

### Problemas Comunes

1. **Pods no inician**: Verificar recursos y límites
2. **Conexión a BD**: Revisar credenciales y nombres de servicios
3. **Frontend no conecta**: Verificar configuración de proxy en nginx.conf
4. **Imagen no encontrada**: Construir y pushear imágenes al registry

### Comandos Útiles
```bash
# Describir pod
kubectl describe pod <pod-name>

# Port forwarding
kubectl port-forward service/backend-service 8080:8080

# Exec en pod
kubectl exec -it <pod-name> -- /bin/bash

# Ver configuración
kubectl get configmap
kubectl get secret
```

## Tecnologías Utilizadas

- **Backend**: Spring Boot 3, Java 17, Spring Data JPA, MySQL, PostgreSQL
- **Frontend**: React 18, React Router, Axios, Bootstrap 5, React Hook Form
- **DevOps**: Docker, Kubernetes, Nginx, Maven, npm
- **Arquitectura**: Microservicios, RESTful API, Multi-database

## Autores

- Herrera Alan - Desarrollador Full Stack
- Proyecto Final - Parcial III - Distribuidos

## Licencia

Este proyecto es para fines educativos del curso de Sistemas Distribuidos.
