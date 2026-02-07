// API Base URL - cambia esto según tu configuración
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8080/api'
    : '/api';

// Variables globales
let polizas = [];
let proveedores = [];
let siniestros = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('polizaForm').addEventListener('submit', handlePolizaSubmit);
    document.getElementById('proveedorForm').addEventListener('submit', handleProveedorSubmit);
    document.getElementById('siniestroForm').addEventListener('submit', handleSiniestroSubmit);
}

// Tab Management
function showTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Cargar datos si es necesario
    if (tabName === 'siniestros') {
        loadPolizasAndProveedoresForSelect();
    }
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Load All Data
async function loadAllData() {
    await loadPolizas();
    await loadProveedores();
    await loadSiniestros();
}

// ==================== PÓLIZAS ====================

async function loadPolizas() {
    try {
        const response = await fetch(`${API_URL}/polizas`);
        polizas = await response.json();
        renderPolizasTable();
    } catch (error) {
        console.error('Error loading polizas:', error);
        showNotification('Error al cargar pólizas', 'error');
    }
}

function renderPolizasTable() {
    const tbody = document.querySelector('#polizasTable tbody');
    tbody.innerHTML = '';
    
    polizas.forEach(poliza => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${poliza.id}</td>
            <td>${poliza.numeroPoliza}</td>
            <td>${poliza.tipo}</td>
            <td>${poliza.estado}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editPoliza(${poliza.id})">Editar</button>
                <button class="btn-delete" onclick="deletePoliza(${poliza.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function handlePolizaSubmit(e) {
    e.preventDefault();
    
    const poliza = {
        numeroPoliza: document.getElementById('polizaNumero').value,
        tipo: document.getElementById('polizaTipo').value,
        estado: document.getElementById('polizaEstado').value
    };
    
    const id = document.getElementById('polizaId').value;
    
    try {
        const url = id ? `${API_URL}/polizas/${id}` : `${API_URL}/polizas`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poliza)
        });
        
        if (response.ok) {
            showNotification(id ? 'Póliza actualizada correctamente' : 'Póliza creada correctamente');
            resetPolizaForm();
            await loadPolizas();
        } else {
            const error = await response.text();
            showNotification(error || 'Error al guardar póliza', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al guardar póliza', 'error');
    }
}

function editPoliza(id) {
    const poliza = polizas.find(p => p.id === id);
    if (poliza) {
        document.getElementById('polizaId').value = poliza.id;
        document.getElementById('polizaNumero').value = poliza.numeroPoliza;
        document.getElementById('polizaTipo').value = poliza.tipo;
        document.getElementById('polizaEstado').value = poliza.estado;
        document.getElementById('polizaNumero').focus();
    }
}

