import { useState } from 'react';

import { Header } from './components/home/Header';
import { SettingsModal } from './components/home/Settings';
import Notice from './components/home/Notice';

import AIBriefing from './components/home/AIBriefing';
import { TodaySchedule } from './components/home/TodaySchedule';
import { UpcomingSchedule } from './components/home/UpcomingSchedule';
import { RegisteredRoutines } from './components/home/RegisteredRoutines';
import { Memo } from './components/home/Memo';
import { StoreRecommendation } from './components/home/StoreRecommendation';

export default function App() {

    // ✅ 현재 활성 메뉴
    const [activeMenu, setActiveMenu] = useState('HOME'); 

    // ✅ 설정 모달 상태
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ✅ Header */}
            <Header
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setIsSettingsOpen={setIsSettingsOpen}
            />

            <main className="max-w-7xl mx-auto px-6 py-4">

                {/* ✅ HOME 화면 */}
                {activeMenu === 'HOME' && (

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">

                        {/* 1행 */}
                        <div className="col-span-2 lg:col-span-2">
                            <AIBriefing />
                        </div>

                        <div className="col-span-2 lg:col-span-1">
                            <Memo />
                        </div>

                        {/* 2행 */}
                        <TodaySchedule />
                        <UpcomingSchedule />
                        <RegisteredRoutines />

                        {/* 3행 */}
                        <div className="col-span-2 lg:col-span-3">
                            <StoreRecommendation />
                        </div>

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