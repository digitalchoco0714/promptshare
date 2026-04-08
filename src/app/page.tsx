import { createClient } from '@/utils/supabase/server'
import PromptCard from '@/components/PromptCard'
import { Prompt } from '@/types/prompt'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = await createClient()
  
  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching prompts:', error)
  }

  return (
    <div className="space-y-8">
      <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
          당신의 <span className="text-indigo-600">마법의 주문</span>을 공유하세요
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          커뮤니티가 만들어가는 고품질 AI 프롬프트 모음입니다.<br className="hidden sm:inline" />
          다양한 AI 모델을 위한 최고의 프롬프트를 발견하고, 복사하고, 공유해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts && prompts.length > 0 ? (
          prompts.map((prompt: Prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400 text-lg italic">아직 공유된 프롬프트가 없습니다. 첫 번째 주인공이 되어보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}
