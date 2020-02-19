package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class EntryToDoctorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntryToDoctor.class);
        EntryToDoctor entryToDoctor1 = new EntryToDoctor();
        entryToDoctor1.setId(1L);
        EntryToDoctor entryToDoctor2 = new EntryToDoctor();
        entryToDoctor2.setId(entryToDoctor1.getId());
        assertThat(entryToDoctor1).isEqualTo(entryToDoctor2);
        entryToDoctor2.setId(2L);
        assertThat(entryToDoctor1).isNotEqualTo(entryToDoctor2);
        entryToDoctor1.setId(null);
        assertThat(entryToDoctor1).isNotEqualTo(entryToDoctor2);
    }
}
