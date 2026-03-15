'use client';

import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = ['健康', 'お金', '時間', '習慣', 'デジタル'];

export function NewChallengeForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API連携
    console.log({ title, reason, category: selectedCategory });
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-7 w-full max-w-[600px]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-fraunces text-[22px] font-semibold text-[var(--color-text-primary)] tracking-tight">
          新しい挑戦を始める
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {/* やめたいこと */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[var(--color-text-primary)] text-[15px] font-semibold">
            やめたいこと
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="夜食・お菓子"
            className="w-full h-12 rounded-xl bg-[#1F2937] border border-white/10 px-4 text-[15px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] outline-none focus:border-accent transition"
          />
        </div>

        {/* やめたい理由 */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[var(--color-text-primary)] text-[15px] font-semibold">
            やめたい理由
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="健康診断で体重が増えていた"
            rows={4}
            className="w-full h-[100px] rounded-xl bg-[#1F2937] border border-white/10 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] outline-none focus:border-accent transition resize-none leading-relaxed"
          />
        </div>

        {/* カテゴリ */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-[var(--color-text-primary)] text-[15px] font-semibold">
            カテゴリ
          </label>
          <div className="flex gap-2.5 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? null : cat)}
                  className={`rounded-full px-4 py-2 text-[13px] border transition ${
                    isSelected
                      ? 'bg-[#6366F120] border-[#6366F150] text-[#A5B4FC] font-semibold'
                      : 'bg-white/5 border-white/10 text-[var(--color-text-secondary)] font-medium hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full h-[52px] rounded-xl bg-accent text-white text-base font-semibold hover:brightness-110 transition"
        >
          <Plus size={18} />
          <span>挑戦を始める</span>
        </button>
      </form>
    </div>
  );
}
