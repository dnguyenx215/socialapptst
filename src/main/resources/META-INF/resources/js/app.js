/* EnglishUp – ứng dụng học tiếng Anh (không cần backend, dữ liệu học lưu ở localStorage) */
(() => {
'use strict';

// ---------- Dữ liệu ----------
const WORDS = [];
TOPICS.forEach(t => t.words.trim().split('\n').forEach(line => {
  const [w, ipa, pos, vi, ex] = line.split('|');
  WORDS.push({ w, ipa, pos, vi, ex, topic: t.id, level: t.level });
}));
const VERBS = IRREGULARS.trim().split('\n').map(l => { const [base, past, pp, vi] = l.split('|'); return { base, past, pp, vi }; });
const topicOf = id => TOPICS.find(t => t.id === id);
const INTERVALS = [0, 1, 2, 4, 8, 16, 32]; // ngày, theo hộp Leitner

// ---------- Lưu trữ ----------
const KEY = 'englishup.v1';
let S = load();
function load() {
  try { return Object.assign({ xp: 0, streak: 0, last: '', days: {}, goal: 20, cards: {}, grammar: {}, theme: '' }, JSON.parse(localStorage.getItem(KEY) || '{}')); }
  catch { return { xp: 0, streak: 0, last: '', days: {}, goal: 20, cards: {}, grammar: {}, theme: '' }; }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} refreshStats(); }
const dayStr = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => dayStr();
function addDay(s, n) { const d = new Date(s + 'T00:00:00'); d.setDate(d.getDate() + n); return dayStr(d); }

function award(xp) {
  const t = today();
  if (S.last !== t) {
    S.streak = S.last === addDay(t, -1) ? S.streak + 1 : 1;
    S.last = t;
  }
  S.xp += xp;
  S.days[t] = (S.days[t] || 0) + 1;
  save();
}
function refreshStats() {
  document.getElementById('xp').textContent = '⭐ ' + S.xp;
  const alive = S.last === today() || S.last === addDay(today(), -1);
  document.getElementById('streak').textContent = '🔥 ' + (alive ? S.streak : 0);
}

// ---------- Tiện ích ----------
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n);
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $('#app');
const norm = s => s.trim().toLowerCase().replace(/\s+/g, ' ');

function speak(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) return alert('Trình duyệt của bạn không hỗ trợ phát âm.');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = rate;
  const v = speechSynthesis.getVoices().find(v => v.lang && v.lang.startsWith('en'));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}

// Thẻ từ (Leitner)
function card(w) { return S.cards[w] || (S.cards[w] = { box: 0, due: today(), right: 0, wrong: 0 }); }
function grade(w, ok) {
  const c = card(w);
  if (ok) { c.box = Math.min(c.box + 1, INTERVALS.length - 1); c.right++; } else { c.box = 0; c.wrong++; }
  c.due = addDay(today(), INTERVALS[c.box] || 0);
  award(ok ? 10 : 2);
}
const isDue = w => { const c = S.cards[w]; return !c || c.due <= today(); };
const isNew = w => !S.cards[w];
const mastered = w => S.cards[w] && S.cards[w].box >= 4;
const dueWords = () => WORDS.filter(x => !isNew(x.w) && isDue(x.w));

