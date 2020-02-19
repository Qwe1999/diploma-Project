package com.diploma.repository;

import com.diploma.domain.CertificateTempl;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CertificateTempl entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CertificateTemplRepository extends JpaRepository<CertificateTempl, Long> {

}
