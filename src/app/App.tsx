import { Header } from './components/home/Header';
import AIBriefing from './components/home/AIBriefing';
import { TodaySchedule } from './components/home/TodaySchedule';
import { UpcomingSchedule } from './components/home/UpcomingSchedule';
import { RegisteredRoutines } from './components/home/RegisteredRoutines';
import { Memo } from './components/home/Memo';
import { StoreRecommendation } from './components/home/StoreRecommendation';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-4">

                {/* 🔥 전체 레이아웃 */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 items-start">

                    {/* 1행 */}
                    {/* ✅ col-span-2 추가 */}
                    <div className="col-span-2 lg:col-span-2">
                        <AIBriefing />
                    </div>

                    {/* ✅ col-span-2 추가하여 작은 화면에서 전체 너비 차지 */}
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

            </main>
        </div>
    );
}