"use strict";

// ==================================================
// 60秒靴チェック Ver.2
// ==================================================

// ===== 1. URL設定 =====
const LINE_CTA_URL = "https://lin.ee/VAjpcR3";
const SEMINAR_CTA_URL = "https://tsumadaseikotsuin.jp/?p=7158#i-4";

const DATA_API_URL =
  "https://script.google.com/macros/s/AKfycbzyix_NVaUqNxp1gnK3uTWJiHS6-jkx9ZYFCklicWh293ZGEqZ8nDWOE2dGt63qq1Rxmg/exec";

// ===== 2. 質問データ =====

const questions = [
  {
    id: "q1",
    category: "サイズ",
    question: "つま先に余裕はありますか？",
    helpText: "靴を履いて立った状態で確認してください。",
    answers: [
      { id: "A", text: "10mm前後", result: "ok" },
      { id: "B", text: "5mmくらい", result: "check" },
      { id: "C", text: "ほとんど余裕なし", result: "check" },
      { id: "D", text: "かなり余っている", result: "check" },
      { id: "E", text: "分からない", result: "unknown" }
    ]
  },

  {
    id: "q2",
    category: "かかとのフィット",
    question: "歩いた時に、靴の中でかかとが浮きますか？",
    helpText: "かかとが靴から抜けそうになりますか？",
    answers: [
      { id: "A", text: "ほとんど浮かない", result: "ok" },
      { id: "B", text: "少し浮く", result: "check" },
      { id: "C", text: "抜けそうなくらい浮く", result: "check" },
      { id: "D", text: "よく分からない", result: "unknown" }
    ]
  },

  {
    id: "q3",
    category: "曲がる位置",
    question: "靴は、足の指の付け根あたりで曲がりますか？",
    helpText: "靴の前側を軽く曲げて確認してください。",
    answers: [
      { id: "A", text: "指の付け根あたりで曲がる", result: "ok" },
      { id: "B", text: "靴の真ん中あたりで曲がる", result: "check" },
      { id: "C", text: "全体がグニャっと曲がる", result: "check" },
      { id: "D", text: "ほとんど曲がらない", result: "check" },
      { id: "E", text: "よく分からない", result: "unknown" }
    ]
  },

  {
    id: "q4",
    category: "シャンク",
    question: "靴の真ん中部分は、簡単にねじれますか？",
    helpText: "つま先側とかかと側を持って、軽くねじってください。",
    answers: [
      { id: "A", text: "ほとんどねじれない", result: "ok" },
      { id: "B", text: "少しねじれる", result: "ok" },
      { id: "C", text: "簡単にねじれる", result: "check" },
      { id: "D", text: "よく分からない", result: "unknown" }
    ]
  },

  {
    id: "q5",
    category: "ヒールカウンター",
    question: "かかとの下側を指でつまんでみてください。簡単につぶれますか？",
    helpText: "かかとの下側を、指で軽くつまんで確認してください。",
    answers: [
      {
        id: "A",
        text: "しっかりしていて、ほとんどつぶれない",
        result: "ok"
      },
      { id: "B", text: "少しつぶれる", result: "ok" },
      { id: "C", text: "簡単につぶれる", result: "check" },
      { id: "D", text: "よく分からない", result: "unknown" }
    ]
  },

  {
    id: "q6",
    category: "靴紐",
    question: "靴紐は毎回締め直していますか？",
    helpText: "",
    answers: [
      { id: "A", text: "毎回締め直している", result: "ok" },
      { id: "B", text: "ときどき締め直している", result: "check" },
      {
        id: "C",
        text: "結んだまま脱ぎ履きしている",
        result: "check"
      },
      { id: "D", text: "靴紐がない靴", result: "na" }
    ]
  },

  {
    id: "q7",
    category: "痛み・違和感",
    question: "この靴を履いていて、痛みや違和感はありますか？",
    helpText: "",
    answers: [
      { id: "A", text: "ない", result: "ok" },
      { id: "B", text: "少しある", result: "check" },
      { id: "C", text: "はっきりある", result: "check" }
    ]
  },

  {
    id: "q8",
    category: "靴底の減り方",
    question: "靴底の減り方を見てみましょう。近いものを選んでください。",
    helpText: "左右の靴底を見比べながら確認してください。",
    answers: [
      { id: "A", text: "ほとんど減っていない", result: "ok" },
      {
        id: "B",
        text: "左右とも似た減り方で、かかと外側に軽い摩耗",
        result: "ok"
      },
      {
        id: "C",
        text: "左右で減り方が大きく違う",
        result: "check"
      },
      { id: "D", text: "内側の減りが目立つ", result: "check" },
      {
        id: "E",
        text: "片側だけ極端に減っている",
        result: "check"
      },
      { id: "F", text: "よく分からない", result: "unknown" }
    ]
  }
];

