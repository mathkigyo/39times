export type AuthorInfo = {
  name: string;
  description: string;
  type: string;
};

export const authors: { [key: string]: AuthorInfo } = {
  "えいしょう": {
    name: "えいしょう",
    description: "浪人時代は物理・数学を中心に勉強していました。集中型の学習法が得意です。",
    type: "理系",
  },
  "おれ": {
    name: "おれ",
    description: "現代文・地理・英語を軸に成績アップを目指してきました。",
    type: "文系",
  },
  "あなた": {
    name: "あなた",
    description: "共通テストで理系科目の解き方を効率化する工夫をしてきました。",
    type: "理系",
  },
};
