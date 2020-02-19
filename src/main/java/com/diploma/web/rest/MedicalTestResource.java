package com.diploma.web.rest;

import com.diploma.domain.MedicalTest;
import com.diploma.repository.MedicalTestRepository;
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
 * REST controller for managing {@link com.diploma.domain.MedicalTest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedicalTestResource {

    private final Logger log = LoggerFactory.getLogger(MedicalTestResource.class);

    private static final String ENTITY_NAME = "medicalTest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedicalTestRepository medicalTestRepository;

    public MedicalTestResource(MedicalTestRepository medicalTestRepository) {
        this.medicalTestRepository = medicalTestRepository;
    }

    /**
     * {@code POST  /medical-tests} : Create a new medicalTest.
     *
     * @param medicalTest the medicalTest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medicalTest, or with status {@code 400 (Bad Request)} if the medicalTest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medical-tests")
    public ResponseEntity<MedicalTest> createMedicalTest(@RequestBody MedicalTest medicalTest) throws URISyntaxException {
        log.debug("REST request to save MedicalTest : {}", medicalTest);
        if (medicalTest.getId() != null) {
            throw new BadRequestAlertException("A new medicalTest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MedicalTest result = medicalTestRepository.save(medicalTest);
        return ResponseEntity.created(new URI("/api/medical-tests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medical-tests} : Updates an existing medicalTest.
     *
     * @param medicalTest the medicalTest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medicalTest,
     * or with status {@code 400 (Bad Request)} if the medicalTest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medicalTest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medical-tests")
    public ResponseEntity<MedicalTest> updateMedicalTest(@RequestBody MedicalTest medicalTest) throws URISyntaxException {
        log.debug("REST request to update MedicalTest : {}", medicalTest);
        if (medicalTest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MedicalTest result = medicalTestRepository.save(medicalTest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicalTest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medical-tests} : get all the medicalTests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medicalTests in body.
     */
    @GetMapping("/medical-tests")
    public List<MedicalTest> getAllMedicalTests() {
        log.debug("REST request to get all MedicalTests");
        return medicalTestRepository.findAll();
    }

    /**
     * {@code GET  /medical-tests/:id} : get the "id" medicalTest.
     *
     * @param id the id of the medicalTest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medicalTest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medical-tests/{id}")
    public ResponseEntity<MedicalTest> getMedicalTest(@PathVariable Long id) {
        log.debug("REST request to get MedicalTest : {}", id);
        Optional<MedicalTest> medicalTest = medicalTestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medicalTest);
    }

    /**
     * {@code DELETE  /medical-tests/:id} : delete the "id" medicalTest.
     *
     * @param id the id of the medicalTest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medical-tests/{id}")
    public ResponseEntity<Void> deleteMedicalTest(@PathVariable Long id) {
        log.debug("REST request to delete MedicalTest : {}", id);
        medicalTestRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
