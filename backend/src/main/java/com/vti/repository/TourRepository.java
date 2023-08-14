package com.vti.repository;

import com.vti.entity.Group;
import com.vti.entity.Tour;
import com.vti.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TourRepository extends JpaRepository<Tour, Integer>, JpaSpecificationExecutor<Tour> {
    public Tour findByMaTour(String maTour);
}