package com.crimehotspot.backend.controller;

import com.crimehotspot.backend.dto.CrimeReportDto;
import com.crimehotspot.backend.dto.CrimeReportRequest;
import com.crimehotspot.backend.service.CrimeReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crimes")
@RequiredArgsConstructor
public class CrimeController {

    private final CrimeReportService crimeReportService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CrimeReportDto reportCrime(@Valid @RequestBody CrimeReportRequest request) {
        // Mock user ID for now until Security is implemented
        String mockUserId = "citizen_123";
        return crimeReportService.reportCrime(request, mockUserId);
    }

    @GetMapping
    public List<CrimeReportDto> getAllCrimes() {
        return crimeReportService.getAllCrimes();
    }

    @GetMapping("/nearby")
    public List<CrimeReportDto> getCrimesNearby(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "5.0") double radiusKm) {
        return crimeReportService.getCrimesNearLocation(lng, lat, radiusKm);
    }

    @PutMapping("/{id}/status")
    public CrimeReportDto updateCrimeStatus(
            @PathVariable String id,
            @RequestParam String status) {
        return crimeReportService.updateCrimeStatus(id, status);
    }
}
