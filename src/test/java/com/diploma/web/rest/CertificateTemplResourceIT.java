package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.CertificateTempl;
import com.diploma.repository.CertificateTemplRepository;
import com.diploma.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.diploma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CertificateTemplResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class CertificateTemplResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CertificateTemplRepository certificateTemplRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCertificateTemplMockMvc;

    private CertificateTempl certificateTempl;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CertificateTemplResource certificateTemplResource = new CertificateTemplResource(certificateTemplRepository);
        this.restCertificateTemplMockMvc = MockMvcBuilders.standaloneSetup(certificateTemplResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CertificateTempl createEntity(EntityManager em) {
        CertificateTempl certificateTempl = new CertificateTempl()
            .name(DEFAULT_NAME);
        return certificateTempl;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CertificateTempl createUpdatedEntity(EntityManager em) {
        CertificateTempl certificateTempl = new CertificateTempl()
            .name(UPDATED_NAME);
        return certificateTempl;
    }

    @BeforeEach
    public void initTest() {
        certificateTempl = createEntity(em);
    }

    @Test
    @Transactional
    public void createCertificateTempl() throws Exception {
        int databaseSizeBeforeCreate = certificateTemplRepository.findAll().size();

        // Create the CertificateTempl
        restCertificateTemplMockMvc.perform(post("/api/certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(certificateTempl)))
            .andExpect(status().isCreated());

        // Validate the CertificateTempl in the database
        List<CertificateTempl> certificateTemplList = certificateTemplRepository.findAll();
        assertThat(certificateTemplList).hasSize(databaseSizeBeforeCreate + 1);
        CertificateTempl testCertificateTempl = certificateTemplList.get(certificateTemplList.size() - 1);
        assertThat(testCertificateTempl.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCertificateTemplWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = certificateTemplRepository.findAll().size();

        // Create the CertificateTempl with an existing ID
        certificateTempl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCertificateTemplMockMvc.perform(post("/api/certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(certificateTempl)))
            .andExpect(status().isBadRequest());

        // Validate the CertificateTempl in the database
        List<CertificateTempl> certificateTemplList = certificateTemplRepository.findAll();
        assertThat(certificateTemplList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCertificateTempls() throws Exception {
        // Initialize the database
        certificateTemplRepository.saveAndFlush(certificateTempl);

        // Get all the certificateTemplList
        restCertificateTemplMockMvc.perform(get("/api/certificate-templs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(certificateTempl.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getCertificateTempl() throws Exception {
        // Initialize the database
        certificateTemplRepository.saveAndFlush(certificateTempl);

        // Get the certificateTempl
        restCertificateTemplMockMvc.perform(get("/api/certificate-templs/{id}", certificateTempl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(certificateTempl.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    @Transactional
    public void getNonExistingCertificateTempl() throws Exception {
        // Get the certificateTempl
        restCertificateTemplMockMvc.perform(get("/api/certificate-templs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCertificateTempl() throws Exception {
        // Initialize the database
        certificateTemplRepository.saveAndFlush(certificateTempl);

        int databaseSizeBeforeUpdate = certificateTemplRepository.findAll().size();

        // Update the certificateTempl
        CertificateTempl updatedCertificateTempl = certificateTemplRepository.findById(certificateTempl.getId()).get();
        // Disconnect from session so that the updates on updatedCertificateTempl are not directly saved in db
        em.detach(updatedCertificateTempl);
        updatedCertificateTempl
            .name(UPDATED_NAME);

        restCertificateTemplMockMvc.perform(put("/api/certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCertificateTempl)))
            .andExpect(status().isOk());

        // Validate the CertificateTempl in the database
        List<CertificateTempl> certificateTemplList = certificateTemplRepository.findAll();
        assertThat(certificateTemplList).hasSize(databaseSizeBeforeUpdate);
        CertificateTempl testCertificateTempl = certificateTemplList.get(certificateTemplList.size() - 1);
        assertThat(testCertificateTempl.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCertificateTempl() throws Exception {
        int databaseSizeBeforeUpdate = certificateTemplRepository.findAll().size();

        // Create the CertificateTempl

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCertificateTemplMockMvc.perform(put("/api/certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(certificateTempl)))
            .andExpect(status().isBadRequest());

        // Validate the CertificateTempl in the database
        List<CertificateTempl> certificateTemplList = certificateTemplRepository.findAll();
        assertThat(certificateTemplList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCertificateTempl() throws Exception {
        // Initialize the database
        certificateTemplRepository.saveAndFlush(certificateTempl);

        int databaseSizeBeforeDelete = certificateTemplRepository.findAll().size();

        // Delete the certificateTempl
        restCertificateTemplMockMvc.perform(delete("/api/certificate-templs/{id}", certificateTempl.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CertificateTempl> certificateTemplList = certificateTemplRepository.findAll();
        assertThat(certificateTemplList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
