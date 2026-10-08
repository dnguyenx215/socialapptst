// Bài học ngữ pháp: giải thích + bài tập trắc nghiệm điền vào chỗ trống.
// q: câu hỏi (dùng ___ làm chỗ trống), o: các lựa chọn, a: chỉ số đáp án đúng, e: giải thích
window.GRAMMAR = [
{ id:"present-simple", title:"Thì hiện tại đơn", level:"A1",
  html:`<p><b>Công thức:</b> S + V(s/es) · S + do/does not + V · Do/Does + S + V?</p>
<p><b>Dùng khi:</b> thói quen, sự thật hiển nhiên, lịch trình cố định.</p>
<ul><li>She <b>works</b> in a bank. (thói quen/nghề nghiệp)</li><li>Water <b>boils</b> at 100°C. (sự thật)</li><li>The train <b>leaves</b> at 7. (lịch trình)</li></ul>
<p><b>Dấu hiệu:</b> always, usually, often, sometimes, never, every day.</p>
<p><b>Lưu ý:</b> ngôi thứ ba số ít (he/she/it) thêm -s/-es; động từ tận cùng -y sau phụ âm đổi thành -ies (study → studies).</p>`,
  ex:[
   {q:"He ___ to school by bike every day.",o:["go","goes","going","is go"],a:1,e:"Chủ ngữ He (ngôi thứ ba số ít) → goes."},
   {q:"They ___ TV in the morning.",o:["doesn't watch","don't watch","not watch","aren't watch"],a:1,e:"Chủ ngữ They → don't + V nguyên mẫu."},
   {q:"___ she speak English?",o:["Do","Does","Is","Are"],a:1,e:"Câu hỏi với she dùng Does."},
   {q:"My brother ___ (study) hard.",o:["studys","studies","study","studyes"],a:1,e:"study → studies (phụ âm + y → ies)."},
   {q:"The sun ___ in the east.",o:["rise","rises","is rising","rose"],a:1,e:"Sự thật hiển nhiên → hiện tại đơn, ngôi thứ ba: rises."}
  ]},
{ id:"present-continuous", title:"Thì hiện tại tiếp diễn", level:"A1",
  html:`<p><b>Công thức:</b> S + am/is/are + V-ing</p>
<p><b>Dùng khi:</b> hành động đang xảy ra lúc nói; kế hoạch gần trong tương lai; tình huống tạm thời.</p>
<ul><li>I <b>am studying</b> now.</li><li>We <b>are meeting</b> the client tomorrow.</li></ul>
<p><b>Dấu hiệu:</b> now, at the moment, right now, Look!, Listen!</p>
<p><b>Lưu ý:</b> các động từ chỉ trạng thái (know, like, love, want, believe…) thường không dùng ở thì tiếp diễn.</p>`,
  ex:[
   {q:"Look! It ___ .",o:["rains","is raining","rain","rained"],a:1,e:"\"Look!\" → hành động đang diễn ra."},
   {q:"She ___ dinner at the moment.",o:["cook","cooks","is cooking","are cooking"],a:2,e:"at the moment → is cooking."},
   {q:"I ___ you. Please speak louder.",o:["don't understand","am not understanding","not understand","doesn't understand"],a:0,e:"understand là động từ chỉ trạng thái."},
   {q:"They ___ football now.",o:["is playing","are playing","plays","play"],a:1,e:"They → are + V-ing."}
  ]},
{ id:"past-simple", title:"Thì quá khứ đơn", level:"A2",
  html:`<p><b>Công thức:</b> S + V2/V-ed · S + did not + V · Did + S + V?</p>
<p><b>Dùng khi:</b> hành động đã xảy ra và kết thúc tại một thời điểm xác định trong quá khứ.</p>
<ul><li>I <b>visited</b> Hue last summer.</li><li>She <b>didn't go</b> to work yesterday.</li></ul>
<p><b>Dấu hiệu:</b> yesterday, last week/month/year, ago, in 2020.</p>
<p><b>Lưu ý:</b> sau did/didn't luôn dùng động từ nguyên mẫu. Xem thêm tab <i>Động từ bất quy tắc</i>.</p>`,
  ex:[
   {q:"I ___ a great movie last night.",o:["see","seen","saw","seeing"],a:2,e:"see → saw (quá khứ đơn)."},
   {q:"She ___ to the party yesterday.",o:["didn't came","didn't come","not came","doesn't come"],a:1,e:"didn't + V nguyên mẫu."},
   {q:"___ you finish the report?",o:["Do","Did","Were","Have"],a:1,e:"Câu hỏi quá khứ đơn dùng Did."},
   {q:"They ___ in Paris two years ago.",o:["live","lived","have lived","living"],a:1,e:"two years ago → quá khứ đơn."},
   {q:"We ___ dinner at 7 yesterday.",o:["have","had","has","having"],a:1,e:"have → had."}
  ]},
{ id:"present-perfect", title:"Thì hiện tại hoàn thành", level:"B1",
  html:`<p><b>Công thức:</b> S + have/has + V3/V-ed</p>
<p><b>Dùng khi:</b> hành động bắt đầu trong quá khứ và còn liên quan đến hiện tại; kinh nghiệm sống; kết quả còn ở hiện tại.</p>
<ul><li>I <b>have lived</b> here for five years.</li><li>She <b>has</b> never <b>been</b> to Japan.</li><li>I <b>have lost</b> my keys. (bây giờ vẫn chưa tìm thấy)</li></ul>
<p><b>Dấu hiệu:</b> already, yet, just, ever, never, since, for, so far, recently.</p>
<p><b>Phân biệt:</b> <i>for</i> + khoảng thời gian (for 3 years), <i>since</i> + mốc thời gian (since 2019). Không dùng với mốc quá khứ xác định (yesterday, in 2010) → dùng quá khứ đơn.</p>`,
  ex:[
   {q:"I ___ in this company since 2018.",o:["work","worked","have worked","am working"],a:2,e:"since + mốc thời gian → hiện tại hoàn thành."},
   {q:"She ___ never ___ sushi.",o:["has / eaten","have / eaten","has / ate","is / eating"],a:0,e:"has + V3 (eaten)."},
   {q:"We have known each other ___ ten years.",o:["since","for","ago","from"],a:1,e:"for + khoảng thời gian."},
   {q:"I ___ my homework yet.",o:["didn't finish","haven't finished","don't finish","hasn't finished"],a:1,e:"yet + have not + V3."},
   {q:"He ___ to London in 2019.",o:["has gone","went","has been","goes"],a:1,e:"in 2019 là mốc xác định → quá khứ đơn."}
  ]},
{ id:"future", title:"Diễn đạt tương lai: will / be going to", level:"A2",
  html:`<p><b>will + V:</b> quyết định tức thời, dự đoán chủ quan, lời hứa.</p>
<ul><li>I'm thirsty. I <b>will</b> get some water.</li><li>I think it <b>will</b> rain tomorrow.</li></ul>
<p><b>be going to + V:</b> kế hoạch đã định trước, dự đoán có căn cứ.</p>
<ul><li>We <b>are going to</b> buy a new car next month.</li><li>Look at those clouds! It <b>is going to</b> rain.</li></ul>`,
  ex:[
   {q:"The phone is ringing. I ___ answer it.",o:["will","am going to","am","would"],a:0,e:"Quyết định tức thời → will."},
   {q:"I ___ visit my grandparents this weekend. I've already bought the ticket.",o:["will","am going to","visit","would"],a:1,e:"Đã có kế hoạch → be going to."},
   {q:"Look at that car! It ___ crash.",o:["will","is going to","is","does"],a:1,e:"Dự đoán dựa trên bằng chứng hiện tại."},
   {q:"I promise I ___ call you tonight.",o:["will","am going","going to","did"],a:0,e:"Lời hứa → will."}
  ]},
{ id:"articles", title:"Mạo từ a / an / the", level:"A1",
  html:`<p><b>a/an:</b> danh từ đếm được số ít, nói đến lần đầu hoặc chung chung. <i>an</i> đứng trước <u>âm</u> nguyên âm (an hour, an apple); <i>a</i> trước âm phụ âm (a university).</p>
<p><b>the:</b> khi người nghe đã biết đối tượng nào; vật duy nhất (the sun); so sánh nhất (the best); tên sông, biển, dãy núi (the Mekong).</p>
<p><b>Không dùng mạo từ:</b> danh từ số nhiều/không đếm được nói chung (Water is important), tên quốc gia, tên môn học, bữa ăn.</p>`,
  ex:[
   {q:"I saw ___ elephant at the zoo.",o:["a","an","the","—"],a:1,e:"elephant bắt đầu bằng âm nguyên âm → an."},
   {q:"She is ___ best student in our class.",o:["a","an","the","—"],a:2,e:"So sánh nhất → the."},
   {q:"He goes to ___ university in Hanoi.",o:["a","an","the","—"],a:0,e:"university bắt đầu bằng âm /j/ → a."},
   {q:"I have ___ breakfast at 7.",o:["a","an","the","—"],a:3,e:"Không dùng mạo từ với bữa ăn."},
   {q:"Please close ___ door. It's cold.",o:["a","an","the","—"],a:2,e:"Cả hai đều biết cánh cửa nào → the."}
  ]},
{ id:"prepositions", title:"Giới từ chỉ thời gian & nơi chốn", level:"A2",
  html:`<p><b>Thời gian:</b></p><ul><li><b>at</b> + giờ/điểm thời gian: at 5 pm, at night, at noon</li><li><b>on</b> + ngày: on Monday, on 5 May</li><li><b>in</b> + tháng/năm/mùa/buổi: in July, in 2024, in summer, in the morning</li></ul>
<p><b>Nơi chốn:</b></p><ul><li><b>at</b> + địa điểm cụ thể: at the bus stop, at home</li><li><b>on</b> + bề mặt: on the table</li><li><b>in</b> + không gian bao quanh: in a room, in Vietnam</li></ul>`,
  ex:[
   {q:"The meeting starts ___ 9 a.m.",o:["in","on","at","by"],a:2,e:"Giờ cụ thể → at."},
   {q:"My birthday is ___ March.",o:["in","on","at","of"],a:0,e:"Tháng → in."},
   {q:"We have a test ___ Friday.",o:["in","on","at","for"],a:1,e:"Thứ trong tuần → on."},
   {q:"The book is ___ the table.",o:["in","on","at","by"],a:1,e:"Trên bề mặt → on."},
   {q:"She lives ___ Da Nang.",o:["in","on","at","to"],a:0,e:"Thành phố → in."}
  ]},
{ id:"comparisons", title:"So sánh hơn & so sánh nhất", level:"A2",
  html:`<p><b>Tính từ ngắn:</b> adj-er + than; the adj-est. (tall → taller → the tallest)</p>
<p><b>Tính từ dài:</b> more + adj + than; the most + adj. (expensive → more expensive → the most expensive)</p>
<p><b>Bất quy tắc:</b> good → better → the best; bad → worse → the worst; far → farther/further.</p>
<p><b>So sánh bằng:</b> as + adj + as.</p>`,
  ex:[
   {q:"This bag is ___ than that one.",o:["cheap","cheaper","more cheap","cheapest"],a:1,e:"Tính từ ngắn → cheaper."},
   {q:"She is the ___ student in the class.",o:["smarter","smartest","most smart","more smart"],a:1,e:"So sánh nhất của smart → the smartest."},
   {q:"This exercise is ___ than the last one.",o:["difficulter","more difficult","most difficult","difficult"],a:1,e:"Tính từ dài → more difficult."},
   {q:"His English is ___ than mine.",o:["good","gooder","better","best"],a:2,e:"good → better."},
   {q:"He is as ___ as his father.",o:["taller","tall","tallest","more tall"],a:1,e:"as + adj gốc + as."}
  ]},
{ id:"modals", title:"Động từ khuyết thiếu (Modal verbs)", level:"B1",
  html:`<ul><li><b>can / could:</b> khả năng, xin phép (Can I sit here?)</li><li><b>must:</b> bắt buộc (You must wear a helmet). <b>mustn't:</b> cấm đoán.</li><li><b>have to:</b> bắt buộc do quy định bên ngoài. <b>don't have to:</b> không cần phải.</li><li><b>should / ought to:</b> lời khuyên.</li><li><b>may / might:</b> khả năng xảy ra (It might rain).</li></ul>
<p>Sau modal luôn là <b>động từ nguyên mẫu không "to"</b>.</p>`,
  ex:[
   {q:"You ___ smoke in the hospital. It's forbidden.",o:["mustn't","don't have to","needn't","might"],a:0,e:"Cấm đoán → mustn't."},
   {q:"You ___ wear a uniform. It's optional.",o:["mustn't","don't have to","can't","shouldn't"],a:1,e:"Không bắt buộc → don't have to."},
   {q:"You look tired. You ___ get some rest.",o:["should","must to","can to","would to"],a:0,e:"Lời khuyên → should."},
   {q:"She ___ speak three languages.",o:["can","cans","can to","is can"],a:0,e:"Modal không chia theo ngôi."},
   {q:"I'm not sure, but he ___ be at home.",o:["must","might","should","would"],a:1,e:"Khả năng không chắc chắn → might."}
  ]},
{ id:"conditionals", title:"Câu điều kiện loại 0, 1, 2", level:"B1",
  html:`<ul><li><b>Loại 0</b> (sự thật): If + hiện tại, hiện tại. <i>If you heat ice, it melts.</i></li>
<li><b>Loại 1</b> (có thể xảy ra ở tương lai): If + hiện tại đơn, will + V. <i>If it rains, we will stay home.</i></li>
<li><b>Loại 2</b> (không có thật ở hiện tại): If + quá khứ đơn, would + V. <i>If I were rich, I would travel the world.</i></li></ul>
<p><b>Lưu ý:</b> loại 2 dùng <b>were</b> cho mọi ngôi (If I were you…).</p>`,
  ex:[
   {q:"If it rains tomorrow, we ___ at home.",o:["stay","will stay","would stay","stayed"],a:1,e:"Loại 1 → will + V."},
   {q:"If I ___ you, I would accept the offer.",o:["am","was","were","be"],a:2,e:"Loại 2: If I were you."},
   {q:"If you mix red and blue, you ___ purple.",o:["get","will getting","would get","got"],a:0,e:"Loại 0: sự thật → hiện tại."},
   {q:"If she studied harder, she ___ pass the exam.",o:["will","would","can","is"],a:1,e:"Loại 2 → would + V."}
  ]},
{ id:"passive", title:"Câu bị động", level:"B1",
  html:`<p><b>Công thức:</b> S + be + V3/V-ed (+ by agent)</p>
<ul><li>Hiện tại đơn: The report <b>is written</b> every month.</li><li>Quá khứ đơn: The bridge <b>was built</b> in 1990.</li><li>Hiện tại hoàn thành: The decree <b>has been issued</b>.</li><li>Tương lai: The system <b>will be launched</b> next year.</li><li>Modal: Documents <b>must be submitted</b> online.</li></ul>
<p>Dùng bị động khi người thực hiện không quan trọng/không rõ, hoặc muốn nhấn mạnh đối tượng chịu tác động — rất phổ biến trong văn bản hành chính.</p>`,
  ex:[
   {q:"English ___ all over the world.",o:["speaks","is spoken","is speaking","spoke"],a:1,e:"Bị động hiện tại đơn: is spoken."},
   {q:"This house ___ in 1995.",o:["built","was built","is built","has built"],a:1,e:"Quá khứ đơn bị động: was built."},
   {q:"The new law ___ next month.",o:["will be announced","will announce","is announce","announces"],a:0,e:"Tương lai bị động: will be + V3."},
   {q:"All applications must ___ before Friday.",o:["submit","be submitted","submitted","be submit"],a:1,e:"Modal + be + V3."}
  ]},
{ id:"relative", title:"Mệnh đề quan hệ", level:"B2",
  html:`<ul><li><b>who:</b> thay cho người (The man <b>who</b> called you…)</li><li><b>which:</b> thay cho vật</li><li><b>that:</b> thay cho người/vật (mệnh đề xác định)</li><li><b>whose:</b> sở hữu (the girl <b>whose</b> bag was stolen)</li><li><b>where:</b> nơi chốn · <b>when:</b> thời gian</li></ul>
<p>Mệnh đề không xác định (có dấu phẩy) không dùng <i>that</i>: <i>Hanoi, <b>which</b> is the capital, is…</i></p>`,
  ex:[
   {q:"The woman ___ lives next door is a doctor.",o:["which","who","whose","where"],a:1,e:"Thay cho người → who."},
   {q:"This is the book ___ I told you about.",o:["who","which","whose","when"],a:1,e:"Thay cho vật → which/that."},
   {q:"I know a boy ___ father is a pilot.",o:["who","which","whose","that"],a:2,e:"Sở hữu → whose."},
   {q:"That is the hotel ___ we stayed last year.",o:["who","which","where","whose"],a:2,e:"Nơi chốn → where."}
  ]}
];

