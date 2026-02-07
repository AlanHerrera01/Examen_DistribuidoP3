package com.example.kubernetescrudapi.model.mysql;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "proveedores")
public class Proveedor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;
    
    @NotBlank(message = "El tipo es obligatorio")
    @Column(nullable = false)
    private String tipo; // TALLER, CLÍNICA, GRÚA
    
    @NotBlank(message = "La ciudad es obligatoria")
    @Column(nullable = false)
    private String ciudad;
    
    // Constructors
    public Proveedor() {
    }
    
    public Proveedor(String nombre, String tipo, String ciudad) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ciudad = ciudad;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    
    public String getCiudad() {
        return ciudad;
    }
    
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
}
