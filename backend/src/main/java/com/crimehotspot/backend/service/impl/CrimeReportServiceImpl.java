package com.crimehotspot.backend.service.impl;

import com.crimehotspot.backend.dto.CrimeReportDto;
import com.crimehotspot.backend.dto.CrimeReportRequest;
import com.crimehotspot.backend.entity.CrimeReport;
import com.crimehotspot.backend.repository.CrimeReportRepository;
import com.crimehotspot.backend.service.CrimeReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CrimeReportServiceImpl implements CrimeReportService {

    private final CrimeReportRepository repository;

    @Override
    public CrimeReportDto reportCrime(CrimeReportRequest request, String userId) {
        CrimeReport report = new CrimeReport();
        report.setCrimeType(request.getCrimeType());
        report.setDescription(request.getDescription());
        // GeoJsonPoint expects (longitude, latitude)
        report.setLocation(new GeoJsonPoint(request.getLongitude(), request.getLatitude()));
        report.setSeverity(request.getSeverity() != null ? request.getSeverity() : 5);
        report.setDateTime(LocalDateTime.now());
        report.setStatus("PENDING");
        report.setReportedBy(userId);

        CrimeReport saved = repository.save(report);
        return mapToDto(saved);
    }

    @Override
    public List<CrimeReportDto> getAllCrimes() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CrimeReportDto> getCrimesNearLocation(double longitude, double latitude, double distanceKm) {
        Point location = new Point(longitude, latitude);
        Distance distance = new Distance(distanceKm, Metrics.KILOMETERS);
        return repository.findByLocationNear(location, distance).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CrimeReportDto updateCrimeStatus(String id, String status) {
        CrimeReport report = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Crime report not found"));
        report.setStatus(status);
        return mapToDto(repository.save(report));
    }

    private CrimeReportDto mapToDto(CrimeReport entity) {
        CrimeReportDto dto = new CrimeReportDto();
        dto.setId(entity.getId());
        dto.setCrimeType(entity.getCrimeType());
        dto.setDescription(entity.getDescription());
        if (entity.getLocation() != null) {
            dto.setLongitude(entity.getLocation().getX());
            dto.setLatitude(entity.getLocation().getY());
        }
        dto.setSeverity(entity.getSeverity());
        dto.setDateTime(entity.getDateTime());
        dto.setStatus(entity.getStatus());
        dto.setReportedBy(entity.getReportedBy());
        return dto;
    }
}
