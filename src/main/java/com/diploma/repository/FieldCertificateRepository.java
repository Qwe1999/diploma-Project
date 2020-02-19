package com.diploma.repository;

import com.diploma.domain.FieldCertificate;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the FieldCertificate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldCertificateRepository extends JpaRepository<FieldCertificate, Long> {

}