// ===== 3. 各項目の説明・アドバイス =====

const advice = {
  q1: {
    title: "サイズを確認してみましょう",
    text:
      "約1cm・指1本は簡易的な目安です。足幅・甲の高さ・靴の形・競技用スパイクなどによってフィット感は変わります。競技用スパイクなど、靴の種類によってはタイトなフィットで使用することもあります。ただし、靴ずれ・指の当たり・爪の痛み・繰り返すタコなどがある場合は、サイズやフィットを一度確認してみましょう。"
  },

  q2: {
    title: "かかとのフィットを確認してみましょう",
    text:
      "歩いた時に靴の中でかかとが大きく浮いたり、抜けそうになったりする場合は、サイズや靴紐の締め方などを確認してみましょう。靴の形や用途によってフィット感は異なります。"
  },

  q3: {
    title: "靴が曲がる位置を確認してみましょう",
    text:
      "靴は、足の指の付け根に近い位置で曲がるかを確認します。靴の中央から大きく曲がる、全体が簡単に曲がる、ほとんど曲がらない場合は、靴の構造や用途を一度確認してみましょう。※靴の種類や競技用途によって構造は異なります。"
  },

  q4: {
    title: "靴の中央部分を確認してみましょう",
    text:
      "靴の中央部分には、足元を支えるための構造があります。簡単に大きくねじれる場合は、靴の構造や劣化状態を確認してみましょう。※靴の種類や競技用途によって、硬さや構造は異なります。"
  },

  q5: {
    title: "かかと周りの硬さを確認してみましょう",
    text:
      "靴のかかと部分には、かかと周りを支える構造があります。下側をつまんだ時に簡単につぶれる場合は、靴の構造や劣化状態を確認してみましょう。※靴の種類や用途によって、硬さや構造は異なります。"
  },

  q6: {
    title: "靴紐の使い方を確認してみましょう",
    text:
      "靴紐は足と靴をフィットさせるための大切な部分です。靴を履く時は、かかとを合わせてから靴紐を締め直してみましょう。"
  },

  q7: {
    title: "痛みや違和感がある場合",
    text:
      "痛みや違和感は、靴だけが原因とは限りません。痛みが続く場合や運動に支障がある場合は、セルフチェックだけで判断せず、医療機関や適切な専門家へ相談してください。"
  },

  q8: {
    title: "靴底の減り方を確認してみましょう",
    text:
      "一般的な歩行では、かかとの外側付近から接地することが多いため、かかとの外側にある程度の擦り減りがみられることは珍しくありません。一方で、左右で減る場所や減り方が大きく違う、内側の減りが目立つ、片側だけ極端に減っているなどの場合は、靴の状態や身体の使い方を確認する一つのきっかけになります。"
  }
};

// ===== 4. 正しいチェック方法 =====

