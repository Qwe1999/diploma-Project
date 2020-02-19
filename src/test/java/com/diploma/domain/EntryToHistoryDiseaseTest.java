package com.diploma.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.diploma.web.rest.TestUtil;

public class EntryToHistoryDiseaseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntryToHistoryDisease.class);
        EntryToHistoryDisease entryToHistoryDisease1 = new EntryToHistoryDisease();
        entryToHistoryDisease1.setId(1L);
        EntryToHistoryDisease entryToHistoryDisease2 = new EntryToHistoryDisease();
        entryToHistoryDisease2.setId(entryToHistoryDisease1.getId());
        assertThat(entryToHistoryDisease1).isEqualTo(entryToHistoryDisease2);
        entryToHistoryDisease2.setId(2L);
        assertThat(entryToHistoryDisease1).isNotEqualTo(entryToHistoryDisease2);
        entryToHistoryDisease1.setId(null);
        assertThat(entryToHistoryDisease1).isNotEqualTo(entryToHistoryDisease2);
    }
}
