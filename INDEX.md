# 📚 Índice de Documentación - Sistema de Gestión de Siniestros

Bienvenido al Sistema de Gestión de Siniestros. Este índice te guiará a través de toda la documentación del proyecto.

---

## 🚀 Para Empezar Rápidamente

Si quieres poner en marcha el sistema lo más rápido posible:

👉 **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)** - Guía de inicio en 5 minutos

---

## 📖 Documentación Principal

### 1. README Principal
📄 **[README-SINIESTROS.md](README-SINIESTROS.md)**
- Documentación completa del proyecto
- Arquitectura del sistema
- API REST endpoints
- Instalación y configuración
- Despliegue en Docker y Kubernetes
- Troubleshooting

### 2. Resumen del Proyecto
📊 **[RESUMEN-PROYECTO.md](RESUMEN-PROYECTO.md)**
- Arquitectura visual del sistema
- Diagrama de modelo de datos
- Estructura de archivos
- Estadísticas del proyecto
- Criterios de evaluación cumplidos

### 3. Guía de Inicio Rápido
⚡ **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)**
- Despliegue con Docker Compose
- Despliegue en Kubernetes
- Primeros pasos en el frontend
- Solución de problemas comunes
- Checklist de verificación

---

## 📸 Para Preparar el Reporte

### 4. Guía de Capturas de Pantalla
📷 **[GUIA-CAPTURAS.md](GUIA-CAPTURAS.md)**
- Capturas requeridas para el reporte
- Comandos para obtener evidencias
- Verificaciones adicionales de BD
- Checklist completo de capturas
- Estructura sugerida del reporte

### 5. Guía de Despliegue a GitHub
🐙 **[GUIA-DESPLIEGUE-GITHUB.md](GUIA-DESPLIEGUE-GITHUB.md)**
- Subir proyecto a GitHub
- Subir imagen a Docker Hub
- Checklist de validación completa
- Checklist de capturas para reporte
- Estructura del reporte sugerida
- Comandos para generar evidencias

---

## 🔧 Scripts y Herramientas

### Scripts de Despliegue

6. **[deploy-k8s.bat](deploy-k8s.bat)** (Windows)
   - Script automatizado para desplegar en Kubernetes
   
7. **[deploy-k8s.sh](deploy-k8s.sh)** (Linux/Mac)
   - Script automatizado para desplegar en Kubernetes

### Scripts de Pruebas

8. **[test-api.ps1](test-api.ps1)** (Windows PowerShell)
   - Pruebas completas de la API REST
   - Crea datos de ejemplo
   - Valida todas las operaciones CRUD
   
9. **[test-api.sh](test-api.sh)** (Linux/Mac Bash)
   - Pruebas completas de la API REST
   - Crea datos de ejemplo
   - Valida todas las operaciones CRUD

---

## 📁 Archivos de Configuración

### Docker

10. **[Dockerfile](Dockerfile)**
    - Configuración multi-stage para construcción optimizada
    
11. **[docker-compose.yml](docker-compose.yml)**
    - Orquestación de MySQL y aplicación
    - Configuración de redes y volúmenes

### Kubernetes

12. **[k8s/configmap.yaml](k8s/configmap.yaml)**
    - Configuración de la aplicación
    
13. **[k8s/mysql-deployment-temp.yaml](k8s/mysql-deployment-temp.yaml)**
    - Deployment y Service de MySQL
    
14. **[k8s/app-deployment-simple.yaml](k8s/app-deployment-simple.yaml)**
    - Deployment y Service de la aplicación
    - Health checks y resource limits

### Otros

15. **[pom.xml](pom.xml)**
    - Dependencias Maven del proyecto
    
16. **[.gitignore](.gitignore)**
    - Archivos excluidos de Git

17. **[API-CRUD.postman_collection.json](API-CRUD.postman_collection.json)**
    - Colección de Postman para probar la API

---

## 💻 Código Fuente

### Backend (Java/Spring Boot)

#### Modelos (Entidades JPA)
- **[Poliza.java](src/main/java/com/example/kubernetescrudapi/model/Poliza.java)**
- **[Proveedor.java](src/main/java/com/example/kubernetescrudapi/model/Proveedor.java)**
- **[Siniestro.java](src/main/java/com/example/kubernetescrudapi/model/Siniestro.java)**

#### Repositories (Acceso a Datos)
- **[PolizaRepository.java](src/main/java/com/example/kubernetescrudapi/repository/PolizaRepository.java)**
- **[ProveedorRepository.java](src/main/java/com/example/kubernetescrudapi/repository/ProveedorRepository.java)**
- **[SiniestroRepository.java](src/main/java/com/example/kubernetescrudapi/repository/SiniestroRepository.java)**

#### Services (Lógica de Negocio)
- **[PolizaService.java](src/main/java/com/example/kubernetescrudapi/service/PolizaService.java)**
- **[ProveedorService.java](src/main/java/com/example/kubernetescrudapi/service/ProveedorService.java)**
- **[SiniestroService.java](src/main/java/com/example/kubernetescrudapi/service/SiniestroService.java)**

#### Controllers (API REST)
- **[PolizaController.java](src/main/java/com/example/kubernetescrudapi/controller/PolizaController.java)**
- **[ProveedorController.java](src/main/java/com/example/kubernetescrudapi/controller/ProveedorController.java)**
- **[SiniestroController.java](src/main/java/com/example/kubernetescrudapi/controller/SiniestroController.java)**

### Frontend (HTML/CSS/JavaScript)

