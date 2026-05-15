const defaultQuestion = "请用雷诺曼H牌型看「XXX」是正确的吗？";

const palette = {
  rose: ["#f6a6c1", "#ffe0eb", "#6f2946"],
  gold: ["#f8d98b", "#fff2c8", "#6f5423"],
  blue: ["#8cc7ff", "#ddecff", "#253f6d"],
  green: ["#9be4be", "#dff8e9", "#265a42"],
  violet: ["#bda0ff", "#eee6ff", "#4d3978"],
  pearl: ["#e8dfcf", "#fff8ed", "#65584d"],
  wine: ["#d97990", "#ffe1e8", "#60233b"],
  teal: ["#88dedc", "#e2fffd", "#23575a"],
};

const rawCards = [
  [1, "骑士", "Rider", "消息,启动,来临", 1, "谨慎支持", "事情正在进入流动状态，新的信息、邀请或机会会推动局面往前走。", "速度很快但未必稳定，需要确认消息来源和后续承诺。", "gold", "✦"],
  [2, "四叶草", "Clover", "机缘,轻松,短期好运", 1, "谨慎支持", "当前方向带有小而真实的好运，适合顺势试探，不必把门槛设得太高。", "机会窗口偏短，拖延会降低收益。", "green", "✣"],
  [3, "船", "Ship", "远行,扩展,过渡", 1, "谨慎支持", "这条路需要离开熟悉范围，可能涉及距离、跨界、长期探索或新的市场。", "进展不会立刻落地，要为等待和路线调整预留空间。", "blue", "◇"],
  [4, "房子", "House", "稳定,根基,安全感", 1, "谨慎支持", "方向与安全、长期结构或熟悉资源有关，适合稳扎稳打地推进。", "过度求稳可能让选择变窄，也可能困在舒适区。", "pearl", "⌂"],
  [5, "树", "Tree", "生长,健康,耐心", 1, "谨慎支持", "这是一个慢慢长成的方向，重在积累、修复和长期生命力。", "短期反馈可能不明显，急于求成会误判价值。", "green", "♧"],
  [6, "云", "Clouds", "不明朗,混淆,遮蔽", -1, "阻滞", "当前信息雾气较重，直觉可能受到焦虑或他人说法影响。", "在关键事实未澄清前，不宜把它视为完全正确的方向。", "violet", "☾"],
  [7, "蛇", "Snake", "复杂,诱惑,绕路", -1, "阻滞", "这条路存在复杂动机或曲折路径，需要辨别利益纠缠。", "留意隐性竞争、过度包装和让你偏离初衷的诱因。", "wine", "∽"],
  [8, "棺材", "Coffin", "结束,停顿,转化", -2, "高风险", "某个旧阶段正在终结，牌面更强调止损、收束或换轨。", "若强行推进，可能消耗过大；先确认是否该结束旧模式。", "pearl", "▱"],
  [9, "花束", "Bouquet", "馈赠,欣赏,愉悦", 2, "支持", "这个方向带来善意、认可和轻盈的回馈，适合用优雅方式打开局面。", "别只被表面的好看吸引，仍要看实际承接能力。", "rose", "✽"],
  [10, "镰刀", "Scythe", "切断,快速决定,风险", -2, "高风险", "牌面提示突然转折或必须果断取舍，方向本身带有割裂感。", "避免冲动承诺，先找出最容易造成损失的节点。", "wine", "⌁"],
  [11, "鞭子", "Whip", "反复,争执,压力", -1, "阻滞", "当前方向可能伴随重复消耗、争论或内在拉扯。", "如果同一问题已经反复出现，需要先处理模式而不是继续硬推。", "wine", "≋"],
  [12, "鸟", "Birds", "沟通,焦虑,讨论", 0, "中性待证", "局面需要沟通和交换信息，声音很多，关键在筛选有效讯号。", "别让焦虑性的聊天替代真正的确认和行动。", "blue", "⌁"],
  [13, "孩童", "Child", "新开始,单纯,未成熟", 1, "谨慎支持", "方向具备新鲜潜力，适合小步试验和从低风险版本开始。", "它仍然稚嫩，不适合一开始就承载过大的期待。", "gold", "✧"],
  [14, "狐狸", "Fox", "策略,警觉,自保", -1, "阻滞", "需要用策略看待局面，表面合理的安排可能藏着自利动机。", "检查合约、分工和利益归属，别只凭好感判断。", "wine", "⟡"],
  [15, "熊", "Bear", "力量,资源,保护", 1, "谨慎支持", "这个方向需要资源、权威或更强的掌控力，适合稳健布局。", "控制欲或权力不平衡可能让关系变重。", "gold", "◆"],
  [16, "星星", "Stars", "愿景,灵感,指引", 2, "支持", "方向与愿景一致，带有清晰灵感和更高层面的指引感。", "愿景要落到步骤，否则容易停在想象。", "blue", "✶"],
  [17, "鹳", "Stork", "迁移,升级,变化", 1, "谨慎支持", "变化正在发生，牌面支持更新环境、身份或执行方式。", "变化要有节奏，不要为了变化而变化。", "teal", "△"],
  [18, "狗", "Dog", "信任,伙伴,忠诚", 2, "支持", "方向中有可靠支持者或稳定合作关系，信任是推进关键。", "别因熟悉而忽略边界与职责。", "green", "✥"],
  [19, "塔", "Tower", "边界,机构,独立", 0, "中性待证", "这条路需要制度、专业边界或独立判断，适合把规则先定清楚。", "距离感过强会降低温度，也可能带来手续或审批拖慢。", "pearl", "▵"],
  [20, "花园", "Garden", "社群,公开,人脉", 1, "谨慎支持", "方向适合走向公开、社群、人脉或更大的场域。", "曝光会带来评价，也要确认你想被谁看见。", "green", "✺"],
  [21, "山", "Mountain", "阻碍,延迟,高墙", -2, "高风险", "前方阻力明确，短期内很难顺畅推进。", "先判断阻碍是暂时门槛还是根本不匹配。", "violet", "▲"],
  [22, "路径", "Crossroads", "选择,分岔,自由意志", 0, "中性待证", "问题的核心不是唯一答案，而是你需要比较两条以上路线。", "拖着不选也是一种选择，会让能量分散。", "gold", "⌘"],
  [23, "老鼠", "Mice", "损耗,焦虑,流失", -2, "高风险", "当前方向有隐性消耗，时间、信心或资源可能被一点点磨掉。", "先查漏损点，尤其是反复拖延和小问题堆积。", "wine", "⋯"],
  [24, "心", "Heart", "热爱,情感,吸引", 2, "支持", "这条路与真实喜欢和情感投入相关，内在动力很强。", "喜欢不等于全部条件成熟，仍要看现实承载。", "rose", "♡"],
  [25, "戒指", "Ring", "承诺,契约,循环", 2, "支持", "方向适合建立承诺、合作或长期循环机制。", "承诺之前要确认条款、节奏和退出条件。", "gold", "◎"],
  [26, "书", "Book", "知识,秘密,学习", 0, "中性待证", "还有重要信息没有完全打开，学习、调研或保密事项是关键。", "别在信息不完整时急着下结论。", "violet", "▰"],
  [27, "信", "Letter", "文件,通知,表达", 1, "谨慎支持", "书面确认、文档、消息或明确表达会推动方向变清楚。", "口头说法不够，关键内容最好落成文字。", "blue", "✉"],
  [28, "男人", "Man", "当事人,主动方,阳性能量", 0, "中性待证", "牌面聚焦一个关键人物或主动决策能量，需要看他如何行动。", "不要只读意图，要观察实际承担。", "pearl", "♂"],
  [29, "女人", "Woman", "当事人,接收方,阴性能量", 0, "中性待证", "牌面聚焦一个关键人物或感受判断，需要尊重内在反馈。", "感受重要，但仍要与事实互相校准。", "rose", "♀"],
  [30, "百合", "Lily", "成熟,宁静,长期品质", 1, "谨慎支持", "这个方向需要成熟、耐心和品质感，越稳越显价值。", "进展慢不代表没进展，但冷淡也可能被误认成稳定。", "pearl", "✾"],
  [31, "太阳", "Sun", "成功,清晰,能量", 2, "支持", "牌面强力支持这个方向，清晰度、信心和成功概率都较高。", "保持开放和持续行动，不要因一时顺利而忽略细节。", "gold", "☉"],
  [32, "月亮", "Moon", "名望,感受,周期", 1, "谨慎支持", "这条路与感受、创作、声誉或周期性成果有关，需要顺势经营。", "情绪会影响判断，重要决定最好过一夜再确认。", "violet", "◐"],
  [33, "钥匙", "Key", "答案,突破,确定性", 2, "支持", "牌面显示关键答案正在出现，这个方向具备突破口和解决力。", "看见钥匙后仍要亲手开门，别只停在顿悟。", "gold", "⚿"],
  [34, "鱼", "Fish", "流动,资源,财富", 1, "谨慎支持", "方向与资源流、商业机会或更自由的交换有关。", "资源流动大，也要管好边界和预算。", "teal", "≈"],
  [35, "锚", "Anchor", "稳定,坚持,落地", 2, "支持", "这条路有落地性和持续性，适合长期投入。", "稳定也可能变成固着，定期检查是否还值得坚持。", "blue", "⊥"],
  [36, "十字架", "Cross", "责任,压力,课题", -2, "高风险", "方向伴随沉重责任或宿题感，需要认真评估代价。", "不要把痛苦自动理解为命中注定，先确认这份承担是否必要。", "violet", "✚"],
];

