export interface Prompt {
  id: string;
  created_at: string;
  title: string;
  description: string | null;
  body: string;
  category: Category;
  author_name: string;
}

export type Category = 
  | '창작' 
  | '코딩' 
  | '비즈니스' 
  | '교육' 
  | '디자인' 
  | '유머' 
  | '기타';
