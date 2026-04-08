import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import CopyButton from '@/components/CopyButton'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PromptPageProps {
  params: Promise<{ id: string }>
}

export default async function PromptDetailPage({ params }: PromptPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !prompt) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="/" className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft size={20} className="mr-2" />
        <span>Back to Feed</span>
      </Link>

      <article className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm">
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-800">
              <Tag size={14} className="mr-2" />
              {prompt.category}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1.5">
              <Calendar size={16} />
              {new Date(prompt.created_at).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {prompt.title}
          </h1>

          <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-full w-fit">
            <User size={18} className="text-indigo-500" />
            <span className="font-medium">Shared by {prompt.author_name}</span>
          </div>
        </header>

        {prompt.description && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider text-xs">Description</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {prompt.description}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider text-xs">The Prompt</h2>
            <CopyButton text={prompt.body} />
          </div>
          
          <MarkdownRenderer content={prompt.body} />
        </div>
      </article>
    </div>
  )
}
