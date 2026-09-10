"use strict";

// ===== 1. 変更するデータ =====
// CTAのURLはここだけ変更します。空欄の間はボタンを無効にします。
const LINE_CTA_URL = "https://lin.ee/VAjpcR3";
const SEMINAR_CTA_URL = "https://tsumadaseikotsuin.jp/?p=7158#i-4";

// question: 質問文 / helpText: 補足 / text: 選択肢 / score: 点数
// idは判定に使うため、文言を変えるだけの場合は変更しないでください。
const questions = [
  {
    "id": "q1",
    "category": "サイズ",
    "question": "つま先に余裕はありますか？",
    "helpText": "靴を履いて立った状態で確認してください。",
    "answers": [
      {
        "id": "A",
        "text": "10mm前後の余裕がある",
        "score": 0
      },
      {
        "id": "B",
        "text": "5mmくらい",
        "score": 1
      },
      {
        "id": "C",
        "text": "ほとんど余裕がない",
        "score": 2
      },
      {
        "id": "D",
        "text": "かなり余っている",
        "score": 2
      },
      {
        "id": "E",
        "text": "よく分からない",
        "score": 1
      }
    ]
  },
  {
    "id": "q2",
    "category": "かかとのフィット",
    "question": "歩いた時に、かかとが浮きますか？",
    "helpText": "",
    "answers": [
      {
        "id": "A",
        "text": "ほとんど浮かない",
        "score": 0
      },
      {
        "id": "B",
        "text": "少し浮く",
        "score": 1
      },
      {
        "id": "C",
        "text": "かなり浮く",
        "score": 2
      },
      {
        "id": "D",
        "text": "よく分からない",
        "score": 1
      }
    ]
  },
  {
    "id": "q3",
    "category": "曲がる位置",
    "question": "靴は、足の指の付け根あたりで曲がりますか？",
    "helpText": "靴の前側を軽く曲げて確認してください。",
    "answers": [
      {
        "id": "A",
        "text": "指の付け根あたりで曲がる",
        "score": 0
      },
      {
        "id": "B",
        "text": "靴の真ん中付近で曲がる",
        "score": 2
      },
      {
        "id": "C",
        "text": "ほとんど曲がらない",
        "score": 1
      },
      {
        "id": "D",
        "text": "よく分からない",
        "score": 1
      }
    ]
  },
  {
    "id": "q4",
    "category": "シャンク",
    "question": "靴の真ん中部分は、簡単にねじれますか？",
    "helpText": "つま先側とかかと側を持って、軽くねじってください。",
    "answers": [
      {
        "id": "A",
        "text": "簡単にはねじれない",
        "score": 0
      },
      {
        "id": "B",
        "text": "少しねじれる",
        "score": 1
      },
      {
        "id": "C",
        "text": "簡単にグニャッとねじれる",
        "score": 2
      },
      {
        "id": "D",
        "text": "よく分からない",
        "score": 1
      }
    ]
  },
  {
    "id": "q5",
    "category": "ヒールカウンター",
    "question": "靴のかかと部分は、指で押すと簡単につぶれますか？",
    "helpText": "",
    "answers": [
      {
        "id": "A",
        "text": "しっかりしている",
        "score": 0
      },
      {
        "id": "B",
        "text": "少しつぶれる",
        "score": 1
      },
      {
        "id": "C",
        "text": "簡単につぶれる",
        "score": 2
      },
      {
        "id": "D",
        "text": "よく分からない",
        "score": 1
      }
    ]
  },
  {
    "id": "q6",
    "category": "靴紐",
    "question": "靴紐は毎回締め直していますか？",
    "helpText": "",
    "answers": [
      {
        "id": "A",
        "text": "履くたびに締め直している",
        "score": 0
      },
      {
        "id": "B",
        "text": "時々締め直す",
        "score": 1
      },
      {
        "id": "C",
        "text": "結んだまま脱ぎ履きしている",
        "score": 2
      },
      {
        "id": "D",
        "text": "靴紐ではない",
        "score": 0
      }
    ]
  },
  {
    "id": "q7",
    "category": "痛み・違和感",
    "question": "靴を履いている時に、痛みや違和感がありますか？",
    "helpText": "複数選択できます。「特にない」は他の項目と同時に選べません。",
    "multiple": true,
    "answers": [
      {
        "id": "A",
        "text": "特にない",
        "score": 0
      },
      {
        "id": "B",
        "text": "靴ずれがある",
        "score": 0
      },
      {
        "id": "C",
        "text": "足・足趾が痛い",
        "score": 0
      },
      {
        "id": "D",
        "text": "かかとが痛い",
        "score": 0
      },
      {
        "id": "E",
        "text": "すね・膝などが痛い",
        "score": 0
      },
      {
        "id": "F",
        "text": "しびれ・感覚の違和感がある",
        "score": 0
      }
    ]
  }
];
const resultBands = [
  {
    "max": 2,
    "title": "今のところ、気になるポイントは少なそうです",
    "body": "今回のチェックでは、大きく気になるポイントは多くありませんでした。\nただし、成長期は足のサイズや靴の状態が変化します。\n定期的に、サイズ・かかと・靴紐などを確認してみてください。"
  },
  {
    "max": 5,
    "title": "いくつか確認したいポイントがあります",
    "body": "今の靴で、一度確認しておきたいポイントが見つかりました。\n下に表示されている項目を確認してみましょう。"
  },
  {
    "max": 12,
    "title": "一度、靴を見直してみてもよさそうです",
    "body": "複数の項目で確認したいポイントがありました。\nサイズだけではなく、かかとのフィット・靴の硬さ・曲がる位置・靴紐なども合わせて確認してみてください。"
  }
];
const advice = {
  "q1": [
    "靴のサイズをもう一度確認してみましょう。",
    "つま先の余裕だけではなく、かかとの収まりや歩いた時のフィット感も一緒に確認してください。"
  ],
  "q2": [
    "かかとが靴の中で動いていないか確認しましょう。",
    "かかとを靴の後ろへ合わせ、その状態で靴紐を締めてみましょう。靴紐ではない場合は、ベルトなどの留め具で調整してください。"
  ],
  "q3": [
    "靴がどこで曲がるか確認してみましょう。",
    "靴はどこでも柔らかければよいわけではありません。足の動きと靴の曲がる位置が大きくズレていないか確認してください。"
  ],
  "q4": [
    "靴の真ん中部分の硬さを確認してみましょう。",
    "靴の中央部分が簡単にねじれすぎないかチェックしてください。"
  ],
  "q5": [
    "かかと部分の硬さを確認してみましょう。",
    "かかと周囲が簡単につぶれすぎないかチェックしてください。"
  ],
  "q6": [
    "まず靴紐の使い方を変えてみましょう。",
    "特に、靴紐を結んだまま脱ぎ履きしている場合は、一度靴紐を緩めて履き、かかとを合わせてから締め直してください。"
  ]
};
// 上から優先順。該当するものだけを最大3件に絞ります。
const actionPriority = [
  {
    "id": "pain",
    "text": "痛みや違和感が続く場合や運動に支障がある場合は、医療機関や適切な専門家へ相談する。"
  },
  {
    "id": "q1",
    "text": "履いて立った状態で、つま先の余裕を確認する。"
  },
  {
    "id": "q2",
    "text": "かかとを靴の後ろへ合わせ、靴紐や留め具を調整する。"
  },
  {
    "id": "q6",
    "text": "靴紐を一度緩めて履き、かかとを合わせてから締め直す。"
  },
  {
    "id": "q3",
    "text": "靴の前側を軽く曲げ、曲がる位置を確認する。"
  },
  {
    "id": "q5",
    "text": "かかと周囲を指で軽く押し、硬さを確認する。"
  },
  {
    "id": "q4",
    "text": "靴を軽くねじり、真ん中部分の硬さを確認する。"
  }
];
// 将来の画像・動画・別ページは各カードの空欄に指定できます。
const guides = [
  {
    "title": "サイズ",
    "questionIds": ["q1"],
    "label": "サイズの確認方法",
    "text": "目安は、足長の実寸より約1cm程度大きいこと。次の3つの方法で確認できます。",
    "steps": [
      "中敷きを外して、その上に足を乗せ、つま先の余裕を確認する。",
      "靴を履き、かかとを靴の後ろへしっかり合わせてから、つま先部分を押して余裕を確認する。",
      "靴を履いた状態で足をつま先側へ寄せ、かかと側に指1本程度入るか確認する。"
    ],
    "note": "約1cm・指1本は簡易的な目安です。足幅・甲の高さ・靴の形などによってフィット感は変わります。",
    "image": "",
    "imageAlt": "",
    "video": "",
    "link": ""
  },
  {
    "title": "曲がる位置",
    "questionIds": ["q3"],
    "label": "曲がる位置の確認方法",
    "text": "",
    "steps": [
      "靴のつま先側とかかと側を両手で持ちます。",
      "両手を拍手するようにゆっくり近づけます。",
      "そのとき、靴がどこで自然に曲がるかを確認します。"
    ],
    "note": "無理に折ろうとせずに確認してください。靴の中央付近から折れていないかも確認してください。",
    "image": "assets/images/flex-check.png",
    "imageAlt": "靴を両手で持ち、自然に曲がる位置を確認する方法",
    "video": "",
    "link": ""
  },
  {
    "title": "シャンク",
    "questionIds": ["q4"],
    "label": "シャンクの確認方法",
    "text": "",
    "steps": [
      "靴の中央部分を持って、軽くねじります。",
      "簡単にグニャッとねじれすぎないか確認します。"
    ],
    "note": "「曲がる位置」のチェック時に、靴の中央部分から折れていないかも確認してください。",
    "image": "assets/images/shank-check.png",
    "imageAlt": "シャンクの確認方法の解説画像",
    "video": "",
    "link": ""
  },
  {
    "title": "ヒールカウンター",
    "questionIds": ["q5"],
    "label": "ヒールカウンターの確認方法",
    "text": "",
    "steps": [
      "靴のかかと部分を外側から指でつまみます。",
      "簡単につぶれすぎないか確認してください。"
    ],
    "note": "無理に強い力を加えずに確認してください。",
    "image": "",
    "imageAlt": "",
    "video": "",
    "link": ""
  },
  {
    "title": "靴紐",
    "questionIds": ["q2","q6"],
    "label": "靴紐・かかとの確認方法",
    "text": "靴紐は結んだまま脱ぎ履きせず、履くたびに締め直します。",
    "steps": [
      "靴紐を緩める",
      "足を入れる",
      "かかとを靴の後ろへ合わせる",
      "その状態で靴紐を締め直す"
    ],
    "note": "最後に、実際に歩いた時に、かかとが大きく浮かないか確認してください。",
    "image": "",
    "imageAlt": "",
    "video": "",
    "link": ""
  }
];

