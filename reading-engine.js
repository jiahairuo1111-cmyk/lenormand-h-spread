/* Symbolic reflection only: no numeric verdict or prediction. */
globalThis.lenormandReading = function(question, spread) {
  if (spread.length !== 5 || new Set(spread.map(x => x.position.id)).size !== 5) throw new Error("需要完整的五张牌阵");
  const q = (question || "").trim();
  const unspecified = !q || /XXX|某某|这件事/i.test(q);
  const contexts = [
    { name: "工作与学习", re: /工作|辞职|跳槽|职业|项目|创业|学习|考试|读研/, lens: "实际要求、能力与可用资源", action: "选一个小任务或一次信息访谈，记录完成情况、实际耗时和对方的明确反馈。" },
    { name: "关系", re: /恋爱|感情|复合|分手|结婚|伴侣|朋友|关系|喜欢我/, lens: "双方明确表达、边界与持续行动", action: "在安全且双方自愿的前提下，进行一次明确沟通，记录对方实际说了什么、做了什么，不猜测其内心。" },
    { name: "生活选择", re: /搬家|城市|旅行|出国|生活/, lens: "日常需求、适应成本与可逆性", action: "先做短期体验或实地了解，记录费用、便利程度和实际感受，与当前方案比较。" }
  ];
  const matches = contexts.filter(c => c.re.test(q));
  const ctx = matches.length === 1 ? matches[0] : {name: "开放问题", lens: "你的目标、可观察事实与选择代价", action: "列出两个备选方案，各找一条支持事实和一条反对事实，再选择一个低成本、可撤回的小测试。"};
  const highStakes = /医疗|疾病|治疗|药|怀孕|手术|诊断|法律|诉讼|投资|股票|贷款|借钱|自杀|自伤/.test(q);
  const by = id => spread.find(x => x.position.id === id);
  const center = by("center"), outcome = by("rightBottom");
  if (!center || !outcome || !by("leftTop") || !by("rightTop") || !by("leftBottom")) throw new Error("阵位不完整");
  const describe = x => x.position.label + "的" + x.card.name;
  const keys = x => x.card.keywords.join("、");
  const support = spread.filter(x => x.card.directionSignal.score > 0);
  const friction = spread.filter(x => x.card.directionSignal.score < 0);
  const neutral = spread.filter(x => x.card.directionSignal.score === 0);
  const list = xs => xs.map(x => describe(x) + "（" + keys(x) + "）").join("；");
  const roles = {
    leftTop: "把它作为对当前表象的提问：哪些是已经发生的事实，哪些只是你的期待？",
    rightTop: "把它作为对环境与回应的提问：是否有明确反馈？不能据此推断他人的真实想法。",
    center: "把它作为本次反思的核心议题：它与你的目标有什么关系？",
    leftBottom: "把它作为对基础条件的提问：什么在支撑你，什么可能成为阻碍？不要把此位置自动当成坏消息。",
    rightBottom: "把它作为待观察的情境，而不是未来预言：哪些现实信号能支持或否定这个设想？"
  };
  const pair = (a,b) => {
    const x = by(a), y = by(b);
    const sx = Math.sign(x.card.directionSignal.score), sy = Math.sign(y.card.directionSignal.score);
    const relation = sx * sy < 0 ? "这里同时存在支持与阻碍，不能互相抵消。"
      : sx < 0 && sy < 0 ? "两处都提出需要核验的困难，但不表示失败必然发生。"
      : sx > 0 && sy > 0 ? "两处都可作为寻找支持条件的线索，但不是成功保证。"
      : "这里包含中性或信息未明的线索，需要补充事实，不能归为支持或反对。";
    return describe(x) + " × " + describe(y) + "：把「" + keys(x) + "」与「" + keys(y) + "」放在一起观察。" + relation + "请分别记录对应的实际证据；这不是专属牌对的确定结论。";
  };
  return {
    summary: (unspecified ? "尚未提供具体问题，本次只能作一般牌义反思。" : "围绕「" + q + "」，先看" + ctx.lens + "。")
      + "核心位的「" + keys(center) + "」可作为反思主题，结果位的「" + keys(outcome) + "」仅作为待验证的情境。"
      + "本解读由本地规则生成，场景仅按关键词识别，不代表完整理解问题；牌面不是事实证据，也不提供事件概率。",
    positionReadings: spread.map(x => ({
      ...x,
      text: "「" + x.card.name + "」的象征主题：" + keys(x) + "。" + roles[x.position.id]
        + "围绕" + (unspecified ? "你尚待明确的问题" : "「" + q + "」") + "，从" + ctx.lens + "寻找对应事实。"
        + "可核查的提醒：" + x.card.caution
    })),
    combinations: [
      "可寻找的支持条件：" + (support.length ? list(support) : "本组未出现预设的支持型主题，但不能据此否定你的选择。"),
      "需要核查的阻碍：" + (friction.length ? list(friction) : "本组未出现预设的阻碍型主题，不代表现实中没有风险。"),
      ...(neutral.length ? ["尚待澄清：" + list(neutral)] : []),
      pair("leftTop","rightTop"), pair("leftBottom","center"), pair("center","rightBottom")
    ],
    verdict: "对「" + (q || "尚未填写的问题") + "」，这组牌不能裁定正确或错误。"
      + (support.length && friction.length ? "支持与阻碍并存，请保留两方面信息，不用好牌数量压过风险提醒。" : "即使牌面主题相近，也不能代替事实核验。")
      + "尤其需要分别核查" + describe(center) + "与" + describe(outcome) + "，不预设它们共同支持推进。"
      + (highStakes ? "此问题涉及高风险事项，不应依牌面决定治疗、财务或法律行动；请寻求相应专业帮助。" : ""),
    advice: [
      unspecified ? "先把问题补全：具体在考虑什么选择、希望达到什么目标、有哪些现实限制。" : "写下「" + q + "」中你真正想达到的目标，用一个可观察标准定义它。",
      highStakes ? "优先收集可靠资料并咨询对应专业人员，不用抽牌替代专业判断或采取不可逆行动。" : ctx.action,
      "针对" + describe(center) + "的「" + keys(center) + "」，各记录一条支持事实、一条反对事实；没有资料就写“未知”。",
      "检查" + describe(by("leftBottom")) + "的提醒：" + by("leftBottom").card.caution + "只有发现现实证据，才据此调整行动。",
      "在行动前写明观察期限、可接受的时间或费用上限，以及暂停条件；复盘时同时记录符合与不符合预期的反馈，不只寻找印证牌面的事件。"
    ]
  };
};