// ---------- Điều hướng ----------
const views = {};
function go(view, arg) {
  $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if (speechSynthesis) speechSynthesis.cancel();
  views[view](arg);
  window.scrollTo(0, 0);
}
$('#nav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) go(b.dataset.view); });
$('#theme').addEventListener('click', () => {
  S.theme = S.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = S.theme; save();
});

function topicPicker(title, onPick, opts = {}) {
  const dueN = dueWords().length;
  app.innerHTML = `<h2>${title}</h2><div class="grid">
    ${opts.review !== false ? `<div class="card topic" data-t="__due"><div class="ic">🔁</div><b>Ôn tập đến hạn</b><div class="muted">${dueN} từ cần ôn hôm nay</div></div>` : ''}
    <div class="card topic" data-t="__all"><div class="ic">🌐</div><b>Tất cả chủ đề</b><div class="muted">${WORDS.length} từ</div></div>
    ${TOPICS.map(t => `<div class="card topic" data-t="${t.id}"><div class="ic">${t.icon}</div><b>${esc(t.name)}</b> <span class="badge">${t.level}</span><div class="muted">${t.words.trim().split('\n').length} từ</div></div>`).join('')}
  </div>`;
  $$('.topic').forEach(el => el.onclick = () => onPick(el.dataset.t));
}
function wordsFor(t) {
  if (t === '__all') return WORDS;
  if (t === '__due') return dueWords();
  return WORDS.filter(x => x.topic === t);
}
const speakBtn = w => `<button class="speak" data-say="${esc(w)}" title="Nghe phát âm">🔊</button>`;
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) { e.stopPropagation(); speak(b.dataset.say); } });

