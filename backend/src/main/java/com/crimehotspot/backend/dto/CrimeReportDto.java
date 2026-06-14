package com.crimehotspot.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CrimeReportDto {
    private String id;
    private String crimeType;
    private String description;
    private double latitude;
    private double longitude;
    private Integer severity;
    private LocalDateTime dateTime;
    private String status;
    private String reportedBy;
}
