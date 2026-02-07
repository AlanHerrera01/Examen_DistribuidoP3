package com.example.kubernetescrudapi.model.postgres;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Table(name = "siniestros")
public class Siniestro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El número de caso es obligatorio")
    @Column(unique = true, nullable = false)
    private String numeroCaso;
    
    @NotNull(message = "La fecha es obligatoria")
    @Column(nullable = false)
    private LocalDate fecha;
    
    @NotBlank(message = "La descripción es obligatoria")
    @Column(nullable = false, length = 500)
    private String descripcion;
    
    @NotNull(message = "El monto estimado es obligatorio")
    @Column(nullable = false)
    private Double montoEstimado;
    
    @NotBlank(message = "El estado es obligatorio")
    @Column(nullable = false)
    private String estado; // ABIERTO, EN_PROCESO, CERRADO
    
    @NotNull(message = "La póliza es obligatoria")
    @Column(nullable = false)
    private Long polizaId;
    
    @NotNull(message = "El proveedor es obligatorio")
    @Column(nullable = false)
    private Long proveedorId;
    
    // Campos transitorios para la vista
    @Transient
    private String numeroPoliza;
    
    @Transient
    private String nombreProveedor;
    
    // Constructors
    public Siniestro() {
    }
    
    public Siniestro(String numeroCaso, LocalDate fecha, String descripcion, 
                     Double montoEstimado, String estado, Long polizaId, Long proveedorId) {
        this.numeroCaso = numeroCaso;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.montoEstimado = montoEstimado;
        this.estado = estado;
        this.polizaId = polizaId;
        this.proveedorId = proveedorId;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNumeroCaso() {
        return numeroCaso;
    }
    
    public void setNumeroCaso(String numeroCaso) {
        this.numeroCaso = numeroCaso;
    }
    
    public LocalDate getFecha() {
        return fecha;
    }
    
    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public Double getMontoEstimado() {
        return montoEstimado;
    }
    
    public void setMontoEstimado(Double montoEstimado) {
        this.montoEstimado = montoEstimado;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public Long getPolizaId() {
        return polizaId;
    }
    
    public void setPolizaId(Long polizaId) {
        this.polizaId = polizaId;
    }
    
    public Long getProveedorId() {
        return proveedorId;
    }
    
    public void setProveedorId(Long proveedorId) {
        this.proveedorId = proveedorId;
    }
    
    public String getNumeroPoliza() {
        return numeroPoliza;
    }
    
    public void setNumeroPoliza(String numeroPoliza) {
        this.numeroPoliza = numeroPoliza;
    }
    
    public String getNombreProveedor() {
        return nombreProveedor;
    }
    
    public void setNombreProveedor(String nombreProveedor) {
        this.nombreProveedor = nombreProveedor;
    }
}