// ---------- Trang chủ ----------
views.home = () => {
  const done = S.days[today()] || 0, pct = Math.min(100, Math.round(done / S.goal * 100));
  const learned = Object.keys(S.cards).length, m = WORDS.filter(x => mastered(x.w)).length;
  app.innerHTML = `
  <div class="card"><h1>Chào mừng bạn đến với EnglishUp 👋</h1>
    <p class="muted">Học từ vựng theo chủ đề, ôn tập bằng lặp lại ngắt quãng (Leitner), luyện nghe – chính tả – ngữ pháp mỗi ngày.</p>
    <div class="row"><b>Mục tiêu hôm nay:</b> ${done}/${S.goal} lượt luyện tập
      <select id="goal">${[10, 20, 30, 50, 100].map(n => `<option ${n === S.goal ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
    <div class="row" style="margin-top:14px">
      <button class="btn" data-go="flash" data-arg="__due">🔁 Ôn tập (${dueWords().length} từ đến hạn)</button>
      <button class="btn sec" data-go="quiz">📝 Làm trắc nghiệm</button>
      <button class="btn sec" data-go="listen">🎧 Luyện nghe</button>
    </div></div>
  <div class="stat-grid">
    <div class="card center"><div class="big-num">${WORDS.length}</div>từ trong kho</div>
    <div class="card center"><div class="big-num">${learned}</div>từ đã học</div>
    <div class="card center"><div class="big-num">${m}</div>từ đã thuộc</div>
    <div class="card center"><div class="big-num">${GRAMMAR.length}</div>bài ngữ pháp</div>
  </div>
  <h2>Chủ đề từ vựng</h2><div class="grid">${TOPICS.map(t => `<div class="card topic" data-go="vocab" data-arg="${t.id}"><div class="ic">${t.icon}</div><b>${esc(t.name)}</b> <span class="badge">${t.level}</span></div>`).join('')}</div>`;
  $$('[data-go]').forEach(el => el.onclick = () => go(el.dataset.go, el.dataset.arg));
  $('#goal').onchange = e => { S.goal = +e.target.value; save(); views.home(); };
};

// ---------- Từ vựng ----------
views.vocab = (topic) => {
  let list = topic ? wordsFor(topic) : WORDS;
  const t = topic && topicOf(topic);
  app.innerHTML = `<h2>${t ? t.icon + ' ' + esc(t.name) : 'Từ điển'}</h2>
  <div class="row"><input type="text" id="q" placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt…">
    <select id="lv"><option value="">Mọi cấp độ</option>${['A1', 'A2', 'B1', 'B2', 'C1'].map(l => `<option>${l}</option>`).join('')}</select>
    <select id="tp"><option value="">Mọi chủ đề</option>${TOPICS.map(x => `<option value="${x.id}" ${x.id === topic ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select>
    <button class="btn" id="startFlash">Học chủ đề này</button></div>
  <div class="card" id="list"></div>`;
  const render = () => {
    const q = norm($('#q').value), lv = $('#lv').value, tp = $('#tp').value;
    list = WORDS.filter(x => (!tp || x.topic === tp) && (!lv || x.level === lv) && (!q || x.w.toLowerCase().includes(q) || x.vi.toLowerCase().includes(q)));
    $('#list').innerHTML = list.length ? list.map(x => `<div class="entry"><div><span class="word">${esc(x.w)}</span> <span class="ipa">${esc(x.ipa)}</span> <span class="pos">${esc(x.pos)}</span> <span class="badge">${x.level}</span>${mastered(x.w) ? ' ✅' : ''}<div>${esc(x.vi)}</div></div>${speakBtn(x.w)}<div class="ex">“${esc(x.ex)}” ${speakBtn(x.ex)}</div></div>`).join('') : '<p class="muted">Không tìm thấy từ phù hợp.</p>';
  };
  ['input', 'change'].forEach(ev => { $('#q').addEventListener(ev, render); $('#lv').addEventListener(ev, render); $('#tp').addEventListener(ev, render); });
  $('#startFlash').onclick = () => go('flash', $('#tp').value || '__all');
  render();
};

// ---------- Thẻ ghi nhớ ----------
views.flash = (topic) => {
  if (!topic) return topicPicker('Thẻ ghi nhớ – chọn chủ đề', t => go('flash', t));
  let pool = wordsFor(topic);
  if (topic !== '__due') pool = pool.filter(x => isDue(x.w));
  pool = shuffle(pool).slice(0, 30);
  if (!pool.length) { app.innerHTML = `<div class="card center"><h2>🎉 Không có từ nào cần ôn!</h2><p class="muted">Hãy quay lại sau hoặc học chủ đề mới.</p><button class="btn" data-go>Chọn chủ đề khác</button></div>`; $('[data-go]').onclick = () => go('flash'); return; }
  let i = 0, ok = 0;
  const show = () => {
    if (i >= pool.length) { app.innerHTML = `<div class="card center"><h2>Hoàn thành! 🎉</h2><p>Bạn nhớ <b>${ok}/${pool.length}</b> từ.</p><button class="btn" id="again">Tiếp tục</button> <button class="btn sec" id="home">Trang chủ</button></div>`; $('#again').onclick = () => go('flash', topic); $('#home').onclick = () => go('home'); return; }
    const x = pool[i];
    app.innerHTML = `<div class="row"><b>Thẻ ${i + 1}/${pool.length}</b><div class="bar" style="flex:1"><i style="width:${i / pool.length * 100}%"></i></div></div>
    <div class="flash" id="fc"><div class="in">
      <div class="face"><div class="big">${esc(x.w)}</div><div class="ipa">${esc(x.ipa)} · <span class="pos">${esc(x.pos)}</span></div><div style="margin-top:8px">${speakBtn(x.w)}</div><div class="muted">Nhấn để lật thẻ</div></div>
      <div class="face back"><div class="big">${esc(x.vi)}</div><div style="margin-top:12px">“${esc(x.ex)}”</div></div></div></div>
    <div class="row" style="justify-content:center" id="acts" hidden><button class="btn bad" id="no">😕 Chưa nhớ</button><button class="btn ok" id="yes">😀 Đã nhớ</button></div>`;
    speak(x.w);
    $('#fc').onclick = e => { if (e.target.closest('[data-say]')) return; $('#fc').classList.add('flip'); $('#acts').hidden = false; };
    $('#yes').onclick = () => { grade(x.w, true); ok++; i++; show(); };
    $('#no').onclick = () => { grade(x.w, false); i++; show(); };
  };
  show();
};

// ---------- Trắc nghiệm ----------
views.quiz = (topic) => {
  if (!topic) return topicPicker('Trắc nghiệm – chọn chủ đề', t => go('quiz', t));
  const pool = wordsFor(topic);
  if (pool.length < 1) return go('quiz');
  const qs = pick(pool, Math.min(10, pool.length)).map(x => {
    const toVi = Math.random() < 0.5;
    const others = pick(WORDS.filter(y => y.w !== x.w && (toVi ? y.vi !== x.vi : true)), 3);
    return { x, toVi, opts: shuffle([x, ...others]) };
  });
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) { app.innerHTML = `<div class="card center"><h2>Kết quả: ${score}/${qs.length}</h2><div class="bar"><i style="width:${score / qs.length * 100}%"></i></div><p>${score === qs.length ? 'Xuất sắc! 🏆' : score >= qs.length * 0.7 ? 'Tốt lắm! 👍' : 'Cố gắng thêm nhé 💪'}</p><button class="btn" id="a">Làm lại</button> <button class="btn sec" id="h">Trang chủ</button></div>`; $('#a').onclick = () => go('quiz', topic); $('#h').onclick = () => go('home'); return; }
    const { x, toVi, opts } = qs[i];
    app.innerHTML = `<div class="card"><div class="muted">Câu ${i + 1}/${qs.length}</div>
      <h2>${toVi ? esc(x.w) + ' ' + speakBtn(x.w) : esc(x.vi)}</h2><div class="muted">${toVi ? 'Chọn nghĩa đúng' : 'Chọn từ tiếng Anh đúng'}</div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(toVi ? o.vi : o.w)}</button>`).join('')}</div><div id="fb"></div></div>`;
    $$('.opt').forEach(b => b.onclick = () => {
      const right = opts[+b.dataset.k].w === x.w;
      $$('.opt').forEach((o, k) => { o.disabled = true; if (opts[k].w === x.w) o.classList.add('right'); });
      if (!right) b.classList.add('wrong'); else score++;
      grade(x.w, right);
      $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'bad'}">${right ? '✅ Chính xác!' : '❌ Chưa đúng.'} <b>${esc(x.w)}</b> ${esc(x.ipa)} – ${esc(x.vi)}<br><i>${esc(x.ex)}</i></div><p><button class="btn" id="n">${i + 1 < qs.length ? 'Câu tiếp theo' : 'Xem kết quả'}</button></p>`;
      $('#n').onclick = () => { i++; show(); };
    });
  };
  show();
};

