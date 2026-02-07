import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Modal, Table, Alert, Spinner } from 'react-bootstrap';
import { proveedorAPI } from '../services/api';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'TALLER',
    ciudad: ''
  });

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      setLoading(true);
      const response = await proveedorAPI.getAll();
      setProveedores(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los proveedores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProveedor) {
        await proveedorAPI.update(editingProveedor.id, formData);
      } else {
        await proveedorAPI.create(formData);
      }
      handleCloseModal();
      fetchProveedores();
    } catch (err) {
      setError('Error al guardar el proveedor: ' + err.message);
    }
  };

  const handleEdit = (proveedor) => {
    setEditingProveedor(proveedor);
    setFormData({
      nombre: proveedor.nombre,
      tipo: proveedor.tipo,
      ciudad: proveedor.ciudad
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este proveedor?')) {
      try {
        await proveedorAPI.delete(id);
        fetchProveedores();
      } catch (err) {
        setError('Error al eliminar el proveedor: ' + err.message);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProveedor(null);
    setFormData({ nombre: '', tipo: 'TALLER', ciudad: '' });
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
          <h4 className="mb-0">Gestión de Proveedores</h4>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Nuevo Proveedor
          </Button>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Ciudad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((proveedor) => (
                  <tr key={proveedor.id}>
                    <td>{proveedor.id}</td>
                    <td>{proveedor.nombre}</td>
                    <td>
                      <span className={`badge bg-${
                        proveedor.tipo === 'TALLER' ? 'primary' : 
                        proveedor.tipo === 'CLÍNICA' ? 'success' : 'warning'
                      }`}>
                        {proveedor.tipo}
                      </span>
                    </td>
                    <td>{proveedor.ciudad}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(proveedor)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(proveedor.id)}
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
            {editingProveedor ? 'Editar Proveedor' : 'Nuevo Proveedor'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                required
              >
                <option value="TALLER">Taller</option>
                <option value="CLÍNICA">Clínica</option>
                <option value="GRÚA">Grúa</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                value={formData.ciudad}
                onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {editingProveedor ? 'Actualizar' : 'Crear'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ProveedorList;
