// ====== СОСТОЯНИЕ ======
const state = {
  budget: 81,
  cart: [],
  trust: 0,
  flags: {},
  achievements: []
};

// ====== СПИСОК ПОКУПОК (цель) ======
const SHOPPING_LIST = [
  { id: 'paste',  zh: '牙膏',     pinyin: 'yágāo',      ru: 'зубная паста',       price: 10.50 },
  { id: 'shampoo',zh: '洗发水',   pinyin: 'xǐfàshuǐ',   ru: 'шампунь',            price: 15.80 },
  { id: 'gel',    zh: '沐浴露',   pinyin: 'mùyùlù',     ru: 'гель для душа',      price: 12.80 },
  { id: 'cotton', zh: '棉签',     pinyin: 'miánqiān',   ru: 'ватные палочки',     price: 6.00 },
  { id: 'towel',  zh: '毛巾',     pinyin: 'máojīn',     ru: 'полотенце',          price: 13.50 },
  { id: 'powder', zh: '洗衣粉',   pinyin: 'xǐyīfěn',    ru: 'стиральный порошок', price: 14.50 },
  { id: 'bags',   zh: '垃圾袋',   pinyin: 'lājīdài',    ru: 'мусорные пакеты',    price: 5.00 },
  { id: 'paper',  zh: '卫生纸',   pinyin: 'wèishēngzhǐ',ru: 'туалетная бумага',   price: 2.30 }
];

// ====== ВСЁ, ЧТО ЕСТЬ НА ПОЛКЕ ======
const SHELF_RAW = [
  ...SHOPPING_LIST,
  { id: 'brush',  zh: '牙刷',     pinyin: 'yáshuā',     ru: 'зубная щётка',       price: 8.50 },
  { id: 'wet',    zh: '湿巾',     pinyin: 'shījīn',     ru: 'влажные салфетки',   price: 3.00 },
  { id: 'napkin', zh: '纸巾',     pinyin: 'zhǐjīn',     ru: 'бумажные салфетки',  price: 2.30 },
  { id: 'soap',   zh: '香皂',     pinyin: 'xiāngzào',   ru: 'туалетное мыло',     price: 5.00 },
  { id: 'broom',  zh: '扫帚',     pinyin: 'sàozhou',    ru: 'веник',              price: 12.00 },
  { id: 'mop',    zh: '拖把',     pinyin: 'tuōbǎ',      ru: 'швабра',             price: 12.50 },
  { id: 'bin',    zh: '垃圾桶',   pinyin: 'lājītǒng',   ru: 'мусорное ведро',     price: 6.00 },
  { id: 'hanger', zh: '衣架',     pinyin: 'yījià',      ru: 'вешалка',            price: 13.80 },
  { id: 'duck',   zh: '橡皮鸭',   pinyin: 'xiàngpíyā',  ru: 'резиновая уточка',   price: 9.90, funny: true },
  { id: 'chips',  zh: '薯片',     pinyin: 'shǔpiàn',    ru: 'чипсы',              price: 7.50, funny: true }
];

// Перемешивание (Fisher-Yates)
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHELF = shuffle(SHELF_RAW);