// ---------- Chính tả ----------
views.spell = (topic) => {
  if (!topic) return topicPicker('Chính tả – nghe và gõ lại', t => go('spell', t), { review: false });
  const qs = pick(wordsFor(topic), 10);
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) { app.innerHTML = `<div class="card center"><h2>Chính tả: ${score}/${qs.length}</h2><button class="btn" id="a">Làm lại</button> <button class="btn sec" id="h">Trang chủ</button></div>`; $('#a').onclick = () => go('spell', topic); $('#h').onclick = () => go('home'); return; }
    const x = qs[i];
    app.innerHTML = `<div class="card"><div class="muted">Từ ${i + 1}/${qs.length}</div><h2>Nghe và gõ lại từ</h2>
      <p>Gợi ý nghĩa: <b>${esc(x.vi)}</b> <span class="pos">(${esc(x.pos)})</span></p>
      <div class="row"><button class="btn" id="p">🔊 Nghe</button><button class="btn sec" id="s">🐢 Nghe chậm</button></div>
      <form id="f" class="row"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ từ tiếng Anh…" autofocus><button class="btn">Kiểm tra</button></form><div id="fb"></div></div>`;
    $('#p').onclick = () => speak(x.w); $('#s').onclick = () => speak(x.w, 0.5); speak(x.w);
    $('#ans').focus();
    $('#f').onsubmit = e => {
      e.preventDefault();
      if ($('#ans').disabled) return;
      const right = norm($('#ans').value) === x.w.toLowerCase();
      $('#ans').disabled = true; grade(x.w, right); if (right) score++;
      $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'bad'}">${right ? '✅ Đúng rồi!' : '❌ Đáp án: <b>' + esc(x.w) + '</b>'} ${esc(x.ipa)}</div><p><button class="btn" id="n">Tiếp theo</button></p>`;
      $('#n').onclick = () => { i++; show(); }; $('#n').focus();
    };
  };
  show();
};

