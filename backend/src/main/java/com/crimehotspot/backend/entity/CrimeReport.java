package com.crimehotspot.backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "crimes")
public class CrimeReport {
    @Id
    private String id;

    private String crimeType; // e.g., THEFT, ASSAULT, VANDALISM

    private String description;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

    private Integer severity; // 1 to 10

    private LocalDateTime dateTime;

    private String status; // PENDING, INVESTIGATING, CLOSED

    private String reportedBy; // User ID
}
