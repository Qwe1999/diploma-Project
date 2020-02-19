package com.diploma.web.rest;

import com.diploma.domain.EntryToDoctor;
import com.diploma.repository.EntryToDoctorRepository;
import com.diploma.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.diploma.domain.EntryToDoctor}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntryToDoctorResource {

    private final Logger log = LoggerFactory.getLogger(EntryToDoctorResource.class);

    private static final String ENTITY_NAME = "entryToDoctor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntryToDoctorRepository entryToDoctorRepository;

    public EntryToDoctorResource(EntryToDoctorRepository entryToDoctorRepository) {
        this.entryToDoctorRepository = entryToDoctorRepository;
    }

    /**
     * {@code POST  /entry-to-doctors} : Create a new entryToDoctor.
     *
     * @param entryToDoctor the entryToDoctor to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entryToDoctor, or with status {@code 400 (Bad Request)} if the entryToDoctor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entry-to-doctors")
    public ResponseEntity<EntryToDoctor> createEntryToDoctor(@RequestBody EntryToDoctor entryToDoctor) throws URISyntaxException {
        log.debug("REST request to save EntryToDoctor : {}", entryToDoctor);
        if (entryToDoctor.getId() != null) {
            throw new BadRequestAlertException("A new entryToDoctor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntryToDoctor result = entryToDoctorRepository.save(entryToDoctor);
        return ResponseEntity.created(new URI("/api/entry-to-doctors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entry-to-doctors} : Updates an existing entryToDoctor.
     *
     * @param entryToDoctor the entryToDoctor to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entryToDoctor,
     * or with status {@code 400 (Bad Request)} if the entryToDoctor is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entryToDoctor couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entry-to-doctors")
    public ResponseEntity<EntryToDoctor> updateEntryToDoctor(@RequestBody EntryToDoctor entryToDoctor) throws URISyntaxException {
        log.debug("REST request to update EntryToDoctor : {}", entryToDoctor);
        if (entryToDoctor.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntryToDoctor result = entryToDoctorRepository.save(entryToDoctor);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entryToDoctor.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entry-to-doctors} : get all the entryToDoctors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entryToDoctors in body.
     */
    @GetMapping("/entry-to-doctors")
    public List<EntryToDoctor> getAllEntryToDoctors() {
        log.debug("REST request to get all EntryToDoctors");
        return entryToDoctorRepository.findAll();
    }

    /**
     * {@code GET  /entry-to-doctors/:id} : get the "id" entryToDoctor.
     *
     * @param id the id of the entryToDoctor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entryToDoctor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entry-to-doctors/{id}")
    public ResponseEntity<EntryToDoctor> getEntryToDoctor(@PathVariable Long id) {
        log.debug("REST request to get EntryToDoctor : {}", id);
        Optional<EntryToDoctor> entryToDoctor = entryToDoctorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entryToDoctor);
    }

    /**
     * {@code DELETE  /entry-to-doctors/:id} : delete the "id" entryToDoctor.
     *
     * @param id the id of the entryToDoctor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entry-to-doctors/{id}")
    public ResponseEntity<Void> deleteEntryToDoctor(@PathVariable Long id) {
        log.debug("REST request to delete EntryToDoctor : {}", id);
        entryToDoctorRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
