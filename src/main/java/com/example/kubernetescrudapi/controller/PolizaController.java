package com.example.kubernetescrudapi.controller;

import com.example.kubernetescrudapi.model.mysql.Poliza;
import com.example.kubernetescrudapi.service.PolizaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/polizas")
@CrossOrigin(origins = "*")
public class PolizaController {
    
    @Autowired
    private PolizaService polizaService;
    
    @GetMapping
    public ResponseEntity<List<Poliza>> getAllPolizas() {
        return ResponseEntity.ok(polizaService.getAllPolizas());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Poliza> getPolizaById(@PathVariable Long id) {
        return ResponseEntity.ok(polizaService.getPolizaById(id));
    }
    
    @GetMapping("/numero/{numeroPoliza}")
    public ResponseEntity<Poliza> getPolizaByNumeroPoliza(@PathVariable String numeroPoliza) {
        return ResponseEntity.ok(polizaService.getPolizaByNumeroPoliza(numeroPoliza));
    }
    
    @PostMapping
    public ResponseEntity<Poliza> createPoliza(@Valid @RequestBody Poliza poliza) {
        return ResponseEntity.status(HttpStatus.CREATED).body(polizaService.createPoliza(poliza));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Poliza> updatePoliza(@PathVariable Long id, @Valid @RequestBody Poliza polizaDetails) {
        return ResponseEntity.ok(polizaService.updatePoliza(id, polizaDetails));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoliza(@PathVariable Long id) {
        polizaService.deletePoliza(id);
        return ResponseEntity.noContent().build();
    }
}