- **[index.html](src/main/resources/static/index.html)** - Estructura de la interfaz
- **[styles.css](src/main/resources/static/styles.css)** - Estilos y diseño
- **[app.js](src/main/resources/static/app.js)** - Lógica y comunicación con API

---

## 🎯 Flujo de Trabajo Recomendado

### Para Desarrollo

```
1. Lee → README-SINIESTROS.md (comprende el proyecto)
2. Configura → INICIO-RAPIDO.md (pon en marcha el sistema)
3. Prueba → test-api.sh / test-api.ps1 (valida funcionalidad)
4. Modifica → Código fuente según necesites
5. Despliega → deploy-k8s.sh / deploy-k8s.bat
```

### Para Entrega del Proyecto

```
1. Valida → INICIO-RAPIDO.md (todo funciona correctamente)
2. Captura → GUIA-CAPTURAS.md (obtén evidencias)
3. Documenta → Prepara reporte según estructura sugerida
4. Sube → GUIA-DESPLIEGUE-GITHUB.md (repositorio GitHub)
5. Entrega → Reporte + URL del repositorio
```

---

## 🔍 Búsqueda Rápida

### ¿Cómo hacer...?

| Pregunta | Documento | Sección |
|----------|-----------|---------|
| ¿Cómo inicio la aplicación? | INICIO-RAPIDO.md | Opción 1 o 2 |
| ¿Cómo despliego en Kubernetes? | INICIO-RAPIDO.md | Opción 2 |
| ¿Cómo pruebo la API? | README-SINIESTROS.md | API REST Endpoints |
| ¿Qué capturas necesito? | GUIA-CAPTURAS.md | Capturas Requeridas |
| ¿Cómo subo a GitHub? | GUIA-DESPLIEGUE-GITHUB.md | Subir Proyecto a GitHub |
| ¿Dónde están las entidades? | RESUMEN-PROYECTO.md | Modelo de Datos |
| ¿Cómo funciona el CRUD? | README-SINIESTROS.md | API REST Endpoints |
| ¿Qué tecnologías usa? | RESUMEN-PROYECTO.md | Tecnologías y Versiones |
| ¿Cómo soluciono errores? | INICIO-RAPIDO.md | Solución de Problemas |
| ¿Qué archivos se crearon? | RESUMEN-PROYECTO.md | Estructura de Archivos |

---

## 📞 Comandos Más Usados

### Docker Compose
```bash
docker-compose up -d          # Iniciar servicios
docker-compose ps             # Ver estado
docker-compose logs -f app    # Ver logs
docker-compose down           # Detener servicios
```

### Kubernetes
```bash
kubectl get pods              # Ver pods
kubectl get services          # Ver servicios
kubectl logs -f <pod-name>    # Ver logs
kubectl describe pod <name>   # Detalles del pod
```

### Acceso
```bash
# Local (Docker Compose)
http://localhost:8080

# Kubernetes (Minikube)
minikube service kubernetes-crud-api

# Health Check
http://localhost:8080/actuator/health
```

---

## 📊 Vista General del Sistema

```
┌─────────────────────────────────────────────┐
│              Usuario Final                  │
│         (Navegador Web)                     │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│           Frontend (HTML/CSS/JS)            │
│     - Gestión Pólizas                       │
│     - Gestión Proveedores                   │
│     - Gestión Siniestros                    │
└────────────────┬────────────────────────────┘
                 │ HTTP/REST
                 ▼
┌─────────────────────────────────────────────┐
│        Backend (Spring Boot)                │
│     Controllers → Services → Repositories   │
└────────────────┬────────────────────────────┘
                 │ JDBC
                 ▼
┌─────────────────────────────────────────────┐
│           Base de Datos (MySQL)            │
│     - polizas                               │
│     - proveedores                           │
│     - siniestros (con FK)                   │
└─────────────────────────────────────────────┘

Todo desplegado en Docker/Kubernetes
```

---

## 🎓 Información del Proyecto

- **Nombre**: Sistema de Gestión de Siniestros
- **Tipo**: Aplicación Distribuida
- **Autor**: Alan Herrera
- **Materia**: Sistemas Distribuidos - Parcial III
- **Fecha**: Febrero 2026

---

## 📝 Notas Importantes

- ⚠️ **Los puertos 8080 y 3306 deben estar libres** antes de iniciar
- ⚠️ **Docker y Kubernetes deben estar corriendo**
- ⚠️ **Java 17+ y Maven 3.6+ son requeridos** para compilar
- ✅ **Todos los scripts están probados y funcionan**
- ✅ **La documentación está actualizada y completa**

---

## 🏆 Características Destacadas

- ✨ Arquitectura limpia de 3 capas
- 🎨 Frontend moderno y responsivo
- 🔄 Relaciones complejas con FK
- 📦 Despliegue automatizado
- 📚 Documentación exhaustiva
- 🧪 Scripts de prueba incluidos
- ⚡ Optimizado con resource limits
- 🛡️ Validaciones robustas

---

## 🚀 ¿Por dónde empezar?

### Si es tu primera vez:
👉 Empieza con **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)**

### Si quieres entender el proyecto:
👉 Lee **[README-SINIESTROS.md](README-SINIESTROS.md)**

### Si vas a preparar el reporte:
👉 Sigue **[GUIA-CAPTURAS.md](GUIA-CAPTURAS.md)**

### Si necesitas subir a GitHub:
👉 Consulta **[GUIA-DESPLIEGUE-GITHUB.md](GUIA-DESPLIEGUE-GITHUB.md)**

---

**¡Éxito con tu proyecto! 🎉**

*Última actualización: Febrero 2026*
