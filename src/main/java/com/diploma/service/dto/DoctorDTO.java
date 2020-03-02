package com.diploma.service.dto;

import com.diploma.domain.Doctor;
import com.diploma.domain.Person;
import com.diploma.domain.enumeration.Day;

import javax.persistence.*;
import javax.print.Doc;
import java.time.LocalDate;
import java.util.Set;

public class DoctorDTO {

    private String position;

    private String room;

    private LocalDate workingHourBegin;

    private LocalDate workingHourEnd;

    private Set<Day> daysWork;

    private PersonDTO person;

    public DoctorDTO() {
    }

    public DoctorDTO(Doctor doctor) {
        this.position = doctor.getPosition();
        this.room = doctor.getRoom();
        this.workingHourBegin = doctor.getWorkingHourBegin();
        this.workingHourEnd = doctor.getWorkingHourEnd();
        this.daysWork = doctor.getDaysWork();
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public LocalDate getWorkingHourBegin() {
        return workingHourBegin;
    }

    public void setWorkingHourBegin(LocalDate workingHourBegin) {
        this.workingHourBegin = workingHourBegin;
    }

    public LocalDate getWorkingHourEnd() {
        return workingHourEnd;
    }

    public void setWorkingHourEnd(LocalDate workingHourEnd) {
        this.workingHourEnd = workingHourEnd;
    }

    public Set<Day> getDaysWork() {
        return daysWork;
    }

    public void setDaysWork(Set<Day> daysWork) {
        this.daysWork = daysWork;
    }

    public PersonDTO getPerson() {
        return person;
    }

    public void setPerson(PersonDTO person) {
        this.person = person;
    }
}
