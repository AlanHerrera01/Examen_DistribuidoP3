package com.example.kubernetescrudapi.controller;

import com.example.kubernetescrudapi.model.postgres.Siniestro;
import com.example.kubernetescrudapi.service.SiniestroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/siniestros")
@CrossOrigin(origins = "*")
public class SiniestroController {
    
    @Autowired
    private SiniestroService siniestroService;
    
    @GetMapping
    public ResponseEntity<List<Siniestro>> getAllSiniestros() {
        return ResponseEntity.ok(siniestroService.getAllSiniestros());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Siniestro> getSiniestroById(@PathVariable Long id) {
        return ResponseEntity.ok(siniestroService.getSiniestroById(id));
    }
    
    @GetMapping("/caso/{numeroCaso}")
    public ResponseEntity<Siniestro> getSiniestroByNumeroCaso(@PathVariable String numeroCaso) {
        return ResponseEntity.ok(siniestroService.getSiniestroByNumeroCaso(numeroCaso));
    }
    
    @GetMapping("/poliza/{polizaId}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByPolizaId(@PathVariable Long polizaId) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByPolizaId(polizaId));
    }
    
    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByProveedorId(@PathVariable Long proveedorId) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByProveedorId(proveedorId));
    }
    
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Siniestro>> getSiniestrosByEstado(@PathVariable String estado) {
        return ResponseEntity.ok(siniestroService.getSiniestrosByEstado(estado));
    }
    
    @PostMapping
    public ResponseEntity<Siniestro> createSiniestro(@Valid @RequestBody Siniestro siniestro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(siniestroService.createSiniestro(siniestro));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Siniestro> updateSiniestro(@PathVariable Long id, @Valid @RequestBody Siniestro siniestroDetails) {
        return ResponseEntity.ok(siniestroService.updateSiniestro(id, siniestroDetails));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSiniestro(@PathVariable Long id) {
        siniestroService.deleteSiniestro(id);
        return ResponseEntity.noContent().build();
    }
}
