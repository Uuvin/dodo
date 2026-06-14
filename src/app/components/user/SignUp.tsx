import { useState } from 'react';
import { Mail, Lock, User, Phone, Smile, AlertCircle } from 'lucide-react';

type SignupModalProps = {
  onClose: () => void;
  onSwitchToLogin: () => void; // 회원가입 완료 후나 로그인 링크 클릭 시 전환용
};

export function SignupModal({ onClose, onSwitchToLogin }: SignupModalProps) {
  const [userEml, setUserEml] = useState('');
  const [userPswd, setUserPswd] = useState('');
  const [userNm, setUserNm] = useState('');
  const [userNick, setUserNick] = useState('');
  const [userTelno, setUserTelno] = useState('');
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // 💡 백엔드 UserController의 /api/user/signup 엔드포인트와 연결
      const response = await fetch('http://localhost:8080/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEml, userPswd, userNm, userNick, userTelno }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || '회원가입에 실패했습니다.');
      }

      alert('회원가입이 완료되었습니다! 로그인해 주세요.');
      onClose();
      onSwitchToLogin(); // 가입 성공 후 로그인 창 열어주기
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-[450px] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* 헤더 */}
        <div className="px-7 py-6 text-center bg-gradient-to-r from-[#3b3ed2] to-[#5a5df0] text-white relative">
          <h2 className="text-2xl font-bold">DODO 회원가입</h2>
          <p className="text-xs text-white/80 mt-1.5">새로운 여정을 dodo와 함께 시작해보세요.</p>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center">✕</button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="p-7 space-y-3.5 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm border border-red-100">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 이메일 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <input type="email" required value={userEml} onChange={(e) => setUserEml(e.target.value)} placeholder="example@email.com" className="w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[#3b3ed2]" />
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <input type="password" required value={userPswd} onChange={(e) => setUserPswd(e.target.value)} placeholder="비밀번호 입력" className="w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[#3b3ed2]" />
            </div>
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">이름</label>
            <div className="relative">
              <User className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <input type="text" required value={userNm} onChange={(e) => setUserNm(e.target.value)} placeholder="홍길동" className="w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[#3b3ed2]" />
            </div>
          </div>

          {/* 닉네임 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">닉네임</label>
            <div className="relative">
              <Smile className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <input type="text" required value={userNick} onChange={(e) => setUserNick(e.target.value)} placeholder="멋진새" className="w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[#3b3ed2]" />
            </div>
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">전화번호</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
              <input type="tel" required value={userTelno} onChange={(e) => setUserTelno(e.target.value)} placeholder="010-1234-5678" className="w-full border rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-[#3b3ed2]" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full mt-4 py-3 rounded-xl bg-[#3b3ed2] text-white font-semibold hover:bg-[#2f32b8] transition-colors disabled:bg-gray-400 text-sm shadow-sm">
            {isLoading ? '가입 진행 중...' : '동의하고 가입하기'}
          </button>

          <div className="text-center pt-2 text-xs text-gray-500">
            이미 계정이 있으신가요?{' '}
            <button type="button" onClick={() => { onClose(); onSwitchToLogin(); }} className="text-[#3b3ed2] font-semibold hover:underline">로그인하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}