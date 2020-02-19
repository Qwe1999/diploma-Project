package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.FieldCertificateTempl;
import com.diploma.repository.FieldCertificateTemplRepository;
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
 * Integration tests for the {@link FieldCertificateTemplResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class FieldCertificateTemplResourceIT {

    private static final String DEFAULT_NAME_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_NAME_FIELD = "BBBBBBBBBB";

    @Autowired
    private FieldCertificateTemplRepository fieldCertificateTemplRepository;

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

    private MockMvc restFieldCertificateTemplMockMvc;

    private FieldCertificateTempl fieldCertificateTempl;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldCertificateTemplResource fieldCertificateTemplResource = new FieldCertificateTemplResource(fieldCertificateTemplRepository);
        this.restFieldCertificateTemplMockMvc = MockMvcBuilders.standaloneSetup(fieldCertificateTemplResource)
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
    public static FieldCertificateTempl createEntity(EntityManager em) {
        FieldCertificateTempl fieldCertificateTempl = new FieldCertificateTempl()
            .nameField(DEFAULT_NAME_FIELD);
        return fieldCertificateTempl;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FieldCertificateTempl createUpdatedEntity(EntityManager em) {
        FieldCertificateTempl fieldCertificateTempl = new FieldCertificateTempl()
            .nameField(UPDATED_NAME_FIELD);
        return fieldCertificateTempl;
    }

    @BeforeEach
    public void initTest() {
        fieldCertificateTempl = createEntity(em);
    }

    @Test
    @Transactional
    public void createFieldCertificateTempl() throws Exception {
        int databaseSizeBeforeCreate = fieldCertificateTemplRepository.findAll().size();

        // Create the FieldCertificateTempl
        restFieldCertificateTemplMockMvc.perform(post("/api/field-certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificateTempl)))
            .andExpect(status().isCreated());

        // Validate the FieldCertificateTempl in the database
        List<FieldCertificateTempl> fieldCertificateTemplList = fieldCertificateTemplRepository.findAll();
        assertThat(fieldCertificateTemplList).hasSize(databaseSizeBeforeCreate + 1);
        FieldCertificateTempl testFieldCertificateTempl = fieldCertificateTemplList.get(fieldCertificateTemplList.size() - 1);
        assertThat(testFieldCertificateTempl.getNameField()).isEqualTo(DEFAULT_NAME_FIELD);
    }

    @Test
    @Transactional
    public void createFieldCertificateTemplWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldCertificateTemplRepository.findAll().size();

        // Create the FieldCertificateTempl with an existing ID
        fieldCertificateTempl.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldCertificateTemplMockMvc.perform(post("/api/field-certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificateTempl)))
            .andExpect(status().isBadRequest());

        // Validate the FieldCertificateTempl in the database
        List<FieldCertificateTempl> fieldCertificateTemplList = fieldCertificateTemplRepository.findAll();
        assertThat(fieldCertificateTemplList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFieldCertificateTempls() throws Exception {
        // Initialize the database
        fieldCertificateTemplRepository.saveAndFlush(fieldCertificateTempl);

        // Get all the fieldCertificateTemplList
        restFieldCertificateTemplMockMvc.perform(get("/api/field-certificate-templs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fieldCertificateTempl.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameField").value(hasItem(DEFAULT_NAME_FIELD)));
    }
    
    @Test
    @Transactional
    public void getFieldCertificateTempl() throws Exception {
        // Initialize the database
        fieldCertificateTemplRepository.saveAndFlush(fieldCertificateTempl);

        // Get the fieldCertificateTempl
        restFieldCertificateTemplMockMvc.perform(get("/api/field-certificate-templs/{id}", fieldCertificateTempl.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fieldCertificateTempl.getId().intValue()))
            .andExpect(jsonPath("$.nameField").value(DEFAULT_NAME_FIELD));
    }

    @Test
    @Transactional
    public void getNonExistingFieldCertificateTempl() throws Exception {
        // Get the fieldCertificateTempl
        restFieldCertificateTemplMockMvc.perform(get("/api/field-certificate-templs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFieldCertificateTempl() throws Exception {
        // Initialize the database
        fieldCertificateTemplRepository.saveAndFlush(fieldCertificateTempl);

        int databaseSizeBeforeUpdate = fieldCertificateTemplRepository.findAll().size();

        // Update the fieldCertificateTempl
        FieldCertificateTempl updatedFieldCertificateTempl = fieldCertificateTemplRepository.findById(fieldCertificateTempl.getId()).get();
        // Disconnect from session so that the updates on updatedFieldCertificateTempl are not directly saved in db
        em.detach(updatedFieldCertificateTempl);
        updatedFieldCertificateTempl
            .nameField(UPDATED_NAME_FIELD);

        restFieldCertificateTemplMockMvc.perform(put("/api/field-certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFieldCertificateTempl)))
            .andExpect(status().isOk());

        // Validate the FieldCertificateTempl in the database
        List<FieldCertificateTempl> fieldCertificateTemplList = fieldCertificateTemplRepository.findAll();
        assertThat(fieldCertificateTemplList).hasSize(databaseSizeBeforeUpdate);
        FieldCertificateTempl testFieldCertificateTempl = fieldCertificateTemplList.get(fieldCertificateTemplList.size() - 1);
        assertThat(testFieldCertificateTempl.getNameField()).isEqualTo(UPDATED_NAME_FIELD);
    }

    @Test
    @Transactional
    public void updateNonExistingFieldCertificateTempl() throws Exception {
        int databaseSizeBeforeUpdate = fieldCertificateTemplRepository.findAll().size();

        // Create the FieldCertificateTempl

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFieldCertificateTemplMockMvc.perform(put("/api/field-certificate-templs")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fieldCertificateTempl)))
            .andExpect(status().isBadRequest());

        // Validate the FieldCertificateTempl in the database
        List<FieldCertificateTempl> fieldCertificateTemplList = fieldCertificateTemplRepository.findAll();
        assertThat(fieldCertificateTemplList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFieldCertificateTempl() throws Exception {
        // Initialize the database
        fieldCertificateTemplRepository.saveAndFlush(fieldCertificateTempl);

        int databaseSizeBeforeDelete = fieldCertificateTemplRepository.findAll().size();

        // Delete the fieldCertificateTempl
        restFieldCertificateTemplMockMvc.perform(delete("/api/field-certificate-templs/{id}", fieldCertificateTempl.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FieldCertificateTempl> fieldCertificateTemplList = fieldCertificateTemplRepository.findAll();
        assertThat(fieldCertificateTemplList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
