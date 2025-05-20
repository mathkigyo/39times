// src/types.ts

export type Author = {
  name: string;
  slug: string;
  bio: string;
  field: '理系' | '文系';
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  author: string; // slug でOK
  tags: string[];
  content: string;
  excerpt?: string;
  pv?: number;
};
