package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Certificate.
 */
@Entity
@Table(name = "certificate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Certificate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "certificate")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<FieldCertificate> fieldCertificates = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("certificates")
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Certificate name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<FieldCertificate> getFieldCertificates() {
        return fieldCertificates;
    }

    public Certificate fieldCertificates(Set<FieldCertificate> fieldCertificates) {
        this.fieldCertificates = fieldCertificates;
        return this;
    }

    public Certificate addFieldCertificate(FieldCertificate fieldCertificate) {
        this.fieldCertificates.add(fieldCertificate);
        fieldCertificate.setCertificate(this);
        return this;
    }

    public Certificate removeFieldCertificate(FieldCertificate fieldCertificate) {
        this.fieldCertificates.remove(fieldCertificate);
        fieldCertificate.setCertificate(null);
        return this;
    }

    public void setFieldCertificates(Set<FieldCertificate> fieldCertificates) {
        this.fieldCertificates = fieldCertificates;
    }

    public Patient getPatient() {
        return patient;
    }

    public Certificate patient(Patient patient) {
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
        if (!(o instanceof Certificate)) {
            return false;
        }
        return id != null && id.equals(((Certificate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Certificate{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
