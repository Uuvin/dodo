import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

type LoginModalProps = {
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
};

export function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [userEml, setUserEml] = useState('');
  const [userPswd, setUserPswd] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // 💡 백엔드 UserController의 /api/user/login 엔드포인트와 연결합니다.
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEml, userPswd }),
      });

      if (!response.ok) {
        // 백엔드에서 던진 IllegalArgumentException 에러 메시지(예: "비밀번호가 일치하지 않습니다.")를 그대로 파싱
        const errorText = await response.text();
        throw new Error(errorText || '로그인에 실패했습니다.');
      }

      const userData = await response.json(); // 성공 시 유저 정보 객체 반환받음
      
      onLoginSuccess(userData); // 부모 컴포넌트에 알림
      onClose(); // 모달 닫기
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* 모달 본체 */}
      <div className="bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 상단 디자인 헤더 */}
        <div className="px-7 py-6 text-center bg-gradient-to-r from-[#3b3ed2] to-[#5a5df0] text-white relative">
          <h2 className="text-2xl font-bold">DODO 로그인</h2>
          <p className="text-xs text-white/80 mt-1.5">서비스 이용을 위해 로그인이 필요합니다.</p>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* 폼 입력 영역 */}
        <form onSubmit={handleSubmit} className="p-7 space-y-4">
          
          {/* 에러 메시지 표시 바 */}
          {errorMessage && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 이메일 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">이메일 계정</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={userEml}
                onChange={(e) => setUserEml(e.target.value)}
                placeholder="example@email.com"
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#3b3ed2] text-sm transition-colors"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                required
                value={userPswd}
                onChange={(e) => setUserPswd(e.target.value)}
                placeholder="••••••••"
                className="w-full border rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#3b3ed2] text-sm transition-colors"
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 rounded-xl bg-[#3b3ed2] text-white font-semibold hover:bg-[#2f32b8] transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? '로그인 중...' : '로그인하기'}
          </button>

          {/* 하단 보조 링크 */}
          <div className="flex justify-between items-center pt-2 text-xs text-gray-500">
            <button type="button" className="hover:underline">비밀번호 찾기</button>
            <div className="flex gap-2">
              <span>계정이 없으신가요?</span>
              <button type="button" className="text-[#3b3ed2] font-semibold hover:underline">회원가입</button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}