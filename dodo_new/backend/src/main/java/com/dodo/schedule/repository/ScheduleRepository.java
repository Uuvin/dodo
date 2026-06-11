package com.dodo.schedule.repository;

import com.dodo.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByScheduleDateOrderByScheduleTimeAsc(LocalDate date);
    List<Schedule> findByScheduleDateBetweenOrderByScheduleDateAscScheduleTimeAsc(LocalDate start, LocalDate end);
}
