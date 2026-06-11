import { Memo } from '../app/components/homeboard/Memo';

export default function MemoPage() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">메모</h1>
      <Memo />
    </div>
  );
}