// ===== 2. 判定ロジック（画面表示から独立） =====
function toggleMultiple(current, id, checked) {
  if (!checked) return current.filter(value => value !== id);
  if (id === "A") return ["A"];
  return [...new Set([...current.filter(value => value !== "A"), id])];
}
function calculateResult(responses) {
  const items = questions.filter(q => q.id !== "q7").map(q => {
    const answer = q.answers.find(a => a.id === responses[q.id]);
    if (!answer) throw new Error("すべての質問に回答してください。");
    return {id:q.id,category:q.category,score:answer.score};
  });
  if (!Array.isArray(responses.q7) || !responses.q7.length) throw new Error("Q7に回答してください。");
  const total = items.reduce((sum,item) => sum + item.score,0);
  const painFlag = responses.q7.some(id => ["B","C","D","E","F"].includes(id));
  const band = resultBands.find(b => total <= b.max) || resultBands[resultBands.length-1];
  const concerns = items.filter(item => item.score > 0);
  const actions = actionPriority.filter(action => action.id === "pain" ? painFlag : concerns.some(item => item.id === action.id)).slice(0,3);
  if (!actions.length) actions.push({id:"regular",text:"定期的に、サイズ・かかと・靴紐や留め具の状態を確認する。"});
  return {items,total,painFlag,band,concerns,actions};
}

