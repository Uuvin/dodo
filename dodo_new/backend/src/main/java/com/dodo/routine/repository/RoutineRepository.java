package com.dodo.routine.repository;

import com.dodo.routine.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    List<Routine> findAllByOrderByRoutineTimeAsc();
}
