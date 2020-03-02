package com.diploma.domain.enumeration;


import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The BloodType enumeration.
 */
public enum BloodType {
    @JsonProperty("A positive")
    A_POSITIVE,

    @JsonProperty("A negative")
    A_NEGATIVE,

    @JsonProperty("A positive")
    B_POSITIVE,

    @JsonProperty("B negative")
    B_NEGATIVE,

    @JsonProperty("O positive")
    O_POSITIVE,

    @JsonProperty("O negative")
    O_NEGATIVE,

    @JsonProperty("AB positive")
    AB_POSITIVE,

    @JsonProperty("AB negative")
    AB_NEGATIVE
}
