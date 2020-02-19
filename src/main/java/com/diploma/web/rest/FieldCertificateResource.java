package com.diploma.web.rest;

import com.diploma.domain.FieldCertificate;
import com.diploma.repository.FieldCertificateRepository;
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
 * REST controller for managing {@link com.diploma.domain.FieldCertificate}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FieldCertificateResource {

    private final Logger log = LoggerFactory.getLogger(FieldCertificateResource.class);

    private static final String ENTITY_NAME = "fieldCertificate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FieldCertificateRepository fieldCertificateRepository;

    public FieldCertificateResource(FieldCertificateRepository fieldCertificateRepository) {
        this.fieldCertificateRepository = fieldCertificateRepository;
    }

    /**
     * {@code POST  /field-certificates} : Create a new fieldCertificate.
     *
     * @param fieldCertificate the fieldCertificate to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fieldCertificate, or with status {@code 400 (Bad Request)} if the fieldCertificate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/field-certificates")
    public ResponseEntity<FieldCertificate> createFieldCertificate(@RequestBody FieldCertificate fieldCertificate) throws URISyntaxException {
        log.debug("REST request to save FieldCertificate : {}", fieldCertificate);
        if (fieldCertificate.getId() != null) {
            throw new BadRequestAlertException("A new fieldCertificate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldCertificate result = fieldCertificateRepository.save(fieldCertificate);
        return ResponseEntity.created(new URI("/api/field-certificates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /field-certificates} : Updates an existing fieldCertificate.
     *
     * @param fieldCertificate the fieldCertificate to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldCertificate,
     * or with status {@code 400 (Bad Request)} if the fieldCertificate is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fieldCertificate couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/field-certificates")
    public ResponseEntity<FieldCertificate> updateFieldCertificate(@RequestBody FieldCertificate fieldCertificate) throws URISyntaxException {
        log.debug("REST request to update FieldCertificate : {}", fieldCertificate);
        if (fieldCertificate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldCertificate result = fieldCertificateRepository.save(fieldCertificate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldCertificate.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /field-certificates} : get all the fieldCertificates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fieldCertificates in body.
     */
    @GetMapping("/field-certificates")
    public List<FieldCertificate> getAllFieldCertificates() {
        log.debug("REST request to get all FieldCertificates");
        return fieldCertificateRepository.findAll();
    }

    /**
     * {@code GET  /field-certificates/:id} : get the "id" fieldCertificate.
     *
     * @param id the id of the fieldCertificate to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fieldCertificate, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/field-certificates/{id}")
    public ResponseEntity<FieldCertificate> getFieldCertificate(@PathVariable Long id) {
        log.debug("REST request to get FieldCertificate : {}", id);
        Optional<FieldCertificate> fieldCertificate = fieldCertificateRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldCertificate);
    }

    /**
     * {@code DELETE  /field-certificates/:id} : delete the "id" fieldCertificate.
     *
     * @param id the id of the fieldCertificate to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/field-certificates/{id}")
    public ResponseEntity<Void> deleteFieldCertificate(@PathVariable Long id) {
        log.debug("REST request to delete FieldCertificate : {}", id);
        fieldCertificateRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
