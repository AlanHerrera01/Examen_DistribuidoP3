package com.example.kubernetescrudapi.repository.mysql;

import com.example.kubernetescrudapi.model.mysql.Poliza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PolizaRepository extends JpaRepository<Poliza, Long> {
    Optional<Poliza> findByNumeroPoliza(String numeroPoliza);
    boolean existsByNumeroPoliza(String numeroPoliza);
}
