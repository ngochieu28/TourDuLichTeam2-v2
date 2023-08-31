package com.vti.repository;

import com.vti.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BookingRepository extends JpaRepository<Booking, String>, JpaSpecificationExecutor<Booking> {

    Booking findByMaBooking(int maBooking);

    @Modifying
    @Query("DELETE FROM Booking WHERE maBooking = :maBooking")
    void deleteById(int maBooking);

}
