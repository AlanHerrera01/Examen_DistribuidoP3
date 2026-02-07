import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Table, Alert, Spinner } from 'react-bootstrap';
import { siniestroAPI, polizaAPI, proveedorAPI } from '../services/api';

const SiniestroList = () => {
  const [siniestros, setSiniestros] = useState([]);
  const [polizas, setPolizas] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSiniestro, setEditingSiniestro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    numeroCaso: '',
    fecha: '',
    descripcion: '',
    montoEstimado: '',
    estado: 'ABIERTO',
    polizaId: '',
    proveedorId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [siniestrosRes, polizasRes, proveedoresRes] = await Promise.all([
        siniestroAPI.getAll(),
        polizaAPI.getAll(),
        proveedorAPI.getAll()
      ]);
      
      setSiniestros(siniestrosRes.data);
      setPolizas(polizasRes.data);
      setProveedores(proveedoresRes.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los datos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        fecha: new Date(formData.fecha).toISOString().split('T')[0],
        montoEstimado: parseFloat(formData.montoEstimado),
        polizaId: parseInt(formData.polizaId),
        proveedorId: parseInt(formData.proveedorId)
      };

      if (editingSiniestro) {
        await siniestroAPI.update(editingSiniestro.id, submitData);
      } else {
        await siniestroAPI.create(submitData);
      }
      handleCloseModal();
      fetchData();
    } catch (err) {
      setError('Error al guardar el siniestro: ' + err.message);
    }
  };

  const handleEdit = (siniestro) => {
    setEditingSiniestro(siniestro);
    setFormData({
      numeroCaso: siniestro.numeroCaso,
      fecha: siniestro.fecha,
      descripcion: siniestro.descripcion,
      montoEstimado: siniestro.montoEstimado,
      estado: siniestro.estado,
      polizaId: siniestro.polizaId,
      proveedorId: siniestro.proveedorId
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este siniestro?')) {
      try {
        await siniestroAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar el siniestro: ' + err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSiniestro(null);
    setFormData({
      numeroCaso: '',
      fecha: '',
      descripcion: '',
      montoEstimado: '',
      estado: 'ABIERTO',
      polizaId: '',
      proveedorId: ''
    });
    setError('');
  };

  const getPolizaNumero = (polizaId) => {
    const poliza = polizas.find(p => p.id === polizaId);
    return poliza ? poliza.numeroPoliza : 'N/A';
  };

  const getProveedorNombre = (proveedorId) => {
    const proveedor = proveedores.find(p => p.id === proveedorId);
    return proveedor ? proveedor.nombre : 'N/A';
  };

  const getEstadoBadge = (estado) => {
    const variant = estado === 'ABIERTO' ? 'danger' : 
                   estado === 'EN_PROCESO' ? 'warning' : 'success';
    return <span className={`badge bg-${variant}`}>{estado}</span>;
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Gestión de Siniestros</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Nuevo Siniestro
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número de Caso</th>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Monto Estimado</th>
                  <th>Estado</th>
                  <th>Póliza</th>
                  <th>Proveedor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {siniestros.map((siniestro) => (
                  <tr key={siniestro.id}>
                    <td>{siniestro.id}</td>
                    <td>{siniestro.numeroCaso}</td>
                    <td>{new Date(siniestro.fecha).toLocaleDateString()}</td>
                    <td>{siniestro.descripcion}</td>
                    <td>${siniestro.montoEstimado?.toFixed(2)}</td>
                    <td>{getEstadoBadge(siniestro.estado)}</td>
                    <td>{getPolizaNumero(siniestro.polizaId)}</td>
                    <td>{getProveedorNombre(siniestro.proveedorId)}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(siniestro)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(siniestro.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSiniestro ? 'Editar Siniestro' : 'Nuevo Siniestro'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Número de Caso</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.numeroCaso}
                    onChange={(e) => setFormData({...formData, numeroCaso: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                required
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Monto Estimado</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.montoEstimado}
                    onChange={(e) => setFormData({...formData, montoEstimado: e.target.value})}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    value={formData.estado}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    required
                  >
                    <option value="ABIERTO">Abierto</option>
                    <option value="EN_PROCESO">En Proceso</option>
                    <option value="CERRADO">Cerrado</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Póliza</Form.Label>
                  <Form.Select
                    value={formData.polizaId}
                    onChange={(e) => setFormData({...formData, polizaId: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar Póliza</option>
                    {polizas.map((poliza) => (
                      <option key={poliza.id} value={poliza.id}>
                        {poliza.numeroPoliza} - {poliza.tipo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Select
                    value={formData.proveedorId}
                    onChange={(e) => setFormData({...formData, proveedorId: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar Proveedor</option>
                    {proveedores.map((proveedor) => (
                      <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre} - {proveedor.tipo}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingSiniestro ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SiniestroList;
