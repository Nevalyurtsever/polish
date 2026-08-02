const answers = document.querySelectorAll('.answers button');
const feedback = document.querySelector('#feedback');
const next = document.querySelector('#continue');
answers.forEach((answer) => answer.addEventListener('click', () => {
  answers.forEach(a => a.classList.remove('selected','wrong'));
  const correct = answer.dataset.answer === 'Merhaba';
  answer.classList.add(correct ? 'selected' : 'wrong');
  const praise = ['Süpersin Havle! Tam isabet.', 'Harika gidiyorsun Havle!', 'Evet Havle, bunu çok iyi yaptın!', 'Mükemmel! Bir adım daha ilerledin.'];
  const encouragement = ['Yaklaştın Havle, bir kez daha dene.', 'Sorun değil Havle, birlikte öğreniyoruz.', 'Bu kez olmadı ama cevabı görünce hatırlayacaksın.'];
  feedback.textContent = correct ? `${praise[Math.floor(Math.random()*praise.length)]} Cześć, samimi bir “merhaba” demektir.` : encouragement[Math.floor(Math.random()*encouragement.length)];
  next.disabled = !correct;
}));
document.querySelector('#speak').addEventListener('click', () => {
  const voice = new SpeechSynthesisUtterance('Cześć'); voice.lang = 'pl-PL'; speechSynthesis.speak(voice);
});