// ---------- Luyện nghe ----------
views.listen = (topic) => {
  if (!topic) return topicPicker('Luyện nghe – chọn chủ đề', t => go('listen', t), { review: false });
  const qs = pick(wordsFor(topic), 10);
  let i = 0, score = 0;
  const show = () => {
    if (i >= qs.length) { app.innerHTML = `<div class="card center"><h2>Nghe: ${score}/${qs.length}</h2><button class="btn" id="a">Làm lại</button> <button class="btn sec" id="h">Trang chủ</button></div>`; $('#a').onclick = () => go('listen', topic); $('#h').onclick = () => go('home'); return; }
    const x = qs[i];
    const opts = shuffle([x, ...pick(WORDS.filter(y => y.w !== x.w), 3)]);
    app.innerHTML = `<div class="card"><div class="muted">Câu ${i + 1}/${qs.length}</div><h2>Bạn nghe được từ nào?</h2>
      <div class="row"><button class="btn" id="p">🔊 Nghe</button><button class="btn sec" id="s">🐢 Chậm</button></div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o.w)}</button>`).join('')}</div><div id="fb"></div></div>`;
    $('#p').onclick = () => speak(x.w); $('#s').onclick = () => speak(x.w, 0.5); speak(x.w);
    $$('.opt').forEach(b => b.onclick = () => {
      const right = opts[+b.dataset.k].w === x.w;
      $$('.opt').forEach((o, k) => { o.disabled = true; if (opts[k].w === x.w) o.classList.add('right'); });
      if (!right) b.classList.add('wrong'); else score++;
      grade(x.w, right);
      $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'bad'}"><b>${esc(x.w)}</b> ${esc(x.ipa)} – ${esc(x.vi)}</div><p><button class="btn" id="n">Tiếp theo</button></p>`;
      $('#n').onclick = () => { i++; show(); };
    });
  };
  show();
};

// ---------- Ngữ pháp ----------
views.grammar = (id) => {
  if (!id) {
    app.innerHTML = `<h2>Ngữ pháp</h2><div class="grid">${GRAMMAR.map(g => `<div class="card topic" data-id="${g.id}"><b>${esc(g.title)}</b> <span class="badge">${g.level}</span><div class="muted">${g.ex.length} bài tập${S.grammar[g.id] != null ? ' · điểm cao nhất ' + S.grammar[g.id] + '/' + g.ex.length : ''}</div></div>`).join('')}</div>`;
    return $$('.topic').forEach(el => el.onclick = () => go('grammar', el.dataset.id));
  }
  const g = GRAMMAR.find(x => x.id === id);
  app.innerHTML = `<div class="card lesson"><button class="btn sec" id="back">← Danh sách</button><h2>${esc(g.title)} <span class="badge">${g.level}</span></h2>${g.html}
    <div class="row"><button class="btn" id="practice">Làm bài tập (${g.ex.length} câu)</button></div></div>`;
  $('#back').onclick = () => go('grammar');
  $('#practice').onclick = () => {
    const qs = shuffle(g.ex); let i = 0, score = 0;
    const show = () => {
      if (i >= qs.length) {
        S.grammar[g.id] = Math.max(S.grammar[g.id] || 0, score); save();
        app.innerHTML = `<div class="card center"><h2>${esc(g.title)}: ${score}/${qs.length}</h2><button class="btn" id="a">Làm lại</button> <button class="btn sec" id="b">Danh sách bài</button></div>`;
        $('#a').onclick = () => go('grammar', id); $('#b').onclick = () => go('grammar'); return;
      }
      const q = qs[i], correct = q.o[q.a];
      const opts = shuffle(q.o);
      app.innerHTML = `<div class="card"><div class="muted">${esc(g.title)} · Câu ${i + 1}/${qs.length}</div><h2>${esc(q.q).replace('___', '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>')}</h2>
        <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div><div id="fb"></div></div>`;
      $$('.opt').forEach(b => b.onclick = () => {
        const right = opts[+b.dataset.k] === correct;
        $$('.opt').forEach((o, k) => { o.disabled = true; if (opts[k] === correct) o.classList.add('right'); });
        if (!right) b.classList.add('wrong'); else score++;
        award(right ? 10 : 2);
        $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'bad'}">${right ? '✅ Chính xác!' : '❌ Chưa đúng.'} ${esc(q.e)}</div><p><button class="btn" id="n">Tiếp theo</button></p>`;
        $('#n').onclick = () => { i++; show(); };
      });
    };
    show();
  };
};

