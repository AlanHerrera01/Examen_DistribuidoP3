package com.example.kubernetescrudapi.service;

import com.example.kubernetescrudapi.exception.ResourceNotFoundException;
import com.example.kubernetescrudapi.model.mysql.Poliza;
import com.example.kubernetescrudapi.model.mysql.Proveedor;
import com.example.kubernetescrudapi.model.postgres.Siniestro;
import com.example.kubernetescrudapi.repository.mysql.PolizaRepository;
import com.example.kubernetescrudapi.repository.mysql.ProveedorRepository;
import com.example.kubernetescrudapi.repository.postgres.SiniestroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@SuppressWarnings("unused")
@Service
public class SiniestroService {
    
    @Autowired
    private SiniestroRepository siniestroRepository;
    
    @Autowired
    private PolizaRepository polizaRepository;
    
    @Autowired
    private ProveedorRepository proveedorRepository;
    
    public List<Siniestro> getAllSiniestros() {
        List<Siniestro> siniestros = siniestroRepository.findAll();
        // Enriquecer con datos de Poliza y Proveedor
        siniestros.forEach(this::enrichSiniestro);
        return siniestros;
    }
    
    public Siniestro getSiniestroById(Long id) {
        Siniestro siniestro = siniestroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Siniestro no encontrado con id: " + id));
        enrichSiniestro(siniestro);
        return siniestro;
    }
    
    private void enrichSiniestro(Siniestro siniestro) {
        if (siniestro.getPolizaId() != null) {
            polizaRepository.findById(siniestro.getPolizaId())
                .ifPresent(poliza -> siniestro.setNumeroPoliza(poliza.getNumeroPoliza()));
        }
        if (siniestro.getProveedorId() != null) {
            proveedorRepository.findById(siniestro.getProveedorId())
                .ifPresent(proveedor -> siniestro.setNombreProveedor(proveedor.getNombre()));
        }
    }
    
    public Siniestro getSiniestroByNumeroCaso(String numeroCaso) {
        return siniestroRepository.findByNumeroCaso(numeroCaso)
                .orElseThrow(() -> new ResourceNotFoundException("Siniestro no encontrado con número de caso: " + numeroCaso));
    }
    
    public List<Siniestro> getSiniestrosByPolizaId(Long polizaId) {
        List<Siniestro> siniestros = siniestroRepository.findByPolizaId(polizaId);
        siniestros.forEach(this::enrichSiniestro);
        return siniestros;
    }
    
    public List<Siniestro> getSiniestrosByProveedorId(Long proveedorId) {
        List<Siniestro> siniestros = siniestroRepository.findByProveedorId(proveedorId);
        siniestros.forEach(this::enrichSiniestro);
        return siniestros;
    }
    
    public List<Siniestro> getSiniestrosByEstado(String estado) {
        List<Siniestro> siniestros = siniestroRepository.findByEstado(estado);
        siniestros.forEach(this::enrichSiniestro);
        return siniestros;
    }
    
    public Siniestro createSiniestro(Siniestro siniestro) {
        if (siniestroRepository.existsByNumeroCaso(siniestro.getNumeroCaso())) {
            throw new IllegalArgumentException("Ya existe un siniestro con el número de caso: " + siniestro.getNumeroCaso());
        }
        
        // Validar que existan la póliza y el proveedor
        if (siniestro.getPolizaId() == null) {
            throw new IllegalArgumentException("La póliza es obligatoria");
        }
        polizaRepository.findById(siniestro.getPolizaId())
                .orElseThrow(() -> new ResourceNotFoundException("Póliza no encontrada con id: " + siniestro.getPolizaId()));
        
        if (siniestro.getProveedorId() == null) {
            throw new IllegalArgumentException("El proveedor es obligatorio");
        }
        proveedorRepository.findById(siniestro.getProveedorId())
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con id: " + siniestro.getProveedorId()));
        
        Siniestro saved = siniestroRepository.save(siniestro);
        enrichSiniestro(saved);
        return saved;
    }
    
    public Siniestro updateSiniestro(Long id, Siniestro siniestroDetails) {
        Siniestro siniestro = siniestroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Siniestro no encontrado con id: " + id));
        
        if (!siniestro.getNumeroCaso().equals(siniestroDetails.getNumeroCaso()) &&
            siniestroRepository.existsByNumeroCaso(siniestroDetails.getNumeroCaso())) {
            throw new IllegalArgumentException("Ya existe un siniestro con el número de caso: " + siniestroDetails.getNumeroCaso());
        }
        
        siniestro.setNumeroCaso(siniestroDetails.getNumeroCaso());
        siniestro.setFecha(siniestroDetails.getFecha());
        siniestro.setDescripcion(siniestroDetails.getDescripcion());
        siniestro.setMontoEstimado(siniestroDetails.getMontoEstimado());
        siniestro.setEstado(siniestroDetails.getEstado());
        
        // Actualizar referencias si se proporcionan
        if (siniestroDetails.getPolizaId() != null) {
            polizaRepository.findById(siniestroDetails.getPolizaId())
                    .orElseThrow(() -> new ResourceNotFoundException("Póliza no encontrada con id: " + siniestroDetails.getPolizaId()));
            siniestro.setPolizaId(siniestroDetails.getPolizaId());
        }
        
        if (siniestroDetails.getProveedorId() != null) {
            proveedorRepository.findById(siniestroDetails.getProveedorId())
                    .orElseThrow(() -> new ResourceNotFoundException("Proveedor no encontrado con id: " + siniestroDetails.getProveedorId()));
            siniestro.setProveedorId(siniestroDetails.getProveedorId());
        }
        
        Siniestro updated = siniestroRepository.save(siniestro);
        enrichSiniestro(updated);
        return updated;
    }
    
    public void deleteSiniestro(Long id) {
        Siniestro siniestro = getSiniestroById(id);
        siniestroRepository.delete(siniestro);
    }
}
