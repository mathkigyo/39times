import { Metadata } from "next";

export const metadata: Metadata = {
  title: "運営情報 | 39times",
  description: "受験ブログ『39times』の運営者についてご紹介します。",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-4xl font-bold mb-10 text-center">運営情報</h1>

      <p className="mb-8 text-lg leading-relaxed">
        <strong className="text-blue-800">39times</strong> は、ちょっと異色な大学受験を経験した大学生4人が運営するブログです。
        現役や浪人の経験を通して得たリアルな体験をもとに、主に受験の体験記、勉強法、参考書レビュー、模試の記録などを発信しています。
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-gray-300">運営メンバー</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p><strong>S.K</strong><br />浪人を経て名古屋大学工学部を目指すも、3点差で不合格に。その後、立教大学に三次合格で進学。一見異色とも言えるこの経験から、「受験にはいろいろな現実がある」ということを伝えたくブログを開設。サイト開発と記事編集、noteの執筆担当。</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p><strong>E.O</strong><br />あまり偏差値の高くない高校から、現役で下剋上合格を果たす。地道に努力を重ねて合格を勝ち取った経験から、「勉強において大切なのは才能より姿勢」という思いを持つように。大学でも好成績を収めている。サイト作成補助、デザイン担当。</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p><strong>I.F</strong><br />宅浪を経て立教大学に合格。予備校などに頼らず、完全に一人で戦い抜いたその経験は過酷でありながらも、自分を大きく成長させるものだった。そんな「宅浪」という少数派のリアルを伝えることで、同じような立場にいる人たちの励みになればという思いから、記事を執筆。SNS運営担当。</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <p><strong>S.N</strong><br />筑波大学医学部を志望して浪人するも、あと一歩のところで届かず。早慶などの併願はせず、東京理科大学に合格するも最終的に立教大学へ進学。頭のキレは群を抜いており、勉強に対する経験も異色であり多様。同じくSNS運営担当。</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300">ブログの目的</h2>
        <p className="text-base leading-relaxed">
          体験記はたくさんあるけれど、本当に知りたいことはなかなか出てこない。
          このブログでは、良いことも悪いこともリアルに伝えます。
          受験生に本当の声を届けたくて、僕たちはこのブログを作りました。

        </p>
      </section>

      <section>
  <h2 className="text-xl font-semibold mb-2 border-b border-gray-300 pb-1">お問い合わせ</h2>
  <p className="mb-2">
    ブログに関するご質問・ご意見などがありましたら、以下のフォームまたはメールアドレスまでお気軽にお問い合わせください。
  </p>
  <ul className="space-y-1">
    <li>
      👉{" "}
      <a
        href="https://forms.gle/vZiMUesKtygZCYzD9"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800"
      >
        お問い合わせフォームはこちら
      </a>
    </li>
    <li>
      📧 メール:{" "}
      <a
        href="mailto:mathkigyo@gmail.com"
        className="text-blue-600 underline hover:text-blue-800"
      >
        mathkigyo@gmail.com
      </a>
    </li>
  </ul>
</section>

    </main>
  );
}