const guides = [
  {
    title: "サイズ",
    questionIds: ["q1"],
    label: "サイズの確認方法",
    text: "",
    steps: [
      "中敷きを外して、その上に足を乗せ、つま先の余裕を確認する。",
      "靴を履き、かかとを靴の後ろへしっかり合わせてから、つま先部分を押して余裕を確認する。",
      "靴を履いた状態で足をつま先側へ寄せ、かかと側に指1本程度入るか確認する。"
    ],
    note:
      "約1cm・指1本は簡易的な目安です。足幅・甲の高さ・靴の形・競技用スパイクなどによってフィット感は変わります。",
    image: "assets/images/size-check.png",
    imageAlt: "サイズの確認方法の解説画像"
  },

  {
    title: "曲がる位置",
    questionIds: ["q3"],
    label: "曲がる位置の確認方法",
    text: "",
    steps: [
      "靴のつま先側とかかと側を両手で持ちます。",
      "両手を拍手するようにゆっくり近づけます。",
      "そのとき、靴がどこで自然に曲がるかを確認します。"
    ],
    note:
      "無理に折ろうとせずに確認してください。靴の種類や競技用途によって構造は異なります。",
    image: "assets/images/flex-check.png",
    imageAlt: "靴が曲がる位置の確認方法"
  },

  {
    title: "シャンク",
    questionIds: ["q4"],
    label: "シャンクの確認方法",
    text: "",
    steps: [
      "靴の中央部分を持って、軽くねじります。",
      "簡単に大きくねじれないか確認します。"
    ],
    note:
      "靴の種類や競技用途によって、硬さや構造は異なります。",
    image: "assets/images/shank-check.png",
    imageAlt: "シャンクの確認方法の解説画像"
  },

  {
    title: "ヒールカウンター",
    questionIds: ["q5"],
    label: "ヒールカウンターの確認方法",
    text: "",
    steps: [
      "かかとの下側を指でつまみます。",
      "簡単につぶれすぎないか確認します。"
    ],
    note:
      "無理に強い力を加えずに確認してください。靴の種類や用途によって硬さや構造は異なります。",
    image: "assets/images/heel-counter-check-v2.png.png",
    imageAlt: "ヒールカウンターの確認方法"
  },

  {
    title: "靴紐",
    questionIds: ["q2", "q6"],
    label: "靴紐・かかとの確認方法",
    text:
      "靴紐は足と靴をフィットさせるための大切な部分です。",
    steps: [
      "靴紐を緩める",
      "足を入れる",
      "かかとを靴の後ろへ合わせる",
      "その状態で靴紐を締め直す"
    ],
    note:
      "最後に実際に歩いて、靴の中でかかとが大きく浮いたり、抜けそうになったりしないか確認してください。",
    image: "",
    imageAlt: ""
  },

  {
    title: "靴底の減り方",
    questionIds: ["q8"],
    label: "靴底の確認方法",
    text: "",
    steps: [
      "左右の靴を裏返して、靴底全体を見ます。",
      "左右で減る場所や減り方に大きな違いがないか確認します。",
      "内側の減りや、片側だけ極端な減りがないか確認します。"
    ],
    note:
      "靴底の減り方だけで、歩き方・回内や回外・身体の状態・ケガのリスクを判断することはできません。",
    image: "assets/images/outsole-wear-check.png.png",
    imageAlt: "左右の靴底の減り方を見比べる確認方法"
  }
];

// ===== 5. 状態 =====

let responses = {};
let questionIndex = 0;

const app = document.getElementById("app");

const escapeHTML = value =>
  String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));

function safeURL(value) {
  if (!value) return "";

  try {
    const url = new URL(value, document.baseURI);

    return ["https:", "http:", "file:"].includes(url.protocol)
      ? value
      : "";
  } catch {
    return "";
  }
}

function focusTop() {
  app.querySelector("h1, legend, h2")?.focus();
  window.scrollTo(0, 0);
}

// ===== 6. 判定 =====

function getAnswer(question, answerId) {
  return question.answers.find(answer => answer.id === answerId);
}

function calculateResult() {
  const items = questions.map(question => {
    const answer = getAnswer(question, responses[question.id]);

    if (!answer) {
      throw new Error("すべての質問に回答してください。");
    }

    return {
      id: question.id,
      category: question.category,
      answerId: answer.id,
      answerText: answer.text,
      result: answer.result
    };
  });

  const checkCount = items.filter(item => item.result === "check").length;
  const unknownCount = items.filter(item => item.result === "unknown").length;

  return {
    items,
    checkCount,
    unknownCount
  };
}

function resultSymbol(result) {
  if (result === "ok") return "○";
  if (result === "check") return "△";
  if (result === "unknown") return "？";
  if (result === "na") return "対象外";
  return "";
}