const cards = rawCards.map(([id, name, english, keywordText, score, label, meaning, caution, paletteName, symbol]) => {
  const [glow, ink, veil] = palette[paletteName];
  return {
    id,
    name,
    english,
    keywords: keywordText.split(","),
    directionSignal: { score, label },
    meaning,
    caution,
    palette: { glow, ink, veil },
    symbol,
  };
});

const positions = [
  ["leftTop", "左上：当前显象", "你眼前已经看见的机会、讯号或表层动力。"],
  ["rightTop", "右上：外部回应", "外界、人际、资源或环境会如何回应你的选择。"],
  ["center", "中间：问题核心", "这件事真正的关键点，也是判断方向是否正确的轴心。"],
  ["leftBottom", "左下：根部与阻力", "支撑或拖住这个方向的底层原因、情绪和现实阻碍。"],
  ["rightBottom", "右下：结果倾向", "若继续沿这个方向推进，较可能显化出的走向。"],
].map(([id, label, questionRole]) => ({ id, label, questionRole, layoutArea: id }));

const state = {
  question: "",
  spread: [],
  revealed: new Set(),
  readingVisible: false,
  isDealing: false,
  runKey: 0,
};

document.getElementById("root").innerHTML = `
  <main class="shell">
    <div class="aura aura-one"></div>
    <div class="aura aura-two"></div>
    <div class="stars"></div>
    <div class="hand-light" aria-hidden="true"></div>
    <section class="oracle-panel" aria-label="雷诺曼 H 阵">
      <header class="masthead">
        <div>
          <p class="kicker">LENORMAND H SPREAD</p>
          <h1>雷诺曼 H 牌阵</h1>
        </div>
        <div class="sigil" aria-hidden="true">✦</div>
      </header>
      <div class="question-bar">
        <label for="question">你的问题</label>
        <div class="question-input">
          <input id="question" placeholder="${defaultQuestion}" />
          <button class="primary-action" id="draw-button"><span aria-hidden="true">✧</span><span id="draw-label">抽取卡牌</span></button>
        </div>
      </div>
      <section class="spread-stage is-empty" id="spread-stage">
        <div class="stage-halo"></div>
        <div class="orbit-ring orbit-one" aria-hidden="true"></div>
        <div class="orbit-ring orbit-two" aria-hidden="true"></div>
        <div class="h-spread" id="h-spread"></div>
      </section>
      <div class="ritual-actions">
        <div class="ritual-buttons">
          <button class="secondary-action" id="review-button" disabled><span aria-hidden="true">◇</span>揭开解读</button>
        </div>
        <p id="stage-note">让问题先落在桌面。</p>
      </div>
    </section>
    <section class="reading-panel" id="reading-panel"></section>
  </main>
`;

