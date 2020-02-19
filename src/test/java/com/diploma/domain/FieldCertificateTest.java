package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class FieldCertificateTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldCertificate.class);
        FieldCertificate fieldCertificate1 = new FieldCertificate();
        fieldCertificate1.setId(1L);
        FieldCertificate fieldCertificate2 = new FieldCertificate();
        fieldCertificate2.setId(fieldCertificate1.getId());
        assertThat(fieldCertificate1).isEqualTo(fieldCertificate2);
        fieldCertificate2.setId(2L);
        assertThat(fieldCertificate1).isNotEqualTo(fieldCertificate2);
        fieldCertificate1.setId(null);
        assertThat(fieldCertificate1).isNotEqualTo(fieldCertificate2);
    }
}
