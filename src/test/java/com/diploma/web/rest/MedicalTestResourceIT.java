package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.MedicalTest;
import com.diploma.repository.MedicalTestRepository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.diploma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MedicalTestResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class MedicalTestResourceIT {

    private static final String DEFAULT_INDICATOR = "AAAAAAAAAA";
    private static final String UPDATED_INDICATOR = "BBBBBBBBBB";

    private static final String DEFAULT_VALUE = "AAAAAAAAAA";
    private static final String UPDATED_VALUE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private MedicalTestRepository medicalTestRepository;

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

    private MockMvc restMedicalTestMockMvc;

    private MedicalTest medicalTest;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MedicalTestResource medicalTestResource = new MedicalTestResource(medicalTestRepository);
        this.restMedicalTestMockMvc = MockMvcBuilders.standaloneSetup(medicalTestResource)
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
    public static MedicalTest createEntity(EntityManager em) {
        MedicalTest medicalTest = new MedicalTest()
            .indicator(DEFAULT_INDICATOR)
            .value(DEFAULT_VALUE)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return medicalTest;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MedicalTest createUpdatedEntity(EntityManager em) {
        MedicalTest medicalTest = new MedicalTest()
            .indicator(UPDATED_INDICATOR)
            .value(UPDATED_VALUE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        return medicalTest;
    }

    @BeforeEach
    public void initTest() {
        medicalTest = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicalTest() throws Exception {
        int databaseSizeBeforeCreate = medicalTestRepository.findAll().size();

        // Create the MedicalTest
        restMedicalTestMockMvc.perform(post("/api/medical-tests")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalTest)))
            .andExpect(status().isCreated());

        // Validate the MedicalTest in the database
        List<MedicalTest> medicalTestList = medicalTestRepository.findAll();
        assertThat(medicalTestList).hasSize(databaseSizeBeforeCreate + 1);
        MedicalTest testMedicalTest = medicalTestList.get(medicalTestList.size() - 1);
        assertThat(testMedicalTest.getIndicator()).isEqualTo(DEFAULT_INDICATOR);
        assertThat(testMedicalTest.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testMedicalTest.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testMedicalTest.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createMedicalTestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicalTestRepository.findAll().size();

        // Create the MedicalTest with an existing ID
        medicalTest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicalTestMockMvc.perform(post("/api/medical-tests")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalTest)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalTest in the database
        List<MedicalTest> medicalTestList = medicalTestRepository.findAll();
        assertThat(medicalTestList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedicalTests() throws Exception {
        // Initialize the database
        medicalTestRepository.saveAndFlush(medicalTest);

        // Get all the medicalTestList
        restMedicalTestMockMvc.perform(get("/api/medical-tests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicalTest.getId().intValue())))
            .andExpect(jsonPath("$.[*].indicator").value(hasItem(DEFAULT_INDICATOR)))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getMedicalTest() throws Exception {
        // Initialize the database
        medicalTestRepository.saveAndFlush(medicalTest);

        // Get the medicalTest
        restMedicalTestMockMvc.perform(get("/api/medical-tests/{id}", medicalTest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicalTest.getId().intValue()))
            .andExpect(jsonPath("$.indicator").value(DEFAULT_INDICATOR))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingMedicalTest() throws Exception {
        // Get the medicalTest
        restMedicalTestMockMvc.perform(get("/api/medical-tests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicalTest() throws Exception {
        // Initialize the database
        medicalTestRepository.saveAndFlush(medicalTest);

        int databaseSizeBeforeUpdate = medicalTestRepository.findAll().size();

        // Update the medicalTest
        MedicalTest updatedMedicalTest = medicalTestRepository.findById(medicalTest.getId()).get();
        // Disconnect from session so that the updates on updatedMedicalTest are not directly saved in db
        em.detach(updatedMedicalTest);
        updatedMedicalTest
            .indicator(UPDATED_INDICATOR)
            .value(UPDATED_VALUE)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restMedicalTestMockMvc.perform(put("/api/medical-tests")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicalTest)))
            .andExpect(status().isOk());

        // Validate the MedicalTest in the database
        List<MedicalTest> medicalTestList = medicalTestRepository.findAll();
        assertThat(medicalTestList).hasSize(databaseSizeBeforeUpdate);
        MedicalTest testMedicalTest = medicalTestList.get(medicalTestList.size() - 1);
        assertThat(testMedicalTest.getIndicator()).isEqualTo(UPDATED_INDICATOR);
        assertThat(testMedicalTest.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testMedicalTest.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testMedicalTest.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicalTest() throws Exception {
        int databaseSizeBeforeUpdate = medicalTestRepository.findAll().size();

        // Create the MedicalTest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicalTestMockMvc.perform(put("/api/medical-tests")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicalTest)))
            .andExpect(status().isBadRequest());

        // Validate the MedicalTest in the database
        List<MedicalTest> medicalTestList = medicalTestRepository.findAll();
        assertThat(medicalTestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicalTest() throws Exception {
        // Initialize the database
        medicalTestRepository.saveAndFlush(medicalTest);

        int databaseSizeBeforeDelete = medicalTestRepository.findAll().size();

        // Delete the medicalTest
        restMedicalTestMockMvc.perform(delete("/api/medical-tests/{id}", medicalTest.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MedicalTest> medicalTestList = medicalTestRepository.findAll();
        assertThat(medicalTestList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
