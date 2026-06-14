package com.crimehotspot.backend.controller;

import com.crimehotspot.backend.dto.CrimeReportDto;
import com.crimehotspot.backend.service.CrimeReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final CrimeReportService crimeReportService;

    @GetMapping("/risk-score")
    public String getRiskScore(
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "2.0") double radiusKm) {
        
        List<CrimeReportDto> nearbyCrimes = crimeReportService.getCrimesNearLocation(lng, lat, radiusKm);
        
        int riskScore = 0;
        for (CrimeReportDto crime : nearbyCrimes) {
            riskScore += (crime.getSeverity() != null ? crime.getSeverity() : 5);
        }
        
        // Simple formula for MVP
        if (riskScore == 0) return "SAFE (Score: 0)";
        if (riskScore < 20) return "MODERATE RISK (Score: " + riskScore + ")";
        return "HIGH RISK (Score: " + riskScore + ")";
    }
}
