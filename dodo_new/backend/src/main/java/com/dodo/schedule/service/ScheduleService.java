package com.dodo.schedule.service;

import com.dodo.schedule.dto.ScheduleRequestDto;
import com.dodo.schedule.dto.ScheduleResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleService {
    List<ScheduleResponseDto> getSchedulesByDate(LocalDate date);
    List<ScheduleResponseDto> getUpcomingSchedules(LocalDate from, LocalDate to);
    ScheduleResponseDto createSchedule(ScheduleRequestDto request);
    ScheduleResponseDto updateSchedule(Long id, ScheduleRequestDto request);
    ScheduleResponseDto toggleComplete(Long id);
    void deleteSchedule(Long id);
}
