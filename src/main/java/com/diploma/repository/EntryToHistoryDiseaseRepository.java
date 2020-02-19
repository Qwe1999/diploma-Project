package com.diploma.repository;

import com.diploma.domain.EntryToHistoryDisease;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EntryToHistoryDisease entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntryToHistoryDiseaseRepository extends JpaRepository<EntryToHistoryDisease, Long> {

}
