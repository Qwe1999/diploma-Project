package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.EntryToHistoryDisease;
import com.diploma.repository.EntryToHistoryDiseaseRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.diploma.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EntryToHistoryDiseaseResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class EntryToHistoryDiseaseResourceIT {

    private static final String DEFAULT_DISEASE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DISEASE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DISEASE_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DISEASE_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_TREATMENT = "AAAAAAAAAA";
    private static final String UPDATED_TREATMENT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EntryToHistoryDiseaseRepository entryToHistoryDiseaseRepository;

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

    private MockMvc restEntryToHistoryDiseaseMockMvc;

    private EntryToHistoryDisease entryToHistoryDisease;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntryToHistoryDiseaseResource entryToHistoryDiseaseResource = new EntryToHistoryDiseaseResource(entryToHistoryDiseaseRepository);
        this.restEntryToHistoryDiseaseMockMvc = MockMvcBuilders.standaloneSetup(entryToHistoryDiseaseResource)
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
    public static EntryToHistoryDisease createEntity(EntityManager em) {
        EntryToHistoryDisease entryToHistoryDisease = new EntryToHistoryDisease()
            .diseaseName(DEFAULT_DISEASE_NAME)
            .diseaseDescription(DEFAULT_DISEASE_DESCRIPTION)
            .treatment(DEFAULT_TREATMENT)
            .date(DEFAULT_DATE);
        return entryToHistoryDisease;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntryToHistoryDisease createUpdatedEntity(EntityManager em) {
        EntryToHistoryDisease entryToHistoryDisease = new EntryToHistoryDisease()
            .diseaseName(UPDATED_DISEASE_NAME)
            .diseaseDescription(UPDATED_DISEASE_DESCRIPTION)
            .treatment(UPDATED_TREATMENT)
            .date(UPDATED_DATE);
        return entryToHistoryDisease;
    }

    @BeforeEach
    public void initTest() {
        entryToHistoryDisease = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntryToHistoryDisease() throws Exception {
        int databaseSizeBeforeCreate = entryToHistoryDiseaseRepository.findAll().size();

        // Create the EntryToHistoryDisease
        restEntryToHistoryDiseaseMockMvc.perform(post("/api/entry-to-history-diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToHistoryDisease)))
            .andExpect(status().isCreated());

        // Validate the EntryToHistoryDisease in the database
        List<EntryToHistoryDisease> entryToHistoryDiseaseList = entryToHistoryDiseaseRepository.findAll();
        assertThat(entryToHistoryDiseaseList).hasSize(databaseSizeBeforeCreate + 1);
        EntryToHistoryDisease testEntryToHistoryDisease = entryToHistoryDiseaseList.get(entryToHistoryDiseaseList.size() - 1);
        assertThat(testEntryToHistoryDisease.getDiseaseName()).isEqualTo(DEFAULT_DISEASE_NAME);
        assertThat(testEntryToHistoryDisease.getDiseaseDescription()).isEqualTo(DEFAULT_DISEASE_DESCRIPTION);
        assertThat(testEntryToHistoryDisease.getTreatment()).isEqualTo(DEFAULT_TREATMENT);
        assertThat(testEntryToHistoryDisease.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createEntryToHistoryDiseaseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entryToHistoryDiseaseRepository.findAll().size();

        // Create the EntryToHistoryDisease with an existing ID
        entryToHistoryDisease.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntryToHistoryDiseaseMockMvc.perform(post("/api/entry-to-history-diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToHistoryDisease)))
            .andExpect(status().isBadRequest());

        // Validate the EntryToHistoryDisease in the database
        List<EntryToHistoryDisease> entryToHistoryDiseaseList = entryToHistoryDiseaseRepository.findAll();
        assertThat(entryToHistoryDiseaseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEntryToHistoryDiseases() throws Exception {
        // Initialize the database
        entryToHistoryDiseaseRepository.saveAndFlush(entryToHistoryDisease);

        // Get all the entryToHistoryDiseaseList
        restEntryToHistoryDiseaseMockMvc.perform(get("/api/entry-to-history-diseases?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entryToHistoryDisease.getId().intValue())))
            .andExpect(jsonPath("$.[*].diseaseName").value(hasItem(DEFAULT_DISEASE_NAME)))
            .andExpect(jsonPath("$.[*].diseaseDescription").value(hasItem(DEFAULT_DISEASE_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].treatment").value(hasItem(DEFAULT_TREATMENT)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEntryToHistoryDisease() throws Exception {
        // Initialize the database
        entryToHistoryDiseaseRepository.saveAndFlush(entryToHistoryDisease);

        // Get the entryToHistoryDisease
        restEntryToHistoryDiseaseMockMvc.perform(get("/api/entry-to-history-diseases/{id}", entryToHistoryDisease.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entryToHistoryDisease.getId().intValue()))
            .andExpect(jsonPath("$.diseaseName").value(DEFAULT_DISEASE_NAME))
            .andExpect(jsonPath("$.diseaseDescription").value(DEFAULT_DISEASE_DESCRIPTION))
            .andExpect(jsonPath("$.treatment").value(DEFAULT_TREATMENT))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntryToHistoryDisease() throws Exception {
        // Get the entryToHistoryDisease
        restEntryToHistoryDiseaseMockMvc.perform(get("/api/entry-to-history-diseases/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntryToHistoryDisease() throws Exception {
        // Initialize the database
        entryToHistoryDiseaseRepository.saveAndFlush(entryToHistoryDisease);

        int databaseSizeBeforeUpdate = entryToHistoryDiseaseRepository.findAll().size();

        // Update the entryToHistoryDisease
        EntryToHistoryDisease updatedEntryToHistoryDisease = entryToHistoryDiseaseRepository.findById(entryToHistoryDisease.getId()).get();
        // Disconnect from session so that the updates on updatedEntryToHistoryDisease are not directly saved in db
        em.detach(updatedEntryToHistoryDisease);
        updatedEntryToHistoryDisease
            .diseaseName(UPDATED_DISEASE_NAME)
            .diseaseDescription(UPDATED_DISEASE_DESCRIPTION)
            .treatment(UPDATED_TREATMENT)
            .date(UPDATED_DATE);

        restEntryToHistoryDiseaseMockMvc.perform(put("/api/entry-to-history-diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntryToHistoryDisease)))
            .andExpect(status().isOk());

        // Validate the EntryToHistoryDisease in the database
        List<EntryToHistoryDisease> entryToHistoryDiseaseList = entryToHistoryDiseaseRepository.findAll();
        assertThat(entryToHistoryDiseaseList).hasSize(databaseSizeBeforeUpdate);
        EntryToHistoryDisease testEntryToHistoryDisease = entryToHistoryDiseaseList.get(entryToHistoryDiseaseList.size() - 1);
        assertThat(testEntryToHistoryDisease.getDiseaseName()).isEqualTo(UPDATED_DISEASE_NAME);
        assertThat(testEntryToHistoryDisease.getDiseaseDescription()).isEqualTo(UPDATED_DISEASE_DESCRIPTION);
        assertThat(testEntryToHistoryDisease.getTreatment()).isEqualTo(UPDATED_TREATMENT);
        assertThat(testEntryToHistoryDisease.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEntryToHistoryDisease() throws Exception {
        int databaseSizeBeforeUpdate = entryToHistoryDiseaseRepository.findAll().size();

        // Create the EntryToHistoryDisease

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntryToHistoryDiseaseMockMvc.perform(put("/api/entry-to-history-diseases")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToHistoryDisease)))
            .andExpect(status().isBadRequest());

        // Validate the EntryToHistoryDisease in the database
        List<EntryToHistoryDisease> entryToHistoryDiseaseList = entryToHistoryDiseaseRepository.findAll();
        assertThat(entryToHistoryDiseaseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntryToHistoryDisease() throws Exception {
        // Initialize the database
        entryToHistoryDiseaseRepository.saveAndFlush(entryToHistoryDisease);

        int databaseSizeBeforeDelete = entryToHistoryDiseaseRepository.findAll().size();

        // Delete the entryToHistoryDisease
        restEntryToHistoryDiseaseMockMvc.perform(delete("/api/entry-to-history-diseases/{id}", entryToHistoryDisease.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntryToHistoryDisease> entryToHistoryDiseaseList = entryToHistoryDiseaseRepository.findAll();
        assertThat(entryToHistoryDiseaseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
