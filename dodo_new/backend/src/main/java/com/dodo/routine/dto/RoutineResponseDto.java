package com.dodo.routine.dto;

import com.dodo.routine.entity.Routine;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class RoutineResponseDto {
    private Long id;
    private String name;
    private LocalTime routineTime;
    private boolean completed;
    private LocalDateTime createdAt;

    public RoutineResponseDto(Routine routine) {
        this.id = routine.getId();
        this.name = routine.getName();
        this.routineTime = routine.getRoutineTime();
        this.completed = routine.isCompleted();
        this.createdAt = routine.getCreatedAt();
    }
}
