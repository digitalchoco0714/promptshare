import Link from 'next/link'
import { Prompt } from '@/types/prompt'
import { Calendar, User, Tag } from 'lucide-react'

interface PromptCardProps {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  return (
    <Link 
      href={`/prompt/${prompt.id}`}
      className="group block p-6 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-lg transition-all"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {prompt.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={12} />
            {new Date(prompt.created_at).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
          {prompt.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
          {prompt.description || 'No description provided.'}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 gap-1 border-t pt-4">
          <User size={14} />
          <span>By {prompt.author_name}</span>
        </div>
      </div>
    </Link>
  )
}
