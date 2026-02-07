package com.example.kubernetescrudapi.service;

import com.example.kubernetescrudapi.exception.ResourceNotFoundException;
import com.example.kubernetescrudapi.model.mysql.Proveedor;
import com.example.kubernetescrudapi.repository.mysql.ProveedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ProveedorService {
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    public List<Proveedor> getAllProveedores() {
        return proveedorRepository.findAll();
    }
    
    public Proveedor getProveedorById(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con id: " + id));
    }
    
    public List<Proveedor> getProveedoresByTipo(String tipo) {
        return proveedorRepository.findByTipo(tipo);
    }
    
    public List<Proveedor> getProveedoresByCiudad(String ciudad) {
        return proveedorRepository.findByCiudad(ciudad);
    }
    
    public Proveedor createProveedor(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }
    
    public Proveedor updateProveedor(Long id, Proveedor proveedorDetails) {
        Proveedor proveedor = getProveedorById(id);
        
        proveedor.setNombre(proveedorDetails.getNombre());
        proveedor.setTipo(proveedorDetails.getTipo());
        proveedor.setCiudad(proveedorDetails.getCiudad());
        
        return proveedorRepository.save(proveedor);
    }
    
    public void deleteProveedor(Long id) {
        Proveedor proveedor = getProveedorById(id);
        proveedorRepository.delete(proveedor);
    }
}
