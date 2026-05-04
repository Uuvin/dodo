import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const initialRoutines = [
  { name: '아침 운동', time: '07:00', completed: true },
  { name: '업무 정리', time: '18:00', completed: false },
];

export function RegisteredRoutines() {
  const [routines, setRoutines] = useState(initialRoutines);

  const toggleRoutine = (index: number) => {
    const updated = [...routines];
    updated[index].completed = !updated[index].completed;
    setRoutines(updated);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      
      {/* 타이틀 */}
      <h2 className="text-gray-800 mb-3 flex items-center gap-2 text-base font-bold">
        <RefreshCw className="w-5 h-5" />
        나의 루틴
      </h2>

      <p className="text-xs text-gray-500 mb-3">
        "등록된 루틴을 확인하고 관리하세요!"
      </p>

      <div className="space-y-2">
        {routines.map((routine, index) => (
          <div
            key={index}
            onClick={() => toggleRoutine(index)}
            className={`p-2.5 rounded-lg border cursor-pointer transition
              ${routine.completed
                ? 'bg-gray-100 border-gray-200'
                : 'bg-green-50 border-green-100 hover:bg-green-100'}
            `}
          >
            <div className="flex justify-between items-center">
              <div>
                <p
                  className={`text-sm font-semibold ${
                    routine.completed
                      ? 'text-gray-400 line-through'
                      : 'text-gray-800'
                  }`}
                >
                  {routine.name}
                </p>
                <p
                  className={`text-xs ${
                    routine.completed ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {routine.time}
                </p>
              </div>

              {/* 상태 표시 점 */}
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  routine.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}