const panels = document.querySelectorAll('[data-panel]');
document.querySelectorAll('.nav-item[data-page]').forEach((link) => link.addEventListener('click', () => {
  const page = link.dataset.page;
  panels.forEach((panel) => { panel.hidden = panel.dataset.panel !== page; });
  document.querySelectorAll('.nav-item[data-page]').forEach((item) => item.classList.toggle('active', item === link));
}));
const letters = [['A','a','a'],['Ą','burun a’sı','ą'],['B','be','be'],['C','tse','ce'],['Ć','yumuşak ç','cie'],['D','de','de'],['E','e','e'],['Ę','burun e’si','ę'],['F','ef','ef'],['G','ge','gie'],['H','ha','ha'],['I','i','i'],['J','yot · y diye okunur','jot'],['K','ka','ka'],['L','el','el'],['Ł','u / w benzeri','eł'],['M','em','em'],['N','en','en'],['Ń','yumuşak n','eń'],['O','o','o'],['Ó','u','u kreskowane'],['P','pe','pe'],['R','er','er'],['S','es','es'],['Ś','yumuşak ş','eś'],['T','te','te'],['U','u','u'],['W','ve','wu'],['Y','kalın ı','igrek'],['Z','zet','zet'],['Ź','yumuşak j','źet'],['Ż','j / że','żet']];
const alphabet = document.querySelector('#alphabet');
if (alphabet) alphabet.innerHTML = letters.map(([letter, sound, spoken]) => `<button class="letter" data-letter="${letter}" data-spoken="${spoken}"><b>${letter}</b><span>${sound}</span></button>`).join('');
document.querySelectorAll('.letter').forEach((letter) => letter.addEventListener('click', () => { speechSynthesis.cancel(); const voice = new SpeechSynthesisUtterance(letter.dataset.spoken); voice.lang = 'pl-PL'; voice.rate = .45; voice.pitch = 1; speechSynthesis.speak(voice); }));
document.querySelector('#playAlphabet')?.remove();
document.querySelector('.song-note')?.remove();
const wordPool = [['dzień dobry','günaydın'],['dziękuję','teşekkür ederim'],['przepraszam','özür dilerim'],['tak','evet'],['nie','hayır'],['dom','ev'],['woda','su'],['kawa','kahve'],['proszę','lütfen'],['dobrze','iyi'],['książka','kitap'],['miasto','şehir'],['człowiek','insan'],['rodzina','aile'],['przyjaciel','arkadaş'],['dziecko','çocuk'],['kobieta','kadın'],['mężczyzna','erkek'],['szkoła','okul'],['praca','iş'],['samochód','araba'],['autobus','otobüs'],['pociąg','tren'],['ulica','sokak'],['sklep','mağaza'],['restauracja','restoran'],['chleb','ekmek'],['mleko','süt'],['jabłko','elma'],['herbata','çay'],['rano','sabah'],['wieczór','akşam'],['dzisiaj','bugün'],['jutro','yarın'],['szybko','hızlı'],['wolno','yavaş'],['mały','küçük'],['duży','büyük'],['ładny','güzel'],['nowy','yeni'],['lubię','seviyorum'],['rozumiem','anlıyorum'],['mówię','konuşuyorum'],['gdzie','nerede'],['kiedy','ne zaman'],['dlaczego','neden'],['ile','kaç'],['pomoc','yardım'],['miłość','sevgi']];
function renderWords() { const picks = [...wordPool].sort(() => Math.random() - .5).slice(0, 6); const grid = document.querySelector('#wordGrid'); if (grid) grid.innerHTML = picks.map(([pl, tr]) => `<article class="word-tile"><b>${pl}</b><span>${tr}</span></article>`).join(''); }
renderWords();
const grammarTopics = {
  jestem: { no:'01', label:'KENDİNİ TANITMA', title:'Jestem = Ben ...im', intro:'Lehçede kendinden söz ederken <b>jestem</b> kullanırsın. Türkçedeki “-im” eki gibi düşün.', rule:'Cümlede “ja” (ben) çoğu zaman söylenmez; <b>Jestem Havle.</b> tek başına yeterlidir.', polish:'Jestem Havle.', sound:'Jestem Havle.', pronunciation:'/yestem havle/', turkish:'Ben Havle’yim.', question:'“Ben öğrenciyim.” hangisi?', options:['Jest studentką.','Jestem studentką.','Jesteś studentką.'], correct:1 },
  zamir: { no:'02', label:'KİŞİ ZAMİRLERİ', title:'Ja, ty, on, ona', intro:'Lehçede kişi değişince fiil de değişir. Bu yüzden <b>jestem</b>, <b>jesteś</b> ve <b>jest</b> farklıdır.', rule:'Zamir çoğu zaman atlanır; fiilin biçimi kişiyi zaten anlatır.', polish:'Ty jesteś miła.', sound:'Ty jesteś miła.', pronunciation:'/tı yesteş miwa/', turkish:'Sen naziksin.', question:'“Sen öğrencisin.” hangisi?', options:['Jesteś studentką.','Jestem studentką.','Jest studentką.'], correct:0 },
  cogul: { no:'03', label:'ÇOĞUL İSİMLER', title:'Birden fazla şey', intro:'Bir şeyden çok varsa Lehçede isim biçimi değişir. Başlangıçta en çok kullanılan örnekleri kalıp olarak öğren.', rule:'Sayılar da ismin biçimini etkiler: <b>jeden dom</b>, ama <b>dwa domy</b>.', polish:'To są moje książki.', sound:'To są moje książki.', pronunciation:'/to son moye kşyonşki/', turkish:'Bunlar benim kitaplarım.', question:'“Bunlar evler.” hangisi?', options:['To jest dom.','To są domy.','Jestem domy.'], correct:1 },
  soru: { no:'04', label:'SORU SORMAK', title:'Co? Gdzie? Kiedy?', intro:'Yeni bir konuşmayı açmak için üç güçlü soru kelimesi yeterlidir: <b>co</b> (ne), <b>gdzie</b> (nerede), <b>kiedy</b> (ne zaman).', rule:'Lehçede soru cümlesinde Türkçedeki “mi” eki yoktur; soru kelimesi ve tonlama yeterlidir.', polish:'Gdzie jest szkoła?', sound:'Gdzie jest szkoła?', pronunciation:'/gce yest şkovwa/', turkish:'Okul nerede?', question:'“Ne zaman?” hangisi?', options:['Gdzie?','Kiedy?','Dlaczego?'], correct:1 }
};
function showGrammarTopic(key) { const topic = grammarTopics[key]; if (!topic) return; document.querySelector('#grammarNo').textContent=topic.no; document.querySelector('#grammarLabel').textContent=topic.label; document.querySelector('#grammarTitle').textContent=topic.title; document.querySelector('#grammarIntro').innerHTML=topic.intro; document.querySelector('#grammarRule').innerHTML=topic.rule; document.querySelector('#grammarPolish').textContent=topic.polish; document.querySelector('#grammarPronunciation').textContent=topic.pronunciation; document.querySelector('#grammarTurkish').textContent=topic.turkish; document.querySelector('#practiceQuestion').textContent=topic.question; document.querySelector('#practiceOptions').innerHTML=topic.options.map((option,index)=>`<button data-correct="${index===topic.correct}">${option}</button>`).join(''); document.querySelector('#practiceFeedback').textContent=''; document.querySelector('#grammarListen').dataset.sound=topic.sound; document.querySelectorAll('.topic').forEach(button=>button.classList.toggle('active',button.dataset.topic===key)); document.querySelectorAll('#practiceOptions button').forEach(button=>button.addEventListener('click',()=>{const correct=button.dataset.correct==='true';document.querySelectorAll('#practiceOptions button').forEach(item=>item.classList.remove('good','bad'));button.classList.add(correct?'good':'bad');document.querySelector('#practiceFeedback').textContent=correct?'Harika Havle, doğru cevap!':'Yaklaştın Havle. Örneğe tekrar göz atıp yeniden dene.';})); }
document.querySelectorAll('.topic').forEach(button=>button.addEventListener('click',()=>showGrammarTopic(button.dataset.topic)));
document.querySelector('.topic-next')?.addEventListener('click',()=>showGrammarTopic(document.querySelector('.topic-next').dataset.next));
document.querySelector('#grammarListen')?.addEventListener('click',(event)=>{const voice=new SpeechSynthesisUtterance(event.currentTarget.dataset.sound||'Jestem Havle.');voice.lang='pl-PL';voice.rate=.55;speechSynthesis.cancel();speechSynthesis.speak(voice);});
showGrammarTopic('jestem');
document.querySelector('#refreshWords')?.addEventListener('click', renderWords);
next.addEventListener('click', () => { feedback.textContent='Yeni alıştırma yakında!'; next.disabled=true; answers.forEach(a=>a.classList.remove('selected','wrong')); });
