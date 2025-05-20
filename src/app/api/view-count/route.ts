import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 閲覧数を+1する処理
export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  // データがあるか確認
  const { data: existing } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (existing) {
    // 既存のカウントを+1
    await supabase
      .from("views")
      .update({ count: existing.count + 1 })
      .eq("slug", slug);
  } else {
    // なければ新規作成
    await supabase.from("views").insert({ slug, count: 1 });
  }

  return NextResponse.json({ ok: true });
}

// 閲覧数を取得する処理
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  const { data } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  return NextResponse.json({ count: data?.count ?? 0 });
}
