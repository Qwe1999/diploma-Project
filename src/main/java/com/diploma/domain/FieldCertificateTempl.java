package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A FieldCertificateTempl.
 */
@Entity
@Table(name = "field_certificate_templ")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FieldCertificateTempl implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_field")
    private String nameField;

    @ManyToOne
    @JsonIgnoreProperties("fieldCertificateTempls")
    private CertificateTempl certificateTempl;

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

    public FieldCertificateTempl nameField(String nameField) {
        this.nameField = nameField;
        return this;
    }

    public void setNameField(String nameField) {
        this.nameField = nameField;
    }

    public CertificateTempl getCertificateTempl() {
        return certificateTempl;
    }

    public FieldCertificateTempl certificateTempl(CertificateTempl certificateTempl) {
        this.certificateTempl = certificateTempl;
        return this;
    }

    public void setCertificateTempl(CertificateTempl certificateTempl) {
        this.certificateTempl = certificateTempl;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FieldCertificateTempl)) {
            return false;
        }
        return id != null && id.equals(((FieldCertificateTempl) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "FieldCertificateTempl{" +
            "id=" + getId() +
            ", nameField='" + getNameField() + "'" +
            "}";
    }
}