// ===== 7. スタート =====

function renderStart() {
  app.innerHTML = `
    <section class="card intro">
      <p class="eyebrow">FOOT & SHOE CHECK</p>

      <span class="pill">
        保護者の方へ · 全8問
      </span>

      <h1 tabindex="-1">
        お子さんの靴、<br>
        大丈夫？
      </h1>

      <p class="sub">
        60秒でできる<br>
        靴のセルフチェック
      </p>

      <p>
        今履いている靴を見ながら、
        8つの質問に答えてください。
      </p>

      <p class="muted">
        サイズ・かかと・靴の構造・靴紐・靴底などから、
        確認しておきたいポイントをチェックできます。
      </p>

      <div class="intro-facts">
        <span>約60秒で完了</span>
        <span>登録は不要</span>
        <span>その場で結果表示</span>
      </div>

      <button class="button wide" id="start">
        チェックをはじめる →
      </button>

      <p class="note" style="margin:18px 0 0">
        ※このチェックは、靴の適合や身体の状態を診断するものではありません。
      </p>
    </section>
  `;

  document.getElementById("start").onclick = () => {
    questionIndex = 0;
    renderQuestion();
  };
}

// ===== 8. 質問画面 =====

function renderQuestion() {
  const q = questions[questionIndex];
  const selected = responses[q.id];

  app.innerHTML = `
    <section class="card">

      <div class="progress-label">
        <span>靴のセルフチェック</span>
        <span>${questionIndex + 1} / ${questions.length}</span>
      </div>

      <progress
        value="${questionIndex + 1}"
        max="${questions.length}"
        aria-label="質問の進行状況">
      </progress>

      <form id="question-form">

        <fieldset aria-describedby="help">

          <legend tabindex="-1">
            ${escapeHTML(q.question)}
          </legend>

          <p id="help" class="note">
            ${escapeHTML(
              q.helpText || "あてはまるものを1つ選んでください。"
            )}
          </p>

          ${q.id === "q5" ? `
  <img
    src="assets/images/heel-counter-check-v2.png.png"
    alt="かかとの下側をつまんで確認する位置"
    style="width:100%; height:auto; border-radius:12px; margin:12px 0 18px;"
  >
` : ""}

${q.id === "q8" ? `
  <img
    src="assets/images/outsole-wear-check.png.png"
    alt="左右の靴底の減り方を見比べる"
    style="width:100%; height:auto; border-radius:12px; margin:12px 0 18px;"
  >
` : ""}<div class="answers">

            ${q.answers.map(answer => `
              <label class="answer">

                <input
                  type="radio"
                  name="${q.id}"
                  value="${answer.id}"
                  ${selected === answer.id ? "checked" : ""}
                >

                <span>
                  ${escapeHTML(answer.text)}
                </span>

              </label>
            `).join("")}

          </div>

        </fieldset>

        <div class="nav">

          <button
            type="button"
            class="button secondary"
            id="back">
            ← 戻る
          </button>

          <button
            type="submit"
            class="button"
            id="next"
            ${selected ? "" : "disabled"}>

            ${
              questionIndex === questions.length - 1
                ? "結果を見る"
                : "次へ →"
            }

          </button>

        </div>

      </form>

    </section>

    <p class="note">
      ${
        q.answers.some(answer =>
          ["分からない", "よく分からない"].includes(answer.text)
        )
          ? "分からない項目は「分からない」「よく分からない」を選べます。<br>"
          : ""
      }

      戻っても、それまでの回答は残ります。
    </p>
  `;

  const form = document.getElementById("question-form");

  form.onchange = event => {
    responses[q.id] = event.target.value;

    document.getElementById("next").disabled = false;
  };

  document.getElementById("back").onclick = () => {
    if (questionIndex > 0) {
      questionIndex--;
      renderQuestion();
    } else {
      renderStart();
      focusTop();
    }
  };

  form.onsubmit = event => {
    event.preventDefault();

    if (!responses[q.id]) return;

    if (questionIndex < questions.length - 1) {
      questionIndex++;
      renderQuestion();
    } else {
      renderResult();
    }
  };

  focusTop();
}

