package com.crimehotspot.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CrimeReportRequest {
    @NotBlank(message = "Crime type is required")
    private String crimeType;

    private String description;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    private Double longitude;

    @Min(1) @Max(10)
    private Integer severity;
}
