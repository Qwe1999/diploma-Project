package com.diploma.repository;

import com.diploma.domain.MedicalTest;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MedicalTest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MedicalTestRepository extends JpaRepository<MedicalTest, Long> {

}
