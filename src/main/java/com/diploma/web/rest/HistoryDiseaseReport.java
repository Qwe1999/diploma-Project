package com.diploma.web.rest;

import com.diploma.domain.Doctor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/history-disease-report")
public class HistoryDiseaseReport {

//    @GetMapping
//    public ResponseEntity<List<Doctor>> getAllDoctorsForPatient(Pageable pageable, @RequestParam(required = false) String filter,
//                                                                @RequestParam(required = false, defaultValue = "false") boolean eagerload,
//                                                                @PathVariable Long patientId) {
//    }
}
