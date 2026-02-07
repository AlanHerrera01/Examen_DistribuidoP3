package com.example.kubernetescrudapi.controller;

import com.example.kubernetescrudapi.model.mysql.Proveedor;
import com.example.kubernetescrudapi.service.ProveedorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {
    
    @Autowired
    private ProveedorService proveedorService;
    
    @GetMapping
    public ResponseEntity<List<Proveedor>> getAllProveedores() {
        return ResponseEntity.ok(proveedorService.getAllProveedores());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Proveedor> getProveedorById(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorService.getProveedorById(id));
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Proveedor>> getProveedoresByTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(proveedorService.getProveedoresByTipo(tipo));
    }
    
    @GetMapping("/ciudad/{ciudad}")
    public ResponseEntity<List<Proveedor>> getProveedoresByCiudad(@PathVariable String ciudad) {
        return ResponseEntity.ok(proveedorService.getProveedoresByCiudad(ciudad));
    }
    
    @PostMapping
    public ResponseEntity<Proveedor> createProveedor(@Valid @RequestBody Proveedor proveedor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(proveedorService.createProveedor(proveedor));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable Long id, @Valid @RequestBody Proveedor proveedorDetails) {
        return ResponseEntity.ok(proveedorService.updateProveedor(id, proveedorDetails));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProveedor(@PathVariable Long id) {
        proveedorService.deleteProveedor(id);
        return ResponseEntity.noContent().build();
    }
}
