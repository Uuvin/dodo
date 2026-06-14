import { useState, useEffect } from 'react';

import { Header } from './components/home/Header';
import { SettingsModal } from './components/setting/Settings';
import { LoginModal } from './components/user/login'; // 💡 로그인 모달 임포트
import Notice from './components/notice/Notice';
import { SignupModal } from './components/user/SignUp'; // 💡 회원가입 모달 임포트

import AIBriefing from './components/home/AIBriefing';
import { TodaySchedule } from './components/home/TodaySchedule';
import { UpcomingSchedule } from './components/home/UpcomingSchedule';
import { RegisteredRoutines } from './components/home/RegisteredRoutines';
import { Memo } from './components/home/Memo';
import { StoreRecommendation } from './components/home/StoreRecommendation';

export default function App() {
    // 현재 활성 메뉴
    const [activeMenu, setActiveMenu] = useState('HOME'); 

    // 설정 모달 상태
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // ✅ [추가] 로그인 모달 열림/닫힘 상태
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    // ✅ [추가] 현재 인증된 로그인 유저 정보 상태
    const [currentUser, setCurrentUser] = useState<any>(null);

    // ✨ [추가] 회원가입 모달의 열림/닫힘 상태
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    // ✅ [추가] 브라우저를 새로고침해도 로그인 상태가 풀리지 않도록 감지
    useEffect(() => {
        const savedUser = sessionStorage.getItem('dodo_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    // ✅ [추가] 로그인 성공 시 처리 장치
    const handleLoginSuccess = (userData: any) => {
        setCurrentUser(userData);
        sessionStorage.setItem('dodo_user', JSON.stringify(userData)); // 브라우저 세션에 보관
        alert(`${userData.userNick}님, 환영합니다!`);
    };

    // ✅ [추가] 로그아웃 기능 필요 시 호출 장치
    const handleLogout = () => {
        setCurrentUser(null);
        sessionStorage.removeItem('dodo_user');
        alert('로그아웃 되었습니다.');
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ✅ Header 쪽에 유저 세션 정보와 로그인 창 여는 권한 전달 */}
            <Header
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                setIsSettingsOpen={setIsSettingsOpen}
                currentUser={currentUser}              // [전달] 유저 정보
                setIsLoginOpen={setIsLoginOpen}          // [전달] 로그인 모달 트리거
                setIsSignupOpen={setIsSignupOpen} // ✨ [추가] Header로 함수 전달
                onLogout={handleLogout}                  // [전달] 로그아웃 처리
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

            {/* ✅ [추가] 로그인 모달 팝업 조건부 렌더링 */}
            {isLoginOpen && (
                <LoginModal
                    onClose={() => setIsLoginOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}

            {/* ✨ [추가] 회원가입 모달 팝업 조건부 렌더링 */}
            {isSignupOpen && (
                <SignupModal 
                    onClose={() => setIsSignupOpen(false)} 
                    onSwitchToLogin={() => setIsLoginOpen(true)} 
                />
            )}

        </div>
    );
}