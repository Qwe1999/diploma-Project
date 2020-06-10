package com.diploma.repository;

import com.diploma.domain.Patient;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Patient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("select p from Patient p join fetch p.entryToDoctor where p.entryToDoctor.doctor.id = :idDoctor")
    List<Patient> findByIdFetchParent(@Param("idDoctor") Long idDoctor);
}
