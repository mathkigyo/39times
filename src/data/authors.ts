import type { Author } from '@/types';

export type AuthorInfo = {
  name: string;
  description: string;
  type: string;
};

export const authors: Record<string, Author> = {
  'S.K': {
    slug: 'S.K',
    name: 'S.K',
    bio: '浪人を経て名古屋大学工学部を目指すも、3点差で不合格に。その後、立教大学に三次合格で進学。当ブログの運営者。',
    field: '理系',
    hensachi: 69,
  },
  'E.O': {
    slug: 'E.O',
    name: 'E.O',
    bio: 'あまり偏差値の高くない高校から、現役で立教大学に下剋上合格を果たす。当ブログの運営者。',
    field: '理系',
    hensachi: 49,
  },
  'I.F': {
    slug: 'I.F',
    name: 'I.F',
    bio: '浪人をするも、予備校に頼らず一人で戦い抜き立教大学に合格。当ブログの運営者。',
    field: '理系',
    hensachi: 49,
  },
  'S.N': {
    slug: 'S.N',
    name: 'S.N',
    bio: '筑波大学医学部を志望して浪人するも、あと一歩のところで届かず立教大学で仮面浪人中。当ブログの運営者。',
    field: '理系',
    hensachi: 74,
  },
  'あなた': {
    slug: 'あなた',
    name: 'あなた',
    bio: '最強のエンジニア志望。C言語とPythonに挑戦中。',
    field: '理系',
  },
  '得意料理は卵焼き': {
    slug: '得意料理は卵焼き',
    name: '得意料理は卵焼き',
    bio: '未記入',
    field: '理系',
  },
  'I.A': {
    slug: 'I.A',
    name: 'I.A',
    bio: '未記入',
    field: '文系',
  },
  'ws': {
    slug: 'ws',
    name: 'ws',
    bio: '未記入',
    field: '文系',
  },
  'ゆで卵': {
    slug: 'ゆで卵',
    name: 'ゆで卵',
    bio: '未記入',
    field: '文系',
  },
  'yuk': {
    slug: 'yuk',
    name: 'yuk',
    bio: '未記入',
    field: '理系',
  },
  'りんご': {
    slug: 'りんご',
    name: 'りんご',
    bio: 'コツコツ勉強できる努力家。',
    field: '文系',
  },
  'たまごぼーろ': {
    slug: 'たまごぼーろ',
    name: 'たまごぼーろ',
    bio: '中高と吹奏楽部に所属。その経験をもとに音楽の道を進む。',
    field: '文系',
  },
  'しろたん': {
    slug: 'しろたん',
    name: 'しろたん',
    bio: '高校生活を部活にそそぐ一方学業も維持。文武両道の生活を送る。',
    field: '理系',
  },
};