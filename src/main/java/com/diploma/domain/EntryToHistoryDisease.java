package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A EntryToHistoryDisease.
 */
@Entity
@Table(name = "entry_to_history_disease")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EntryToHistoryDisease implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "disease_name")
    private String diseaseName;

    @Column(name = "disease_description")
    private String diseaseDescription;

    @Column(name = "treatment")
    private String treatment;

    @Column(name = "date")
    private LocalDate date;

    @OneToMany(mappedBy = "entryToHistoryDisease")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MedicalTest> medicalTests = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties("entryToHistoryDiseases")
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiseaseName() {
        return diseaseName;
    }

    public EntryToHistoryDisease diseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
        return this;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public String getDiseaseDescription() {
        return diseaseDescription;
    }

    public EntryToHistoryDisease diseaseDescription(String diseaseDescription) {
        this.diseaseDescription = diseaseDescription;
        return this;
    }

    public void setDiseaseDescription(String diseaseDescription) {
        this.diseaseDescription = diseaseDescription;
    }

    public String getTreatment() {
        return treatment;
    }

    public EntryToHistoryDisease treatment(String treatment) {
        this.treatment = treatment;
        return this;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public LocalDate getDate() {
        return date;
    }

    public EntryToHistoryDisease date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<MedicalTest> getMedicalTests() {
        return medicalTests;
    }

    public EntryToHistoryDisease medicalTests(Set<MedicalTest> medicalTests) {
        this.medicalTests = medicalTests;
        return this;
    }

    public EntryToHistoryDisease addMedicalTest(MedicalTest medicalTest) {
        this.medicalTests.add(medicalTest);
        medicalTest.setEntryToHistoryDisease(this);
        return this;
    }

    public EntryToHistoryDisease removeMedicalTest(MedicalTest medicalTest) {
        this.medicalTests.remove(medicalTest);
        medicalTest.setEntryToHistoryDisease(null);
        return this;
    }

    public void setMedicalTests(Set<MedicalTest> medicalTests) {
        this.medicalTests = medicalTests;
    }

    public Patient getPatient() {
        return patient;
    }

    public EntryToHistoryDisease patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntryToHistoryDisease)) {
            return false;
        }
        return id != null && id.equals(((EntryToHistoryDisease) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EntryToHistoryDisease{" +
            "id=" + getId() +
            ", diseaseName='" + getDiseaseName() + "'" +
            ", diseaseDescription='" + getDiseaseDescription() + "'" +
            ", treatment='" + getTreatment() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
