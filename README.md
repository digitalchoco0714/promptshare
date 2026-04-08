# PromptShare - AI Prompt Engineering Community

Welcome to **PromptShare**, a community-driven platform for sharing and discovering high-quality AI prompts.

## 🚀 Features

- **Prompt Feed:** Browse high-quality prompts in a card-based layout.
- **Detailed View:** View prompt descriptions and full bodies with Markdown rendering.
- **Copy to Clipboard:** One-click copying of prompts for easy use.
- **Share Prompts:** Simple form to upload your own prompts with categories.
- **Modern UI:** Built with Next.js 15, Tailwind CSS v4, and Lucide icons.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Markdown:** [react-markdown](https://github.com/remarkjs/react-markdown)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/digitalchoco0714/promptshare.git
cd promptshare
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Setup Database Schema
Go to your Supabase Project -> SQL Editor and run the following script:

```sql
-- Create the prompts table
create table prompts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  description text,
  body text not null,
  category text not null,
  author_name text default 'Anonymous'
);

-- Enable RLS (Row Level Security)
alter table prompts enable row level security;

-- Create a policy that allows anyone to read prompts
create policy "Allow public read access"
  on prompts for select
  using (true);

-- Create a policy that allows anyone to insert prompts
create policy "Allow public insert access"
  on prompts for insert
  with check (true);
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