// ===== 9. 結果画面 =====

function renderResult() {
  const result = calculateResult();

  const lineCta = safeURL(LINE_CTA_URL);
  const seminarCta = safeURL(SEMINAR_CTA_URL);

  const checkItems = result.items.filter(
    item => item.result === "check"
  );

  const unknownItems = result.items.filter(
    item => item.result === "unknown"
  );

  let summaryText = "";

  if (result.checkCount === 0) {
    summaryText =
      "今回のチェックでは、大きな確認ポイントはありませんでした。";
  } else {
    summaryText =
      "今回のチェックで、確認しておきたいポイントがありました。";
  }

  app.innerHTML = `

    <section class="card result-top">

      <p class="eyebrow">
        CHECK RESULT
      </p>

      <h1 tabindex="-1">
        あなたの靴チェック結果
      </h1>

      <p>
        ${escapeHTML(summaryText)}
      </p>

      ${
        result.unknownCount
          ? `
            <p>
              判断できなかった項目は、
              実際の靴を見ながら確認してみましょう。
            </p>
          `
          : ""
      }

      <p class="note">
        この結果だけで「靴が合っていない」と判断するものではありません。
        このチェックは、靴の適合や身体の状態を診断するものではありません。
      </p>

    </section>

    <section class="card">

      <h2>
        項目ごとのチェック結果
      </h2>

      <p class="note">
        ○：今のところ大きな確認ポイントなし<br>
        △：確認ポイントあり<br>
        ？：判断できなかった
      </p>

      <dl class="ratings">

        ${result.items.map(item => `
          <div class="rating">

            <dt>
              ${escapeHTML(item.category)}
            </dt>

            <dd data-result="${escapeHTML(item.result)}">
              ${escapeHTML(resultSymbol(item.result))}
            </dd>

          </div>
        `).join("")}

      </dl>

      <div class="result-counts">

        <p>
          <strong>
            確認ポイント：
            ${result.checkCount}か所
          </strong>
        </p>

        <p>
          <strong>
            判断できなかった項目：
            ${result.unknownCount}か所
          </strong>
        </p>

      </div>

    </section>

    <section class="card" id="advice">

      <h2>
        確認しておきたいポイント
      </h2>

      ${
        checkItems.length
          ? checkItems.map(item => `
              <article
                class="advice"
                data-advice="${item.id}">

                <p class="eyebrow">
                  ${escapeHTML(item.category)}
                </p>

                <h3>
                  ${escapeHTML(advice[item.id].title)}
                </h3>

                <p>
                  ${escapeHTML(advice[item.id].text)}
                </p>

                ${
                  item.id === "q8"
                    ? `
                      <p class="note">
                        ※靴底の減り方だけで、歩き方・回内や回外・身体の状態・ケガのリスクを判断することはできません。
                      </p>
                    `
                    : ""
                }

              </article>
            `).join("")
          : `
            <p>
              今回のチェックでは、
              個別に確認しておきたい項目はありませんでした。
              引き続き定期的に靴の状態を確認してみましょう。
            </p>
          `
      }

      ${
        unknownItems.length
          ? `
            <article class="advice">

              <p class="eyebrow">
                判断できなかった項目
              </p>

              <p>
                ${unknownItems
                  .map(item => escapeHTML(item.category))
                  .join("・")}
              </p>

              <p>
                分からなかった項目は、
                実際の靴を見ながら確認してみましょう。
              </p>

            </article>
          `
          : ""
      }

    </section>

    <button
      class="button secondary wide"
      id="show-guides"
      aria-expanded="false"
      aria-controls="guides">

      正しいチェック方法を見る

    </button>

    <section
      class="card"
      id="guides"
      hidden
      style="margin-top:20px">

      <h2 tabindex="-1">
        正しいチェック方法
      </h2>

      <div class="guide-grid">

        ${guides.map(guide => `

          <details class="guide-accordion">

            <summary>

              <span
                class="guide-toggle"
                aria-hidden="true">
              </span>

              <span class="guide-label">
                ${escapeHTML(guide.label)}
              </span>

            </summary>

            <div class="guide-content">

              ${
                guide.text
                  ? `<p>${escapeHTML(guide.text)}</p>`
                  : ""
              }

              <ol class="guide-steps">

                ${guide.steps.map(step => `
                  <li>
                    ${escapeHTML(step)}
                  </li>
                `).join("")}

              </ol>

              <div class="guide-note">

                <h4>
                  注意点
                </h4>

                <p>
                  ${escapeHTML(guide.note)}
                </p>

              </div>

              ${
                safeURL(guide.image)
                  ? `
                    <img
                      src="${escapeHTML(safeURL(guide.image))}"
                      alt="${escapeHTML(guide.imageAlt)}"
                      loading="lazy">
                  `
                  : ""
              }

            </div>

          </details>

        `).join("")}

      </div>

    </section>

    <div class="nav reset">

      <button
        class="button secondary"
        id="edit">

        回答を見直す

      </button>

      <button
        class="button secondary"
        id="reset">

        最初から再チェック

      </button>

    </div>

    <section
      class="card cta"
      aria-labelledby="line-cta-title">

      <h2 id="line-cta-title">
        自分では判断しにくい時は
      </h2>

      <p>
        靴はサイズだけでなく、
        足の形や履き方、
        スポーツの種類などによっても
        確認するポイントが変わります。
      </p>

      <p>
        『この靴で大丈夫かな？』<br>
        『サイズの見方がよく分からない』
      </p>

      <p>
        そんな時は、
        院長公式LINEをご活用ください。
      </p>

      ${
        lineCta
          ? `
            <a
              class="button wide"
              href="${escapeHTML(lineCta)}">

              院長公式LINEで相談する

            </a>
          `
          : `
            <button
              class="button wide"
              disabled>

              院長公式LINEで相談する

            </button>
          `
      }

    </section>

    <section
      class="card cta-sub"
      aria-labelledby="seminar-cta-title">

      <h2 id="seminar-cta-title">
        足・靴についてもっと知りたい方へ
      </h2>

      <p>
        つまだ整骨院では、
        お子さんの足・靴について学べる
        無料セミナーも開催しています。
      </p>

      ${
        seminarCta
          ? `
            <a
              class="button secondary wide"
              href="${escapeHTML(seminarCta)}">

              無料の足・靴セミナーを見る

            </a>
          `
          : ""
      }

    </section>

    ${renderSurveyHTML()}
  `;

  document.getElementById("show-guides").onclick = event => {
    const panel = document.getElementById("guides");

    panel.hidden = !panel.hidden;

    event.currentTarget.setAttribute(
      "aria-expanded",
      String(!panel.hidden)
    );

    if (!panel.hidden) {
      panel.querySelector("h2").focus();

      panel.scrollIntoView({
        block: "start"
      });
    }
  };

  document.getElementById("reset").onclick = () => {
    responses = {};
    questionIndex = 0;

    renderStart();
    focusTop();
  };

  document.getElementById("edit").onclick = () => {
    questionIndex = questions.length - 1;
    renderQuestion();
  };

  setupSurvey();

  focusTop();
}

