# 🚀 Guía de Despliegue a GitHub y Validación Final

## 📦 Subir Proyecto a GitHub

### Paso 1: Crear Repositorio en GitHub

1. Ir a https://github.com
2. Click en **"New repository"**
3. Configurar:
   - **Nombre**: `sistema-gestion-siniestros` (o el que prefieras)
   - **Descripción**: "Sistema distribuido para gestión de siniestros - Spring Boot + Kubernetes"
   - **Visibilidad**: Public o Private
   - **NO** inicializar con README (ya tienes uno)
4. Click en **"Create repository"**

### Paso 2: Inicializar Git Local

```bash
# Navegar al directorio del proyecto
cd "C:\Users\User\Desktop\DISTRI\PARCIAL III\HerreraAlanHerrera_examen"

# Inicializar repositorio git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - Sistema de Gestión de Siniestros"

# Renombrar rama principal a 'main' (si es necesario)
git branch -M main

# Conectar con el repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/sistema-gestion-siniestros.git

# Subir el código
git push -u origin main
```

### Paso 3: Verificar en GitHub

1. Recargar la página del repositorio
2. Verificar que todos los archivos estén presentes
3. El README principal debe mostrarse automáticamente

---

## 🐳 Subir Imagen Docker a Docker Hub (Opcional)

### Paso 1: Crear Cuenta en Docker Hub

1. Ir a https://hub.docker.com
2. Crear cuenta gratuita
3. Verificar email

### Paso 2: Login desde Terminal

```bash
docker login
# Ingresar usuario y contraseña
```

### Paso 3: Construir y Etiquetar Imagen

```bash
# Construir la imagen
docker build -t sistema-siniestros-api:latest .

# Etiquetar para Docker Hub (reemplaza TU-USUARIO)
docker tag sistema-siniestros-api:latest TU-USUARIO/sistema-siniestros-api:latest
docker tag sistema-siniestros-api:latest TU-USUARIO/sistema-siniestros-api:1.0.0
```

### Paso 4: Subir a Docker Hub

```bash
# Subir imagen
docker push TU-USUARIO/sistema-siniestros-api:latest
docker push TU-USUARIO/sistema-siniestros-api:1.0.0
```

### Paso 5: Actualizar Kubernetes Deployment

Editar `k8s/app-deployment-simple.yaml`:

```yaml
spec:
  containers:
  - name: kubernetes-crud-api
    image: TU-USUARIO/sistema-siniestros-api:latest
```

---

## ✅ Checklist de Validación Completa

### Antes de Entregar

#### Código y Estructura
- [ ] Todas las clases Java compilan sin errores
- [ ] No hay imports no utilizados o código comentado
- [ ] Los nombres de variables son descriptivos
- [ ] Todas las entidades tienen validaciones

#### Frontend
- [ ] El frontend carga correctamente en el navegador
- [ ] Las 3 pestañas funcionan
- [ ] Los formularios validan datos
- [ ] Las notificaciones aparecen correctamente
- [ ] El diseño es responsivo

#### Backend API
- [ ] Todos los endpoints responden correctamente
- [ ] Las validaciones funcionan (prueba con datos incorrectos)
- [ ] Los errores devuelven mensajes claros
- [ ] Las relaciones FK funcionan correctamente

#### Base de Datos
- [ ] Las tablas se crean automáticamente
- [ ] Los datos persisten correctamente
- [ ] Las claves foráneas están bien configuradas
- [ ] No hay errores de SQL en los logs

#### Docker
- [ ] `docker-compose up` funciona sin errores
- [ ] Los contenedores se mantienen corriendo
- [ ] Las redes están configuradas correctamente
- [ ] Los volúmenes persisten datos

#### Kubernetes
- [ ] Todos los pods llegan a estado Running
- [ ] Los servicios tienen IPs asignadas
- [ ] Los health checks funcionan
- [ ] El LoadBalancer es accesible

#### Documentación
- [ ] README-SINIESTROS.md está completo
- [ ] INICIO-RAPIDO.md tiene instrucciones claras
- [ ] GUIA-CAPTURAS.md detalla cómo obtener evidencias
- [ ] Todos los comandos en la documentación funcionan

#### Capturas de Pantalla
- [ ] Pods en ejecución (kubectl get pods)
- [ ] Services (kubectl get services)
- [ ] Frontend funcionando en navegador
- [ ] Operación CREATE exitosa
- [ ] Operación READ (tabla con datos)
- [ ] Operación UPDATE (dato modificado)
- [ ] Operación DELETE (registro eliminado)
- [ ] Siniestro mostrando relación con Póliza y Proveedor

---

## 📸 Checklist de Capturas para el Reporte

### 1. Infraestructura Kubernetes

