package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class MedicalTestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MedicalTest.class);
        MedicalTest medicalTest1 = new MedicalTest();
        medicalTest1.setId(1L);
        MedicalTest medicalTest2 = new MedicalTest();
        medicalTest2.setId(medicalTest1.getId());
        assertThat(medicalTest1).isEqualTo(medicalTest2);
        medicalTest2.setId(2L);
        assertThat(medicalTest1).isNotEqualTo(medicalTest2);
        medicalTest1.setId(null);
        assertThat(medicalTest1).isNotEqualTo(medicalTest2);
    }
}
