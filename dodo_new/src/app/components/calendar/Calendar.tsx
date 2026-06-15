import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth, addMonths, subMonths, startOfDay, differenceInDays, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { SidePanel } from './SidePanel';

export interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  endDate?: Date;
  type: string;                  // 'schedule' | 'routine'
  displayType: 'schedule' | 'range' | 'todo'; // 일정(단일) / 구간일정 / 할일(네모블록)
  color: string;
  memo?: string;
  completedDates?: string[];     // 완료된 날짜 (yyyy-MM-dd)
  repeat: 'none' | 'weekly' | 'monthly' | 'yearly';
  repeatDays?: number[]; // 0=일 1=월 2=화 3=수 4=목 5=금 6=토
}

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [repeatDays, setRepeatDays] = useState<number[]>([]);
  const [popoverDate, setPopoverDate] = useState<Date | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setPopoverDate(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const matchEventDate = (event: Event, targetDate: Date) => {
    const tDate = startOfDay(new Date(targetDate));
    const sDate = startOfDay(new Date(event.date));
    const eDate = event.endDate ? startOfDay(new Date(event.endDate)) : new Date(sDate);
    
    if (tDate < sDate) return false;
    if (event.repeat === 'none' || !event.repeat) {
      return tDate >= sDate && tDate <= eDate;
    }
    const durationDays = differenceInDays(eDate, sDate);
if (event.repeat === 'weekly') {

  if (
    event.repeatDays &&
    event.repeatDays.length > 0
  ) {
    return event.repeatDays.includes(
      tDate.getDay()
    );
  }

  return tDate.getDay() === sDate.getDay();
}
if (event.repeat === 'monthly') {

  if (
    event.repeatDays &&
    event.repeatDays.length > 0
  ) {
    return event.repeatDays.includes(
      tDate.getDate()
    );
  }

  return tDate.getDate() === sDate.getDate();
}
    if (event.repeat === 'yearly') {
      const yearDiff = tDate.getFullYear() - sDate.getFullYear();
      for (let i = Math.max(0, yearDiff - 1); i <= yearDiff + 1; i++) {
        const movedStart = new Date(sDate);
        movedStart.setFullYear(sDate.getFullYear() + i);
        const movedEnd = addDays(movedStart, durationDays);
        if (tDate >= startOfDay(movedStart) && tDate <= startOfDay(movedEnd)) return true;
      }
      return false;
    }
    return false;
  };

  const getEventsForDay = (date: Date) => {
    return events.filter(event => matchEventDate(event, date));
  };

  // 💡 [추가] '일정(schedule)'이라도 시작일과 종료일이 다르면(여러 날에 걸친 일정)
  // '구간(range)'과 동일하게 하단 화살표 트랙으로 이어진 한 줄로 표시합니다.
  // displayType이 'range'인 경우, 그리고 'todo'(할 일 블록)는 항상 날짜 셀 블록으로 표시합니다.
  const isContinuousDisplay = (event: Event) => {
    if (event.displayType === 'range') return true;
    if (event.displayType === 'schedule' && event.endDate) {
      const sDate = format(new Date(event.date), 'yyyy-MM-dd');
      const eDate = format(new Date(event.endDate), 'yyyy-MM-dd');
      return sDate !== eDate;
    }
    return false;
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleAddEvent = (newEventData: Omit<Event, 'id'>) => {
    setEvents((prev) => [...prev, { ...newEventData, id: Date.now(), completedDates: [] }]);
  };

  const handleUpdateEvent = (id: number, updatedEvent: Partial<Event>) => {
    setEvents((prev) => prev.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event)));
  };

  // 💡 [추가] 캘린더 날짜 셀의 할 일(todo) 블록 체크박스 클릭 시 해당 날짜의 완료 상태를 토글
  const handleToggleComplete = (event: Event, day: Date) => {
    const dateIso = format(day, 'yyyy-MM-dd');
    const completed = event.completedDates || [];
    const exists = completed.includes(dateIso);

    const updatedCompleted = exists
      ? completed.filter((d) => d !== dateIso)
      : [...completed, dateIso];

    handleUpdateEvent(event.id, { completedDates: updatedCompleted });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - monthStart.getDay());
  const endDate = new Date(monthEnd);
  endDate.setDate(endDate.getDate() + (6 - monthEnd.getDay()));
  
  let days = eachDayOfInterval({ start: startDate, end: endDate });
  
  if (days.length < 42) {
    const lastDay = days[days.length - 1];
    const additionalDays = eachDayOfInterval({
      start: new Date(lastDay.getTime() + 86400000),
      end: new Date(lastDay.getTime() + (86400000 * (42 - days.length)))
    });
    days = [...days, ...additionalDays];
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < 42; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const colorMap = {
    purple: { bg: 'bg-purple-100 text-purple-700 border border-purple-200', text: 'text-purple-600', lineBg: 'bg-purple-500', fill: '#a855f7' },
    blue: { bg: 'bg-blue-100 text-blue-700 border border-blue-200', text: 'text-blue-600', lineBg: 'bg-blue-500', fill: '#3b82f6' },
    green: { bg: 'bg-green-100 text-green-700 border border-green-200', text: 'text-green-600', lineBg: 'bg-green-500', fill: '#22c55e' },
    orange: { bg: 'bg-orange-100 text-orange-700 border border-orange-200', text: 'text-orange-600', lineBg: 'bg-orange-500', fill: '#f97316' },
    red: { bg: 'bg-red-100 text-red-700 border border-red-200', text: 'text-red-600', lineBg: 'bg-red-500', fill: '#ef4444' },
    pink: { bg: 'bg-pink-100 text-pink-700 border border-pink-200', text: 'text-pink-600', lineBg: 'bg-pink-500', fill: '#ec4899' }
  };

  return (
    <div className="flex gap-6 items-start w-full p-4 relative">
      {/* 💡 h-[770px] 고정을 없애고 min-h-[770px] 및 h-auto 처리하여 일정이 많아지면 자동으로 늘어나도록 수정 */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 flex flex-col min-h-[770px] h-auto border border-gray-100">
        
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold">캘린더</h2>
          <div className="flex items-center gap-4">
            <button onClick={goToToday} className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              <span>오늘</span>
            </button>
            <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
            <span className="text-lg font-semibold min-w-[140px] text-center">{format(currentMonth, 'yyyy년 M월', { locale: ko })}</span>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-0 mb-2 flex-shrink-0">
          {weekDays.map((day, index) => (
            <div key={day} className={`text-center text-sm font-semibold py-2 ${index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'}`}>{day}</div>
          ))}
        </div>

        {/* 달력 본체 바디 - 내부 콘텐츠에 맞춰 자연스럽게 늘어나는 격자 구조 */}
        <div className="flex-1 flex flex-col border border-gray-100 rounded-xl bg-gray-100 gap-px relative h-auto">
          {weeks.map((week, weekIdx) => {
            const weekRangeEvents: Event[] = [];
            week.forEach(day => {
              const ranges = getEventsForDay(day).filter(e => isContinuousDisplay(e));
              ranges.forEach(re => {
                if (!weekRangeEvents.some(we => we.id === re.id)) weekRangeEvents.push(re);
              });
            });

            return (
              /* 💡 고정 높이 대신 min-h-[120px]과 h-auto를 주어 일정이 추가되면 행 전체가 아래로 유연하게 늘어남 */
              <div key={weekIdx} className="relative flex-1 bg-white grid grid-cols-7 gap-px w-full min-h-[120px] h-auto">
                
                {/* 1. 기본 일자 칸 및 할 일(todo) 블록 렌더링 */}
                {week.map((day) => {
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isToday = isSameDay(day, new Date());
                  const dayOfWeek = day.getDay();
                  
                  // 💡 [수정] 연속 표시(range, 또는 여러 날에 걸친 schedule)는 하단 화살표 트랙에서 표시되므로
                  // 그 외(todo, 하루짜리 schedule)만 날짜 셀 블록으로 표시합니다.
                  const blockEvents = getEventsForDay(day).filter(e => !isContinuousDisplay(e));
                  const formattedIsoDate = format(day, 'yyyy-MM-dd');

                  return (
                    <div
                      key={day.toString()}
                      onClick={() => setSelectedDate(day)}
                      /* 💡 패딩 하단을 충분히 주어(pb-10) 일정이 늘어나도 아래 화살표 공간과 겹치지 않고 박스를 늘리도록 설계 */
                      className={`bg-white p-2 pb-10 flex flex-col justify-start h-full transition-colors cursor-pointer select-none relative ${
                        isSelected ? 'bg-blue-50/40' : ''
                      } ${!isCurrentMonth ? 'opacity-35' : ''} ${isToday ? 'bg-orange-50/20' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-semibold px-1 py-0.5 rounded-full w-5 h-5 flex items-center justify-center ${
                          isSelected ? 'bg-blue-600 text-white font-bold' : isToday ? 'bg-orange-500 text-white' : dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : 'text-gray-700'
                        }`}>
                          {format(day, 'd')}
                        </span>
                      </div>

                      {/* 일정/할 일 블록 컨테이너 - 개수가 늘어나면 날짜 셀 전체 높이를 밀어냄 */}
                      <div className="flex-1 flex flex-col gap-1 overflow-hidden pointer-events-none">
                        {blockEvents.map((event) => {
                          const colors = colorMap[event.color as keyof typeof colorMap] || colorMap.purple;
                          const isTodo = event.displayType === 'todo';
                          const isRoutine = event.type === 'routine';

                          const canCheck =isTodo || isRoutine;
                          const isCompleted = event.completedDates?.includes(formattedIsoDate);

                          return (
                            <div
                              key={event.id}
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md truncate flex items-center gap-1 ${colors.bg} ${isTodo && isCompleted ? 'line-through opacity-45' : ''}`}
                            >
                              {/* 💡 [추가] 할 일(todo) 타입은 캘린더 셀에서도 체크박스로 완료 토글 가능 */}
                              {isTodo && (
                                <input
                                  type="checkbox"
                                  checked={!!isCompleted}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleComplete(event, day);
                                  }}
                                  onChange={() => {}}
                                  className="pointer-events-auto w-2.5 h-2.5 flex-shrink-0 rounded cursor-pointer"
                                />
                              )}
                              {event.type === 'routine' && <span className="mr-0.5">🔄</span>}
                              <span className="truncate">{event.title}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                

                {/* 2. 구간 일정(range) 양방향 화살표 오버레이 트랙 (하단에 깔끔하게 절대 정렬) */}
                <div className="absolute inset-x-0 bottom-2 flex flex-col gap-1.5 pointer-events-none z-10 w-full px-[2px]">
                  {weekRangeEvents.map((event) => {
                    const colors = colorMap[event.color as keyof typeof colorMap] || colorMap.purple;
                    
                    let startIdx = -1;
                    let endIdx = -1;

                    week.forEach((day, idx) => {
                      if (matchEventDate(event, day)) {
                        if (startIdx === -1) startIdx = idx;
                        endIdx = idx;
                      }
                    });

                    if (startIdx === -1) return null;

                    const leftPercent = (startIdx / 7) * 100;
                    const widthPercent = ((endIdx - startIdx + 1) / 7) * 100;

                    const hasLeftExtension = matchEventDate(event, addDays(week[0], -1));
                    const hasRightExtension = matchEventDate(event, addDays(week[6], 1));

                    // 💡 [추가] 여러 날에 걸친 '일정(schedule)'은 '세일기간(range)'과 다르게
                    // 화살표+라인이 아닌, 끊김 없이 이어지는 컬러 블록으로 표시합니다.
                    if (event.displayType === 'schedule') {
                      return (
                        <div
                          key={event.id}
                          className="relative h-5 flex items-center"
                          style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                        >
                          <div
                            className={`absolute inset-y-0 inset-x-0 flex items-center px-2 text-[10px] font-bold truncate pointer-events-auto ${colors.bg} ${
                              hasLeftExtension ? 'rounded-l-none -ml-px' : 'rounded-l-md'
                            } ${hasRightExtension ? 'rounded-r-none -mr-px' : 'rounded-r-md'}`}
                          >
                            <span className="truncate">{event.title}</span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={event.id} 
                        className="relative h-4 flex items-center justify-center"
                        style={{ 
                          left: `${leftPercent}%`, 
                          width: `${widthPercent}%`,
                          paddingLeft: hasLeftExtension ? '0px' : '4px',
                          paddingRight: hasRightExtension ? '0px' : '4px'
                        }}
                      >
                        <div className={`absolute inset-x-0 h-[1.5px] ${colors.lineBg} opacity-80`} />
                        
                        {!hasLeftExtension && (
                          <svg className="absolute left-0 z-20 w-2.5 h-2.5 -ml-[1px]" viewBox="0 0 24 24" fill={colors.fill}>
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke={colors.fill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}

                        <div className="z-30 px-1 bg-white text-[9px] font-extrabold tracking-tight max-w-[85%] truncate border border-gray-100 shadow-sm rounded flex items-center gap-0.5 pointer-events-auto">
                          <span className={`w-1 h-1 rounded-full ${colors.lineBg}`} />
                          <span className="text-gray-700 truncate">{event.title}</span>
                        </div>

                        {!hasRightExtension && (
                          <svg className="absolute right-0 z-20 w-2.5 h-2.5 -mr-[1px]" viewBox="0 0 24 24" fill={colors.fill}>
                            <path d="M5 12h14m-7-7l7 7-7 7" stroke={colors.fill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 우측 분리형 사이드 패널 */}
      {selectedDate && (
        <div className="w-[400px] flex-shrink-0 min-h-[770px] h-auto">
          <SidePanel
            selectedDate={selectedDate}
            events={events}
            onClose={() => setSelectedDate(null)}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      )}
    </div>
  );
}