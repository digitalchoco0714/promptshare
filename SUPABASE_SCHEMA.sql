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

-- Optional: Create a policy for users to manage their own prompts (requires auth setup)
-- create policy "Allow users to delete their own prompts"
--   on prompts for delete
--   using ( auth.uid() = author_id );
