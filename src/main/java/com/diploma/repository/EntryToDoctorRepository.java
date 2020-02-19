package com.diploma.repository;

import com.diploma.domain.EntryToDoctor;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EntryToDoctor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntryToDoctorRepository extends JpaRepository<EntryToDoctor, Long> {

}
