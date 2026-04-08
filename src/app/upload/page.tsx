'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Category } from '@/types/prompt'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES: Category[] = [
  '창작', '코딩', '비즈니스', '교육', '디자인', '유머', '기타'
]

export default function UploadPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
    category: '창작',
    author_name: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase
        .from('prompts')
        .insert([{
          ...formData,
          author_name: formData.author_name || '익명'
        }])

      if (error) throw error

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Error uploading prompt:', err)
      alert('프롬프트 업로드에 실패했습니다. Supabase 연결을 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        <span>피드로 돌아가기</span>
      </Link>

      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">새 프롬프트 공유하기</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">제목</label>
            <input
              required
              type="text"
              placeholder="프롬프트의 특징을 잘 나타내는 제목을 지어주세요"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">카테고리</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">작성자 이름</label>
              <input
                type="text"
                placeholder="표시될 이름"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">간략한 설명</label>
            <textarea
              rows={2}
              placeholder="이 프롬프트는 어떤 용도로 사용하나요?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">프롬프트 본문 (Markdown 지원)</label>
            <textarea
              required
              rows={10}
              placeholder="여기에 프롬프트를 붙여넣으세요..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex justify-center items-center gap-2"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
            {loading ? '공유 중...' : '프롬프트 공유하기'}
          </button>
        </form>
      </div>
    </div>
  )
}
