package com.diploma.web.rest;

import com.diploma.domain.Disease;
import com.diploma.repository.DiseaseRepository;
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
 * REST controller for managing {@link com.diploma.domain.Disease}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiseaseResource {

    private final Logger log = LoggerFactory.getLogger(DiseaseResource.class);

    private static final String ENTITY_NAME = "disease";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiseaseRepository diseaseRepository;

    public DiseaseResource(DiseaseRepository diseaseRepository) {
        this.diseaseRepository = diseaseRepository;
    }

    /**
     * {@code POST  /diseases} : Create a new disease.
     *
     * @param disease the disease to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disease, or with status {@code 400 (Bad Request)} if the disease has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diseases")
    public ResponseEntity<Disease> createDisease(@RequestBody Disease disease) throws URISyntaxException {
        log.debug("REST request to save Disease : {}", disease);
        if (disease.getId() != null) {
            throw new BadRequestAlertException("A new disease cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disease result = diseaseRepository.save(disease);
        return ResponseEntity.created(new URI("/api/diseases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diseases} : Updates an existing disease.
     *
     * @param disease the disease to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disease,
     * or with status {@code 400 (Bad Request)} if the disease is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disease couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diseases")
    public ResponseEntity<Disease> updateDisease(@RequestBody Disease disease) throws URISyntaxException {
        log.debug("REST request to update Disease : {}", disease);
        if (disease.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Disease result = diseaseRepository.save(disease);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disease.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /diseases} : get all the diseases.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diseases in body.
     */
    @GetMapping("/diseases")
    public List<Disease> getAllDiseases() {
        log.debug("REST request to get all Diseases");
        return diseaseRepository.findAll();
    }

    /**
     * {@code GET  /diseases/:id} : get the "id" disease.
     *
     * @param id the id of the disease to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disease, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diseases/{id}")
    public ResponseEntity<Disease> getDisease(@PathVariable Long id) {
        log.debug("REST request to get Disease : {}", id);
        Optional<Disease> disease = diseaseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(disease);
    }

    /**
     * {@code DELETE  /diseases/:id} : delete the "id" disease.
     *
     * @param id the id of the disease to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diseases/{id}")
    public ResponseEntity<Void> deleteDisease(@PathVariable Long id) {
        log.debug("REST request to delete Disease : {}", id);
        diseaseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
