import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Bell, Pin } from "lucide-react";

type Category = "전체" | "업데이트" | "이벤트" | "점검" | "공지";

interface Notice {
  id: number;
  category: Category;
  title: string;
  author: string;
  date: string;
  isNew?: boolean;
  isPinned?: boolean;
  views?: number;
}

const PINNED_NOTICES: Notice[] = [
  {
    id: 101,
    category: "업데이트",
    title: "서비스 업데이트 안내",
    author: "관리자",
    date: "2026-05-12",
    isNew: true,
    isPinned: true,
  },
  {
    id: 102,
    category: "점검",
    title: "서버 점검 예정 안내",
    author: "관리자",
    date: "2026-05-11",
    isPinned: true,
  },
];

const ALL_NOTICES: Notice[] = [
  { id: 1, category: "이벤트", title: "출석 이벤트 안내", author: "관리자", date: "2026-05-12", isNew: true, views: 1024 },
  { id: 2, category: "업데이트", title: "캘린더 UI 개선 안내", author: "관리자", date: "2026-05-10", views: 872 },
  { id: 3, category: "공지", title: "사이트 오픈 안내", author: "관리자", date: "2026-05-09", views: 2341 },
  { id: 4, category: "이벤트", title: "신규 가입 이벤트 안내", author: "관리자", date: "2026-05-07", views: 651 },
  { id: 5, category: "업데이트", title: "모바일 앱 버전 업데이트", author: "관리자", date: "2026-05-05", views: 430 },
  { id: 6, category: "점검", title: "5월 정기 점검 안내", author: "관리자", date: "2026-05-03", views: 319 },
  { id: 7, category: "공지", title: "개인정보 처리방침 개정 안내", author: "관리자", date: "2026-04-30", views: 789 },
];

const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  업데이트: { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-400" },
  이벤트: { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-400" },
  점검: { bg: "bg-rose-50", text: "text-rose-600", dot: "bg-rose-400" },
  공지: { bg: "bg-violet-50", text: "text-violet-600", dot: "bg-violet-400" },
};

const PINNED_ACCENT: Record<string, { border: string; header: string; date_bg: string; date_text: string }> = {
  업데이트: {
    border: "border-[#3b3ed2]/20",
    header: "bg-[#3b3ed2]",
    date_bg: "bg-blue-50 border-blue-100",
    date_text: "text-[#3b3ed2]",
  },
  점검: {
    border: "border-rose-200",
    header: "bg-rose-500",
    date_bg: "bg-rose-50 border-rose-100",
    date_text: "text-rose-500",
  },
};

function CategoryBadge({ category }: { category: string }) {
  const s =
    CATEGORY_STYLES[category] ?? {
      bg: "bg-gray-100",
      text: "text-gray-500",
      dot: "bg-gray-400",
    };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {category}
    </span>
  );
}

function PinnedCard({ notice }: { notice: Notice }) {
  const a = PINNED_ACCENT[notice.category] ?? PINNED_ACCENT["업데이트"];

  const [month, day] = [
    new Date(notice.date).toLocaleString("en-US", { month: "short" }).toUpperCase(),
    new Date(notice.date).getDate(),
  ];

  return (
    <div className="group flex items-center gap-4 px-5 py-4 border-b border-[#3b3ed2]/8 last:border-b-0 hover:bg-primary/[0.02] cursor-pointer transition-colors duration-150">
      <div className={`flex-shrink-0 w-[54px] rounded-xl border ${a.date_bg} overflow-hidden shadow-sm`}>
        <div className={`${a.header} text-white text-[9px] font-semibold py-1 text-center tracking-widest`}>
          {month}
        </div>

        <div className={`py-1.5 text-center text-base font-bold ${a.date_text}`}>
          {day}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <CategoryBadge category={notice.category} />

          <span className="font-semibold text-[15px] text-foreground truncate group-hover:text-primary transition-colors">
            {notice.title}
          </span>

          {notice.isNew && (
            <span className="flex-shrink-0 text-[10px] font-bold text-white bg-rose-500 px-1.5 py-0.5 rounded-full leading-none">
              NEW
            </span>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          {notice.author} · {notice.date}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0" />
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category | "전체">("전체");
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 5;

  const categories: Array<Category | "전체"> = [
    "전체",
    "업데이트",
    "이벤트",
    "점검",
    "공지",
  ];

  const filtered = ALL_NOTICES
    .filter((n) => {
      const matchCat =
        activeCategory === "전체" || n.category === activeCategory;

      const matchQ = !query || n.title.includes(query);

      return matchCat && matchQ;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function handleCategoryChange(cat: Category | "전체") {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  return (
    <div
      className="min-h-screen bg-background py-10 px-4"
      style={{ fontFamily: "'Noto Sans KR', 'Inter', sans-serif" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/25">
              <Bell className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                공지사항
              </h1>

              <p className="text-xs text-muted-foreground mt-0.5">
                총 {ALL_NOTICES.length}개의 공지
              </p>
            </div>
          </div>
        </div>

        {/* 중요 공지 */}
        <div className="bg-card rounded-2xl border border-[#3b3ed2]/15 shadow-sm overflow-hidden mb-14">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[#3b3ed2]/10 bg-secondary/40">
            <Pin className="w-3.5 h-3.5 text-primary" />
            <span className="text-sm font-semibold text-primary">
              중요 공지
            </span>
          </div>

          {PINNED_NOTICES.map((n) => (
            <PinnedCard key={n.id} notice={n} />
          ))}
        </div>

        {/* 카테고리 + 검색 */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">

          {/* 카테고리 */}
          <div className="flex gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 검색 */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />

              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="공지사항 검색"
                className="pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-xl w-56 outline-none focus:border-primary focus:ring-2 focus:ring-ring transition-all placeholder:text-muted-foreground/60"
              />
            </div>

            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-sm shadow-primary/20">
              검색
            </button>
          </div>
        </div>

        {/* 일반 공지 테이블 */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mb-6">

          <div className="grid grid-cols-12 px-5 py-3 bg-secondary/50 border-b border-border">
            <div className="col-span-1 text-xs font-semibold text-muted-foreground">
              번호
            </div>

            <div className="col-span-7 text-xs font-semibold text-muted-foreground">
              제목
            </div>

            <div className="col-span-2 text-xs font-semibold text-muted-foreground">
              작성자
            </div>

            <div className="col-span-2 text-xs font-semibold text-muted-foreground">
              작성일
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              검색 결과가 없습니다.
            </div>
          ) : (
            paginated.map((notice, idx) => (
              <div
                key={notice.id}
                className={`group grid grid-cols-12 items-center px-5 py-3.5 cursor-pointer transition-colors duration-100 hover:bg-secondary/40 ${
                  idx < paginated.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="col-span-1 text-sm text-muted-foreground font-medium">
                  {(currentPage - 1) * PER_PAGE + idx + 1}
                </div>

                <div className="col-span-7 flex items-center gap-2 min-w-0">
                  <CategoryBadge category={notice.category} />

                  <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {notice.title}
                  </span>

                  {notice.isNew && (
                    <span className="flex-shrink-0 text-[9px] font-bold text-white bg-rose-500 px-1.5 py-0.5 rounded-full leading-none">
                      NEW
                    </span>
                  )}
                </div>

                <div className="col-span-2 text-sm text-muted-foreground">
                  {notice.author}
                </div>

                <div className="col-span-2 text-sm text-muted-foreground tabular-nums">
                  {notice.date}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-1">
          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}