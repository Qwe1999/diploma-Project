package com.diploma.service.dto;


import com.diploma.domain.Person;

public class PersonDTO {

    private String firstName;

    private String lastName;

    private String country;

    private String region;

    private String locality;

    private String streat;

    private String building;

    private String apartment;

    private String phoneNumber;


    public PersonDTO() {
    }


    public PersonDTO(Person person) {
        this.country = person.getCountry();
        this.region = person.getRegion();
        this.locality = person.getLocality();
        this.streat = person.getStreat();
        this.building = person.getBuilding();
        this.apartment = person.getApartment();
        this.firstName = person.getFirstName();
        this.lastName = person.getLastName();
        this.phoneNumber = getPhoneNumber();
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getLocality() {
        return locality;
    }

    public void setLocality(String locality) {
        this.locality = locality;
    }

    public String getStreat() {
        return streat;
    }

    public void setStreat(String streat) {
        this.streat = streat;
    }

    public String getBuilding() {
        return building;
    }

    public void setBuilding(String building) {
        this.building = building;
    }

    public String getApartment() {
        return apartment;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

}
