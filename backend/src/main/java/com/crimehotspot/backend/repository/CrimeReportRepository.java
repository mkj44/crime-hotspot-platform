package com.crimehotspot.backend.repository;

import com.crimehotspot.backend.entity.CrimeReport;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CrimeReportRepository extends MongoRepository<CrimeReport, String> {
    List<CrimeReport> findByLocationNear(Point location, Distance distance);
}
