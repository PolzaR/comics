// ====== СОСТОЯНИЕ ИГРЫ ======
const state = {
  budget: 200,
  cart: [],
  trust: 0,
  flags: {}
};

const SHOPPING_LIST = [
  { id: 'shampoo', zh: '洗发水', ru: 'шампунь', price: 45 },
  { id: 'gel',     zh: '沐浴露', ru: 'гель для душа', price: 38 },
  { id: 'soap',    zh: '香皂',   ru: 'мыло', price: 12 },
  { id: 'paste',   zh: '牙膏',   ru: 'зубная паста', price: 22 },
  { id: 'paper',   zh: '卫生纸', ru: 'туалетная бумага', price: 35 }
];

// ====== СЦЕНАРИЙ (массив шагов) ======
// Типы: narration | dialogue | choice | shop | ending
const SCRIPT = [
  {
    type: 'narration',
    text: 'Ты недавно приехал в Китай. Закончился шампунь. В руках — список покупок.',
    bg: '日用品店 · Магазин бытовой химии'
  },
  {
    type: 'narration',
    text: 'Цель: купить 5 предметов. Бюджет — 200 юаней. Ни больше, ни меньше.',
    bg: '日用品店 · Магазин бытовой химии'
  },
  {
    type: 'dialogue',
    speaker: 'Ты',
    zh: '请问，洗发水在哪里？',
    pinyin: 'Qǐngwèn, xǐfàshuǐ zài nǎlǐ?',
    ru: 'Извините, где шампунь?',
    side: 'right'
  },
  {
    type: 'choice',
    question: 'Продавщица смотрит на тебя. Как продолжишь?',
    options: [
      { text: '谢谢！那沐浴露和香皂也在那里吗？', trust: 1, next: 'polite' },
      { text: '沐浴露、香皂，哪里？', trust: -1, next: 'rude' },
      { text: '（молча идёшь искать сам）', trust: 0, next: 'silent' }
    ]
  },
  {
    type: 'branch',
    branchKey: 'polite',
    steps: [
      {
        type: 'dialogue',
        speaker: 'Продавщица',
        zh: '对，都在那一排。要我帮你找吗？',
        pinyin: 'Duì, dōu zài nà yī pái. Yào wǒ bāng nǐ zhǎo ma?',
        ru: 'Да, все на той полке. Помочь найти?',
        side: 'left'
      },
      {
        type: 'dialogue',
        speaker: 'Ты',
        zh: '不用了，谢谢！我自己看看。',
        pinyin: 'Bùyòng le, xièxie! Wǒ zìjǐ kànkan.',
        ru: 'Не нужно, спасибо! Я сам посмотрю.',
        side: 'right'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'rude',
    steps: [
      {
        type: 'dialogue',
        speaker: 'Продавщица',
        zh: '……在那边。',
        pinyin: '……zài nàbiān.',
        ru: '…Вон там. (недовольно)',
        side: 'left'
      },
      {
        type: 'narration',
        text: 'Продавщица отвернулась. Кажется, помочь тебе больше не хочется.',
        bg: '日用品店 · Магазин бытовой химии'
      }
    ]
  },
  {
    type: 'branch',
    branchKey: 'silent',
    steps: [
      {
        type: 'narration',
        text: 'Ты молча идёшь вдоль полок. Иероглифы сливаются в одно пятно.',
        bg: '日用品店 · Магазин бытовой химии'
      },
      {
        type: 'dialogue',
        speaker: 'Продавщица',
        zh: '需要帮忙吗？',
        pinyin: 'Xūyào bāngmáng ma?',
        ru: 'Нужна помощь?',
        side: 'left'
      }
    ]
  },
  {
    type: 'narration',
    text: 'Ты у полки. Пора выбирать. Следи за бюджетом — 200 юаней, не больше!',
    bg: '日用品店 · Полка с товарами'
  },
  {
    type: 'shop'  // особая панель — выбор товаров
  },
  {
    type: 'narration',
    text: 'Ты подходишь к кассе. Корзина в руках.',
    bg: '日用品店 · Касса'
  },
  {
    type: 'choice',
    question: 'Кассир: «你好，有会员卡吗？»',
    options: [
      { text: '没有。', trust: 0, next: null },
      { text: '没有，谢谢。', trust: 1, next: null },
      { text: 'Нет! （резко）', trust: -1, next: null }
    ]
  },
  {
    type: 'choice',
    question: 'Кассир: «需要袋子吗？»',
    options: [
      { text: '要一个，谢谢。多少钱？', trust: 1, next: null },
      { text: '不要。', trust: 0, next: null },
      { text: '不用了，我自己有。', trust: 1, next: null }
    ]
  },
  {
    type: 'ending'  // вычисляется по состоянию
  }
];

// ====== ДВИЖОК ======
const root = document.getElementById('comic');
let currentIndex = 0;
const renderedPanels = []; // для истории

function renderStatusBar() {
  const spent = state.cart.reduce((sum, item) => sum + item.price, 0);
  const left = state.budget - spent;
  const bar = document.createElement('div');
  bar.className = 'status-bar';
  bar.innerHTML = `
    <span>💰 Осталось: <span class="money ${left < 50 ? 'low' : ''}">${left} ¥</span></span>
    <span>🛒 Куплено: ${state.cart.length} / ${SHOPPING_LIST.length}</span>
    <span>😊 Расположение: ${state.trust}</span>
  `;
  return bar;
}

function clearComic() {
  root.innerHTML = '';
}

function appendPanel(panelEl) {
  root.appendChild(panelEl);
  panelEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function makePanel(innerHTML, tilt = null) {
  const panel = document.createElement('div');
  panel.className = 'panel' + (tilt ? ' ' + tilt : '');
  panel.innerHTML = innerHTML;
  return panel;
}

function nextButton(label = 'Дальше →') {
  const btn = document.createElement('button');
  btn.className = 'next-btn';
  btn.textContent = label;
  return btn;
}

// ====== РЕНДЕР ШАГОВ ======

function renderNarration(step) {
  const panel = makePanel(`
    ${step.bg ? `<div class="scene-bg">${step.bg}</div>` : ''}
    <div class="narration">${step.text}</div>
  `, 'tilt-left');
  const btn = nextButton();
  btn.onclick = () => { currentIndex++; render(); };
  panel.appendChild(btn);
  appendPanel(panel);
}

function renderDialogue(step) {
  const side = step.side || 'left';
  const panel = makePanel(`
    <div class="bubble ${side}">
      <div class="speaker">${step.speaker}</div>
      <div class="zh">${step.zh}</div>
      <div class="pinyin">${step.pinyin}</div>
      <div class="ru">${step.ru}</div>
    </div>
  `);
  const btn = nextButton();
  btn.onclick = () => { currentIndex++; render(); };
  panel.appendChild(btn);
  appendPanel(panel);
}

function renderChoice(step) {
  const panel = makePanel(`
    <div class="choice-question">${step.question}</div>
    <div class="choice-options"></div>
  `);
  const optionsEl = panel.querySelector('.choice-options');

  step.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = opt.text;
    btn.onclick = () => {
      // применяем эффект
      if (opt.trust) state.trust += opt.trust;
      // блокируем все кнопки
      optionsEl.querySelectorAll('button').forEach(b => b.disabled = true);
      btn.classList.add('correct');
      // если есть ветка — прыгаем в неё
      if (opt.next) state.flags.pendingBranch = opt.next;
      // показать следующую кнопку
      const next = nextButton();
      next.onclick = () => { currentIndex++; render(); };
      panel.appendChild(next);
    };
    optionsEl.appendChild(btn);
  });

  appendPanel(panel);
}

function renderBranch(step) {
  // Если ветка не совпадает с выбранным флагом — пропускаем
  if (state.flags.pendingBranch !== step.branchKey) {
    currentIndex++;
    return render();
  }
  // Иначе — разворачиваем шаги ветки как обычные
  const branchSteps = step.steps;
  // подменяем: вставляем шаги ветки перед текущим индексом
  SCRIPT.splice(currentIndex, 1, ...branchSteps);
  state.flags.pendingBranch = null;
  render();
}

function renderShop() {
  const panel = makePanel(`
    <div class="choice-question">Что положишь в корзину?</div>
    <div class="shop-grid"></div>
  `);
  const grid = panel.querySelector('.shop-grid');
  grid.style.display = 'grid';
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
  grid.style.gap = '12px';

  SHOPPING_LIST.forEach(item => {
    const already = state.cart.find(i => i.id === item.id);
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.style.textAlign = 'center';
    btn.disabled = !!already;
    btn.innerHTML = `
      <div style="font-family:'Noto Sans SC';font-size:20px;">${item.zh}</div>
      <div style="font-size:13px;color:#666;">${item.ru}</div>
      <div style="font-family:'Bangers';font-size:22px;color:#d90429;">${item.price} ¥</div>
    `;
    if (already) btn.style.background = '#ccc';
    btn.onclick = () => {
      state.cart.push(item);
      // перерисовать эту панель
      const idx = currentIndex;
      clearComic();
      // заново отрисовать всё, что было до shop
      // (упрощённо: просто перезапустим текущий шаг)
      currentIndex = idx;
      render();
    };
    grid.appendChild(btn);
  });

  // кнопка «на кассу» — доступна когда корзина не пуста
  const finish = nextButton('На кассу →');
  finish.disabled = state.cart.length === 0;
  finish.onclick = () => { currentIndex++; render(); };
  panel.appendChild(finish);

  appendPanel(panel);
}

function renderEnding() {
  const spent = state.cart.reduce((s, i) => s + i.price, 0);
  const left = state.budget - spent;
  const boughtIds = state.cart.map(i => i.id);
  const missing = SHOPPING_LIST.filter(i => !boughtIds.includes(i.id));

  let title, cls, text;

  if (spent > state.budget) {
    title = 'КАССИР ОТПРАВЛЯЕТ ТЕБЯ ВЫЛОЖИТЬ ЛИШНЕЕ';
    cls = 'bad';
    text = `Ты набрал на ${spent} ¥, а в кошельке только ${state.budget} ¥. Кассир указывает на корзину: «太多了，放回去一些。» (Слишком много, убери что-нибудь.)`;
  } else if (missing.length > 0) {
    title = 'ТЫ ЗАБЫЛ КУПИТЬ';
    cls = 'neutral';
    const names = missing.map(m => m.zh + ' (' + m.ru + ')').join(', ');
    text = `Ты вышел из магазина, но забыл: ${names}. В следующий раз — проверяй список.`;
  } else if (state.trust < 0) {
    title = 'ТЫ УШЁЛ, НО ОСАДОК ОСТАЛСЯ';
    cls = 'neutral';
    text = 'Всё куплено, но продавщица смотрела на тебя недовольно. В Китае вежливость — это 请问 и 谢谢 в каждом втором предложении.';
  } else {
    title = 'ВСЁ КУПЛЕНО!';
    cls = 'good';
    text = `Ты купил всё по списку и потратил ${spent} ¥. Осталось ${left} ¥. Кассир улыбается: «谢谢，欢迎再来！»`;
  }

  const panel = makePanel(`
    <div class="ending ${cls}">
      <div>${title}</div>
      <div style="font-size:18px;font-weight:400;margin-top:20px;font-family:'Inter';letter-spacing:0;">
        ${text}
      </div>
    </div>
  `);
  appendPanel(panel);
}

// ====== ГЛАВНЫЙ ЦИКЛ ======
function render() {
  // Очищаем и рисуем всё заново с нуля до currentIndex — неудобно.
  // Проще: рисуем только текущий шаг. История остаётся в DOM.
  if (currentIndex >= SCRIPT.length) return;

  const step = SCRIPT[currentIndex];

  switch (step.type) {
    case 'narration': renderNarration(step); break;
    case 'dialogue':  renderDialogue(step);  break;
    case 'choice':    renderChoice(step);    break;
    case 'branch':    renderBranch(step);    break;
    case 'shop':      renderShop();          break;
    case 'ending':    renderEnding();        break;
  }
}

// ====== СТАРТ ======
clearComic();
const statusBar = renderStatusBar();
root.appendChild(statusBar);
// обновляем статус-бар после каждого шага
const _origAppend = appendPanel;
appendPanel = function(p) {
  _origAppend(p);
  // обновляем содержимое статус-бара
  const spent = state.cart.reduce((s, i) => s + i.price, 0);
  const left = state.budget - spent;
  statusBar.innerHTML = `
    <span>💰 Осталось: <span class="money ${left < 50 ? 'low' : ''}">${left} ¥</span></span>
    <span>🛒 Куплено: ${state.cart.length} / ${SHOPPING_LIST.length}</span>
    <span>😊 Расположение: ${state.trust}</span>
  `;
};
render();