**Captura 1**: Pods corriendo
```bash
kubectl get pods -o wide
```
✅ Debe mostrar:
- kubernetes-crud-api-xxxxx: Running, 1/1
- mysql-xxxxx: Running, 1/1

**Captura 2**: Services activos
```bash
kubectl get services
```
✅ Debe mostrar:
- kubernetes-crud-api: LoadBalancer
- mysql: ClusterIP

**Captura 3**: Describe del deployment
```bash
kubectl describe deployment kubernetes-crud-api
```

### 2. Frontend Funcionando

**Captura 4**: Página principal
- Vista de las 3 pestañas
- Diseño responsivo

**Captura 5**: Gestión de Pólizas
- Formulario completo
- Tabla con registros

**Captura 6**: Gestión de Proveedores
- Formulario completo
- Tabla con registros

**Captura 7**: Gestión de Siniestros
- Formulario con selects de Póliza y Proveedor
- Tabla mostrando relaciones

### 3. Operaciones CRUD

**Captura 8**: CREATE - Creando Póliza
- Formulario llenado
- Notificación de éxito
- Registro en tabla

**Captura 9**: CREATE - Creando Proveedor
- Formulario llenado
- Notificación de éxito
- Registro en tabla

**Captura 10**: CREATE - Creando Siniestro
- Formulario con todos los campos
- Selección de Póliza y Proveedor
- Notificación de éxito
- Registro en tabla con relaciones visibles

**Captura 11**: READ - Listado completo
- Tabla de siniestros con datos
- Mostrar columnas de relaciones

**Captura 12**: UPDATE - Editando siniestro
- Formulario pre-llenado con datos a editar
- Cambio de estado (ABIERTO → EN_PROCESO)
- Notificación de actualización exitosa

**Captura 13**: DELETE - Eliminando registro
- Diálogo de confirmación
- Notificación de eliminación
- Tabla actualizada sin el registro

### 4. Validaciones y Errores

**Captura 14**: Validación de campos requeridos
- Intentar guardar sin llenar campos
- Mostrar mensajes de error del navegador

**Captura 15**: Validación de número único
- Intentar crear póliza con número duplicado
- Mensaje de error del servidor

### 5. Logs y Monitoring

**Captura 16**: Logs de la aplicación
```bash
kubectl logs -f <app-pod-name>
```
- Mostrar requests HTTP exitosos
- Operaciones de base de datos

**Captura 17**: Health check
```bash
curl http://localhost:8080/actuator/health
```

### 6. Base de Datos (Opcional)

**Captura 18**: Conexión a MySQL
```bash
kubectl exec -it <mysql-pod> -- mysql -u root -p123 kubernetes_crud_db
```

**Captura 19**: Consulta de tablas
```sql
SHOW TABLES;
```

**Captura 20**: Consulta con JOIN
```sql
SELECT s.numero_caso, p.numero_poliza, pr.nombre 
FROM siniestros s
JOIN polizas p ON s.poliza_id = p.id
JOIN proveedores pr ON s.proveedor_id = pr.id;
```

---

## 📋 Estructura del Reporte Sugerida

```
PORTADA
- Título: Sistema de Gestión de Siniestros
- Nombre: Alan Herrera
- Materia: Sistemas Distribuidos
- Fecha: Febrero 2026

ÍNDICE

1. INTRODUCCIÓN
   1.1 Descripción del Proyecto
   1.2 Objetivos
   1.3 Alcance

2. ANÁLISIS Y DISEÑO
   2.1 Modelo de Datos
       - Diagrama de entidades
       - Descripción de relaciones
   2.2 Arquitectura del Sistema
       - Diagrama de arquitectura
       - Componentes principales

3. IMPLEMENTACIÓN
   3.1 Backend (Spring Boot)
       - Entidades JPA
       - Repositories
       - Services
       - Controllers
   3.2 Frontend (HTML/CSS/JS)
       - Estructura de la interfaz
       - Funcionalidades implementadas
   3.3 Base de Datos (MySQL)
       - Esquema de tablas
       - Relaciones y constraints

4. CONTENERIZACIÓN
   4.1 Dockerfile
   4.2 Docker Compose
   4.3 Pruebas en Docker

5. DESPLIEGUE EN KUBERNETES
   5.1 Manifiestos de Kubernetes
   5.2 ConfigMaps y Services
   5.3 Proceso de despliegue
   
   EVIDENCIAS:
   [Captura 1: Pods corriendo]
   [Captura 2: Services activos]
   [Captura 3: Describe deployment]

6. PRUEBAS Y VALIDACIÓN
   6.1 Frontend Funcionando
   
   EVIDENCIAS:
   [Captura 4-7: Frontend]
   
   6.2 Operaciones CRUD
   
   EVIDENCIAS:
   [Captura 8-13: CRUD completo]
   
   6.3 Validaciones
   
   EVIDENCIAS:
   [Captura 14-15: Validaciones]

7. MONITOREO Y LOGS
   
   EVIDENCIAS:
   [Captura 16-17: Logs y Health]

8. BASE DE DATOS
   
   EVIDENCIAS (Opcional):
   [Captura 18-20: MySQL]

9. URL DEL REPOSITORIO GITHUB
   https://github.com/TU-USUARIO/sistema-gestion-siniestros

10. CONCLUSIONES
    - Logros alcanzados
    - Dificultades encontradas
    - Aprendizajes

11. ANEXOS
    - Código relevante
    - Comandos utilizados
    - Referencias
```