// ---------- Động từ bất quy tắc ----------
views.verbs = () => {
  app.innerHTML = `<h2>Động từ bất quy tắc (${VERBS.length})</h2>
  <div class="row"><input type="text" id="q" placeholder="Tìm động từ…"><label><input type="checkbox" id="hide"> Che V2/V3 để tự kiểm tra</label><button class="btn" id="prac">Luyện tập</button></div>
  <div class="card" style="overflow:auto"><table><thead><tr><th>Nguyên mẫu (V1)</th><th>Quá khứ (V2)</th><th>Phân từ II (V3)</th><th>Nghĩa</th><th></th></tr></thead><tbody id="tb"></tbody></table></div>`;
  const render = () => {
    const q = norm($('#q').value), hide = $('#hide').checked;
    $('#tb').innerHTML = VERBS.filter(v => !q || v.base.includes(q) || v.vi.toLowerCase().includes(q)).map(v =>
      `<tr><td><b>${v.base}</b></td><td class="${hide ? 'muted' : ''}">${hide ? `<span class="rv" data-v="${esc(v.past)}">•••</span>` : v.past}</td><td>${hide ? `<span class="rv" data-v="${esc(v.pp)}">•••</span>` : v.pp}</td><td>${esc(v.vi)}</td><td>${speakBtn(v.base + ', ' + v.past.split('/')[0] + ', ' + v.pp.split('/')[0])}</td></tr>`).join('');
    $$('.rv').forEach(s => s.onclick = () => { s.textContent = s.dataset.v; });
  };
  $('#q').oninput = render; $('#hide').onchange = render; render();
  $('#prac').onclick = () => {
    const qs = pick(VERBS, 10); let i = 0, score = 0;
    const show = () => {
      if (i >= qs.length) { app.innerHTML = `<div class="card center"><h2>Động từ BQT: ${score}/${qs.length}</h2><button class="btn" id="a">Làm lại</button> <button class="btn sec" id="b">Bảng động từ</button></div>`; $('#a').onclick = () => { views.verbs(); $('#prac').click(); }; $('#b').onclick = () => go('verbs'); return; }
      const v = qs[i];
      app.innerHTML = `<div class="card"><div class="muted">Câu ${i + 1}/${qs.length}</div><h2>${v.base} <span class="muted">(${esc(v.vi)})</span></h2>
        <form id="f" class="row"><input type="text" id="p2" placeholder="V2" autocomplete="off" autocapitalize="off"><input type="text" id="p3" placeholder="V3" autocomplete="off" autocapitalize="off"><button class="btn">Kiểm tra</button></form><div id="fb"></div></div>`;
      $('#p2').focus();
      $('#f').onsubmit = e => {
        e.preventDefault();
        if ($('#p2').disabled) return;
        const ok = (inp, ans) => ans.split('/').map(norm).includes(norm(inp));
        const r2 = ok($('#p2').value, v.past), r3 = ok($('#p3').value, v.pp), right = r2 && r3;
        $('#p2').disabled = $('#p3').disabled = true;
        if (right) score++; award(right ? 10 : 2);
        $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'bad'}">${right ? '✅ Chính xác!' : '❌ Đáp án:'} <b>${v.base} – ${v.past} – ${v.pp}</b></div><p><button class="btn" id="n">Tiếp theo</button></p>`;
        $('#n').onclick = () => { i++; show(); }; $('#n').focus();
      };
    };
    show();
  };
};

