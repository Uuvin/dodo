package com.dodo.schedule.dto;

import com.dodo.schedule.entity.Schedule;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
public class ScheduleResponseDto {
    private Long id;
    private String title;
    private LocalDate scheduleDate;
    private LocalTime scheduleTime;
    private boolean completed;
    private LocalDateTime createdAt;

    public ScheduleResponseDto(Schedule schedule) {
        this.id = schedule.getId();
        this.title = schedule.getTitle();
        this.scheduleDate = schedule.getScheduleDate();
        this.scheduleTime = schedule.getScheduleTime();
        this.completed = schedule.isCompleted();
        this.createdAt = schedule.getCreatedAt();
    }
}
