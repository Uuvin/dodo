import {
  LogIn,
  UserPlus,
  Calendar,
  Repeat,
  ShoppingBag,
  Settings,
  Megaphone,
  Home
} from 'lucide-react';

// ✅ 메뉴 아이템과 그에 맞는 아이콘 매핑
const menuConfig = [
  { name: 'HOME', icon: Home },
  { name: '캘린더', icon: Calendar },
  { name: '루틴', icon: Repeat },
  { name: '스토어', icon: ShoppingBag },
  { name: '설정', icon: Settings },
  { name: '공지사항', icon: Megaphone },
];

// ✅ 추가
type HeaderProps = {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  setIsSettingsOpen: (open: boolean) => void;
};

// ✅ 수정
export function Header({
  activeMenu,
  setActiveMenu,
  setIsSettingsOpen
}: HeaderProps) {

  return (
    <header className="border-b border-gray-300 bg-white px-6 py-3 relative">
      <div className="flex items-center">

        {/* 🔹 로고 영역 (크기 확대 버전) */}
        <div className="flex items-center">
          <div className="flex flex-col">

            <h1 className="text-[#3b3ed2] font-black text-2xl leading-none tracking-tight">
              DODO
            </h1>

            <p className="text-[11px] text-gray-400 font-bold tracking-[0.1em] mt-1 uppercase">
              Messenger Bird
            </p>

          </div>
        </div>

        {/* 🔥 메뉴 (중앙 정렬) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-1 items-end">

          {menuConfig.map((item) => {

            const isActive = activeMenu === item.name;
            const Icon = item.icon;

            return (
              <button
                key={item.name}

                // ✅ 수정된 부분
                onClick={() => {

                  // 설정은 모달
                  if (item.name === '설정') {
                    setIsSettingsOpen(true);
                    return;
                  }

                  // 나머지는 화면 변경
                  setActiveMenu(item.name);
                }}

                className={`relative px-4 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3b3ed2] text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-t-lg'
                }`}

                style={
                  isActive
                    ? {
                        clipPath:
                          'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)',
                        borderTopLeftRadius: '8px',
                      }
                    : {}
                }
              >

                <span className="relative z-10 flex items-center gap-1.5">
                  {isActive && <Icon className="w-4 h-4" />}
                  {item.name}
                </span>

                {/* 종이 접힌 효과 */}
                {isActive && (
                  <div
                    className="absolute top-0 right-0 w-3 h-3 bg-blue-300/50"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 100%)',
                    }}
                  />
                )}

              </button>
            );
          })}

        </nav>

        {/* 🔹 로그인 / 회원가입 (오른쪽 고정) */}
        <div className="ml-auto flex items-center gap-2">

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3b3ed2] text-[#3b3ed2] text-sm font-medium transition-colors hover:bg-blue-50">
            <LogIn className="w-4 h-4" />
            로그인
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#3b3ed2] text-white text-sm font-medium transition-colors hover:bg-[#2f32b8] shadow-sm">
            <UserPlus className="w-4 h-4" />
            회원가입
          </button>

        </div>

      </div>
    </header>
  );
}