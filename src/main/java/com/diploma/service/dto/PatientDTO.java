package com.diploma.service.dto;

import com.diploma.domain.Patient;
import com.diploma.domain.Person;
import com.diploma.domain.enumeration.BloodType;

import javax.persistence.*;

public class PatientDTO {

    private String allergy;

    private BloodType bloodType;

    private String job;

    private PersonDTO person;


    public PatientDTO() {
    }

    public PatientDTO(Patient patient) {
        this.allergy = patient.getAllergy();
        this.bloodType = patient.getBloodType();
        this.job = patient.getJob();
        this.person = new PersonDTO(patient.getPerson());
    }

    public String getAllergy() {
        return allergy;
    }

    public void setAllergy(String allergy) {
        this.allergy = allergy;
    }

    public BloodType getBloodType() {
        return bloodType;
    }

    public void setBloodType(BloodType bloodType) {
        this.bloodType = bloodType;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }
}
