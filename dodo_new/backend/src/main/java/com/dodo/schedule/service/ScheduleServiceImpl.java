package com.dodo.schedule.service;

import com.dodo.global.exception.NotFoundException;
import com.dodo.schedule.dto.ScheduleRequestDto;
import com.dodo.schedule.dto.ScheduleResponseDto;
import com.dodo.schedule.entity.Schedule;
import com.dodo.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Override
    public List<ScheduleResponseDto> getSchedulesByDate(LocalDate date) {
        return scheduleRepository.findByScheduleDateOrderByScheduleTimeAsc(date)
                .stream().map(ScheduleResponseDto::new).collect(Collectors.toList());
    }

    @Override
    public List<ScheduleResponseDto> getUpcomingSchedules(LocalDate from, LocalDate to) {
        return scheduleRepository.findByScheduleDateBetweenOrderByScheduleDateAscScheduleTimeAsc(from, to)
                .stream().map(ScheduleResponseDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ScheduleResponseDto createSchedule(ScheduleRequestDto request) {
        Schedule schedule = Schedule.builder()
                .title(request.getTitle())
                .scheduleDate(request.getScheduleDate())
                .scheduleTime(request.getScheduleTime())
                .build();
        return new ScheduleResponseDto(scheduleRepository.save(schedule));
    }

    @Override
    @Transactional
    public ScheduleResponseDto updateSchedule(Long id, ScheduleRequestDto request) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("일정을 찾을 수 없습니다."));
        schedule.update(request.getTitle(), request.getScheduleDate(), request.getScheduleTime());
        return new ScheduleResponseDto(schedule);
    }

    @Override
    @Transactional
    public ScheduleResponseDto toggleComplete(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("일정을 찾을 수 없습니다."));
        schedule.toggleCompleted();
        return new ScheduleResponseDto(schedule);
    }

    @Override
    @Transactional
    public void deleteSchedule(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new NotFoundException("일정을 찾을 수 없습니다.");
        }
        scheduleRepository.deleteById(id);
    }
}