// Động từ bất quy tắc thường gặp: nguyên mẫu | quá khứ đơn | quá khứ phân từ | nghĩa
window.IRREGULARS = `
be|was/were|been|thì, là, ở
begin|began|begun|bắt đầu
break|broke|broken|làm vỡ
bring|brought|brought|mang đến
build|built|built|xây dựng
buy|bought|bought|mua
catch|caught|caught|bắt, đón
choose|chose|chosen|chọn
come|came|come|đến
cost|cost|cost|có giá
cut|cut|cut|cắt
do|did|done|làm
draw|drew|drawn|vẽ
drink|drank|drunk|uống
drive|drove|driven|lái xe
eat|ate|eaten|ăn
fall|fell|fallen|ngã, rơi
feel|felt|felt|cảm thấy
fight|fought|fought|chiến đấu
find|found|found|tìm thấy
fly|flew|flown|bay
forget|forgot|forgotten|quên
get|got|got/gotten|nhận, trở nên
give|gave|given|cho
go|went|gone|đi
grow|grew|grown|lớn lên, trồng
have|had|had|có
hear|heard|heard|nghe thấy
hide|hid|hidden|giấu
hit|hit|hit|đánh
hold|held|held|cầm, giữ
keep|kept|kept|giữ
know|knew|known|biết
leave|left|left|rời đi
lend|lent|lent|cho mượn
lose|lost|lost|đánh mất
make|made|made|làm ra
mean|meant|meant|có nghĩa
meet|met|met|gặp
pay|paid|paid|trả tiền
put|put|put|đặt
read|read|read|đọc
ride|rode|ridden|cưỡi, đi (xe)
ring|rang|rung|rung chuông
rise|rose|risen|mọc, tăng
run|ran|run|chạy
say|said|said|nói
see|saw|seen|nhìn thấy
sell|sold|sold|bán
send|sent|sent|gửi
show|showed|shown|chỉ, cho xem
sing|sang|sung|hát
sit|sat|sat|ngồi
sleep|slept|slept|ngủ
speak|spoke|spoken|nói
spend|spent|spent|tiêu, dành
stand|stood|stood|đứng
steal|stole|stolen|ăn cắp
swim|swam|swum|bơi
take|took|taken|lấy, mang
teach|taught|taught|dạy
tell|told|told|kể, bảo
think|thought|thought|nghĩ
throw|threw|thrown|ném
understand|understood|understood|hiểu
wake|woke|woken|thức dậy
wear|wore|worn|mặc
win|won|won|thắng
write|wrote|written|viết
`;