// ===== 3. 画面表示・操作 =====
// 回答はメモリ内のみ。再読み込みやタブを閉じると消えます。
let responses = {};
let questionIndex = 0;
const app = document.getElementById("app");
const escapeHTML = value => String(value).replace(/[&<>"']/g,char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
function safeURL(value) {
  if (!value) return "";
  try { const url = new URL(value,document.baseURI); return ["https:","http:","file:"].includes(url.protocol) ? value : ""; } catch { return ""; }
}
function focusTop() { app.querySelector("h1, legend, h2")?.focus(); window.scrollTo(0,0); }
function renderStart() {
  app.innerHTML = `<section class="card intro"><p class="eyebrow">FOOT & SHOE CHECK</p><span class="pill">保護者の方へ · 全7問</span><h1 tabindex="-1">お子さんの靴、<br>大丈夫？</h1><p class="sub">60秒でできる<br>靴のセルフチェック</p><p>今履いている靴を見ながら、7つの質問に答えてください。</p><p class="muted">サイズ・かかと・靴の硬さ・靴紐などから、一度確認しておきたいポイントをチェックできます。</p><div class="intro-facts"><span>約60秒で完了</span><span>登録は不要</span><span>その場で結果表示</span></div><button class="button wide" id="start">チェックをはじめる →</button><p class="note" style="margin:18px 0 0">※このチェックは、靴の適合や身体の状態を診断するものではありません。</p></section>`;
  document.getElementById("start").onclick = () => {questionIndex=0;renderQuestion();};
}
function renderQuestion() {
  const q = questions[questionIndex];
  const selected = q.multiple ? (responses[q.id] || []) : [responses[q.id]];
  app.innerHTML = `<section class="card"><div class="progress-label"><span>靴のセルフチェック</span><span>${questionIndex+1} / ${questions.length}</span></div><progress value="${questionIndex+1}" max="${questions.length}" aria-label="質問の進行状況"></progress><form id="question-form"><fieldset aria-describedby="help"><legend tabindex="-1">${escapeHTML(q.question)}</legend><p id="help" class="note">${escapeHTML(q.helpText || "あてはまるものを1つ選んでください。")}</p><div class="answers">${q.answers.map(a => `<label class="answer"><input type="${q.multiple?"checkbox":"radio"}" name="${q.id}" value="${a.id}" ${selected.includes(a.id)?"checked":""}><span>${escapeHTML(a.text)}</span></label>`).join("")}</div></fieldset><div class="nav"><button type="button" class="button secondary" id="back">← 戻る</button><button type="submit" class="button" id="next" ${selected.some(Boolean)?"":"disabled"}>${questionIndex===questions.length-1?"結果を見る":"次へ →"}</button></div></form></section><p class="note">${q.answers.some(a => a.text === "よく分からない") ? "分からない項目は「よく分からない」を選べます。<br>" : ""}戻っても、それまでの回答は残ります。</p>`;
  const form = document.getElementById("question-form");
  form.onchange = event => {
    const input = event.target;
    responses[q.id] = q.multiple ? toggleMultiple(responses[q.id] || [],input.value,input.checked) : input.value;
    if(q.multiple) form.querySelectorAll("input").forEach(el => {el.checked=responses[q.id].includes(el.value);});
    document.getElementById("next").disabled = q.multiple ? !responses[q.id].length : !responses[q.id];
  };
  document.getElementById("back").onclick = () => { if(questionIndex>0){questionIndex--;renderQuestion();}else{renderStart();focusTop();} };
  form.onsubmit = event => {event.preventDefault();if(!responses[q.id] || (q.multiple && !responses[q.id].length))return;if(questionIndex<questions.length-1){questionIndex++;renderQuestion();}else renderResult();};
  focusTop();
}
// 解説だけの表示順。採点結果は変更しません。同じ評価なら元の掲載順です。
// 靴紐・かかとは、Q2とQ6の高い方の評価を使います。
function prioritizeGuides(items) {
  return guides.map((guide, index) => ({
    ...guide,
    index,
    priority: Math.max(...guide.questionIds.map(id => items.find(item => item.id === id)?.score ?? 0))
  })).sort((a, b) => b.priority - a.priority || a.index - b.index);
}

function renderResult() {
  const result = calculateResult(responses);
  const sortedGuides = prioritizeGuides(result.items);
  const lineCta = safeURL(LINE_CTA_URL);
  const seminarCta = safeURL(SEMINAR_CTA_URL);
  app.innerHTML = `${result.painFlag?`<section class="card pain" id="pain-card"><h2 tabindex="-1">痛みや違和感がある場合</h2><p>痛みや違和感は、靴だけが原因とは限りません。</p><p>運動量、ケガ、身体の状態など、さまざまな要因が関係する可能性があります。</p><p>痛みが続く場合や、運動に支障がある場合は、セルフチェックだけで判断せず、医療機関や適切な専門家へ相談してください。</p><p class="note">※強い痛み、明らかな腫れ、ケガ直後、体重をかけられないなどの場合は、靴のチェックより先に身体の状態を確認することを優先してください。</p></section>`:""}
  <section class="card result-top"><p class="eyebrow">CHECK RESULT</p><h1 tabindex="-1">${escapeHTML(result.band.title)}</h1>${result.band.body.split("\n").map(p=>`<p>${escapeHTML(p)}</p>`).join("")}<p class="note">この結果だけで「靴が合っていない」と判断するものではありません。このチェックは、靴の適合や身体の状態を診断するものではありません。</p></section>
  <section class="card"><h2>項目ごとのチェック結果</h2><p class="note">○：0点 ／ △：1点 ／ 要チェック：2点</p><dl class="ratings">${result.items.map(item=>`<div class="rating"><dt>${escapeHTML(item.category)}</dt><dd data-score="${item.score}">${["○","△","要チェック"][item.score] || "要チェック"}</dd></div>`).join("")}</dl></section>
  <section class="card" id="advice"><h2>気になるポイント</h2>${result.concerns.length?result.concerns.map(item=>`<article class="advice" data-advice="${item.id}"><p class="eyebrow">${escapeHTML(item.category)}</p><h3>${escapeHTML(advice[item.id][0])}</h3><p>${escapeHTML(advice[item.id][1])}</p></article>`).join(""):"<p>Q1〜Q6では、今回、個別に確認したい項目はありませんでした。引き続き定期的に確認してみましょう。</p>"}</section>
  <section class="card"><h2>今日からできること</h2><ol class="actions">${result.actions.map(action=>`<li data-action="${action.id}">${escapeHTML(action.text)}</li>`).join("")}</ol></section>
  <button class="button secondary wide" id="show-guides" aria-expanded="false" aria-controls="guides">正しいチェック方法を見る</button>
  <section class="card" id="guides" hidden style="margin-top:20px"><h2 tabindex="-1">正しいチェック方法</h2><div class="guide-grid">${sortedGuides.map(g=>`<details class="guide-accordion"><summary><span class="guide-toggle" aria-hidden="true"></span><span class="guide-label">${escapeHTML(g.label)}</span>${g.priority === 2 ? `<span class="guide-badge">今回ここを確認</span>` : ""}</summary><div class="guide-content">${g.text ? `<p>${escapeHTML(g.text)}</p>` : ""}<ol class="guide-steps">${g.steps.map(step => `<li>${escapeHTML(step)}</li>`).join("")}</ol><div class="guide-note"><h4>注意点</h4><p>${escapeHTML(g.note)}</p></div>${safeURL(g.image)?`<img src="${escapeHTML(safeURL(g.image))}" alt="${escapeHTML(g.imageAlt)}" loading="lazy">`:""}${safeURL(g.video)?`<video controls preload="none" src="${escapeHTML(safeURL(g.video))}">動画を再生できません。</video>`:""}${safeURL(g.link)?`<p><a href="${escapeHTML(safeURL(g.link))}">詳しい解説を見る</a></p>`:""}</div></details>`).join("")}</div></section>
  <div class="nav reset"><button class="button secondary" id="edit">回答を見直す</button><button class="button secondary" id="reset">最初から再チェック</button></div>
  <section class="card cta" aria-labelledby="line-cta-title">
    <h2 id="line-cta-title">自分では判断しにくい時は</h2>
    <p>靴はサイズだけでなく、足の形や履き方、スポーツの種類などによっても確認するポイントが変わります。</p>
    <p>『この靴で大丈夫かな？』<br>『サイズの見方がよく分からない』</p>
    <p>そんな時は、院長公式LINEをご活用ください。</p>
    ${lineCta?`<a class="button wide" href="${escapeHTML(lineCta)}">院長公式LINEで相談する</a>`:`<button class="button wide" disabled>院長公式LINEで相談する</button><p class="note">LINEのご案内は準備中です。</p>`}
  </section>
  <section class="card cta-sub" aria-labelledby="seminar-cta-title">
    <h2 id="seminar-cta-title">足・靴についてもっと知りたい方へ</h2>
    <p>つまだ整骨院では、お子さんの足・靴・靴紐について学べる無料セミナーも開催しています。</p>
    ${seminarCta?`<a class="button secondary wide" href="${escapeHTML(seminarCta)}">無料の足・靴セミナーを見る</a>`:`<button class="button secondary wide" disabled>無料の足・靴セミナーを見る</button><p class="note">セミナーのご案内は準備中です。</p>`}
  </section>`;
  document.getElementById("show-guides").onclick = event => {
    const panel = document.getElementById("guides");panel.hidden=!panel.hidden;event.currentTarget.setAttribute("aria-expanded",String(!panel.hidden));
    if(!panel.hidden){panel.querySelector("h2").focus();panel.scrollIntoView({block:"start"});}
  };
  document.getElementById("reset").onclick = () => {responses={};questionIndex=0;renderStart();focusTop();};
  document.getElementById("edit").onclick = () => {questionIndex=questions.length-1;renderQuestion();};
  focusTop();
}
renderStart();
