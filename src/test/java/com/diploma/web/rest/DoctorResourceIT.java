//package com.diploma.web.rest;
//
//import com.diploma.DiplomaprojectApp;
//import com.diploma.domain.Doctor;
//import com.diploma.repository.DoctorRepository;
//import com.diploma.web.rest.errors.ExceptionTranslator;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.MockitoAnnotations;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//import org.springframework.validation.Validator;
//
//import javax.persistence.EntityManager;
//import java.time.LocalDate;
//import java.time.ZoneId;
//import java.util.ArrayList;
//import java.util.List;
//
//import static com.diploma.web.rest.TestUtil.createFormattingConversionService;
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.hamcrest.Matchers.hasItem;
//import static org.mockito.Mockito.*;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import com.diploma.domain.enumeration.Day;
///**
// * Integration tests for the {@link DoctorResource} REST controller.
// */
//@SpringBootTest(classes = DiplomaprojectApp.class)
//public class DoctorResourceIT {
//
//    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
//    private static final String UPDATED_POSITION = "BBBBBBBBBB";
//
//    private static final String DEFAULT_ROOM = "AAAAAAAAAA";
//    private static final String UPDATED_ROOM = "BBBBBBBBBB";
//
//    private static final LocalDate DEFAULT_WORKING_HOUR_BEGIN = LocalDate.ofEpochDay(0L);
//    private static final LocalDate UPDATED_WORKING_HOUR_BEGIN = LocalDate.now(ZoneId.systemDefault());
//
//    private static final LocalDate DEFAULT_WORKING_HOUR_END = LocalDate.ofEpochDay(0L);
//    private static final LocalDate UPDATED_WORKING_HOUR_END = LocalDate.now(ZoneId.systemDefault());
//
//    private static final Day DEFAULT_DAYS_WORK = Day.MONDAY;
//    private static final Day UPDATED_DAYS_WORK = Day.TUESDAY;
//
//    @Autowired
//    private DoctorRepository doctorRepository;
//
//    @Mock
//    private DoctorRepository doctorRepositoryMock;
//
//    @Autowired
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Autowired
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Autowired
//    private ExceptionTranslator exceptionTranslator;
//
//    @Autowired
//    private EntityManager em;
//
//    @Autowired
//    private Validator validator;
//
//    private MockMvc restDoctorMockMvc;
//
//    private Doctor doctor;
//
//    @BeforeEach
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        final DoctorResource doctorResource = new DoctorResource(doctorRepository);
//        this.restDoctorMockMvc = MockMvcBuilders.standaloneSetup(doctorResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter)
//            .setValidator(validator).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Doctor createEntity(EntityManager em) {
//        Doctor doctor = new Doctor()
//            .position(DEFAULT_POSITION)
//            .room(DEFAULT_ROOM)
//            .workingHourBegin(DEFAULT_WORKING_HOUR_BEGIN)
//            .workingHourEnd(DEFAULT_WORKING_HOUR_END)
//            .daysWork(DEFAULT_DAYS_WORK);
//        return doctor;
//    }
//    /**
//     * Create an updated entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Doctor createUpdatedEntity(EntityManager em) {
//        Doctor doctor = new Doctor()
//            .position(UPDATED_POSITION)
//            .room(UPDATED_ROOM)
//            .workingHourBegin(UPDATED_WORKING_HOUR_BEGIN)
//            .workingHourEnd(UPDATED_WORKING_HOUR_END)
//            .daysWork(UPDATED_DAYS_WORK);
//        return doctor;
//    }
//
//    @BeforeEach
//    public void initTest() {
//        doctor = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createDoctor() throws Exception {
//        int databaseSizeBeforeCreate = doctorRepository.findAll().size();
//
//        // Create the Doctor
//        restDoctorMockMvc.perform(post("/api/doctors")
//            .contentType(TestUtil.APPLICATION_JSON)
//            .content(TestUtil.convertObjectToJsonBytes(doctor)))
//            .andExpect(status().isCreated());
//
//        // Validate the Doctor in the database
//        List<Doctor> doctorList = doctorRepository.findAll();
//        assertThat(doctorList).hasSize(databaseSizeBeforeCreate + 1);
//        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
//        assertThat(testDoctor.getPosition()).isEqualTo(DEFAULT_POSITION);
//        assertThat(testDoctor.getRoom()).isEqualTo(DEFAULT_ROOM);
//        assertThat(testDoctor.getWorkingHourBegin()).isEqualTo(DEFAULT_WORKING_HOUR_BEGIN);
//        assertThat(testDoctor.getWorkingHourEnd()).isEqualTo(DEFAULT_WORKING_HOUR_END);
//        assertThat(testDoctor.getDaysWork()).isEqualTo(DEFAULT_DAYS_WORK);
//    }
//
//    @Test
//    @Transactional
//    public void createDoctorWithExistingId() throws Exception {
//        int databaseSizeBeforeCreate = doctorRepository.findAll().size();
//
//        // Create the Doctor with an existing ID
//        doctor.setId(1L);
//
//        // An entity with an existing ID cannot be created, so this API call must fail
//        restDoctorMockMvc.perform(post("/api/doctors")
//            .contentType(TestUtil.APPLICATION_JSON)
//            .content(TestUtil.convertObjectToJsonBytes(doctor)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Doctor in the database
//        List<Doctor> doctorList = doctorRepository.findAll();
//        assertThat(doctorList).hasSize(databaseSizeBeforeCreate);
//    }
//
//
//    @Test
//    @Transactional
//    public void getAllDoctors() throws Exception {
//        // Initialize the database
//        doctorRepository.saveAndFlush(doctor);
//
//        // Get all the doctorList
//        restDoctorMockMvc.perform(get("/api/doctors?sort=id,desc"))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
//            .andExpect(jsonPath("$.[*].id").value(hasItem(doctor.getId().intValue())))
//            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
//            .andExpect(jsonPath("$.[*].room").value(hasItem(DEFAULT_ROOM)))
//            .andExpect(jsonPath("$.[*].workingHourBegin").value(hasItem(DEFAULT_WORKING_HOUR_BEGIN.toString())))
//            .andExpect(jsonPath("$.[*].workingHourEnd").value(hasItem(DEFAULT_WORKING_HOUR_END.toString())))
//            .andExpect(jsonPath("$.[*].daysWork").value(hasItem(DEFAULT_DAYS_WORK.toString())));
//    }
//
//    @SuppressWarnings({"unchecked"})
//    public void getAllDoctorsWithEagerRelationshipsIsEnabled() throws Exception {
//        DoctorResource doctorResource = new DoctorResource(doctorRepositoryMock);
//        when(doctorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
//
//        MockMvc restDoctorMockMvc = MockMvcBuilders.standaloneSetup(doctorResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter).build();
//
//        restDoctorMockMvc.perform(get("/api/doctors?eagerload=true"))
//        .andExpect(status().isOk());
//
//        verify(doctorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
//    }
//
//    @SuppressWarnings({"unchecked"})
//    public void getAllDoctorsWithEagerRelationshipsIsNotEnabled() throws Exception {
//        DoctorResource doctorResource = new DoctorResource(doctorRepositoryMock);
//            when(doctorRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
//            MockMvc restDoctorMockMvc = MockMvcBuilders.standaloneSetup(doctorResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setControllerAdvice(exceptionTranslator)
//            .setConversionService(createFormattingConversionService())
//            .setMessageConverters(jacksonMessageConverter).build();
//
//        restDoctorMockMvc.perform(get("/api/doctors?eagerload=true"))
//        .andExpect(status().isOk());
//
//            verify(doctorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
//    }
//
//    @Test
//    @Transactional
//    public void getDoctor() throws Exception {
//        // Initialize the database
//        doctorRepository.saveAndFlush(doctor);
//
//        // Get the doctor
//        restDoctorMockMvc.perform(get("/api/doctors/{id}", doctor.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
//            .andExpect(jsonPath("$.id").value(doctor.getId().intValue()))
//            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
//            .andExpect(jsonPath("$.room").value(DEFAULT_ROOM))
//            .andExpect(jsonPath("$.workingHourBegin").value(DEFAULT_WORKING_HOUR_BEGIN.toString()))
//            .andExpect(jsonPath("$.workingHourEnd").value(DEFAULT_WORKING_HOUR_END.toString()))
//            .andExpect(jsonPath("$.daysWork").value(DEFAULT_DAYS_WORK.toString()));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingDoctor() throws Exception {
//        // Get the doctor
//        restDoctorMockMvc.perform(get("/api/doctors/{id}", Long.MAX_VALUE))
//            .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updateDoctor() throws Exception {
//        // Initialize the database
//        doctorRepository.saveAndFlush(doctor);
//
//        int databaseSizeBeforeUpdate = doctorRepository.findAll().size();
//
//        // Update the doctor
//        Doctor updatedDoctor = doctorRepository.findById(doctor.getId()).get();
//        // Disconnect from session so that the updates on updatedDoctor are not directly saved in db
//        em.detach(updatedDoctor);
//        updatedDoctor
//            .position(UPDATED_POSITION)
//            .room(UPDATED_ROOM)
//            .workingHourBegin(UPDATED_WORKING_HOUR_BEGIN)
//            .workingHourEnd(UPDATED_WORKING_HOUR_END)
//            .daysWork(UPDATED_DAYS_WORK);
//
//        restDoctorMockMvc.perform(put("/api/doctors")
//            .contentType(TestUtil.APPLICATION_JSON)
//            .content(TestUtil.convertObjectToJsonBytes(updatedDoctor)))
//            .andExpect(status().isOk());
//
//        // Validate the Doctor in the database
//        List<Doctor> doctorList = doctorRepository.findAll();
//        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
//        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
//        assertThat(testDoctor.getPosition()).isEqualTo(UPDATED_POSITION);
//        assertThat(testDoctor.getRoom()).isEqualTo(UPDATED_ROOM);
//        assertThat(testDoctor.getWorkingHourBegin()).isEqualTo(UPDATED_WORKING_HOUR_BEGIN);
//        assertThat(testDoctor.getWorkingHourEnd()).isEqualTo(UPDATED_WORKING_HOUR_END);
//        assertThat(testDoctor.getDaysWork()).isEqualTo(UPDATED_DAYS_WORK);
//    }
//
//    @Test
//    @Transactional
//    public void updateNonExistingDoctor() throws Exception {
//        int databaseSizeBeforeUpdate = doctorRepository.findAll().size();
//
//        // Create the Doctor
//
//        // If the entity doesn't have an ID, it will throw BadRequestAlertException
//        restDoctorMockMvc.perform(put("/api/doctors")
//            .contentType(TestUtil.APPLICATION_JSON)
//            .content(TestUtil.convertObjectToJsonBytes(doctor)))
//            .andExpect(status().isBadRequest());
//
//        // Validate the Doctor in the database
//        List<Doctor> doctorList = doctorRepository.findAll();
//        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
//    }
//
//    @Test
//    @Transactional
//    public void deleteDoctor() throws Exception {
//        // Initialize the database
//        doctorRepository.saveAndFlush(doctor);
//
//        int databaseSizeBeforeDelete = doctorRepository.findAll().size();
//
//        // Delete the doctor
//        restDoctorMockMvc.perform(delete("/api/doctors/{id}", doctor.getId())
//            .accept(TestUtil.APPLICATION_JSON))
//            .andExpect(status().isNoContent());
//
//        // Validate the database contains one less item
//        List<Doctor> doctorList = doctorRepository.findAll();
//        assertThat(doctorList).hasSize(databaseSizeBeforeDelete - 1);
//    }
//}
