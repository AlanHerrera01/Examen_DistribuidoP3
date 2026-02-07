package com.example.kubernetescrudapi.repository.postgres;

import com.example.kubernetescrudapi.model.postgres.Siniestro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SiniestroRepository extends JpaRepository<Siniestro, Long> {
    Optional<Siniestro> findByNumeroCaso(String numeroCaso);
    List<Siniestro> findByPolizaId(Long polizaId);
    List<Siniestro> findByProveedorId(Long proveedorId);
    List<Siniestro> findByEstado(String estado);
    boolean existsByNumeroCaso(String numeroCaso);
}
