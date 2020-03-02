package com.diploma.domain.enumeration;


import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The Day enumeration.
 */
public enum Day {
    @JsonProperty("Monday")
    MONDAY,

    @JsonProperty("TUESDAY")
    TUESDAY,

    @JsonProperty("WEDNESDAY")
    WEDNESDAY,

    @JsonProperty("THURSDAY")
    THURSDAY,

    @JsonProperty("FRIDAY")
    FRIDAY,

    @JsonProperty("SATURDAY")
    SATURDAY,

    @JsonProperty("SUNDAY")
    SUNDAY
}
