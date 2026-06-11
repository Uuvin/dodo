package com.dodo.home.service;

import com.dodo.home.dto.HomeResponseDto;
import com.dodo.home.dto.TodayScheduleDto;
import com.dodo.home.dto.RoutineDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    @Override
    public HomeResponseDto getHomeData() {
        // TODO: 실제 DB 조회로 대체 예정
        List<TodayScheduleDto> schedules = List.of(
            new TodayScheduleDto(1L, "10:00", "팀 미팅", "schedule", false),
            new TodayScheduleDto(2L, "14:00", "클라이언트 미팅", "schedule", false)
        );

        List<RoutineDto> routines = List.of(
            new RoutineDto(1L, "아침 운동", "07:00", true),
            new RoutineDto(2L, "업무 정리", "18:00", false)
        );

        String aiMessage = "오늘은 2개의 일정이 있어요. 일정 사이에 짧은 휴식을 넣으면 집중력이 더 좋아질 거예요 🌿";

        return new HomeResponseDto(schedules, routines, aiMessage);

        
    }
}
