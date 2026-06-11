import { Type, Palette, CalendarDays } from 'lucide-react';

const fontItems = [
  { name: '모던 고딕 폰트', price: '2,000원' },
  { name: '손글씨 폰트 팩', price: '3,500원' },
];

const colorItems = [
  { name: '파스텔 컬러 테마', price: '1,500원' },
  { name: '다크모드 테마', price: '2,000원' },
];

const dateItems = [
  { name: '날짜 스티커 팩', price: '1,800원' },
  { name: 'D-day 강조 세트', price: '2,500원' },
];

export function StoreRecommendation() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mt-4">
      
      {/* 타이틀 */}
      <h2 className="text-gray-900 mb-4 text-base font-bold">
        스토어 아이템 추천
      </h2>

      <div className="grid grid-cols-3 gap-4">
        
        {/* 폰트 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-600" />
            폰트
          </h3>

          <div className="space-y-2">
            {fontItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-2 hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Type className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600 font-bold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 컬러 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Palette className="w-4 h-4 text-gray-600" />
            컬러
          </h3>

          <div className="space-y-2">
            {colorItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-2 hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600 font-bold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 날짜 강조 */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gray-600" />
            날짜 강조
          </h3>

          <div className="space-y-2">
            {dateItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-2 hover:shadow-md hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <CalendarDays className="w-5 h-5 text-gray-500" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600 font-bold">
                      {item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}