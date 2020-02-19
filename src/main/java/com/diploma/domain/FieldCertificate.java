package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A FieldCertificate.
 */
@Entity
@Table(name = "field_certificate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FieldCertificate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_field")
    private String nameField;

    @Column(name = "value")
    private String value;

    @ManyToOne
    @JsonIgnoreProperties("fieldCertificates")
    private Certificate certificate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameField() {
        return nameField;
    }

    public FieldCertificate nameField(String nameField) {
        this.nameField = nameField;
        return this;
    }

    public void setNameField(String nameField) {
        this.nameField = nameField;
    }

    public String getValue() {
        return value;
    }

    public FieldCertificate value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Certificate getCertificate() {
        return certificate;
    }

    public FieldCertificate certificate(Certificate certificate) {
        this.certificate = certificate;
        return this;
    }

    public void setCertificate(Certificate certificate) {
        this.certificate = certificate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FieldCertificate)) {
            return false;
        }
        return id != null && id.equals(((FieldCertificate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FieldCertificate{" +
            "id=" + getId() +
            ", nameField='" + getNameField() + "'" +
            ", value='" + getValue() + "'" +
            "}";
    }
}
