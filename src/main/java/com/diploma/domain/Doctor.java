package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.diploma.domain.enumeration.Day;

/**
 * A Doctor.
 */
@Entity
@Table(name = "doctor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Doctor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "position")
    private String position;

    @Column(name = "room")
    private String room;

    @Column(name = "working_hour_begin")
    private LocalDate workingHourBegin;

    @Column(name = "working_hour_end")
    private LocalDate workingHourEnd;

    @Enumerated(EnumType.STRING)
    @Column(name = "days_work")
    private Day daysWork;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "doctor_patient",
               joinColumns = @JoinColumn(name = "doctor_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "patient_id", referencedColumnName = "id"))
    private Set<Patient> patients = new HashSet<>();

    @OneToOne(mappedBy = "doctor")
    @JsonIgnore
    private EntryToDoctor entryToDoctor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public Doctor position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getRoom() {
        return room;
    }

    public Doctor room(String room) {
        this.room = room;
        return this;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public LocalDate getWorkingHourBegin() {
        return workingHourBegin;
    }

    public Doctor workingHourBegin(LocalDate workingHourBegin) {
        this.workingHourBegin = workingHourBegin;
        return this;
    }

    public void setWorkingHourBegin(LocalDate workingHourBegin) {
        this.workingHourBegin = workingHourBegin;
    }

    public LocalDate getWorkingHourEnd() {
        return workingHourEnd;
    }

    public Doctor workingHourEnd(LocalDate workingHourEnd) {
        this.workingHourEnd = workingHourEnd;
        return this;
    }

    public void setWorkingHourEnd(LocalDate workingHourEnd) {
        this.workingHourEnd = workingHourEnd;
    }

    public Day getDaysWork() {
        return daysWork;
    }

    public Doctor daysWork(Day daysWork) {
        this.daysWork = daysWork;
        return this;
    }

    public void setDaysWork(Day daysWork) {
        this.daysWork = daysWork;
    }

    public Person getPerson() {
        return person;
    }

    public Doctor person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Set<Patient> getPatients() {
        return patients;
    }

    public Doctor patients(Set<Patient> patients) {
        this.patients = patients;
        return this;
    }

    public Doctor addPatient(Patient patient) {
        this.patients.add(patient);
        patient.getDoctors().add(this);
        return this;
    }

    public Doctor removePatient(Patient patient) {
        this.patients.remove(patient);
        patient.getDoctors().remove(this);
        return this;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
    }

    public EntryToDoctor getEntryToDoctor() {
        return entryToDoctor;
    }

    public Doctor entryToDoctor(EntryToDoctor entryToDoctor) {
        this.entryToDoctor = entryToDoctor;
        return this;
    }

    public void setEntryToDoctor(EntryToDoctor entryToDoctor) {
        this.entryToDoctor = entryToDoctor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Doctor)) {
            return false;
        }
        return id != null && id.equals(((Doctor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Doctor{" +
            "id=" + getId() +
            ", position='" + getPosition() + "'" +
            ", room='" + getRoom() + "'" +
            ", workingHourBegin='" + getWorkingHourBegin() + "'" +
            ", workingHourEnd='" + getWorkingHourEnd() + "'" +
            ", daysWork='" + getDaysWork() + "'" +
            "}";
    }
}
