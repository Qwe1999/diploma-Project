package com.diploma.repository;

import com.diploma.domain.FieldCertificateTempl;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FieldCertificateTempl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldCertificateTemplRepository extends JpaRepository<FieldCertificateTempl, Long> {

}