// ---------- Tiến độ ----------
views.progress = () => {
  const total = WORDS.length, learned = Object.keys(S.cards).length, m = WORDS.filter(x => mastered(x.w)).length;
  const rows = TOPICS.map(t => {
    const ws = WORDS.filter(x => x.topic === t.id), mm = ws.filter(x => mastered(x.w)).length, ll = ws.filter(x => !isNew(x.w)).length;
    return `<tr><td>${t.icon} ${esc(t.name)}</td><td>${ll}/${ws.length}</td><td>${mm}/${ws.length}</td><td style="width:35%"><div class="bar"><i style="width:${mm / ws.length * 100}%"></i></div></td></tr>`;
  }).join('');
  const heat = Array.from({ length: 84 }, (_, k) => { const d = addDay(today(), k - 83), n = S.days[d] || 0; return `<span class="${n ? (n < 10 ? 'l1' : n < 30 ? 'l2' : 'l3') : ''}" title="${d}: ${n} lượt"></span>`; }).join('');
  const weak = WORDS.filter(x => S.cards[x.w] && S.cards[x.w].wrong > 0).sort((a, b) => S.cards[b.w].wrong - S.cards[a.w].wrong).slice(0, 10);
  app.innerHTML = `<h2>Tiến độ học tập</h2>
  <div class="stat-grid"><div class="card center"><div class="big-num">${S.xp}</div>điểm XP</div><div class="card center"><div class="big-num">${S.streak}</div>ngày liên tiếp</div>
  <div class="card center"><div class="big-num">${learned}/${total}</div>từ đã học</div><div class="card center"><div class="big-num">${m}</div>từ đã thuộc</div></div>
  <div class="card"><h3>Hoạt động 12 tuần gần nhất</h3><div class="hm">${heat}</div></div>
  <div class="card" style="overflow:auto"><h3>Theo chủ đề</h3><table><thead><tr><th>Chủ đề</th><th>Đã học</th><th>Đã thuộc</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
  <div class="card"><h3>Từ hay sai</h3>${weak.length ? weak.map(x => `<div class="entry"><div><b>${esc(x.w)}</b> – ${esc(x.vi)}</div><div class="muted">sai ${S.cards[x.w].wrong} lần</div></div>`).join('') : '<p class="muted">Chưa có dữ liệu.</p>'}</div>
  <div class="row"><button class="btn sec" id="exp">⬇ Xuất dữ liệu</button><button class="btn sec" id="imp">⬆ Nhập dữ liệu</button><button class="btn bad" id="rst">Xóa toàn bộ tiến độ</button></div>`;
  $('#exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' }));
    a.download = 'englishup-progress.json'; a.click();
  };
  $('#imp').onclick = () => {
    const f = document.createElement('input'); f.type = 'file'; f.accept = '.json';
    f.onchange = async () => { try { S = Object.assign(S, JSON.parse(await f.files[0].text())); save(); go('progress'); } catch { alert('Tệp không hợp lệ.'); } };
    f.click();
  };
  $('#rst').onclick = () => { if (confirm('Xóa toàn bộ tiến độ học?')) { localStorage.removeItem(KEY); S = load(); S.theme = document.documentElement.dataset.theme || ''; save(); go('progress'); } };
};

// ---------- Khởi động ----------
if (!S.theme && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) S.theme = 'dark';
document.documentElement.dataset.theme = S.theme;
if ('speechSynthesis' in window) speechSynthesis.getVoices();
refreshStats();
go('home');
})();
