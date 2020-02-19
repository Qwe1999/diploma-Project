package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.FieldCertificate;
import com.diploma.repository.FieldCertificateRepository;
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
 * Integration tests for the {@link FieldCertificateResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class FieldCertificateResourceIT {

    private static final String DEFAULT_NAME_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_NAME_FIELD = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    @Autowired
    private FieldCertificateRepository fieldCertificateRepository;

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

    private MockMvc restFieldCertificateMockMvc;

    private FieldCertificate fieldCertificate;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldCertificateResource fieldCertificateResource = new FieldCertificateResource(fieldCertificateRepository);
        this.restFieldCertificateMockMvc = MockMvcBuilders.standaloneSetup(fieldCertificateResource)
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
    public static FieldCertificate createEntity(EntityManager em) {
        FieldCertificate fieldCertificate = new FieldCertificate()
            .nameField(DEFAULT_NAME_FIELD)
            .value(DEFAULT_VALUE);
        return fieldCertificate;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldCertificate createUpdatedEntity(EntityManager em) {
        FieldCertificate fieldCertificate = new FieldCertificate()
            .nameField(UPDATED_NAME_FIELD)
            .value(UPDATED_VALUE);
        return fieldCertificate;
    }

    @BeforeEach
    public void initTest() {
        fieldCertificate = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldCertificate() throws Exception {
        int databaseSizeBeforeCreate = fieldCertificateRepository.findAll().size();

        // Create the FieldCertificate
        restFieldCertificateMockMvc.perform(post("/api/field-certificates")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificate)))
            .andExpect(status().isCreated());

        // Validate the FieldCertificate in the database
        List<FieldCertificate> fieldCertificateList = fieldCertificateRepository.findAll();
        assertThat(fieldCertificateList).hasSize(databaseSizeBeforeCreate + 1);
        FieldCertificate testFieldCertificate = fieldCertificateList.get(fieldCertificateList.size() - 1);
        assertThat(testFieldCertificate.getNameField()).isEqualTo(DEFAULT_NAME_FIELD);
        assertThat(testFieldCertificate.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createFieldCertificateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldCertificateRepository.findAll().size();

        // Create the FieldCertificate with an existing ID
        fieldCertificate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldCertificateMockMvc.perform(post("/api/field-certificates")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificate)))
            .andExpect(status().isBadRequest());

        // Validate the FieldCertificate in the database
        List<FieldCertificate> fieldCertificateList = fieldCertificateRepository.findAll();
        assertThat(fieldCertificateList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFieldCertificates() throws Exception {
        // Initialize the database
        fieldCertificateRepository.saveAndFlush(fieldCertificate);

        // Get all the fieldCertificateList
        restFieldCertificateMockMvc.perform(get("/api/field-certificates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldCertificate.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameField").value(hasItem(DEFAULT_NAME_FIELD)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getFieldCertificate() throws Exception {
        // Initialize the database
        fieldCertificateRepository.saveAndFlush(fieldCertificate);

        // Get the fieldCertificate
        restFieldCertificateMockMvc.perform(get("/api/field-certificates/{id}", fieldCertificate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fieldCertificate.getId().intValue()))
            .andExpect(jsonPath("$.nameField").value(DEFAULT_NAME_FIELD))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }

    @Test
    @Transactional
    public void getNonExistingFieldCertificate() throws Exception {
        // Get the fieldCertificate
        restFieldCertificateMockMvc.perform(get("/api/field-certificates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldCertificate() throws Exception {
        // Initialize the database
        fieldCertificateRepository.saveAndFlush(fieldCertificate);

        int databaseSizeBeforeUpdate = fieldCertificateRepository.findAll().size();

        // Update the fieldCertificate
        FieldCertificate updatedFieldCertificate = fieldCertificateRepository.findById(fieldCertificate.getId()).get();
        // Disconnect from session so that the updates on updatedFieldCertificate are not directly saved in db
        em.detach(updatedFieldCertificate);
        updatedFieldCertificate
            .nameField(UPDATED_NAME_FIELD)
            .value(UPDATED_VALUE);

        restFieldCertificateMockMvc.perform(put("/api/field-certificates")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldCertificate)))
            .andExpect(status().isOk());

        // Validate the FieldCertificate in the database
        List<FieldCertificate> fieldCertificateList = fieldCertificateRepository.findAll();
        assertThat(fieldCertificateList).hasSize(databaseSizeBeforeUpdate);
        FieldCertificate testFieldCertificate = fieldCertificateList.get(fieldCertificateList.size() - 1);
        assertThat(testFieldCertificate.getNameField()).isEqualTo(UPDATED_NAME_FIELD);
        assertThat(testFieldCertificate.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldCertificate() throws Exception {
        int databaseSizeBeforeUpdate = fieldCertificateRepository.findAll().size();

        // Create the FieldCertificate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldCertificateMockMvc.perform(put("/api/field-certificates")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificate)))
            .andExpect(status().isBadRequest());

        // Validate the FieldCertificate in the database
        List<FieldCertificate> fieldCertificateList = fieldCertificateRepository.findAll();
        assertThat(fieldCertificateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFieldCertificate() throws Exception {
        // Initialize the database
        fieldCertificateRepository.saveAndFlush(fieldCertificate);

        int databaseSizeBeforeDelete = fieldCertificateRepository.findAll().size();

        // Delete the fieldCertificate
        restFieldCertificateMockMvc.perform(delete("/api/field-certificates/{id}", fieldCertificate.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FieldCertificate> fieldCertificateList = fieldCertificateRepository.findAll();
        assertThat(fieldCertificateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
