package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class CertificateTemplTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CertificateTempl.class);
        CertificateTempl certificateTempl1 = new CertificateTempl();
        certificateTempl1.setId(1L);
        CertificateTempl certificateTempl2 = new CertificateTempl();
        certificateTempl2.setId(certificateTempl1.getId());
        assertThat(certificateTempl1).isEqualTo(certificateTempl2);
        certificateTempl2.setId(2L);
        assertThat(certificateTempl1).isNotEqualTo(certificateTempl2);
        certificateTempl1.setId(null);
        assertThat(certificateTempl1).isNotEqualTo(certificateTempl2);
    }
}
