package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.diploma.domain.enumeration.BloodType;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "allergy")
    private String allergy;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_type")
    private BloodType bloodType;

    @Column(name = "job")
    private String job;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EntryToHistoryDisease> entryToHistoryDiseases = new HashSet<>();

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Certificate> certificates = new HashSet<>();

    @OneToOne(mappedBy = "patient")
    @JsonIgnore
    private EntryToDoctor entryToDoctor;

    @ManyToMany(mappedBy = "patients")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Doctor> doctors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAllergy() {
        return allergy;
    }

    public Patient allergy(String allergy) {
        this.allergy = allergy;
        return this;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public BloodType getBloodType() {
        return bloodType;
    }

    public Patient bloodType(BloodType bloodType) {
        this.bloodType = bloodType;
        return this;
    }

    public void setBloodType(BloodType bloodType) {
        this.bloodType = bloodType;
    }

    public String getJob() {
        return job;
    }

    public Patient job(String job) {
        this.job = job;
        return this;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Person getPerson() {
        return person;
    }

    public Patient person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<EntryToHistoryDisease> getEntryToHistoryDiseases() {
        return entryToHistoryDiseases;
    }

    public Patient entryToHistoryDiseases(Set<EntryToHistoryDisease> entryToHistoryDiseases) {
        this.entryToHistoryDiseases = entryToHistoryDiseases;
        return this;
    }

    public Patient addEntryToHistoryDisease(EntryToHistoryDisease entryToHistoryDisease) {
        this.entryToHistoryDiseases.add(entryToHistoryDisease);
        entryToHistoryDisease.setPatient(this);
        return this;
    }

    public Patient removeEntryToHistoryDisease(EntryToHistoryDisease entryToHistoryDisease) {
        this.entryToHistoryDiseases.remove(entryToHistoryDisease);
        entryToHistoryDisease.setPatient(null);
        return this;
    }

    public void setEntryToHistoryDiseases(Set<EntryToHistoryDisease> entryToHistoryDiseases) {
        this.entryToHistoryDiseases = entryToHistoryDiseases;
    }

    public Set<Certificate> getCertificates() {
        return certificates;
    }

    public Patient certificates(Set<Certificate> certificates) {
        this.certificates = certificates;
        return this;
    }

    public Patient addCertificate(Certificate certificate) {
        this.certificates.add(certificate);
        certificate.setPatient(this);
        return this;
    }

    public Patient removeCertificate(Certificate certificate) {
        this.certificates.remove(certificate);
        certificate.setPatient(null);
        return this;
    }

    public void setCertificates(Set<Certificate> certificates) {
        this.certificates = certificates;
    }

    public EntryToDoctor getEntryToDoctor() {
        return entryToDoctor;
    }

    public Patient entryToDoctor(EntryToDoctor entryToDoctor) {
        this.entryToDoctor = entryToDoctor;
        return this;
    }

    public void setEntryToDoctor(EntryToDoctor entryToDoctor) {
        this.entryToDoctor = entryToDoctor;
    }

    public Set<Doctor> getDoctors() {
        return doctors;
    }

    public Patient doctors(Set<Doctor> doctors) {
        this.doctors = doctors;
        return this;
    }

    public Patient addDoctor(Doctor doctor) {
        this.doctors.add(doctor);
        doctor.getPatients().add(this);
        return this;
    }

    public Patient removeDoctor(Doctor doctor) {
        this.doctors.remove(doctor);
        doctor.getPatients().remove(this);
        return this;
    }

    public void setDoctors(Set<Doctor> doctors) {
        this.doctors = doctors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Patient)) {
            return false;
        }
        return id != null && id.equals(((Patient) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", allergy='" + getAllergy() + "'" +
            ", bloodType='" + getBloodType() + "'" +
            ", job='" + getJob() + "'" +
            "}";
    }
}
