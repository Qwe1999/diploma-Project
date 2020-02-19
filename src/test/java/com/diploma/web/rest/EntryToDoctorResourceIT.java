package com.diploma.web.rest;

import com.diploma.DiplomaprojectApp;
import com.diploma.domain.EntryToDoctor;
import com.diploma.repository.EntryToDoctorRepository;
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
 * Integration tests for the {@link EntryToDoctorResource} REST controller.
 */
@SpringBootTest(classes = DiplomaprojectApp.class)
public class EntryToDoctorResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EntryToDoctorRepository entryToDoctorRepository;

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

    private MockMvc restEntryToDoctorMockMvc;

    private EntryToDoctor entryToDoctor;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntryToDoctorResource entryToDoctorResource = new EntryToDoctorResource(entryToDoctorRepository);
        this.restEntryToDoctorMockMvc = MockMvcBuilders.standaloneSetup(entryToDoctorResource)
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
    public static EntryToDoctor createEntity(EntityManager em) {
        EntryToDoctor entryToDoctor = new EntryToDoctor()
            .date(DEFAULT_DATE);
        return entryToDoctor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntryToDoctor createUpdatedEntity(EntityManager em) {
        EntryToDoctor entryToDoctor = new EntryToDoctor()
            .date(UPDATED_DATE);
        return entryToDoctor;
    }

    @BeforeEach
    public void initTest() {
        entryToDoctor = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntryToDoctor() throws Exception {
        int databaseSizeBeforeCreate = entryToDoctorRepository.findAll().size();

        // Create the EntryToDoctor
        restEntryToDoctorMockMvc.perform(post("/api/entry-to-doctors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToDoctor)))
            .andExpect(status().isCreated());

        // Validate the EntryToDoctor in the database
        List<EntryToDoctor> entryToDoctorList = entryToDoctorRepository.findAll();
        assertThat(entryToDoctorList).hasSize(databaseSizeBeforeCreate + 1);
        EntryToDoctor testEntryToDoctor = entryToDoctorList.get(entryToDoctorList.size() - 1);
        assertThat(testEntryToDoctor.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createEntryToDoctorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entryToDoctorRepository.findAll().size();

        // Create the EntryToDoctor with an existing ID
        entryToDoctor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntryToDoctorMockMvc.perform(post("/api/entry-to-doctors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToDoctor)))
            .andExpect(status().isBadRequest());

        // Validate the EntryToDoctor in the database
        List<EntryToDoctor> entryToDoctorList = entryToDoctorRepository.findAll();
        assertThat(entryToDoctorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEntryToDoctors() throws Exception {
        // Initialize the database
        entryToDoctorRepository.saveAndFlush(entryToDoctor);

        // Get all the entryToDoctorList
        restEntryToDoctorMockMvc.perform(get("/api/entry-to-doctors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entryToDoctor.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getEntryToDoctor() throws Exception {
        // Initialize the database
        entryToDoctorRepository.saveAndFlush(entryToDoctor);

        // Get the entryToDoctor
        restEntryToDoctorMockMvc.perform(get("/api/entry-to-doctors/{id}", entryToDoctor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(entryToDoctor.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEntryToDoctor() throws Exception {
        // Get the entryToDoctor
        restEntryToDoctorMockMvc.perform(get("/api/entry-to-doctors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntryToDoctor() throws Exception {
        // Initialize the database
        entryToDoctorRepository.saveAndFlush(entryToDoctor);

        int databaseSizeBeforeUpdate = entryToDoctorRepository.findAll().size();

        // Update the entryToDoctor
        EntryToDoctor updatedEntryToDoctor = entryToDoctorRepository.findById(entryToDoctor.getId()).get();
        // Disconnect from session so that the updates on updatedEntryToDoctor are not directly saved in db
        em.detach(updatedEntryToDoctor);
        updatedEntryToDoctor
            .date(UPDATED_DATE);

        restEntryToDoctorMockMvc.perform(put("/api/entry-to-doctors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEntryToDoctor)))
            .andExpect(status().isOk());

        // Validate the EntryToDoctor in the database
        List<EntryToDoctor> entryToDoctorList = entryToDoctorRepository.findAll();
        assertThat(entryToDoctorList).hasSize(databaseSizeBeforeUpdate);
        EntryToDoctor testEntryToDoctor = entryToDoctorList.get(entryToDoctorList.size() - 1);
        assertThat(testEntryToDoctor.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEntryToDoctor() throws Exception {
        int databaseSizeBeforeUpdate = entryToDoctorRepository.findAll().size();

        // Create the EntryToDoctor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntryToDoctorMockMvc.perform(put("/api/entry-to-doctors")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(entryToDoctor)))
            .andExpect(status().isBadRequest());

        // Validate the EntryToDoctor in the database
        List<EntryToDoctor> entryToDoctorList = entryToDoctorRepository.findAll();
        assertThat(entryToDoctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEntryToDoctor() throws Exception {
        // Initialize the database
        entryToDoctorRepository.saveAndFlush(entryToDoctor);

        int databaseSizeBeforeDelete = entryToDoctorRepository.findAll().size();

        // Delete the entryToDoctor
        restEntryToDoctorMockMvc.perform(delete("/api/entry-to-doctors/{id}", entryToDoctor.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntryToDoctor> entryToDoctorList = entryToDoctorRepository.findAll();
        assertThat(entryToDoctorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
