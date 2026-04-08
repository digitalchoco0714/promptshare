export interface Prompt {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  body: string;
  category: string;
  author_name: string;
}

export type Category = 
  | 'Writing' 
  | 'Coding' 
  | 'Business' 
  | 'Education' 
  | 'Design' 
  | 'Fun' 
  | 'Other';
