import { useState } from 'react';

import {
  Globe,
  Type,
  Moon,
  Bell,
  Shield,
  Palette,
  User,
  Monitor,
  Volume2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type SettingsProps = {
  onClose: () => void;
};

export function SettingsModal({ onClose }: SettingsProps) { 

  // ✅ 펼쳐진 메뉴 상태
  const [openSection, setOpenSection] = useState<string | null>('account');

  // ✅ 토글 함수
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      {/* 모달 */}
      <div className="bg-white w-[560px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* 상단 헤더 */}
        <div className="px-7 py-5 border-b bg-gradient-to-r from-[#3b3ed2] to-[#5a5df0] text-white">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                설정
              </h2>

              <p className="text-sm text-white/80 mt-1">
                DODO 서비스 환경을 설정할 수 있습니다.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-lg"
            >
              ✕
            </button>

          </div>

        </div>

        {/* 내용 */}
        <div className="p-7 space-y-4 max-h-[70vh] overflow-y-auto">

          {/* ================= 계정 ================= */}
          <div className="border rounded-2xl overflow-hidden">

            <button
              onClick={() => toggleSection('account')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >

              <div className="flex items-center gap-2">

                <User className="w-5 h-5 text-[#3b3ed2]" />

                <h3 className="font-semibold text-lg">
                  계정
                </h3>

              </div>

              {openSection === 'account'
                ? <ChevronUp className="w-5 h-5 text-gray-500" />
                : <ChevronDown className="w-5 h-5 text-gray-500" />
              }

            </button>

            {openSection === 'account' && (

              <div className="px-5 pb-5 space-y-4 border-t">

                <div className="pt-4">

                  <label className="block text-sm font-medium mb-2">
                    닉네임
                  </label>

                  <input
                    type="text"
                    placeholder="DODO USER"
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#3b3ed2]"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    이메일
                  </label>

                  <input
                    type="email"
                    placeholder="example@email.com"
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#3b3ed2]"
                  />

                </div>

              </div>
            )}

          </div>

          {/* ================= 화면 설정 ================= */}
          <div className="border rounded-2xl overflow-hidden">

            <button
              onClick={() => toggleSection('display')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >

              <div className="flex items-center gap-2">

                <Monitor className="w-5 h-5 text-[#3b3ed2]" />

                <h3 className="font-semibold text-lg">
                  화면 설정
                </h3>

              </div>

              {openSection === 'display'
                ? <ChevronUp className="w-5 h-5 text-gray-500" />
                : <ChevronDown className="w-5 h-5 text-gray-500" />
              }

            </button>

            {openSection === 'display' && (

              <div className="px-5 pb-5 space-y-5 border-t">

                <div className="pt-4">

                  <label className="flex items-center gap-2 text-sm font-medium mb-2">

                    <Globe className="w-4 h-4" />

                    언어

                  </label>

                  <select className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#3b3ed2]">

                    <option>한국어</option>
                    <option>English</option>
                    <option>日本語</option>

                  </select>

                </div>

                <div>

                  <label className="flex items-center gap-2 text-sm font-medium mb-3">

                    <Type className="w-4 h-4" />

                    폰트 크기

                  </label>

                  <input
                    type="range"
                    min="12"
                    max="30"
                    className="w-full accent-[#3b3ed2]"
                  />

                </div>

                <div className="flex items-center justify-between border rounded-xl px-4 py-3">

                  <div className="flex items-center gap-2">

                    <Moon className="w-4 h-4" />

                    <span className="text-sm font-medium">
                      다크모드
                    </span>

                  </div>

                  <input
                    type="checkbox"
                    className="accent-[#3b3ed2]"
                  />

                </div>

                <div>

                  <label className="flex items-center gap-2 text-sm font-medium mb-2">

                    <Palette className="w-4 h-4" />

                    테마 컬러

                  </label>

                  <div className="flex gap-3">

                    <button className="w-8 h-8 rounded-full bg-[#3b3ed2] border-2 border-black" />

                    <button className="w-8 h-8 rounded-full bg-pink-500" />

                    <button className="w-8 h-8 rounded-full bg-green-500" />

                    <button className="w-8 h-8 rounded-full bg-orange-500" />

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ================= 알림 ================= */}
          <div className="border rounded-2xl overflow-hidden">

            <button
              onClick={() => toggleSection('alarm')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >

              <div className="flex items-center gap-2">

                <Bell className="w-5 h-5 text-[#3b3ed2]" />

                <h3 className="font-semibold text-lg">
                  알림 설정
                </h3>

              </div>

              {openSection === 'alarm'
                ? <ChevronUp className="w-5 h-5 text-gray-500" />
                : <ChevronDown className="w-5 h-5 text-gray-500" />
              }

            </button>

            {openSection === 'alarm' && (

              <div className="px-5 pb-5 space-y-3 border-t pt-4">

                <div className="flex items-center justify-between border rounded-xl px-4 py-3">

                  <span className="text-sm">
                    푸시 알림
                  </span>

                  <input type="checkbox" className="accent-[#3b3ed2]" />

                </div>

                <div className="flex items-center justify-between border rounded-xl px-4 py-3">

                  <span className="text-sm">
                    일정 알림
                  </span>

                  <input type="checkbox" className="accent-[#3b3ed2]" />

                </div>

                <div className="flex items-center justify-between border rounded-xl px-4 py-3">

                  <div className="flex items-center gap-2">

                    <Volume2 className="w-4 h-4" />

                    <span className="text-sm">
                      효과음
                    </span>

                  </div>

                  <input type="checkbox" className="accent-[#3b3ed2]" />

                </div>

              </div>
            )}

          </div>

          {/* ================= 보안 ================= */}
          <div className="border rounded-2xl overflow-hidden">

            <button
              onClick={() => toggleSection('security')}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >

              <div className="flex items-center gap-2">

                <Shield className="w-5 h-5 text-[#3b3ed2]" />

                <h3 className="font-semibold text-lg">
                  보안
                </h3>

              </div>

              {openSection === 'security'
                ? <ChevronUp className="w-5 h-5 text-gray-500" />
                : <ChevronDown className="w-5 h-5 text-gray-500" />
              }

            </button>

            {openSection === 'security' && (

              <div className="px-5 pb-5 space-y-3 border-t pt-4">

                <button className="w-full border rounded-xl px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  비밀번호 변경
                </button>

                <button className="w-full border rounded-xl px-4 py-3 text-left hover:bg-gray-50 transition-colors">
                  로그인 기록 확인
                </button>

              </div>
            )}

          </div>

        </div>

        {/* 하단 버튼 */}
        <div className="px-7 py-5 border-t bg-gray-50 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border hover:bg-gray-100 transition-colors"
          >
            취소
          </button>

          <button className="px-5 py-2.5 rounded-xl bg-[#3b3ed2] text-white hover:bg-[#2f32b8] transition-colors shadow-sm">
            저장하기
          </button>

        </div>

      </div>

    </div>
  );
}