const questionInput = document.getElementById("question");
const drawButton = document.getElementById("draw-button");
const drawLabel = document.getElementById("draw-label");
const reviewButton = document.getElementById("review-button");
const spreadStage = document.getElementById("spread-stage");
const spreadEl = document.getElementById("h-spread");
const stageNote = document.getElementById("stage-note");
const readingPanel = document.getElementById("reading-panel");
const shell = document.querySelector(".shell");
const handLight = document.querySelector(".hand-light");

questionInput.addEventListener("input", (event) => {
  state.question = event.target.value;
});

drawButton.addEventListener("click", drawSpread);
reviewButton.addEventListener("click", revealReading);
window.addEventListener("pointermove", moveHandLight);

renderSpread();

function drawSpread() {
  state.isDealing = true;
  state.readingVisible = false;
  state.revealed = new Set();
  state.spread = drawFiveCards();
  state.runKey += 1;
  spreadStage.classList.add("is-dealing");
  createSparkBurst(drawButton, 26);
  readingPanel.className = "reading-panel";
  readingPanel.innerHTML = "";
  renderSpread();

  window.setTimeout(() => {
    state.isDealing = false;
    spreadStage.classList.remove("is-dealing");
    renderControls();
  }, 1450);
}

function drawFiveCards() {
  const deck = [...cards];
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, 5).map((card, index) => ({ card, position: positions[index] }));
}

