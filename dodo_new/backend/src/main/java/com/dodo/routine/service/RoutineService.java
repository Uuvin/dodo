package com.dodo.routine.service;

import com.dodo.routine.dto.RoutineRequestDto;
import com.dodo.routine.dto.RoutineResponseDto;

import java.util.List;

public interface RoutineService {
    List<RoutineResponseDto> getAllRoutines();
    RoutineResponseDto createRoutine(RoutineRequestDto request);
    RoutineResponseDto updateRoutine(Long id, RoutineRequestDto request);
    RoutineResponseDto toggleComplete(Long id);
    void deleteRoutine(Long id);
}
