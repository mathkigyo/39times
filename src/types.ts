export type Author = {
  slug: string;
  name: string;
  bio: string;
  field: '文系' | '理系';
  hensachi?: number; // ← 任意（載せる人だけでOK）
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  author: string; // slug でOK
  tags: string[];
  category: 'study-log' | 'exam-results' | 'book-reviews' | ''; // ✅ 空もOKに！
  content: string;
  excerpt?: string;
  pv?: number;
};
