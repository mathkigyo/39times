// src/lib/tags.ts

// タグとカテゴリが1対1で対応する形式
export const tags = [
  { name: '国立', category: '大学区分'},
  { name: '私立', category: '大学区分'},
  { name: '現役', category: '受験区分'},
  { name: '浪人', category: '受験区分' },
  { name: '自己推薦', category: '受験区分' },
  { name: '指定校', category: '受験区分' },
  { name: '英語', category: '科目' },
  { name: '数学', category: '科目' },
  { name: '国語', category: '科目' },
  { name: '物理', category: '科目' },
  { name: '化学', category: '科目' },
  { name: '生物', category: '科目' },
  { name: '地学', category: '科目' },
  { name: '物理基礎', category: '科目' },
  { name: '化学基礎', category: '科目' },
  { name: '生物基礎', category: '科目' },
  { name: '地学基礎', category: '科目' },
  { name: '日本史', category: '科目' },
  { name: '世界史', category: '科目' },
  { name: '歴史総合', category: '科目' },
  { name: '地理総合', category: '科目' },
  { name: '地理', category: '科目' },
  { name: '政治経済', category: '科目' },
  { name: '公民・公共', category: '科目' },
  { name: '倫理', category: '科目' },
  { name: '情報', category: '科目' },
  { name: '小論文', category:'科目'},
  { name: 'A判定からの不合格', category: 'リアル'},
  { name: 'タグ1', category: 'その他'},
  { name: 'タグ2', category: 'その他'},
  { name: '太郎', category: 'その他'},
];

// タグのカテゴリを取得（なければ 'その他'）
export function getCategory(tagName: string): string {
  const tag = tags.find((t) => t.name === tagName);
  return tag?.category || 'その他';
}

// 複数タグをカテゴリごとにまとめる（UI表示用）
// 並び順は tags 配列に従う
export function groupTagsByCategory(tagList: string[]) {
  const grouped: Record<string, string[]> = {};

  for (const tag of tags) {
    if (!tagList.includes(tag.name)) continue;
    const category = tag.category;
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(tag.name);
  }

  return grouped;
}
