import Link from 'next/link'
import { PlusCircle, Search } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              PromptShare
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/upload" 
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Share Prompt</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
