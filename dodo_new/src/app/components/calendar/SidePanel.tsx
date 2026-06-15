import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Event } from './Calendar';

interface SidePanelProps {
  selectedDate: Date;
  events: Event[];
  onClose: () => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (id: number, updatedEvent: Partial<Event>) => void;
  onDeleteEvent: (id: number) => void;
}

export function SidePanel({
  selectedDate,
  events,
  onClose,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
}: SidePanelProps) {
  const [activeTab, setActiveTab] = useState<string>('schedule'); 
  // 💡 [수정] 'schedule' | 'range' | 'todo' 3가지 타입으로 확장 (일정등록 / 구간등록 / 할일등록)
  const [displayType, setDisplayType] = useState<'schedule' | 'range' | 'todo'>('schedule'); 
  const [title, setTitle] = useState('');
  const [startDateInput, setStartDateInput] = useState(format(selectedDate, 'yyyy-MM-dd'));
  const [endDateInput, setEndDateInput] = useState('');
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [repeat, setRepeat] = useState<'none' | 'weekly' | 'monthly' | 'yearly'>('none');
  const [memo, setMemo] = useState('');

  const [scheduleColor, setScheduleColor] = useState('purple'); 
  const [routineColor, setRoutineColor] = useState('green');    
  const [repeatDays, setRepeatDays] = useState<number[]>([]);

  useEffect(() => {
    setStartDateInput(format(selectedDate, 'yyyy-MM-dd'));
  }, [selectedDate]);

  // 💡 [추가] 탭(일정/루틴) 전환 시 등록 타입을 기본값(일정 등록)으로 초기화합니다.
  // 루틴 탭에서는 displayType이 항상 'schedule'로 고정되어 종료일 입력이 비활성화됩니다.
  useEffect(() => {
    setDisplayType('schedule');
    setEndDateInput('');
  }, [activeTab]);

  const selectedDateIso = format(selectedDate, 'yyyy-MM-dd');
  
  const currentDayEvents = events.filter(event => {
    const sDate = format(new Date(event.date), 'yyyy-MM-dd');
    const eDate = event.endDate ? format(new Date(event.endDate), 'yyyy-MM-dd') : sDate;
    return selectedDateIso >= sDate && selectedDateIso <= eDate;
  });

  const handleToggleComplete = (event: Event) => {
    const completed = event.completedDates || [];
    const exists = completed.includes(selectedDateIso);
    
    const updatedCompleted = exists
      ? completed.filter(d => d !== selectedDateIso)
      : [...completed, selectedDateIso];
      
    onUpdateEvent(event.id, { completedDates: updatedCompleted });
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    const finalColor = activeTab === 'schedule' ? scheduleColor : routineColor;

onAddEvent({
  title,
  date: new Date(startDateInput),
  endDate:
    displayType !== 'todo' && endDateInput
      ? new Date(endDateInput)
      : new Date(startDateInput),

  time: `${selectedHour}시 ${selectedMinute}분`,
  type: activeTab,
  displayType,
  color: finalColor,
  memo,
  repeat,

  repeatDays // 추가
});

    setTitle('');
    setEndDateInput('');
    setMemo('');
    setRepeat('none');
  };

  // 🎨 💡 [수정] inline style에 바로 바인딩할 수 있도록 hexColor 속성을 명확히 추가했습니다.
  const colorMap = {
    purple: { bg: 'bg-purple-100 text-purple-700 border border-purple-200', hexColor: '#a855f7' },
    blue: { bg: 'bg-blue-100 text-blue-700 border border-blue-200', hexColor: '#3b82f6' },
    green: { bg: 'bg-green-100 text-green-700 border border-green-200', hexColor: '#22c55e' },
    orange: { bg: 'bg-orange-100 text-orange-700 border border-orange-200', hexColor: '#f97316' },
    red: { bg: 'bg-red-100 text-red-700 border border-red-200', hexColor: '#ef4444' },
    pink: { bg: 'bg-pink-100 text-pink-700 border border-pink-200', hexColor: '#ec4899' }
  };

  const currentSelectedColor = activeTab === 'schedule' ? scheduleColor : routineColor;
  
  const handleColorChange = (color: string) => {
    if (activeTab === 'schedule') {
      setScheduleColor(color);
    } else {
      setRoutineColor(color);
    }
  };

  // 💡 [추가] 등록 버튼 라벨을 탭/타입별로 각각 분리하여 표시합니다.
  const getSubmitLabel = () => {
    if (activeTab === 'routine') return '루틴 추가';
    switch (displayType) {
      case 'range':
        return '구간 추가';
      case 'todo':
        return '할 일 추가';
      default:
        return '일정 추가';
    }
  };

  // 💡 [추가] 이벤트 목록에 표시되는 타입 라벨을 displayType 3종에 맞게 분기합니다.
  const getDisplayTypeLabel = (type: Event['displayType']) => {
    switch (type) {
      case 'range':
        return '(구간 일정)';
      case 'todo':
        return '(할 일 블록)';
      default:
        return '(일정)';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full justify-between">
      
      {/* 1. 상단 목록 보기 영역 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">오늘의 일정 및 할 일</h3>
            {/* 💡 [수정] 'EEEE요일' 대신 'EEEE'로 변경하여 '월요일요일' 중복 표출을 해결했습니다. */}
            <p className="text-xs text-gray-400 mt-0.5">{format(selectedDate, 'yyyy년 M월 d일 EEEE', { locale: ko })}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400"><X className="w-4 h-4" /></button>
        </div>

        {/* 상단 메인 필터 탭 */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl mb-4 border border-gray-100">
          <button 
            onClick={() => setActiveTab('schedule')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            🗓️ 일정 ({currentDayEvents.filter(e => e.type === 'schedule').length})
          </button>
          <button 
            onClick={() => setActiveTab('routine')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'routine' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
          >
            🔄 루틴 ({currentDayEvents.filter(e => e.type === 'routine').length})
          </button>
        </div>

        {/* 이벤트 출력 컨테이너 */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {currentDayEvents.filter(e => e.type === activeTab).length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-400 font-medium">
              등록된 {activeTab === 'schedule' ? '일정이' : '루틴이'} 없습니다.
            </div>
          ) : (
            currentDayEvents.filter(e => e.type === activeTab).map((event) => {
              const colors = colorMap[event.color as keyof typeof colorMap] || colorMap.purple;
              const isTodo = event.displayType === 'todo';
              const isCompleted = event.completedDates?.includes(selectedDateIso);

              return (
                <div 
                  key={event.id}
                  onClick={() => { if (isTodo) handleToggleComplete(event); }}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between ${colors.bg} ${isTodo ? 'cursor-pointer' : ''} ${isTodo && isCompleted ? 'opacity-40' : ''}`}
                >
                  <div className="flex flex-col gap-0.5 max-w-[80%]">
                    <div className="flex items-center gap-1.5">
                      {/* 💡 [수정] 체크박스는 '할 일 등록(todo)' 타입에서만 노출 및 사용 */}
                      {isTodo && (
                        <input 
                          type="checkbox" 
                          checked={!!isCompleted} 
                          readOnly 
                          className="rounded text-blue-600 focus:ring-0 w-3.5 h-3.5 cursor-pointer" 
                        />
                      )}
                      <span className={`font-bold text-xs truncate ${isTodo && isCompleted ? 'line-through opacity-60' : ''}`}>{event.title}</span>
                    </div>
                    <span className="text-[10px] opacity-75 font-semibold">
                      {event.time} {getDisplayTypeLabel(event.displayType)}
                    </span>
                    {event.memo && <p className="text-[10px] opacity-60 truncate mt-1">{event.memo}</p>}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 2. 하단 폼 등록 레이아웃 영역 */}
      <div className="border-t pt-4 mt-4 flex flex-col gap-3 flex-shrink-0">
        
        {/* 하위 세그먼트 토글 탭 */}
        {/* 💡 [수정] '일정' 탭에서는 일정등록/구간등록/할일등록 3개 버튼으로, '루틴' 탭에서는 루틴등록 단일 표시로 분기 */}
        {activeTab === 'schedule' ? (
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 gap-1">
            <button
              type="button"
              onClick={() => setDisplayType('schedule')}
              className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                displayType === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              📌 일정 등록
            </button>
            <button
              type="button"
              onClick={() => setDisplayType('range')}
              className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                displayType === 'range' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              ↔️ 구간 등록
            </button>
            <button
              type="button"
              onClick={() => setDisplayType('todo')}
              className={`flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                displayType === 'todo' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              📝 할 일 등록
            </button>
          </div>
        ) : (
          <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <div className="flex-1 py-1.5 text-xs font-extrabold rounded-lg bg-white text-blue-600 shadow-sm text-center">
              🔄 루틴 등록
            </div>
          </div>
        )}

        {/* 타이틀 입력 */}
        <input
          type="text"
          placeholder={`${activeTab === 'schedule' ? '일정' : '루틴'} 제목을 입력하세요`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
        />

        {/* 날짜 범위 지정 */}
        {/* 💡 [수정] '할 일 등록'은 등록일 1칸만, 일정/구간 등록은 시작일/종료일 2칸을 표시 */}
        {displayType === 'todo' ? (
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-gray-400">등록일</label>
            <input 
              type="date" 
              value={startDateInput} 
              onChange={(e) => setStartDateInput(e.target.value)} 
              className="border text-xs p-1.5 rounded-lg text-gray-600 font-medium w-full focus:outline-none" 
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400">시작일</label>
              <input type="date" value={startDateInput} onChange={(e) => setStartDateInput(e.target.value)} className="border text-xs p-1.5 rounded-lg text-gray-600 font-medium w-full focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-gray-400">종료일</label>
              <input 
                type="date" 
                value={endDateInput} 
                onChange={(e) => setEndDateInput(e.target.value)} 
                className="border text-xs p-1.5 rounded-lg text-gray-600 font-medium w-full focus:outline-none" 
              />
            </div>
          </div>
        )}

        {/* 상세 옵션 제어 행 */}
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-bold text-gray-400 block mb-1">시간 설정</label>
            <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} className="w-full border text-xs p-1.5 rounded-lg text-gray-600 font-medium focus:outline-none">
              {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0')).map(h => <option key={h} value={h}>{h}시</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 block mb-1">&nbsp;</label>
            <select value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)} className="w-full border text-xs p-1.5 rounded-lg text-gray-600 font-medium focus:outline-none">
              {['00', '10', '20', '30', '40', '50'].map(m => <option key={m} value={m}>{m}분</option>)}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 block mb-1">반복 설정</label>
            <select value={repeat} onChange={(e) => setRepeat(e.target.value as any)} className="w-full border text-xs p-1.5 rounded-lg text-gray-600 font-medium focus:outline-none">
              <option value="none">없음</option>
              <option value="weekly">매주</option>
              <option value="monthly">매월</option>
              <option value="yearly">매년</option>
            </select>
              {repeat !== 'none' && (
  <div className="flex flex-wrap gap-1 mt-2">
    {['일','월','화','수','목','금','토'].map((day, idx) => (
      <button
        key={idx}
        type="button"
        onClick={() => {
          setRepeatDays(prev =>
            prev.includes(idx)
              ? prev.filter(d => d !== idx)
              : [...prev, idx]
          );
        }}
        className={`w-8 h-8 rounded-full text-xs font-bold
        ${
          repeatDays.includes(idx)
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        {day}
      </button>
    ))}
  </div>
)}
          </div>
        </div>

        {/* 비고란 */}
        <input
          type="text"
          placeholder="메모를 적어주세요 (선택)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 font-medium"
        />

        {/* 컬러 레이블 지정 단추 조합 */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-extrabold text-gray-400">
              {activeTab === 'schedule' ? '🗓️ 일정 태그 색상' : '🔄 루틴 태그 색상'}
            </span>
            <div className="flex gap-1.5">
              {Object.keys(colorMap).map((color) => {
                const targetColor = colorMap[color as keyof typeof colorMap];
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    /* 💡 [수정] 인라인 style 백그라운드에 hex 색상 코드가 완벽하게 매핑되도록 변경했습니다. */
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      currentSelectedColor === color ? 'border-gray-800 scale-110 shadow-sm' : 'border-gray-200 hover:scale-105'
                    }`}
                    style={{ backgroundColor: targetColor.hexColor }}
                  />
                );
              })}
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2.5 text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-sm transition-colors self-end"
          >
            {/* 💡 [수정] 일정/구간/할일/루틴 등록 버튼 라벨을 각각 분리하여 표시 */}
            {getSubmitLabel()}
          </button>
        </div>

      </div>

    </div>
  );
}