function renderSpread() {
  const displaySpread = state.spread.length ? state.spread : emptySpread();
  spreadStage.classList.toggle("is-empty", state.spread.length === 0);
  spreadEl.innerHTML = displaySpread.map(cardTemplate).join("");

  spreadEl.querySelectorAll(".oracle-card").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.isDealing || state.spread.length === 0) return;
      state.revealed.add(Number(button.dataset.cardId));
      createSparkBurst(button, 12);
      renderSpread();
    });
  });

  renderControls();
}

function cardTemplate(item, index) {
  const { card, position } = item;
  const isRevealed = state.revealed.has(card.id);
  const style = `--glow:${card.palette.glow};--ink:${card.palette.ink};--veil:${card.palette.veil};--delay:${index * 110}ms;grid-area:${position.layoutArea}`;
  const keywords = card.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("");

  return `
    <button class="oracle-card ${isRevealed ? "is-revealed" : ""} ${position.id === "center" ? "is-center" : ""}" style="${style}" data-card-id="${card.id}" aria-label="${escapeHtml(position.label)}${isRevealed ? `，${escapeHtml(card.name)}` : "，未揭示"}">
      <span class="position-label">${escapeHtml(position.label)}</span>
      <span class="card-inner">
        <span class="card-face card-back">
          <span class="back-constellation" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
          <span class="back-symbol">✦</span>
          <span class="back-line"></span>
        </span>
        <span class="card-face card-front">
          <span class="card-number">${String(card.id).padStart(2, "0")}</span>
          <span class="card-symbol">${card.symbol}</span>
          <span class="card-name">${escapeHtml(card.name)}</span>
          <span class="card-english">${escapeHtml(card.english)}</span>
          <span class="keyword-row">${keywords}</span>
        </span>
      </span>
    </button>
  `;
}

function renderControls() {
  drawLabel.textContent = state.spread.length ? "重新抽牌" : "抽取卡牌";
  reviewButton.disabled = state.spread.length !== 5 || state.isDealing;
  const allRevealed = state.spread.length === 5 && state.revealed.size === 5;
  stageNote.textContent = state.spread.length === 0 ? "让问题先落在桌面。" : allRevealed ? "牌面已经展开。" : "牌阵正在凝结。";
}

function revealReading() {
  if (state.spread.length !== 5 || state.isDealing) return;
  createSparkBurst(reviewButton, 22);
  state.spread.forEach((item, index) => {
    window.setTimeout(() => {
      state.revealed.add(item.card.id);
      const cardButton = spreadEl.querySelector(`[data-card-id="${item.card.id}"]`);
      if (cardButton) createSparkBurst(cardButton, 8);
      renderSpread();
    }, index * 190);
  });

  window.setTimeout(() => {
    state.readingVisible = true;
    renderReading();
  }, 980);
}

