import { useState, useRef, useEffect } from 'react';
import { StickyNote, Plus, Bold, Italic, Strikethrough, List } from 'lucide-react';

type MemoItem = {
    id: number;
    text: string;
    date: string;
    color: string;
};

const colorOptions = [
    { name: '노랑', value: 'bg-yellow-50 border-yellow-200' },
    { name: '파랑', value: 'bg-blue-50 border-blue-200' },
    { name: '회색', value: 'bg-gray-100 border-gray-200' },
    { name: '흰색', value: 'bg-white border-gray-200' },
    { name: '핑크', value: 'bg-pink-50 border-pink-200' },
    { name: '보라', value: 'bg-purple-50 border-purple-200' },
];

export function Memo() {
    const [memos, setMemos] = useState<MemoItem[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
    const [editId, setEditId] = useState<number | null>(null);

    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && editorRef.current) {
            if (editId) {
                const memo = memos.find(m => m.id === editId);
                editorRef.current.innerHTML = memo ? memo.text : '';
            } else {
                editorRef.current.innerHTML = '';
            }
            setTimeout(() => editorRef.current?.focus(), 100);
        }
    }, [isOpen, editId, memos]);

    const openAdd = () => {
        setEditId(null);
        setSelectedColor(colorOptions[0].value);
        setIsOpen(true);
    };

    const openEdit = (memo: MemoItem) => {
        setEditId(memo.id);
        setSelectedColor(memo.color);
        setIsOpen(true);
    };

    const saveMemo = () => {
        const htmlContent = editorRef.current?.innerHTML || '';
        if (!htmlContent.replace(/<[^>]*>/g, '').trim()) {
            setIsOpen(false);
            return;
        }

        if (editId) {
            setMemos(memos.map(m =>
                m.id === editId ? { ...m, text: htmlContent, color: selectedColor } : m
            ));
        } else {
            const newMemo: MemoItem = {
                id: Date.now(),
                text: htmlContent,
                date: new Date().toLocaleDateString(),
                color: selectedColor,
            };
            setMemos([newMemo, ...memos]);
        }
        setIsOpen(false);
    };

    const applyStyle = (e: React.MouseEvent, command: string) => {
        e.preventDefault();

        if (editorRef.current) {
            editorRef.current.focus();
            document.execCommand(command, false);
        }
    };

    const handleDragStart = (index: number) => setDragIndex(index);
    const handleDrop = (index: number) => {
        if (dragIndex === null) return;
        const updated = [...memos];
        const dragged = updated[dragIndex];
        updated.splice(dragIndex, 1);
        updated.splice(index, 0, dragged);
        setMemos(updated);
        setDragIndex(null);
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />
            )}

            {/* ✅ min-h-[320px] 추가하여 왼쪽 박스와 높이 맞춤 */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 min-h-[280px] flex flex-col">
                <div className="mb-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-gray-800 flex items-center gap-2 text-base font-bold">
                            <StickyNote className="w-5 h-5 text-[#3b3ed2]" />
                            메모
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">드래그로 순서를 조정하세요</p>
                    </div>
                    <button onClick={openAdd} className="w-8 h-8 flex items-center justify-center bg-[#3b3ed2] text-white rounded-lg shadow-sm hover:bg-[#2f31a8] transition-colors">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {/* ✅ flex-1 추가하여 남은 공간 채우기 */}
                <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                    {memos.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        </div>
                    ) : (
                        memos.map((memo, index) => (
                            <div
                                key={memo.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(index)}
                                onClick={() => openEdit(memo)}
                                className={`p-3 rounded-lg cursor-move border transition-all ${memo.color} ${dragIndex === index ? 'opacity-30' : 'hover:shadow-md'}`}
                            >
                                <div
                                    className="text-sm text-gray-800 line-clamp-3"
                                    dangerouslySetInnerHTML={{ __html: memo.text }}
                                />
                                <p className="text-[10px] text-gray-400 mt-2 text-right">{memo.date}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 사이드바 */}
            <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-bold mb-5">{editId ? '메모 수정' : '새 메모 작성'}</h3>

                    <div className="flex gap-2.5 mb-6">
                        {colorOptions.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => setSelectedColor(color.value)}
                                className={`w-7 h-7 rounded-full border transition-all ${color.value} ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : 'border-gray-200'}`}
                                aria-label={color.name}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-1 mb-0 p-1.5 bg-gray-50 border border-b-0 rounded-t-xl">
                        <button onMouseDown={(e) => applyStyle(e, 'bold')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Bold size={16}/></button>
                        <button onMouseDown={(e) => applyStyle(e, 'italic')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Italic size={16}/></button>
                        <button onMouseDown={(e) => applyStyle(e, 'strikeThrough')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><Strikethrough size={16}/></button>
                        <div className="w-px h-4 bg-gray-300 mx-1" />
                        <button onMouseDown={(e) => applyStyle(e, 'insertUnorderedList')} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"><List size={16}/></button>
                    </div>

                    <div
                        ref={editorRef}
                        contentEditable
                        className={`flex-1 p-5 border rounded-b-xl text-sm outline-none overflow-y-auto transition-colors duration-500 ${selectedColor} prose prose-sm max-w-none`}
                        style={{ minHeight: '300px' }}
                    />

                    <div className="mt-6 flex gap-3">
                        <button onClick={() => setIsOpen(false)} className="flex-1 bg-gray-100 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-colors">취소</button>
                        <button onClick={saveMemo} className="flex-1 bg-[#3b3ed2] text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-[#2f31a8] transition-colors">저장하기</button>
                    </div>
                </div>
            </div>

            <style>{`
        .prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.5rem 0; }
        .prose li { margin: 0.2rem 0; }
        [contenteditable]:empty:before {
          content: "내용을 입력하세요...";
          color: #9ca3af;
        }
      `}</style>
        </>
    );
}