package com.diploma.web.rest;

import com.diploma.domain.CertificateTempl;
import com.diploma.repository.CertificateTemplRepository;
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
 * REST controller for managing {@link com.diploma.domain.CertificateTempl}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CertificateTemplResource {

    private final Logger log = LoggerFactory.getLogger(CertificateTemplResource.class);

    private static final String ENTITY_NAME = "certificateTempl";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CertificateTemplRepository certificateTemplRepository;

    public CertificateTemplResource(CertificateTemplRepository certificateTemplRepository) {
        this.certificateTemplRepository = certificateTemplRepository;
    }

    /**
     * {@code POST  /certificate-templs} : Create a new certificateTempl.
     *
     * @param certificateTempl the certificateTempl to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new certificateTempl, or with status {@code 400 (Bad Request)} if the certificateTempl has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/certificate-templs")
    public ResponseEntity<CertificateTempl> createCertificateTempl(@RequestBody CertificateTempl certificateTempl) throws URISyntaxException {
        log.debug("REST request to save CertificateTempl : {}", certificateTempl);
        if (certificateTempl.getId() != null) {
            throw new BadRequestAlertException("A new certificateTempl cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CertificateTempl result = certificateTemplRepository.save(certificateTempl);
        return ResponseEntity.created(new URI("/api/certificate-templs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /certificate-templs} : Updates an existing certificateTempl.
     *
     * @param certificateTempl the certificateTempl to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated certificateTempl,
     * or with status {@code 400 (Bad Request)} if the certificateTempl is not valid,
     * or with status {@code 500 (Internal Server Error)} if the certificateTempl couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/certificate-templs")
    public ResponseEntity<CertificateTempl> updateCertificateTempl(@RequestBody CertificateTempl certificateTempl) throws URISyntaxException {
        log.debug("REST request to update CertificateTempl : {}", certificateTempl);
        if (certificateTempl.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CertificateTempl result = certificateTemplRepository.save(certificateTempl);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, certificateTempl.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /certificate-templs} : get all the certificateTempls.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of certificateTempls in body.
     */
    @GetMapping("/certificate-templs")
    public List<CertificateTempl> getAllCertificateTempls() {
        log.debug("REST request to get all CertificateTempls");
        return certificateTemplRepository.findAll();
    }

    /**
     * {@code GET  /certificate-templs/:id} : get the "id" certificateTempl.
     *
     * @param id the id of the certificateTempl to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the certificateTempl, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/certificate-templs/{id}")
    public ResponseEntity<CertificateTempl> getCertificateTempl(@PathVariable Long id) {
        log.debug("REST request to get CertificateTempl : {}", id);
        Optional<CertificateTempl> certificateTempl = certificateTemplRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(certificateTempl);
    }

    /**
     * {@code DELETE  /certificate-templs/:id} : delete the "id" certificateTempl.
     *
     * @param id the id of the certificateTempl to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/certificate-templs/{id}")
    public ResponseEntity<Void> deleteCertificateTempl(@PathVariable Long id) {
        log.debug("REST request to delete CertificateTempl : {}", id);
        certificateTemplRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
