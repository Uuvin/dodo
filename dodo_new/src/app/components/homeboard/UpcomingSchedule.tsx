import { useState } from 'react';
import { Clock } from 'lucide-react';

const initialEvents = [
  { date: '4월 29일', title: '분기별 보고서 제출', daysLeft: 1, completed: false },
  { date: '4월 30일', title: '프로젝트 킥오프 미팅', daysLeft: 2, completed: false },
];

export function UpcomingSchedule() {
  const [events, setEvents] = useState(initialEvents);

  const toggleEvent = (index: number) => {
    const updated = [...events];
    updated[index].completed = !updated[index].completed;
    setEvents(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      
      {/* 타이틀 */}
      <h2 className="text-gray-800 mb-2 flex items-center gap-2 text-base font-bold">
        <Clock className="w-5 h-5" />
        다가오는 일정 체크
      </h2>

      <p className="text-xs text-gray-500 mb-3">
        "조만간 다가오는 일정을 확인하세요!"
      </p>

      <div className="space-y-2">
        {events.map((event, index) => (
          <div
            key={index}
            onClick={() => toggleEvent(index)}
            className={`p-3 rounded-lg border cursor-pointer transition
              ${event.completed
                ? 'bg-gray-100 border-gray-200'
                : 'bg-purple-50 border-purple-100 hover:bg-purple-100'}
            `}
          >
            <div className="flex justify-between items-start mb-1">
              <span
                className={`text-sm font-bold ${
                  event.completed ? 'text-gray-400' : 'text-purple-600'
                }`}
              >
                {event.date}
              </span>

              <span
                className={`text-xs font-semibold ${
                  event.completed ? 'text-gray-400' : 'text-purple-500'
                }`}
              >
                D-{event.daysLeft}
              </span>
            </div>

            <p
              className={`text-sm ${
                event.completed
                  ? 'text-gray-400 line-through'
                  : 'text-gray-800'
              }`}
            >
              {event.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}