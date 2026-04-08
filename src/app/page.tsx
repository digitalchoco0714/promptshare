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
          Share Your <span className="text-indigo-600">Magic Words</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The largest community-driven collection of high-quality AI prompts. 
          Discover, copy, and share the best prompts for AI models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts && prompts.length > 0 ? (
          prompts.map((prompt: Prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-400 text-lg italic">No prompts shared yet. Be the first!</p>
          </div>
        )}
      </div>
    </div>
  )
}