function renderReading() {
  const reading = generateReading(normalizeQuestion(state.question), state.spread);
  readingPanel.className = `reading-panel ${state.readingVisible ? "is-visible" : ""}`;
  readingPanel.innerHTML = `
    <div class="reading-heading"><p class="kicker">REVIEW</p><h2>牌阵解读</h2></div>
    <article class="reading-summary"><h3>整体判断</h3><p>${escapeHtml(reading.summary)}</p></article>
    <div class="reading-grid">
      ${reading.positionReadings.map((item) => `
        <article class="reading-card">
          <span>${escapeHtml(item.position.label)}</span>
          <h3>${item.card.id}. ${escapeHtml(item.card.name)}</h3>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `).join("")}
    </div>
    <article class="reading-summary"><h3>组合关系</h3><ul>${reading.combinations.map((combo) => `<li>${escapeHtml(combo)}</li>`).join("")}</ul></article>
    <article class="verdict"><h3>结论</h3><p>${escapeHtml(reading.verdict)}</p></article>
    <article class="reading-summary"><h3>行动建议</h3><ul>${reading.advice.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <div class="reading-tools">
      <button class="secondary-action copy-action" id="copy-button"><span aria-hidden="true">✦</span>复制抽牌结果发给AI</button>
    </div>
  `;

  readingPanel.querySelector("#copy-button").addEventListener("click", copyCardContent);
}

