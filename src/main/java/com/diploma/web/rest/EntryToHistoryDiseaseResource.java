package com.diploma.web.rest;

import com.diploma.domain.EntryToHistoryDisease;
import com.diploma.repository.EntryToHistoryDiseaseRepository;
import com.diploma.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.diploma.domain.EntryToHistoryDisease}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntryToHistoryDiseaseResource {

    private final Logger log = LoggerFactory.getLogger(EntryToHistoryDiseaseResource.class);

    private static final String ENTITY_NAME = "entryToHistoryDisease";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntryToHistoryDiseaseRepository entryToHistoryDiseaseRepository;

    public EntryToHistoryDiseaseResource(EntryToHistoryDiseaseRepository entryToHistoryDiseaseRepository) {
        this.entryToHistoryDiseaseRepository = entryToHistoryDiseaseRepository;
    }

    /**
     * {@code POST  /entry-to-history-diseases} : Create a new entryToHistoryDisease.
     *
     * @param entryToHistoryDisease the entryToHistoryDisease to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entryToHistoryDisease, or with status {@code 400 (Bad Request)} if the entryToHistoryDisease has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entry-to-history-diseases")
    public ResponseEntity<EntryToHistoryDisease> createEntryToHistoryDisease(@RequestBody EntryToHistoryDisease entryToHistoryDisease) throws URISyntaxException {
        log.debug("REST request to save EntryToHistoryDisease : {}", entryToHistoryDisease);
        if (entryToHistoryDisease.getId() != null) {
            throw new BadRequestAlertException("A new entryToHistoryDisease cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntryToHistoryDisease result = entryToHistoryDiseaseRepository.save(entryToHistoryDisease);
        return ResponseEntity.created(new URI("/api/entry-to-history-diseases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entry-to-history-diseases} : Updates an existing entryToHistoryDisease.
     *
     * @param entryToHistoryDisease the entryToHistoryDisease to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entryToHistoryDisease,
     * or with status {@code 400 (Bad Request)} if the entryToHistoryDisease is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entryToHistoryDisease couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entry-to-history-diseases")
    public ResponseEntity<EntryToHistoryDisease> updateEntryToHistoryDisease(@RequestBody EntryToHistoryDisease entryToHistoryDisease) throws URISyntaxException {
        log.debug("REST request to update EntryToHistoryDisease : {}", entryToHistoryDisease);
        if (entryToHistoryDisease.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntryToHistoryDisease result = entryToHistoryDiseaseRepository.save(entryToHistoryDisease);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entryToHistoryDisease.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entry-to-history-diseases} : get all the entryToHistoryDiseases.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entryToHistoryDiseases in body.
     */
    @GetMapping("/entry-to-history-diseases")
    public ResponseEntity<List<EntryToHistoryDisease>> getAllEntryToHistoryDiseases(Pageable pageable) {
        log.debug("REST request to get a page of EntryToHistoryDiseases");
        Page<EntryToHistoryDisease> page = entryToHistoryDiseaseRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    @GetMapping("/entry-to-history-diseases-patient/{patientId}")
    public ResponseEntity<List<EntryToHistoryDisease>> getAllEntryToHistoryDiseasesForPatient(Pageable pageable,
                                                                                              @PathVariable Long patientId) {
        log.debug("REST request to get a page of EntryToHistoryDiseases");
        List<EntryToHistoryDisease> page = entryToHistoryDiseaseRepository.findAll(pageable)
            .filter(entryToHistoryDisease -> entryToHistoryDisease.getPatient() != null)
            .filter(entryToHistoryDisease ->
            entryToHistoryDisease.getPatient().getId().equals(patientId)
        ).toList();
        return ResponseEntity.ok().body(page);
    }

    /**
     * {@code GET  /entry-to-history-diseases/:id} : get the "id" entryToHistoryDisease.
     *
     * @param id the id of the entryToHistoryDisease to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entryToHistoryDisease, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entry-to-history-diseases/{id}")
    public ResponseEntity<EntryToHistoryDisease> getEntryToHistoryDisease(@PathVariable Long id) {
        log.debug("REST request to get EntryToHistoryDisease : {}", id);
        Optional<EntryToHistoryDisease> entryToHistoryDisease = entryToHistoryDiseaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(entryToHistoryDisease);
    }

    /**
     * {@code DELETE  /entry-to-history-diseases/:id} : delete the "id" entryToHistoryDisease.
     *
     * @param id the id of the entryToHistoryDisease to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entry-to-history-diseases/{id}")
    public ResponseEntity<Void> deleteEntryToHistoryDisease(@PathVariable Long id) {
        log.debug("REST request to delete EntryToHistoryDisease : {}", id);
        entryToHistoryDiseaseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
