// @ts-ignore
import aiImage from "../../../imports/image-2.png";

type Schedule = {
    time: string;
    title: string;
};

// --- DODO의 AI 일정 브리핑 컴포넌트 (상단) ---
export default function AIBriefing() {
    const schedules: Schedule[] = [
        { time: "10:00", title: "팀 미팅" },
        { time: "14:00", title: "클라이언트 미팅" },
        { time: "16:00", title: "문서 작성" },
    ];

    const todos = ["프로젝트 문서 작성", "이메일 답장"];
    const routines = ["아침 운동", "업무 정리"];

    const totalCount = schedules.length;

    const formatTime = (time: string) => {
        const [hour] = time.split(":").map(Number);
        return hour < 12
            ? `오전 ${hour}시`
            : `오후 ${hour - 12 || 12}시`;
    };

    const scheduleText = schedules
        .map((s) => `${formatTime(s.time)} ${s.title}`)
        .join(", ");

    const todoRoutineText = `할일로는 ${todos.join(", ")}이 있고, 루틴으로는 ${routines.join(", ")}이 예정되어 있어요.`;

    return (
        // ✅ col-span-2 제거!
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="mb-4">
                <p className="text-blue-600 text-sm font-medium mt-1">
                    DODO가 오늘 일정을 요약해드려요
                </p>
            </div>

            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="w-24">
                        <img
                            src={aiImage}
                            alt="AI 캐릭터"
                            className="w-full h-auto object-contain block"
                        />
                    </div>
                </div>

                <div className="relative flex-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                    <div className="absolute -left-2 top-6 w-4 h-4 bg-white border-l border-b border-gray-200 rotate-45"></div>

                    <h3 className="text-sm font-semibold text-gray-800 mb-3">
                        오늘은 총 <span className="text-blue-500">{totalCount}개의 일정</span>이 있어요!
                    </h3>

                    <p className="text-gray-700 text-sm leading-relaxed mb-2">
                        오늘은 {scheduleText} 일정이 있어요.
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        {todoRoutineText}
                    </p>

                    <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <p className="text-xs text-blue-600 font-semibold mb-1">
                            💡 DODO의 한마디
                        </p>
                        <p className="text-xs text-gray-600">
                            일정 사이에 짧은 휴식을 넣으면 집중력이 더 좋아질 거예요 🌿
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
