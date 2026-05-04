import { useState } from 'react';
import { Calendar, CheckSquare } from 'lucide-react';

const initialSchedules = [
  { time: '10:00', title: '팀 미팅', type: 'schedule' },
  { time: '14:00', title: '클라이언트 미팅', type: 'schedule' },
];

const initialTodos = [
  { title: '프로젝트 문서 작성', completed: false },
  { title: '이메일 답장', completed: false },
];

export function TodaySchedule() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (index: number) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      {/* 타이틀 */}
      <h2 className="text-gray-800 mb-2 flex items-center gap-2 text-base font-bold">
        <Calendar className="w-5 h-5" />
        오늘의 일정 체크
      </h2>

      <p className="text-xs text-gray-500 mb-3">
        "오늘의 일정을 확인하세요!"
      </p>

      <div className="space-y-3">
        
        {/* 일정 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            일정
          </h3>

          <div className="space-y-1.5">
            {initialSchedules.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
              >
                <span className="text-xs font-semibold text-blue-600">
                  {schedule.time}
                </span>
                <span className="text-xs text-gray-800">
                  {schedule.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 할일 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            할일
          </h3>

          <div className="space-y-1.5">
            {todos.map((todo, index) => (
              <div
                key={index}
                onClick={() => toggleTodo(index)}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <CheckSquare
                  className={`w-4 h-4 ${
                    todo.completed ? 'text-green-600' : 'text-gray-400'
                  }`}
                />

                <span
                  className={`text-xs ${
                    todo.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}