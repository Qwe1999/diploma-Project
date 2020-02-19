package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.Disease;
import com.diploma.repository.DiseaseRepository;
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
 * Integration tests for the {@link DiseaseResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class DiseaseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DiseaseRepository diseaseRepository;

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

    private MockMvc restDiseaseMockMvc;

    private Disease disease;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiseaseResource diseaseResource = new DiseaseResource(diseaseRepository);
        this.restDiseaseMockMvc = MockMvcBuilders.standaloneSetup(diseaseResource)
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
    public static Disease createEntity(EntityManager em) {
        Disease disease = new Disease()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return disease;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Disease createUpdatedEntity(EntityManager em) {
        Disease disease = new Disease()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return disease;
    }

    @BeforeEach
    public void initTest() {
        disease = createEntity(em);
    }

    @Test
    @Transactional
    public void createDisease() throws Exception {
        int databaseSizeBeforeCreate = diseaseRepository.findAll().size();

        // Create the Disease
        restDiseaseMockMvc.perform(post("/api/diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(disease)))
            .andExpect(status().isCreated());

        // Validate the Disease in the database
        List<Disease> diseaseList = diseaseRepository.findAll();
        assertThat(diseaseList).hasSize(databaseSizeBeforeCreate + 1);
        Disease testDisease = diseaseList.get(diseaseList.size() - 1);
        assertThat(testDisease.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDisease.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDiseaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diseaseRepository.findAll().size();

        // Create the Disease with an existing ID
        disease.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiseaseMockMvc.perform(post("/api/diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(disease)))
            .andExpect(status().isBadRequest());

        // Validate the Disease in the database
        List<Disease> diseaseList = diseaseRepository.findAll();
        assertThat(diseaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiseases() throws Exception {
        // Initialize the database
        diseaseRepository.saveAndFlush(disease);

        // Get all the diseaseList
        restDiseaseMockMvc.perform(get("/api/diseases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(disease.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getDisease() throws Exception {
        // Initialize the database
        diseaseRepository.saveAndFlush(disease);

        // Get the disease
        restDiseaseMockMvc.perform(get("/api/diseases/{id}", disease.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(disease.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }

    @Test
    @Transactional
    public void getNonExistingDisease() throws Exception {
        // Get the disease
        restDiseaseMockMvc.perform(get("/api/diseases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDisease() throws Exception {
        // Initialize the database
        diseaseRepository.saveAndFlush(disease);

        int databaseSizeBeforeUpdate = diseaseRepository.findAll().size();

        // Update the disease
        Disease updatedDisease = diseaseRepository.findById(disease.getId()).get();
        // Disconnect from session so that the updates on updatedDisease are not directly saved in db
        em.detach(updatedDisease);
        updatedDisease
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restDiseaseMockMvc.perform(put("/api/diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDisease)))
            .andExpect(status().isOk());

        // Validate the Disease in the database
        List<Disease> diseaseList = diseaseRepository.findAll();
        assertThat(diseaseList).hasSize(databaseSizeBeforeUpdate);
        Disease testDisease = diseaseList.get(diseaseList.size() - 1);
        assertThat(testDisease.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDisease.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDisease() throws Exception {
        int databaseSizeBeforeUpdate = diseaseRepository.findAll().size();

        // Create the Disease

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiseaseMockMvc.perform(put("/api/diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(disease)))
            .andExpect(status().isBadRequest());

        // Validate the Disease in the database
        List<Disease> diseaseList = diseaseRepository.findAll();
        assertThat(diseaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDisease() throws Exception {
        // Initialize the database
        diseaseRepository.saveAndFlush(disease);

        int databaseSizeBeforeDelete = diseaseRepository.findAll().size();

        // Delete the disease
        restDiseaseMockMvc.perform(delete("/api/diseases/{id}", disease.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Disease> diseaseList = diseaseRepository.findAll();
        assertThat(diseaseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