async function copyCardContent() {
  if (state.spread.length !== 5) return;
  const copyButton = readingPanel.querySelector("#copy-button");
  if (!copyButton) return;

  const content = buildCopyText();
  try {
    await navigator.clipboard.writeText(content);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  createSparkBurst(copyButton, 16);
  const originalText = copyButton.innerHTML;
  copyButton.innerHTML = '<span aria-hidden="true">✓</span>已复制抽牌结果';
  stageNote.textContent = "牌面内容已复制，可以粘贴给你的 AI。";
  window.setTimeout(() => {
    copyButton.innerHTML = originalText;
  }, 1600);
}

function buildCopyText() {
  const question = normalizeQuestion(state.question);
  const cardLines = state.spread.map(({ position, card }) =>
    `${formatPositionName(position.label)}：${card.id}. ${card.name}`,
  );

  return [
    `我的问题：${question}`,
    "",
    "雷诺曼 H 型抽牌结果：",
    ...cardLines,
  ].join("\n");
}

function formatPositionName(label) {
  return label.split("：")[0];
}

function normalizeQuestion(input) {
  const trimmed = input.trim();
  return trimmed.length > 0 ? trimmed : defaultQuestion;
}

function generateReading(question, spread) {
  const score = spread.reduce((total, item) => total + weightedScore(item), 0);
  const center = spread.find((item) => item.position.id === "center") ?? spread[2];
  const outcome = spread.find((item) => item.position.id === "rightBottom") ?? spread[4];
  const obstacle = spread.find((item) => item.position.id === "leftBottom") ?? spread[1];
  const supportCount = spread.filter((item) => item.card.directionSignal.score > 0).length;
  const riskCount = spread.filter((item) => item.card.directionSignal.score < 0).length;

  return {
    summary: buildSummary(question, score, supportCount, riskCount, center.card, outcome.card),
    positionReadings: spread.map(({ card, position }) => ({
      card,
      position,
      text: `${position.questionRole} ${card.name}提示：${card.meaning} 这里的判断倾向为「${card.directionSignal.label}」。需要留意的是，${card.caution}`,
    })),
    combinations: buildCombinations(center.card, obstacle.card, outcome.card, spread),
    verdict: buildVerdict(question, score, center.card, outcome.card),
    advice: buildAdvice(score, center.card, obstacle.card, outcome.card),
  };
}

function weightedScore(item) {
  const weight = item.position.id === "center" ? 1.8 : item.position.id === "rightBottom" ? 1.4 : 1;
  return item.card.directionSignal.score * weight;
}

function buildSummary(question, score, supportCount, riskCount, center, outcome) {
  const stance = score >= 5
    ? "整体牌面明显偏向支持"
    : score >= 2
      ? "整体牌面偏向可以推进，但需要边走边校准"
      : score > -2
        ? "整体牌面处在可观察区，答案还不适合被说成绝对正确或错误"
        : score > -5
          ? "整体牌面提示阻力较重，暂时不宜盲目推进"
          : "整体牌面显示高风险信号较集中，需要先暂停和复盘";
  return `${stance}。围绕「${question}」，中心牌${center.name}指出真正关键在于${center.keywords.join("、")}；结果位${outcome.name}则让这件事的后续倾向落在${outcome.keywords.join("、")}。本次有 ${supportCount} 张支持牌、${riskCount} 张风险牌，因此结论应看作方向校准，而不是命运宣判。`;
}

function buildCombinations(center, obstacle, outcome, spread) {
  const visible = spread.find((item) => item.position.id === "leftTop")?.card;
  const external = spread.find((item) => item.position.id === "rightTop")?.card;
  const combinations = [
    `中心${center.name} + 结果${outcome.name}：核心课题若处理得当，最可能把局面带向「${outcome.keywords.join("、")}」。若结果牌偏风险，则表示需要先解决核心牌揭示的问题。`,
    `根部${obstacle.name} + 中心${center.name}：底层阻力会直接影响你的判断。${obstacle.directionSignal.score < 0 ? "这组牌要求先止损、澄清或降低消耗，再谈推进。" : "这组牌说明阻力并非不可用，它也可能成为稳定推进的资源。"}`,
  ];
  if (visible && external) {
    combinations.push(`显象${visible.name} + 外部${external.name}：你看到的表面讯号与外界回应需要一起读。若两张牌方向一致，行动会更顺；若一张支持一张阻滞，就要把期待和现实反馈分开验证。`);
  }
  const highRisk = spread.filter((item) => item.card.directionSignal.score <= -2);
  if (highRisk.length > 0) {
    combinations.push(`风险提示：${highRisk.map((item) => item.card.name).join("、")}属于强提醒牌，表示这件事至少有一处代价、结束、阻碍或责任不可忽略。`);
  }
  return combinations;
}

function buildVerdict(question, score, center, outcome) {
  if (score >= 5) return `对「${question}」的判断：倾向于是正确方向，而且中心牌${center.name}与结果牌${outcome.name}共同支持继续推进。建议保持清晰行动，不必因为短期噪音而动摇。`;
  if (score >= 2) return `对「${question}」的判断：倾向是可推进的方向，但不是无条件正确。它需要你按照${center.name}提示的核心课题去校准，并观察${outcome.name}所代表的后续反馈。`;
  if (score > -2) return `对「${question}」的判断：现在更像是“需要验证的方向”。牌面没有完全否定，但也没有给出足够稳定的支持，适合先做小范围试探。`;
  if (score > -5) return `对「${question}」的判断：暂时不建议把它认定为正确方向。牌面显示阻力和代价偏重，除非你能先解决${center.name}揭示的核心问题。`;
  return `对「${question}」的判断：目前高风险信号明显，不宜继续以原方式推进。更严谨的做法是暂停、止损，或重新定义你真正想要抵达的方向。`;
}

function buildAdvice(score, center, obstacle, outcome) {
  const base = [
    `先把${center.name}对应的「${center.keywords[0]}」写成一个可执行动作，而不是只停留在感觉。`,
    `检查${obstacle.name}带来的提醒：${obstacle.caution}`,
    `用${outcome.name}作为观察指标，未来一段时间重点看是否出现「${outcome.keywords.join("、")}」的具体反馈。`,
  ];
  if (score >= 2) return [...base, "可以继续推进，但建议保留复盘节点，让热情和证据一起前进。"];
  if (score > -2) return [...base, "先做小规模测试，不急着公开承诺或投入不可逆资源。"];
  return [...base, "在关键事实澄清前，避免追加投入；必要时把目标拆小或换一条更少消耗的路径。"];
}

function emptySpread() {
  return positions.map((position, index) => ({
    card: {
      id: index + 1,
      name: "未揭示",
      english: "Veiled",
      keywords: ["静候", "聚焦", "启封"],
      directionSignal: { score: 0, label: "中性待证" },
      meaning: "",
      caution: "",
      palette: { glow: "#eec6db", ink: "#fff4fb", veil: "#5f365a" },
      symbol: "✦",
    },
    position: { ...position, label: ["左上", "右上", "中间", "左下", "右下"][index] },
  }));
}

function createSparkBurst(source, amount) {
  const rect = source.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let i = 0; i < amount; i += 1) {
    const spark = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 34 + Math.random() * 72;
    spark.className = "spark";
    spark.style.left = `${originX}px`;
    spark.style.top = `${originY}px`;
    spark.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    spark.style.setProperty("--spark-delay", `${Math.random() * 80}ms`);
    shell.appendChild(spark);
    window.setTimeout(() => spark.remove(), 920);
  }
}

function moveHandLight(event) {
  handLight.style.left = `${event.clientX}px`;
  handLight.style.top = `${event.clientY}px`;
  shell.style.setProperty("--cursor-x", `${event.clientX}px`);
  shell.style.setProperty("--cursor-y", `${event.clientY}px`);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}
