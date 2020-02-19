package com.diploma.web.rest;

import com.diploma.domain.FieldCertificateTempl;
import com.diploma.repository.FieldCertificateTemplRepository;
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
 * REST controller for managing {@link com.diploma.domain.FieldCertificateTempl}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FieldCertificateTemplResource {

    private final Logger log = LoggerFactory.getLogger(FieldCertificateTemplResource.class);

    private static final String ENTITY_NAME = "fieldCertificateTempl";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FieldCertificateTemplRepository fieldCertificateTemplRepository;

    public FieldCertificateTemplResource(FieldCertificateTemplRepository fieldCertificateTemplRepository) {
        this.fieldCertificateTemplRepository = fieldCertificateTemplRepository;
    }

    /**
     * {@code POST  /field-certificate-templs} : Create a new fieldCertificateTempl.
     *
     * @param fieldCertificateTempl the fieldCertificateTempl to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fieldCertificateTempl, or with status {@code 400 (Bad Request)} if the fieldCertificateTempl has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/field-certificate-templs")
    public ResponseEntity<FieldCertificateTempl> createFieldCertificateTempl(@RequestBody FieldCertificateTempl fieldCertificateTempl) throws URISyntaxException {
        log.debug("REST request to save FieldCertificateTempl : {}", fieldCertificateTempl);
        if (fieldCertificateTempl.getId() != null) {
            throw new BadRequestAlertException("A new fieldCertificateTempl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldCertificateTempl result = fieldCertificateTemplRepository.save(fieldCertificateTempl);
        return ResponseEntity.created(new URI("/api/field-certificate-templs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /field-certificate-templs} : Updates an existing fieldCertificateTempl.
     *
     * @param fieldCertificateTempl the fieldCertificateTempl to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fieldCertificateTempl,
     * or with status {@code 400 (Bad Request)} if the fieldCertificateTempl is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fieldCertificateTempl couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/field-certificate-templs")
    public ResponseEntity<FieldCertificateTempl> updateFieldCertificateTempl(@RequestBody FieldCertificateTempl fieldCertificateTempl) throws URISyntaxException {
        log.debug("REST request to update FieldCertificateTempl : {}", fieldCertificateTempl);
        if (fieldCertificateTempl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FieldCertificateTempl result = fieldCertificateTemplRepository.save(fieldCertificateTempl);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fieldCertificateTempl.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /field-certificate-templs} : get all the fieldCertificateTempls.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fieldCertificateTempls in body.
     */
    @GetMapping("/field-certificate-templs")
    public List<FieldCertificateTempl> getAllFieldCertificateTempls() {
        log.debug("REST request to get all FieldCertificateTempls");
        return fieldCertificateTemplRepository.findAll();
    }

    /**
     * {@code GET  /field-certificate-templs/:id} : get the "id" fieldCertificateTempl.
     *
     * @param id the id of the fieldCertificateTempl to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fieldCertificateTempl, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/field-certificate-templs/{id}")
    public ResponseEntity<FieldCertificateTempl> getFieldCertificateTempl(@PathVariable Long id) {
        log.debug("REST request to get FieldCertificateTempl : {}", id);
        Optional<FieldCertificateTempl> fieldCertificateTempl = fieldCertificateTemplRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fieldCertificateTempl);
    }

    /**
     * {@code DELETE  /field-certificate-templs/:id} : delete the "id" fieldCertificateTempl.
     *
     * @param id the id of the fieldCertificateTempl to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/field-certificate-templs/{id}")
    public ResponseEntity<Void> deleteFieldCertificateTempl(@PathVariable Long id) {
        log.debug("REST request to delete FieldCertificateTempl : {}", id);
        fieldCertificateTemplRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