// ===== 10. 匿名アンケート =====

const surveyOptions = {
  ages: [
    "小学生低学年（1〜3年）",
    "小学生高学年（4〜6年）",
    "中学生",
    "高校生",
    "大学生・専門学生",
    "20代",
    "30代",
    "40代",
    "50代",
    "60代以上",
    "回答しない"
  ],

  genders: [
    "男性",
    "女性",
    "回答しない"
  ],

  sports: [
    "していない",
    "サッカー",
    "野球・ソフトボール",
    "バスケットボール",
    "バレーボール",
    "陸上",
    "テニス",
    "バドミントン",
    "ゴルフ",
    "ダンス",
    "その他"
  ],

  bodyParts: [
    "なし",
    "首",
    "肩・肘",
    "腰",
    "股関節・鼠径部",
    "太もも",
    "膝",
    "すね",
    "足首",
    "足・足趾",
    "その他"
  ],

  shoeConcerns: [
    "なし",
    "靴ずれする",
    "指が当たる",
    "爪が痛い・当たる",
    "タコ・マメがある／よくなる",
    "かかとが痛い",
    "靴の中で足が動く",
    "締め付け感がある",
    "足が疲れやすい",
    "その他"
  ]
};

function checkboxGroup(name, options) {
  return `
    <div class="answers">

      ${options.map(option => `
        <label class="answer">

          <input
            type="checkbox"
            name="${escapeHTML(name)}"
            value="${escapeHTML(option)}">

          <span>
            ${escapeHTML(option)}
          </span>

        </label>
      `).join("")}

    </div>
  `;
}

