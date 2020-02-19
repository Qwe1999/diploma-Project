package com.diploma.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A MedicalTest.
 */
@Entity
@Table(name = "medical_test")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MedicalTest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "indicator")
    private String indicator;

    @Column(name = "value")
    private String value;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @ManyToOne
    @JsonIgnoreProperties("medicalTests")
    private EntryToHistoryDisease entryToHistoryDisease;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIndicator() {
        return indicator;
    }

    public MedicalTest indicator(String indicator) {
        this.indicator = indicator;
        return this;
    }

    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }

    public String getValue() {
        return value;
    }

    public MedicalTest value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public byte[] getImage() {
        return image;
    }

    public MedicalTest image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public MedicalTest imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public EntryToHistoryDisease getEntryToHistoryDisease() {
        return entryToHistoryDisease;
    }

    public MedicalTest entryToHistoryDisease(EntryToHistoryDisease entryToHistoryDisease) {
        this.entryToHistoryDisease = entryToHistoryDisease;
        return this;
    }

    public void setEntryToHistoryDisease(EntryToHistoryDisease entryToHistoryDisease) {
        this.entryToHistoryDisease = entryToHistoryDisease;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MedicalTest)) {
            return false;
        }
        return id != null && id.equals(((MedicalTest) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MedicalTest{" +
            "id=" + getId() +
            ", indicator='" + getIndicator() + "'" +
            ", value='" + getValue() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
