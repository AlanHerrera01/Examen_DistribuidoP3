package com.example.kubernetescrudapi.service;

import com.example.kubernetescrudapi.exception.ResourceNotFoundException;
import com.example.kubernetescrudapi.model.mysql.Poliza;
import com.example.kubernetescrudapi.repository.mysql.PolizaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolizaService {
    
    @Autowired
    private PolizaRepository polizaRepository;
    
    public List<Poliza> getAllPolizas() {
        return polizaRepository.findAll();
    }
    
    public Poliza getPolizaById(Long id) {
        return polizaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Póliza no encontrada con id: " + id));
    }
    
    public Poliza getPolizaByNumeroPoliza(String numeroPoliza) {
        return polizaRepository.findByNumeroPoliza(numeroPoliza)
                .orElseThrow(() -> new ResourceNotFoundException("Póliza no encontrada con número: " + numeroPoliza));
    }
    
    public Poliza createPoliza(Poliza poliza) {
        if (polizaRepository.existsByNumeroPoliza(poliza.getNumeroPoliza())) {
            throw new IllegalArgumentException("Ya existe una póliza con el número: " + poliza.getNumeroPoliza());
        }
        return polizaRepository.save(poliza);
    }
    
    public Poliza updatePoliza(Long id, Poliza polizaDetails) {
        Poliza poliza = getPolizaById(id);
        
        if (!poliza.getNumeroPoliza().equals(polizaDetails.getNumeroPoliza()) &&
            polizaRepository.existsByNumeroPoliza(polizaDetails.getNumeroPoliza())) {
            throw new IllegalArgumentException("Ya existe una póliza con el número: " + polizaDetails.getNumeroPoliza());
        }
        
        poliza.setNumeroPoliza(polizaDetails.getNumeroPoliza());
        poliza.setTipo(polizaDetails.getTipo());
        poliza.setEstado(polizaDetails.getEstado());
        
        return polizaRepository.save(poliza);
    }
    
    public void deletePoliza(Long id) {
        Poliza poliza = getPolizaById(id);
        polizaRepository.delete(poliza);
    }
}