---

## 🎯 Comandos para Generar Evidencias Rápidamente

Crea un script `generar-evidencias.bat`:

```batch
@echo off
echo Generando evidencias para el reporte...
echo.

echo === PODS ===
kubectl get pods -o wide > evidencias-pods.txt
kubectl get pods -o wide

echo.
echo === SERVICES ===
kubectl get services > evidencias-services.txt
kubectl get services

echo.
echo === DEPLOYMENT ===
kubectl describe deployment kubernetes-crud-api > evidencias-deployment.txt

echo.
echo === LOGS ===
kubectl logs deployment/kubernetes-crud-api --tail=50 > evidencias-logs.txt

echo.
echo === HEALTH CHECK ===
curl http://localhost:8080/actuator/health > evidencias-health.txt

echo.
echo Evidencias guardadas en archivos .txt
echo Ahora toma capturas de pantalla del frontend
pause
```

---

## 📊 Métricas del Proyecto (para el reporte)

```
Estadísticas del Código:
- Entidades: 3 (Poliza, Proveedor, Siniestro)
- Controllers: 3 (21 endpoints REST)
- Services: 3 (lógica de negocio)
- Repositories: 3 (acceso a datos)
- Líneas de código Java: ~1000
- Líneas de código Frontend: ~700
- Archivos de configuración: 10+

Tecnologías:
- Lenguaje: Java 17
- Framework: Spring Boot 3.x
- Base de Datos: MySQL 8.0
- Frontend: HTML5, CSS3, JavaScript ES6+
- Contenerización: Docker
- Orquestación: Kubernetes

Funcionalidades:
- CRUD completo en 3 entidades
- Relaciones con claves foráneas
- Validaciones de datos
- Manejo de errores
- Interfaz web responsiva
- API RESTful completa
```

---

## ✨ Puntos Destacados para Mencionar

1. **Arquitectura de capas bien definida** (Controller → Service → Repository)
2. **Relaciones complejas** implementadas correctamente (FK en Siniestro)
3. **Frontend moderno** con diseño responsivo y UX amigable
4. **Validaciones robustas** tanto en frontend como backend
5. **Despliegue automatizado** con scripts
6. **Documentación exhaustiva** con múltiples guías
7. **Buenas prácticas** de desarrollo (separación de concerns, DRY, etc.)
8. **Health checks y probes** en Kubernetes
9. **Resource limits** configurados
10. **Scripts de prueba** para validación rápida

---

## 🏁 Último Checklist Antes de Entregar

- [ ] Repositorio GitHub creado y código subido
- [ ] README principal actualizado con URL del repo
- [ ] Todas las capturas de pantalla tomadas
- [ ] Reporte PDF creado con todas las evidencias
- [ ] Colección de Postman incluida
- [ ] Scripts de despliegue probados
- [ ] URL del GitHub incluida en el reporte
- [ ] Proyecto probado de inicio a fin
- [ ] Documentación revisada (sin typos)
- [ ] Commit final con mensaje descriptivo

---

## 🎓 Comando Final para Commit

```bash
# Último commit antes de entregar
git add .
git commit -m "Final: Proyecto completo con todas las evidencias y documentación"
git push origin main

# Crear tag de release
git tag -a v1.0.0 -m "Release 1.0.0 - Sistema de Gestión de Siniestros"
git push origin v1.0.0
```

---

## 📞 URLs Importantes para el Reporte

```
Repositorio GitHub:
https://github.com/TU-USUARIO/sistema-gestion-siniestros

Docker Hub (si aplicaste):
https://hub.docker.com/r/TU-USUARIO/sistema-siniestros-api

Aplicación Local:
http://localhost:8080

API REST:
http://localhost:8080/api

Health Check:
http://localhost:8080/actuator/health
```

---

**¡Éxito con tu entrega! 🎉**

Si sigues esta guía paso a paso, tendrás un proyecto completo, bien documentado y con todas las evidencias necesarias para tu reporte.
