package com.dodo.routine.service;

import com.dodo.global.exception.NotFoundException;
import com.dodo.routine.dto.RoutineRequestDto;
import com.dodo.routine.dto.RoutineResponseDto;
import com.dodo.routine.entity.Routine;
import com.dodo.routine.repository.RoutineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoutineServiceImpl implements RoutineService {

    private final RoutineRepository routineRepository;

    @Override
    public List<RoutineResponseDto> getAllRoutines() {
        return routineRepository.findAllByOrderByRoutineTimeAsc()
                .stream().map(RoutineResponseDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RoutineResponseDto createRoutine(RoutineRequestDto request) {
        Routine routine = Routine.builder()
                .name(request.getName())
                .routineTime(request.getRoutineTime())
                .build();
        return new RoutineResponseDto(routineRepository.save(routine));
    }

    @Override
    @Transactional
    public RoutineResponseDto updateRoutine(Long id, RoutineRequestDto request) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("루틴을 찾을 수 없습니다."));
        routine.update(request.getName(), request.getRoutineTime());
        return new RoutineResponseDto(routine);
    }

    @Override
    @Transactional
    public RoutineResponseDto toggleComplete(Long id) {
        Routine routine = routineRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("루틴을 찾을 수 없습니다."));
        routine.toggleCompleted();
        return new RoutineResponseDto(routine);
    }

    @Override
    @Transactional
    public void deleteRoutine(Long id) {
        if (!routineRepository.existsById(id)) {
            throw new NotFoundException("루틴을 찾을 수 없습니다.");
        }
        routineRepository.deleteById(id);
    }
}