function radioGroup(name, options) {
  return `
    <div class="answers">

      ${options.map(option => `
        <label class="answer">

          <input
            type="radio"
            name="${escapeHTML(name)}"
            value="${escapeHTML(option)}">

          <span>
            ${escapeHTML(option)}
          </span>

        </label>
      `).join("")}

    </div>
  `;
}

function renderSurveyHTML() {
  return `

    <section
      class="card"
      id="anonymous-survey">

      <p class="eyebrow">
        OPTIONAL SURVEY
      </p>

      <h2>
        靴チェック改善のための匿名アンケート
      </h2>

      <p>
        靴チェックの改善・分析のため、
        匿名データの提供にご協力ください。
      </p>

      <p>
        回答は統計的な分析等に使用し、
        氏名など個人を直接特定する情報は収集しません。
      </p>

      <p class="note">
        ※アンケートへの回答は任意です。
      </p>

      <form id="survey-form">

        <fieldset>

          <legend>
            年代
          </legend>

          ${radioGroup(
            "ageGroup",
            surveyOptions.ages
          )}

        </fieldset>

        <fieldset>

          <legend>
            性別
          </legend>

          ${radioGroup(
            "gender",
            surveyOptions.genders
          )}

        </fieldset>

        <fieldset>

          <legend>
            競技・スポーツ
          </legend>

          <p class="note">
            複数選択できます。
          </p>

          ${checkboxGroup(
            "sports",
            surveyOptions.sports
          )}

          <div
            id="sports-other-wrap"
            hidden>

            <label>
              その他の競技・スポーツ

              <input
                type="text"
                id="sports-other"
                maxlength="80">
            </label>

          </div>

        </fieldset>

        <fieldset>

          <legend>
            現在、痛みがある場所
          </legend>

          <p class="note">
            複数選択できます。
          </p>

          ${checkboxGroup(
            "currentPain",
            surveyOptions.bodyParts
          )}

        </fieldset>

        <fieldset>

          <legend>
            過去に怪我をした場所
          </legend>

          <p class="note">
            複数選択できます。
          </p>

          ${checkboxGroup(
            "pastInjury",
            surveyOptions.bodyParts
          )}

        </fieldset>

        <fieldset>

          <legend>
            この靴を履いていて、
            気になること・違和感はありますか？
          </legend>

          <p class="note">
            複数選択できます。
          </p>

          ${checkboxGroup(
            "shoeConcerns",
            surveyOptions.shoeConcerns
          )}

          <div
            id="concerns-other-wrap"
            hidden>

            <label>
              その他の気になること・違和感

              <input
                type="text"
                id="concerns-other"
                maxlength="120">
            </label>

          </div>

        </fieldset>

        <button
          class="button wide"
          type="submit"
          id="survey-submit">

          匿名で送信する

        </button>

        <p
          class="note"
          id="survey-status"
          role="status">
        </p>

      </form>

    </section>
  `;
}

// ===== 11. アンケート操作 =====

function getCheckedValues(name) {
  return [
    ...document.querySelectorAll(
      `input[name="${name}"]:checked`
    )
  ].map(input => input.value);
}

function enforceExclusiveNone(name, exclusiveValue) {
  const inputs = [
    ...document.querySelectorAll(
      `input[name="${name}"]`
    )
  ];

  inputs.forEach(input => {
    input.addEventListener("change", () => {
      if (!input.checked) return;

      if (input.value === exclusiveValue) {
        inputs.forEach(other => {
          if (other !== input) {
            other.checked = false;
          }
        });
      } else {
        const exclusive = inputs.find(
          item => item.value === exclusiveValue
        );

        if (exclusive) {
          exclusive.checked = false;
        }
      }
    });
  });
}

