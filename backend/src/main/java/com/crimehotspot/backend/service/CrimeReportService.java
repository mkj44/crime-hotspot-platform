package com.crimehotspot.backend.service;

import com.crimehotspot.backend.dto.CrimeReportDto;
import com.crimehotspot.backend.dto.CrimeReportRequest;
import java.util.List;

public interface CrimeReportService {
    CrimeReportDto reportCrime(CrimeReportRequest request, String userId);
    List<CrimeReportDto> getAllCrimes();
    List<CrimeReportDto> getCrimesNearLocation(double longitude, double latitude, double distanceKm);
    CrimeReportDto updateCrimeStatus(String id, String status);
}
