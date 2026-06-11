export interface TodayScheduleDto {
  id: number;
  time: string;
  title: string;
  type: 'schedule' | 'todo';
  completed: boolean;
}

export interface RoutineDto {
  id: number;
  name: string;
  time: string;
  completed: boolean;
}

export interface HomeResponse {
  todaySchedules: TodayScheduleDto[];
  upcomingSchedules: TodayScheduleDto[];
  routines: RoutineDto[];
  aiMessage: string;
}