async function deletePoliza(id) {
    if (!confirm('¿Está seguro de eliminar esta póliza?')) return;
    
    try {
        const response = await fetch(`${API_URL}/polizas/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Póliza eliminada correctamente');
            await loadPolizas();
        } else {
            showNotification('Error al eliminar póliza', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al eliminar póliza', 'error');
    }
}

function resetPolizaForm() {
    document.getElementById('polizaForm').reset();
    document.getElementById('polizaId').value = '';
}

// ==================== PROVEEDORES ====================

async function loadProveedores() {
    try {
        const response = await fetch(`${API_URL}/proveedores`);
        proveedores = await response.json();
        renderProveedoresTable();
    } catch (error) {
        console.error('Error loading proveedores:', error);
        showNotification('Error al cargar proveedores', 'error');
    }
}

function renderProveedoresTable() {
    const tbody = document.querySelector('#proveedoresTable tbody');
    tbody.innerHTML = '';
    
    proveedores.forEach(proveedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${proveedor.id}</td>
            <td>${proveedor.nombre}</td>
            <td>${proveedor.tipo}</td>
            <td>${proveedor.ciudad}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editProveedor(${proveedor.id})">Editar</button>
                <button class="btn-delete" onclick="deleteProveedor(${proveedor.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function handleProveedorSubmit(e) {
    e.preventDefault();
    
    const proveedor = {
        nombre: document.getElementById('proveedorNombre').value,
        tipo: document.getElementById('proveedorTipo').value,
        ciudad: document.getElementById('proveedorCiudad').value
    };
    
    const id = document.getElementById('proveedorId').value;
    
    try {
        const url = id ? `${API_URL}/proveedores/${id}` : `${API_URL}/proveedores`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(proveedor)
        });
        
        if (response.ok) {
            showNotification(id ? 'Proveedor actualizado correctamente' : 'Proveedor creado correctamente');
            resetProveedorForm();
            await loadProveedores();
        } else {
            const error = await response.text();
            showNotification(error || 'Error al guardar proveedor', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al guardar proveedor', 'error');
    }
}

function editProveedor(id) {
    const proveedor = proveedores.find(p => p.id === id);
    if (proveedor) {
        document.getElementById('proveedorId').value = proveedor.id;
        document.getElementById('proveedorNombre').value = proveedor.nombre;
        document.getElementById('proveedorTipo').value = proveedor.tipo;
        document.getElementById('proveedorCiudad').value = proveedor.ciudad;
        document.getElementById('proveedorNombre').focus();
    }
}

async function deleteProveedor(id) {
    if (!confirm('¿Está seguro de eliminar este proveedor?')) return;
    
    try {
        const response = await fetch(`${API_URL}/proveedores/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Proveedor eliminado correctamente');
            await loadProveedores();
        } else {
            showNotification('Error al eliminar proveedor', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al eliminar proveedor', 'error');
    }
}

function resetProveedorForm() {
    document.getElementById('proveedorForm').reset();
    document.getElementById('proveedorId').value = '';
}

// ==================== SINIESTROS ====================

async function loadSiniestros() {
    try {
        const response = await fetch(`${API_URL}/siniestros`);
        siniestros = await response.json();
        renderSiniestrosTable();
    } catch (error) {
        console.error('Error loading siniestros:', error);
        showNotification('Error al cargar siniestros', 'error');
    }
}

function renderSiniestrosTable() {
    const tbody = document.querySelector('#siniestrosTable tbody');
    tbody.innerHTML = '';
    
    siniestros.forEach(siniestro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${siniestro.id}</td>
            <td>${siniestro.numeroCaso}</td>
            <td>${siniestro.fecha}</td>
            <td>${siniestro.descripcion}</td>
            <td>$${siniestro.montoEstimado.toFixed(2)}</td>
            <td>${siniestro.estado}</td>
            <td>${siniestro.poliza.numeroPoliza}</td>
            <td>${siniestro.proveedor.nombre}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editSiniestro(${siniestro.id})">Editar</button>
                <button class="btn-delete" onclick="deleteSiniestro(${siniestro.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function loadPolizasAndProveedoresForSelect() {
    // Cargar pólizas en el select
    const polizaSelect = document.getElementById('siniestroPolizaId');
    polizaSelect.innerHTML = '<option value="">Seleccione Póliza</option>';
    polizas.forEach(poliza => {
        const option = document.createElement('option');
        option.value = poliza.id;
        option.textContent = `${poliza.numeroPoliza} - ${poliza.tipo}`;
        polizaSelect.appendChild(option);
    });
    
    // Cargar proveedores en el select
    const proveedorSelect = document.getElementById('siniestroProveedorId');
    proveedorSelect.innerHTML = '<option value="">Seleccione Proveedor</option>';
    proveedores.forEach(proveedor => {
        const option = document.createElement('option');
        option.value = proveedor.id;
        option.textContent = `${proveedor.nombre} - ${proveedor.tipo}`;
        proveedorSelect.appendChild(option);
    });
}

async function handleSiniestroSubmit(e) {
    e.preventDefault();
    
    const siniestro = {
        numeroCaso: document.getElementById('siniestroNumeroCaso').value,
        fecha: document.getElementById('siniestroFecha').value,
        descripcion: document.getElementById('siniestroDescripcion').value,
        montoEstimado: parseFloat(document.getElementById('siniestroMonto').value),
        estado: document.getElementById('siniestroEstado').value,
        poliza: {
            id: parseInt(document.getElementById('siniestroPolizaId').value)
        },
        proveedor: {
            id: parseInt(document.getElementById('siniestroProveedorId').value)
        }
    };
    
    const id = document.getElementById('siniestroId').value;
    
    try {
        const url = id ? `${API_URL}/siniestros/${id}` : `${API_URL}/siniestros`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(siniestro)
        });
        
        if (response.ok) {
            showNotification(id ? 'Siniestro actualizado correctamente' : 'Siniestro creado correctamente');
            resetSiniestroForm();
            await loadSiniestros();
        } else {
            const error = await response.text();
            showNotification(error || 'Error al guardar siniestro', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al guardar siniestro', 'error');
    }
}

function editSiniestro(id) {
    const siniestro = siniestros.find(s => s.id === id);
    if (siniestro) {
        document.getElementById('siniestroId').value = siniestro.id;
        document.getElementById('siniestroNumeroCaso').value = siniestro.numeroCaso;
        document.getElementById('siniestroFecha').value = siniestro.fecha;
        document.getElementById('siniestroDescripcion').value = siniestro.descripcion;
        document.getElementById('siniestroMonto').value = siniestro.montoEstimado;
        document.getElementById('siniestroEstado').value = siniestro.estado;
        document.getElementById('siniestroPolizaId').value = siniestro.poliza.id;
        document.getElementById('siniestroProveedorId').value = siniestro.proveedor.id;
        document.getElementById('siniestroNumeroCaso').focus();
    }
}

async function deleteSiniestro(id) {
    if (!confirm('¿Está seguro de eliminar este siniestro?')) return;
    
    try {
        const response = await fetch(`${API_URL}/siniestros/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Siniestro eliminado correctamente');
            await loadSiniestros();
        } else {
            showNotification('Error al eliminar siniestro', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al eliminar siniestro', 'error');
    }
}

function resetSiniestroForm() {
    document.getElementById('siniestroForm').reset();
    document.getElementById('siniestroId').value = '';
}
