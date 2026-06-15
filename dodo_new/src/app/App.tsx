// App.tsx
import { useState } from 'react'; 

import { Header } from './components/homeboard/Header';
import AIBriefing from './components/homeboard/AIBriefing';
import { TodaySchedule } from './components/homeboard/TodaySchedule';
import { UpcomingSchedule } from './components/homeboard/UpcomingSchedule';
// import { RegisteredRoutines } from './components/homeboard/RegisteredRoutines';
import { Memo } from './components/homeboard/Memo';
import { StoreRecommendation } from './components/homeboard/StoreRecommendation';
import { SettingsModal } from './components/settings/Settings';
import Notice from './components/notice/Notice';
import { Calendar } from './components/calendar/Calendar'; // 💡 SidePanel 임포트는 삭제

export default function App() {
    // ✅ 현재 활성 메뉴
    const [activeMenu, setActiveMenu] = useState('HOME');
    // ✅ 설정 모달 상태
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setIsSettingsOpen={setIsSettingsOpen} 
            />

            <main className="max-w-7xl mx-auto px-6 py-4">
                {/* 🏠 HOME 영역 */}
                {activeMenu === 'HOME' && (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                        <div className="col-span-2 lg:col-span-2"><AIBriefing /></div>
                        <div className="col-span-2 lg:col-span-1"><Memo /></div>
                        <TodaySchedule />
                        <UpcomingSchedule />
                        {/* <RegisteredRoutines /> */}
                        <div className="col-span-2 lg:col-span-3"><StoreRecommendation /></div>
                    </div>
                )}

                {/* 📅 캘린더 영역 (App이 들고 있던Props를 전부 제거하고 단순 호출) */}
                {activeMenu === '캘린더' && (
                    <div className="mt-5">
                        <Calendar />
                    </div>
                )}

                {/* ✅ 공지사항 화면 */}
                {activeMenu === '공지사항' && (
                    <Notice />
                )}

            </main>

            {/* ✅ 설정 모달 */}
            {isSettingsOpen && (
                <SettingsModal
                    onClose={() => setIsSettingsOpen(false)}
                />
            )}
        
        </div>
    );
}