// ====== СЦЕНАРИЙ ======
const SCRIPT = [
  {
    type: 'title',
    title: '住宿舍的第一天',
    subtitle: '日用品大采购',
    caption: '汉语学习漫画',
    ruTitle: 'Первый день в общежитии',
    ruSubtitle: 'Большая закупка бытовых товаров'
  },

  // --- СЦЕНА 1: КОМНАТА ---
  {
    type: 'narration',
    zh: '扎克和保罗刚入住宿舍。他们发现没带来一些日用品。',
    pinyin: 'Zhākè hé Bǎoluó gāng rùzhù sùshè. Tāmen fāxiàn méi dàilái yīxiē rìyòngpǐn.',
    ru: 'Зак и Пауль только что заехали в общежитие. Оказалось, они не привезли с собой кое-какие бытовые вещи.',
    bg: '宿舍 · 房间'
  },
  {
    type: 'dialogue',
    speaker: '扎克',
    name: 'Зак',
    nameZh: '扎克',
    zh: '我没有好多东西，要去超市买一些日用品。',
    pinyin: 'Wǒ méiyǒu hǎoduō dōngxi, yào qù chāoshì mǎi yīxiē rìyòngpǐn.',
    ru: 'У меня многого нет, надо сходить в супермаркет купить кое-что из бытовых вещей.',
    side: 'right'
  },
  {
    type: 'dialogue',
    speaker: '保罗',
    name: 'Пауль',
    nameZh: '保罗',
    zh: '我们这里没有垃圾袋，也没有洗衣粉。请你顺便买一下。',
    pinyin: 'Wǒmen zhèlǐ méiyǒu lājīdài, yě méiyǒu xǐyīfěn. Qǐng nǐ shùnbiàn mǎi yīxià.',
    ru: 'У нас нет мусорных пакетов и стирального порошка. Купи, пожалуйста, заодно.',
    side: 'left'
  },
  {
    type: 'dialogue',
    speaker: '扎克',
    name: 'Зак',
    nameZh: '扎克',
    zh: '好的，扫帚、拖把我们有吗？',
    pinyin: 'Hǎo de, sàozhou, tuōbǎ wǒmen yǒu ma?',
    ru: 'Хорошо. Веник, швабра у нас есть?',
    side: 'right'
  },
  {
    type: 'dialogue',
    speaker: '保罗',
    name: 'Пауль',
    nameZh: '保罗',
    zh: '有。我要一条毛巾，你可以帮我买吗？',
    pinyin: 'Yǒu. Wǒ yào yī tiáo máojīn, nǐ kěyǐ bāng wǒ mǎi ma?',
    ru: 'Есть. Мне нужно полотенце, можешь купить?',
    side: 'left'
  },
  {
    type: 'dialogue',
    speaker: '扎克',
    name: 'Зак',
    nameZh: '扎克',
    zh: '好的，没问题。',
    pinyin: 'Hǎo de, méi wèntí.',
    ru: 'Хорошо, без проблем.',
    side: 'right'
  },
  {
    type: 'dialogue',
    speaker: '保罗',
    name: 'Пауль',
    nameZh: '保罗',
    zh: '你自己还想买什么？',
    pinyin: 'Nǐ zìjǐ hái xiǎng mǎi shénme?',
    ru: 'А сам ты что ещё хочешь купить?',
    side: 'left'
  },
  {
    type: 'dialogue',
    speaker: '扎克',
    name: 'Зак',
    nameZh: '扎克',
    zh: '我没带牙刷，也没带洗发水、沐浴露。棉签我也最好买一个。',
    pinyin: 'Wǒ méi dài yáshuā, yě méi dài xǐfàshuǐ, mùyùlù. Miánqiān wǒ yě zuìhǎo mǎi yī gè.',
    ru: 'Я не взял зубную щётку, а также шампунь и гель для душа. Ватные палочки тоже лучше бы купить.',
    side: 'right'
  },
  {
    type: 'dialogue',
    speaker: '保罗',
    name: 'Пауль',
    nameZh: '保罗',
    zh: '一个？我恐怕一个不够，你最好买一盒。',
    pinyin: 'Yī gè? Wǒ kǒngpà yī gè bù gòu, nǐ zuìhǎo mǎi yī hé.',
    ru: 'Одну? Боюсь, одной мало. Лучше купи коробку.',
    side: 'left'
  },
  {
    type: 'dialogue',
    speaker: '扎克',
    name: 'Зак',
    nameZh: '扎克',
    zh: '哈哈，对了，一盒棉签。',
    pinyin: 'Hāhā, duì le, yī hé miánqiān.',
    ru: 'Ха-ха, точно, коробку ватных палочек.',
    side: 'right'
  },

  // --- ПЕРЕХОД ---
  {
    type: 'narration',
    zh: '扎克拿着清单去超市。他身上只有八十一块钱。',
    pinyin: 'Zhākè ná zhe qīngdān qù chāoshì. Tā shēnshang zhǐyǒu bāshíyī kuài qián.',
    ru: 'Зак берёт список и идёт в супермаркет. У него с собой ровно 81 юань.',
    bg: '超市 · 门口'
  },

  // --- СЦЕНА 2: ВЫБОР, К КОМУ ОБРАТИТЬСЯ ---
  {
    type: 'narration',
    zh: '超市不大，但东西很多。售货员在忙自己的事，不理扎克。超市深处有一个中国学生。',
    pinyin: 'Chāoshì bù dà, dàn dōngxi hěn duō. Shòuhuòyuán zài máng zìjǐ de shì, bù lǐ Zhākè. Chāoshì shēnchù yǒu yī gè Zhōngguó xuésheng.',
    ru: 'Супермаркет небольшой, но вещей много. Продавщица занята своими делами и не обращает на Зака внимания. В глубине зала стоит одинокий китайский студент.',
    bg: '超市 · 货架之间'
  },
  {
    type: 'choice',
    questionZh: '扎克该怎么办？',
    questionPinyin: 'Zhākè gāi zěnme bàn?',
    questionRu: 'Что делать Заку?',
    options: [
      { text: '去问售货员', pinyin: 'Qù wèn shòuhuòyuán', ru: 'Подойти к продавщице', trust: 0, next: 'seller' },
      { text: '去问中国学生', pinyin: 'Qù wèn Zhōngguó xuésheng', ru: 'Спросить китайского студента', trust: 0, next: 'student' },
      { text: '自己找', pinyin: 'Zìjǐ zhǎo', ru: 'Искать самому', trust: 0, next: 'alone' }
    ]
  },
  {
    type: 'branch',
    branchKey: 'seller',
    steps: [
      {
        type: 'narration',
        zh: '扎克走到售货员面前。应该怎么问？',
        pinyin: 'Zhākè zǒu dào shòuhuòyuán miànqián. Yīnggāi zěnme wèn?',
        ru: 'Зак подходит к продавщице. Как спросить?',
        bg: '超市 · 售货员'
      },
      {
        type: 'choice',
        questionZh: '选一个说法：',
        questionPinyin: 'Xuǎn yī gè shuōfa:',
        questionRu: 'Выбери фразу:',
        options: [
          { text: '你好，请问，沐浴露在哪里？', pinyin: 'Nǐ hǎo, qǐngwèn, mùyùlù zài nǎlǐ?', ru: 'Здравствуйте, извините, где гель для душа?', trust: 1, next: null, feedbackZh: '很好！请问 是礼貌的问法。', feedbackRu: 'Отлично! 请问 — вежливое «извините, можно спросить».' },
          { text: '你们这儿有没有沐浴露？', pinyin: 'Nǐmen zhèr yǒu méiyǒu mùyùlù?', ru: 'У вас есть гель для душа?', trust: 0, next: null, feedbackZh: '还行，但没那么礼貌。', feedbackRu: 'Нормально, но чуть менее вежливо. «有没有» — есть ли у вас.' },
          { text: '你们这儿有没有沐浴露吗？', pinyin: 'Nǐmen zhèr yǒu méiyǒu mùyùlù ma?', ru: 'У вас есть гель для душа? (с лишним 吗)', trust: -1, next: null, feedbackZh: '错！有没有 已经包含「吗」的意思。', feedbackRu: 'Ошибка! 有没有 уже содержит «ли». 吗 здесь лишнее.' }
        ]
      },
      {
        type: 'dialogue',
        speaker: '售货员',
        name: 'Продавщица',
        nameZh: '售货员',
        zh: '在那边。',
        pinyin: 'Zài nàbiān.',
        ru: 'Вон там.',
        side: 'left'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'student',
    steps: [
      {
        type: 'narration',
        zh: '扎克走到中国学生面前。应该怎么问？',
        pinyin: 'Zhākè zǒu dào Zhōngguó xuésheng miànqián. Yīnggāi zěnme wèn?',
        ru: 'Зак подходит к студенту. Как спросить?',
        bg: '超市 · 中国学生'
      },
      {
        type: 'choice',
        questionZh: '选一个说法：',
        questionPinyin: 'Xuǎn yī gè shuōfa:',
        questionRu: 'Выбери фразу:',
        options: [
          { text: '同学，请问，沐浴露在哪里？', pinyin: 'Tóngxué, qǐngwèn, mùyùlù zài nǎlǐ?', ru: 'Студент, извини, где гель для душа?', trust: 1, next: null, feedbackZh: '很好！同学 是对同学的称呼。', feedbackRu: 'Отлично! 同学 — обращение к сверстнику-студенту.' },
          { text: '你们这儿有没有沐浴露？', pinyin: 'Nǐmen zhèr yǒu méiyǒu mùyùlù?', ru: 'У вас есть гель для душа?', trust: 0, next: null, feedbackZh: '不太合适。你们这儿 指的是商店，不是人。', feedbackRu: 'Не очень уместно — «你们这儿» подразумевает магазин, а не человека.' }
        ]
      },
      {
        type: 'dialogue',
        speaker: '中国学生',
        name: 'Китайский студент',
        nameZh: '中国学生',
        zh: '在那儿。',
        pinyin: 'Zài nàr.',
        ru: 'Вон там. (разговорное «那儿» вместо «那边»)',
        side: 'left'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'alone',
    steps: [
      {
        type: 'narration',
        zh: '扎克决定自己找。十分钟后，他找到了日用品区。',
        pinyin: 'Zhākè juédìng zìjǐ zhǎo. Shí fēnzhōng hòu, tā zhǎodào le rìyòngpǐn qū.',
        ru: 'Зак решает искать сам. Через десять минут он находит отдел с бытовой химией.',
        bg: '超市 · 日用品区'
      },
      {
        type: 'narration',
        zh: '不过他走错了两次，还对一个人体模特道了歉。',
        pinyin: 'Bùguò tā zǒucuò le liǎng cì, hái duì yī gè réntǐ mótè dào le qiàn.',
        ru: 'Правда, попутно он дважды свернул не туда и один раз извинился перед манекеном.',
        bg: '超市 · 日用品区'
      }
    ]
  },

  // --- СЦЕНА 3: ПОЛКА ---
  {
    type: 'narration',
    zh: '终于！扎克到了货架前。他只有八十一块钱，清单上有八样东西。不能买错。',
    pinyin: 'Zhōngyú! Zhākè dào le huòjià qián. Tā zhǐyǒu bāshíyī kuài qián, qīngdān shàng yǒu bā yàng dōngxi. Bùnéng mǎi cuò.',
    ru: 'Наконец-то! Зак у полки. У него только 81 юань. Список из 8 предметов. Ошибиться нельзя.',
    bg: '超市 · 日用品区'
  },
  {
    type: 'shop'
  },

  // --- СЦЕНА 4: КАССА ---
  {
    type: 'narration',
    zh: '扎克拿着购物篮走到收银台。',
    pinyin: 'Zhākè ná zhe gòuwùlán zǒu dào shōuyíntái.',
    ru: 'Зак подходит к кассе с корзиной.',
    bg: '超市 · 收银台'
  },
  {
    type: 'choice',
    questionZh: '扎克怎么付钱？',
    questionPinyin: 'Zhākè zěnme fù qián?',
    questionRu: 'Как Зак будет платить?',
    options: [
      { text: '微信支付可以吗？', pinyin: 'Wēixìn zhīfù kěyǐ ma?', ru: 'Можно оплатить через WeChat?', trust: 1, next: 'pay_wechat', feedbackZh: '微信支付 是中国最常用的支付方式。', feedbackRu: '微信支付 — WeChat Pay. Самый популярный способ в Китае.' },
      { text: '可以付现金吗？', pinyin: 'Kěyǐ fù xiànjīn ma?', ru: 'Можно оплатить наличными?', trust: 0, next: 'pay_cash', feedbackZh: '现金 是现金。在中国几乎不用，但是可以。', feedbackRu: '现金 — наличные. В Китае почти не используется, но принимают.' },
      { text: '支付宝，可以吗？', pinyin: 'Zhīfùbǎo, kěyǐ ma?', ru: 'Alipay, можно?', trust: 1, next: 'pay_alipay', feedbackZh: '支付宝 是 Alipay，也很常用。', feedbackRu: '支付宝 — Alipay. Тоже очень распространён.' }
    ]
  },
  {
    type: 'branch',
    branchKey: 'pay_wechat',
    steps: [
      {
        type: 'dialogue',
        speaker: '售货员',
        name: 'Продавщица',
        nameZh: '售货员',
        zh: '可以，扫码吧。要不要袋子？',
        pinyin: 'Kěyǐ, sǎo mǎ ba. Yào bù yào dàizi?',
        ru: 'Можно, сканируйте. Пакет нужен?',
        side: 'left'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'pay_cash',
    steps: [
      {
        type: 'dialogue',
        speaker: '售货员',
        name: 'Продавщица',
        nameZh: '售货员',
        zh: '可以。要不要袋子？',
        pinyin: 'Kěyǐ. Yào bù yào dàizi?',
        ru: 'Можно. Пакет нужен?',
        side: 'left'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'pay_alipay',
    steps: [
      {
        type: 'dialogue',
        speaker: '售货员',
        name: 'Продавщица',
        nameZh: '售货员',
        zh: '可以，扫码吧。要不要袋子？',
        pinyin: 'Kěyǐ, sǎo mǎ ba. Yào bù yào dàizi?',
        ru: 'Можно, сканируйте. Пакет нужен?',
        side: 'left'
      }
    ]
  },
  {
    type: 'choice',
    questionZh: '售货员问：要不要袋子？',
    questionPinyin: 'Shòuhuòyuán wèn: yào bù yào dàizi?',
    questionRu: 'Продавщица спрашивает: «Пакет нужен?»',
    options: [
      { text: '谢谢，不要。', pinyin: 'Xièxie, bù yào.', ru: 'Спасибо, не надо.', trust: 1, next: null, feedbackZh: '礼貌的拒绝。', feedbackRu: 'Вежливый отказ.' },
      { text: '要。', pinyin: 'Yào.', ru: 'Да (нужен).', trust: 0, next: null, feedbackZh: '简短，但可以。袋子五毛钱。', feedbackRu: 'Коротко, но приемлемо. Пакет стоит 0.5 юаня, не забудь!' },
      { text: '什么？请你再说一遍。', pinyin: 'Shénme? Qǐng nǐ zài shuō yī biàn.', ru: 'Что? Повторите, пожалуйста.', trust: 0, next: null, feedbackZh: '可以，如果没听清。但 要不要袋子 是基本用语。', feedbackRu: 'Можно так, если не расслышал. Но 要不要袋子 — базовая фраза.' }
    ]
  },

  // --- ФИНАЛ ---
  {
    type: 'ending'
  }
];

// ====== ДВИЖОК ======
const root = document.getElementById('comic');
let currentIndex = 0;

function getSpent() {
  return state.cart.reduce((s, i) => s + i.price, 0);
}

function getLeft() {
  return state.budget - getSpent();
}

// --- кнопка перевода ---
function translationToggle(ruText) {
  const wrap = document.createElement('div');
  wrap.className = 'tr-wrap';

  const btn = document.createElement('button');
  btn.className = 'tr-toggle';
  btn.innerHTML = '<span class="tr-icon">👁</span><span class="tr-label">Показать перевод</span>';

  const text = document.createElement('div');
  text.className = 'tr-text';
  text.textContent = ruText;

  btn.onclick = () => {
    const open = text.classList.toggle('open');
    btn.querySelector('.tr-icon').textContent = open ? '🙈' : '👁';
    btn.querySelector('.tr-label').textContent = open ? 'Скрыть перевод' : 'Показать перевод';
  };

  wrap.appendChild(btn);
  wrap.appendChild(text);
  return wrap;
}

function statusBarEl() {
  const left = getLeft();
  const bought = state.cart.filter(i => SHOPPING_LIST.find(t => t.id === i.id)).length;
  const bar = document.createElement('div');
  bar.className = 'status-bar';
  bar.id = 'status-bar';
  bar.innerHTML = `
    <span>💰 剩: <span class="money ${left < 20 ? 'low' : ''}">${left.toFixed(2)} ¥</span></span>
    <span>🛒 买: ${bought} / ${SHOPPING_LIST.length}</span>
    <span>😊 印象: ${state.trust}</span>
  `;
  return bar;
}

function updateStatusBar() {
  const old = document.getElementById('status-bar');
  if (!old) return;
  const left = getLeft();
  const bought = state.cart.filter(i => SHOPPING_LIST.find(t => t.id === i.id)).length;
  old.innerHTML = `
    <span>💰 剩: <span class="money ${left < 20 ? 'low' : ''}">${left.toFixed(2)} ¥</span></span>
    <span>🛒 买: ${bought} / ${SHOPPING_LIST.length}</span>
    <span>😊 印象: ${state.trust}</span>
  `;
}

function appendPanel(panelEl) {
  root.appendChild(panelEl);
  panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateStatusBar();
}

function makePanel(innerHTML, tilt = null) {
  const panel = document.createElement('div');
  panel.className = 'panel' + (tilt ? ' ' + tilt : '');
  panel.innerHTML = innerHTML;
  return panel;
}

function nextButton(label = '继续 →') {
  const btn = document.createElement('button');
  btn.className = 'next-btn';
  btn.textContent = label;
  return btn;
}

// ====== РЕНДЕР ======

function renderTitle(step) {
  const panel = makePanel(`
    <div style="text-align:center;padding:20px 0;">
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:52px;font-weight:900;letter-spacing:6px;color:#d90429;margin-bottom:8px;">${step.title}</div>
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:30px;font-weight:700;color:#000;margin:12px 0;letter-spacing:4px;">${step.subtitle}</div>
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:15px;color:#666;letter-spacing:2px;">${step.caption}</div>
    </div>
  `);
  if (step.ruTitle) panel.appendChild(translationToggle(step.ruTitle + '. ' + step.ruSubtitle));
  const btn = nextButton('开始 →');
  btn.onclick = () => { currentIndex++; render(); };
  panel.appendChild(btn);
  appendPanel(panel);
}

function renderNarration(step) {
  const panel = makePanel(`
    ${step.bg ? `<div class="scene-bg">${step.bg}</div>` : ''}
    <div class="narration">
      <div class="narration-zh">${step.zh}</div>
      <div class="narration-pinyin">${step.pinyin}</div>
    </div>
  `, 'tilt-left');
  if (step.ru) panel.appendChild(translationToggle(step.ru));
  const btn = nextButton();
  btn.onclick = () => { currentIndex++; render(); };
  panel.appendChild(btn);
  appendPanel(panel);
}

function renderDialogue(step) {
  const side = step.side || 'left';
  const panel = makePanel(`
    <div class="bubble ${side}">
      <div class="speaker">${step.nameZh || step.name}</div>
      <div class="zh">${step.zh}</div>
      <div class="pinyin">${step.pinyin}</div>
    </div>
  `);
  if (step.ru) panel.appendChild(translationToggle(step.ru));
  const btn = nextButton();
  btn.onclick = () => { currentIndex++; render(); };
  panel.appendChild(btn);
  appendPanel(panel);
}

function renderChoice(step) {
  const panel = makePanel(`
    <div class="choice-question">
      <div>${step.questionZh}</div>
      <div>${step.questionPinyin}</div>
    </div>
    <div class="choice-options"></div>
  `);
  if (step.questionRu) panel.appendChild(translationToggle(step.questionRu));

  const optionsEl = panel.querySelector('.choice-options');

  step.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = `
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:20px;font-weight:700;">${opt.text}</div>
      <div style="font-family:'Inter',sans-serif;font-style:italic;font-size:13px;color:#666;margin-top:4px;">${opt.pinyin || ''}</div>
    `;
    btn.onclick = () => {
      if (opt.trust) state.trust += opt.trust;
      optionsEl.querySelectorAll('button').forEach(b => b.disabled = true);
      btn.classList.add('correct');

      if (opt.feedbackZh) {
        const fb = document.createElement('div');
        fb.className = 'narration';
        fb.style.marginTop = '16px';
        fb.innerHTML = `
          <div class="narration-zh">${opt.feedbackZh}</div>
        `;
        panel.appendChild(fb);
        if (opt.feedbackRu) panel.appendChild(translationToggle(opt.feedbackRu));
      }

      if (opt.next) state.flags.pendingBranch = opt.next;

      const next = nextButton();
      next.onclick = () => { currentIndex++; render(); };
      panel.appendChild(next);
    };
    optionsEl.appendChild(btn);
  });

  appendPanel(panel);
}

function renderBranch(step) {
  if (state.flags.pendingBranch !== step.branchKey) {
    currentIndex++;
    return render();
  }
  const branchSteps = step.steps;
  SCRIPT.splice(currentIndex, 1, ...branchSteps);
  state.flags.pendingBranch = null;
  render();
}

function renderShop() {
  const panel = makePanel(`
    <div class="choice-question">
      <div>买什么？</div>
      <div>Mǎi shénme?</div>
    </div>
    <div style="margin-bottom:12px;font-size:14px;color:#444;font-family:'Noto Sans SC',sans-serif;">
      目标：买齐清单上的 8 样东西。预算：81 元。
    </div>
    <details style="margin-bottom:12px;font-size:15px;">
      <summary style="cursor:pointer;font-family:'Noto Sans SC',sans-serif;font-weight:700;letter-spacing:1px;font-size:17px;">
        📋 购物清单 (8 样)
      </summary>
      <ul style="margin-top:8px;padding-left:20px;">
        ${SHOPPING_LIST.map(i => `<li style="font-family:'Noto Sans SC',sans-serif;font-size:16px;line-height:1.8;">${i.zh} <span style="color:#888;font-style:italic;font-family:Inter,sans-serif;font-size:13px;">${i.pinyin}</span> — ${i.price.toFixed(2)} ¥</li>`).join('')}
      </ul>
    </details>
    <div class="shop-grid"></div>
    <div class="shop-summary" style="margin-top:16px;font-family:'Noto Sans SC',sans-serif;font-size:16px;letter-spacing:1px;font-weight:600;"></div>
  `);

  const grid = panel.querySelector('.shop-grid');
  const summary = panel.querySelector('.shop-summary');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
  grid.style.gap = '12px';

  const buttons = {};

  SHELF.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.textAlign = 'center';
    btn.style.position = 'relative';
    btn.innerHTML = `
      <div style="font-family:'Noto Sans SC',sans-serif;font-size:24px;font-weight:700;">${item.zh}</div>
      <div style="font-family:'Inter',sans-serif;font-style:italic;font-size:13px;color:#888;">${item.pinyin}</div>
      <div style="font-family:'Bangers',cursive;font-size:22px;color:#d90429;margin-top:6px;">${item.price.toFixed(2)} ¥</div>
      ${item.funny ? '<div style="position:absolute;top:4px;right:6px;font-size:18px;">🦆</div>' : ''}
    `;

    btn.onclick = () => {
      const idx = state.cart.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        state.cart.splice(idx, 1);
      } else {
        const spent = getSpent();
        if (spent + item.price > state.budget) {
          btn.classList.add('wrong');
          setTimeout(() => btn.classList.remove('wrong'), 500);
          return;
        }
        state.cart.push(item);
      }
      updateShopUI();
    };

    buttons[item.id] = btn;
    grid.appendChild(btn);
  });

  function updateShopUI() {
    SHELF.forEach(item => {
      const btn = buttons[item.id];
      const inCart = state.cart.find(i => i.id === item.id);
      if (inCart) {
        btn.style.background = '#8ce99a';
        btn.style.borderColor = '#2b8a3e';
      } else {
        btn.style.background = '';
        btn.style.borderColor = '';
      }
    });

    const spent = getSpent();
    const left = state.budget - spent;
    const bought = state.cart.filter(i => SHOPPING_LIST.find(t => t.id === i.id)).length;
    summary.innerHTML = `
      选了 <span style="color:#d90429;">${state.cart.length}</span> 样
      &nbsp;·&nbsp; 需要的 <span style="color:#d90429;">${bought}</span> / ${SHOPPING_LIST.length}
      &nbsp;·&nbsp; 花了 <span style="color:#d90429;">${spent.toFixed(2)} ¥</span>
      &nbsp;·&nbsp; 剩 <span style="color:${left < 10 ? '#d90429' : '#2b8a3e'};">${left.toFixed(2)} ¥</span>
    `;

    updateStatusBar();
    finish.disabled = state.cart.length === 0;
  }

  const finish = nextButton('去收银台 →');
  finish.disabled = true;
  finish.onclick = () => { currentIndex++; render(); };
  panel.appendChild(finish);

  appendPanel(panel);
  updateShopUI();
}

function renderEnding() {
  const spent = getSpent();
  const left = getLeft();
  const boughtIds = state.cart.map(i => i.id);
  const missing = SHOPPING_LIST.filter(i => !boughtIds.includes(i.id));
  const extra = state.cart.filter(i => !SHOPPING_LIST.find(t => t.id === i.id));

  let titleZh, titleRu, cls, textZh, textRu, achievementZh, achievementRu;

  const correctEverything = missing.length === 0 && extra.length === 0 && spent <= state.budget;

  if (spent > state.budget) {
    titleZh = '你的钱不够';
    titleRu = 'Твоих денег не хватает';
    cls = 'bad';
    textZh = `扎克选了 ${spent.toFixed(2)} 元的东西，钱包里只有 ${state.budget} 元。售货员说：「你的钱不够。」`;
    textRu = `Зак набрал на ${spent.toFixed(2)} ¥, а в кошельке только ${state.budget} ¥. Продавщица: «你的钱不够.»`;
    achievementZh = '一买就错';
    achievementRu = 'Купил и ошибся';
  } else if (correctEverything) {
    titleZh = '购物成功！';
    titleRu = 'Покупки успешны!';
    cls = 'good';
    textZh = `扎克买齐了清单上的东西，花了 ${spent.toFixed(2)} 元，还剩 ${left.toFixed(2)} 元。室友说：「你买了这么多东西！」扎克说：「好贵啊！下次在拼多多买吧。」`;
    textRu = `Зак купил всё по списку и потратил ${spent.toFixed(2)} ¥. Осталось ${left.toFixed(2)} ¥.`;
    achievementZh = '购物狂';
    achievementRu = 'Шопоголик';
  } else if (missing.length > 0 && extra.length === 0) {
    titleZh = '你忘了一些东西';
    titleRu = 'Ты кое-что забыл';
    cls = 'neutral';
    const missZh = missing.map(m => m.zh).join('、');
    const missRu = missing.map(m => m.zh + ' (' + m.ru + ')').join(', ');
    textZh = `扎克回到宿舍，但忘了买：${missZh}。`;
    textRu = `Зак вернулся в общежитие, но забыл купить: ${missRu}.`;
    achievementZh = '一买就错';
    achievementRu = 'Купил и ошибся';
  } else {
    titleZh = '你买错了一些东西';
    titleRu = 'Ты купил не то';
    cls = 'bad';
    const extraZh = extra.map(m => m.zh).join('、') || '—';
    const missZh = missing.map(m => m.zh).join('、') || '—';
    const extraRu = extra.map(m => m.zh + ' (' + m.ru + ')').join(', ') || '—';
    const missRu = missing.map(m => m.zh + ' (' + m.ru + ')').join(', ') || '—';
    textZh = `扎克买了多余的：${extraZh}。忘了：${missZh}。`;
    textRu = `Зак купил лишнее: ${extraRu}. А забыл: ${missRu}.`;
    achievementZh = '一买就错';
    achievementRu = 'Купил и ошибся';
  }

  const panel = makePanel(`
    <div class="ending ${cls}">
      <div class="ending-title">${titleZh}</div>
      <div class="ending-text">${textZh}</div>
      <div class="ending-achievement">成就：<b>${achievementZh}</b></div>
      <div class="ending-summary">花了 ${spent.toFixed(2)} ¥ / ${state.budget} ¥</div>
    </div>
  `);
  panel.appendChild(translationToggle(`${titleRu}. ${textRu} Достижение: ${achievementRu}`));
  appendPanel(panel);
}

function render() {
  if (currentIndex >= SCRIPT.length) return;
  const step = SCRIPT[currentIndex];

  switch (step.type) {
    case 'title':     renderTitle(step);     break;
    case 'narration': renderNarration(step); break;
    case 'dialogue':  renderDialogue(step);  break;
    case 'choice':    renderChoice(step);    break;
    case 'branch':    renderBranch(step);    break;
    case 'shop':      renderShop();          break;
    case 'ending':    renderEnding();        break;
  }
}

// ====== СТАРТ ======
root.innerHTML = '';
root.appendChild(statusBarEl());
render();
