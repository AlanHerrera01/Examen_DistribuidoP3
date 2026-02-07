import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Table, Alert, Spinner } from 'react-bootstrap';
import { polizaAPI } from '../services/api';

const PolizaList = () => {
  const [polizas, setPolizas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPoliza, setEditingPoliza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    numeroPoliza: '',
    tipo: '',
    estado: ''
  });

  useEffect(() => {
    fetchPolizas();
  }, []);

  const fetchPolizas = async () => {
    try {
      setLoading(true);
      const response = await polizaAPI.getAll();
      setPolizas(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar las pólizas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPoliza) {
        await polizaAPI.update(editingPoliza.id, formData);
      } else {
        await polizaAPI.create(formData);
      }
      handleCloseModal();
      fetchPolizas();
    } catch (err) {
      setError('Error al guardar la póliza: ' + err.message);
    }
  };

  const handleEdit = (poliza) => {
    setEditingPoliza(poliza);
    setFormData({
      numeroPoliza: poliza.numeroPoliza,
      tipo: poliza.tipo,
      estado: poliza.estado
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta póliza?')) {
      try {
        await polizaAPI.delete(id);
        fetchPolizas();
      } catch (err) {
        setError('Error al eliminar la póliza: ' + err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPoliza(null);
    setFormData({ numeroPoliza: '', tipo: '', estado: '' });
    setError('');
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
          <h4 className="mb-0">Gestión de Pólizas</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Nueva Póliza
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Número de Póliza</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {polizas.map((poliza) => (
                  <tr key={poliza.id}>
                    <td>{poliza.id}</td>
                    <td>{poliza.numeroPoliza}</td>
                    <td>{poliza.tipo}</td>
                    <td>{poliza.estado}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(poliza)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(poliza.id)}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPoliza ? 'Editar Póliza' : 'Nueva Póliza'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Número de Póliza</Form.Label>
              <Form.Control
                type="text"
                value={formData.numeroPoliza}
                onChange={(e) => setFormData({...formData, numeroPoliza: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingPoliza ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default PolizaList;
