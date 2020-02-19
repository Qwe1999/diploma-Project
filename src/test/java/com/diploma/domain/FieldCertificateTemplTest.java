package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class FieldCertificateTemplTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldCertificateTempl.class);
        FieldCertificateTempl fieldCertificateTempl1 = new FieldCertificateTempl();
        fieldCertificateTempl1.setId(1L);
        FieldCertificateTempl fieldCertificateTempl2 = new FieldCertificateTempl();
        fieldCertificateTempl2.setId(fieldCertificateTempl1.getId());
        assertThat(fieldCertificateTempl1).isEqualTo(fieldCertificateTempl2);
        fieldCertificateTempl2.setId(2L);
        assertThat(fieldCertificateTempl1).isNotEqualTo(fieldCertificateTempl2);
        fieldCertificateTempl1.setId(null);
        assertThat(fieldCertificateTempl1).isNotEqualTo(fieldCertificateTempl2);
    }
}
