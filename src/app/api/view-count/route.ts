import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// 環境変数から Supabase のサービスロールキーを取得（サーバー側限定）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// サーバーサイド専用 Supabase クライアント
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// POST: 閲覧数を +1 するエンドポイント
export async function POST(req: NextRequest) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  // すでに存在するか確認
  const { data: existing, error: selectError } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    // "PGRST116" = no rows found
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  if (existing) {
    // カウントを +1 更新
    const { error: updateError } = await supabase
      .from("views")
      .update({ count: existing.count + 1 })
      .eq("slug", slug);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }
  } else {
    // なければ新規作成
    const { error: insertError } = await supabase
      .from("views")
      .insert({ slug, count: 1 });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}

// GET: 閲覧数を取得するエンドポイント
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("views")
    .select("count")
    .eq("slug", slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: data?.count ?? 0 });
}