function setupSurvey() {
  const form =
    document.getElementById("survey-form");

  if (!form) return;

  enforceExclusiveNone(
    "sports",
    "していない"
  );

  enforceExclusiveNone(
    "currentPain",
    "なし"
  );

  enforceExclusiveNone(
    "pastInjury",
    "なし"
  );

  enforceExclusiveNone(
    "shoeConcerns",
    "なし"
  );

  const sportsOther =
    form.querySelector(
      'input[name="sports"][value="その他"]'
    );

  const sportsOtherWrap =
    document.getElementById(
      "sports-other-wrap"
    );

  sportsOther?.addEventListener(
    "change",
    () => {
      sportsOtherWrap.hidden =
        !sportsOther.checked;
    }
  );

  const concernsOther =
    form.querySelector(
      'input[name="shoeConcerns"][value="その他"]'
    );

  const concernsOtherWrap =
    document.getElementById(
      "concerns-other-wrap"
    );

  concernsOther?.addEventListener(
    "change",
    () => {
      concernsOtherWrap.hidden =
        !concernsOther.checked;
    }
  );

  form.addEventListener(
    "submit",
    submitSurvey
  );
}

// ===== 12. 送信データ作成 =====

function createSurveyPayload() {
  const result = calculateResult();

  const ageGroup =
    document.querySelector(
      'input[name="ageGroup"]:checked'
    )?.value || "";

  const gender =
    document.querySelector(
      'input[name="gender"]:checked'
    )?.value || "";

  let sports =
    getCheckedValues("sports");

  let currentPain =
    getCheckedValues("currentPain");

  let pastInjury =
    getCheckedValues("pastInjury");

  let shoeConcerns =
    getCheckedValues("shoeConcerns");

  const sportsOther =
    document.getElementById(
      "sports-other"
    )?.value.trim();

  const concernsOther =
    document.getElementById(
      "concerns-other"
    )?.value.trim();

  if (
    sports.includes("その他") &&
    sportsOther
  ) {
    sports = sports.map(value =>
      value === "その他"
        ? `その他：${sportsOther}`
        : value
    );
  }

  if (
    shoeConcerns.includes("その他") &&
    concernsOther
  ) {
    shoeConcerns =
      shoeConcerns.map(value =>
        value === "その他"
          ? `その他：${concernsOther}`
          : value
      );
  }

  const payload = {
    ageGroup,
    gender,
    sports,
    currentPain,
    pastInjury,
    shoeConcerns,

    checkCount:
      result.checkCount,

    unknownCount:
      result.unknownCount
  };

  result.items.forEach(item => {
    payload[`${item.id}Answer`] =
      item.answerText;

    payload[`${item.id}Result`] =
      resultSymbol(item.result);
  });

  return payload;
}

// ===== 13. Googleスプレッドシートへ送信 =====

async function submitSurvey(event) {
  event.preventDefault();

  const form =
    event.currentTarget;

  const submitButton =
    document.getElementById(
      "survey-submit"
    );

  const status =
    document.getElementById(
      "survey-status"
    );

  if (!DATA_API_URL) {
    status.textContent =
      "現在、匿名アンケートの送信準備中です。";

    return;
  }

  const payload =
    createSurveyPayload();

  submitButton.disabled = true;

  status.textContent =
    "送信しています…";

  try {
    await fetch(
      DATA_API_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(payload)
      }
    );

    form.innerHTML = `
      <div class="survey-thanks">

        <h3>
          ご協力ありがとうございました
        </h3>

        <p>
          匿名データを送信しました。
        </p>

        <p>
          今後の靴チェックの改善・分析に
          活用させていただきます。
        </p>

      </div>
    `;

  } catch (error) {
    console.error(error);

    submitButton.disabled = false;

    status.textContent =
      "送信できませんでした。通信環境をご確認のうえ、もう一度お試しください。";
  }
}

// ===== 14. 起動 =====

renderStart();
