export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">プライバシーポリシー</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">1. 個人情報の利用目的</h2>
        <p>
          当サイトでは、お問い合わせやコメントの際に、名前・メールアドレス等の個人情報を入力いただく場合があります。
          これらの情報は、ご質問に対する回答や必要な情報を電子メール等でご連絡するために利用し、それ以外の目的では使用しません。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">2. 広告について</h2>
        <p>
          当サイトでは、第三者配信の広告サービス（例：Google AdSense）を利用する予定です。
          このような広告配信事業者は、ユーザーの興味に応じた広告を表示するために Cookie を使用することがあります。
        </p>
        <p>
          Cookie を無効にする設定および Google AdSense に関する詳細は「
          <a
            href="https://policies.google.com/technologies/ads?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Google の広告 – ポリシーと規約
          </a>
          」をご覧ください。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. アクセス解析ツールについて</h2>
        <p>
          当サイトでは、アクセス解析ツール（例：Google Analytics）を利用する場合があります。
          このツールはトラフィックデータ収集のために Cookie を使用しています。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">4. お問い合わせについて</h2>
        <p>
          お問い合わせフォームより取得した情報は、お問い合わせの対応にのみ使用し、第三者に提供することはありません。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. 免責事項</h2>
        <p>
          当サイトからのリンクやバナーなどで移動した外部サイトで提供される情報・サービスについて一切の責任を負いかねます。
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. プライバシーポリシーの変更について</h2>
        <p>
          本ポリシーは予告なく変更されることがあります。
          変更後のポリシーは本ページにて公表されます。
        </p>
      </section>
    </main>
  );
}
