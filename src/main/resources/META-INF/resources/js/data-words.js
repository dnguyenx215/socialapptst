// Dữ liệu từ vựng. Mỗi dòng: từ | phiên âm | loại từ | nghĩa tiếng Việt | câu ví dụ
// Mỗi chủ đề có level (A1..C1) để phân cấp độ khó.
window.TOPICS = [
{ id:"daily", name:"Sinh hoạt hằng ngày", icon:"🏠", level:"A1", words:`
wake up|/weɪk ʌp/|v|thức dậy|I wake up at six every morning.
breakfast|/ˈbrekfəst/|n|bữa sáng|We have breakfast together.
brush|/brʌʃ/|v|đánh (răng), chải|Brush your teeth twice a day.
shower|/ˈʃaʊər/|n|vòi hoa sen; việc tắm|I take a shower before work.
commute|/kəˈmjuːt/|v|đi làm (đi lại hằng ngày)|She commutes to the office by bus.
lunch|/lʌntʃ/|n|bữa trưa|Let's have lunch at noon.
homework|/ˈhoʊmwɜːrk/|n|bài tập về nhà|He finished his homework early.
cook|/kʊk/|v|nấu ăn|My mother cooks dinner every evening.
clean|/kliːn/|v|dọn dẹp, lau chùi|I clean my room on Sundays.
laundry|/ˈlɔːndri/|n|quần áo cần giặt|I do the laundry on weekends.
chore|/tʃɔːr/|n|việc vặt trong nhà|Washing dishes is my least favorite chore.
nap|/næp/|n|giấc ngủ ngắn|I took a nap after lunch.
routine|/ruːˈtiːn/|n|thói quen hằng ngày|A morning routine helps me stay focused.
neighbor|/ˈneɪbər/|n|hàng xóm|Our neighbor is very friendly.
grocery|/ˈɡroʊsəri/|n|hàng tạp hóa|I buy groceries every Saturday.
relax|/rɪˈlæks/|v|thư giãn|I like to relax by listening to music.
` },
{ id:"family", name:"Gia đình & Con người", icon:"👨‍👩‍👧", level:"A1", words:`
parent|/ˈperənt/|n|cha hoặc mẹ|My parents live in Hanoi.
sibling|/ˈsɪblɪŋ/|n|anh chị em ruột|Do you have any siblings?
grandmother|/ˈɡrænmʌðər/|n|bà|My grandmother tells great stories.
uncle|/ˈʌŋkl/|n|chú, bác, cậu|My uncle works as a doctor.
cousin|/ˈkʌzn/|n|anh chị em họ|I play with my cousins at Tet.
husband|/ˈhʌzbənd/|n|chồng|Her husband is a teacher.
relative|/ˈrelətɪv/|n|họ hàng|Many relatives came to the wedding.
twin|/twɪn/|n|anh/chị em sinh đôi|They are twins but look different.
generation|/ˌdʒenəˈreɪʃn/|n|thế hệ|Three generations live in one house.
adult|/əˈdʌlt/|n|người lớn|Children must be with an adult.
teenager|/ˈtiːneɪdʒər/|n|thiếu niên|Teenagers need enough sleep.
elderly|/ˈeldərli/|adj|lớn tuổi|We should respect elderly people.
friendly|/ˈfrendli/|adj|thân thiện|The staff are very friendly.
shy|/ʃaɪ/|adj|nhút nhát, ngại ngùng|He is too shy to speak in public.
generous|/ˈdʒenərəs/|adj|hào phóng|She is generous with her time.
raise|/reɪz/|v|nuôi dưỡng|They raised three children.
` },
{ id:"food", name:"Ẩm thực", icon:"🍜", level:"A1", words:`
rice|/raɪs/|n|cơm, gạo|Vietnamese people eat rice every day.
noodle|/ˈnuːdl/|n|mì, bún, phở|I love a hot bowl of noodle soup.
vegetable|/ˈvedʒtəbl/|n|rau củ|Eat more vegetables and fruit.
fruit|/fruːt/|n|trái cây|Mango is my favorite fruit.
beef|/biːf/|n|thịt bò|Pho is usually made with beef.
chicken|/ˈtʃɪkɪn/|n|thịt gà|We had grilled chicken for dinner.
seafood|/ˈsiːfuːd/|n|hải sản|This restaurant is famous for its seafood.
spicy|/ˈspaɪsi/|adj|cay|I can't eat very spicy food.
sweet|/swiːt/|adj|ngọt|This cake is too sweet.
sour|/ˈsaʊər/|adj|chua|The soup tastes a little sour.
delicious|/dɪˈlɪʃəs/|adj|ngon|The soup smells delicious.
recipe|/ˈresəpi/|n|công thức nấu ăn|Can you share the recipe with me?
ingredient|/ɪnˈɡriːdiənt/|n|nguyên liệu|Fresh ingredients make a big difference.
chop|/tʃɑːp/|v|chặt, thái|Chop the onions into small pieces.
boil|/bɔɪl/|v|đun sôi, luộc|Boil the eggs for ten minutes.
fry|/fraɪ/|v|chiên, rán|Fry the fish until it is golden.
menu|/ˈmenjuː/|n|thực đơn|Could I see the menu, please?
bill|/bɪl/|n|hóa đơn|Can we have the bill, please?
vegetarian|/ˌvedʒəˈteriən/|adj|ăn chay|She has been vegetarian for years.
appetite|/ˈæpɪtaɪt/|n|sự thèm ăn|I lost my appetite when I was sick.
` },
{ id:"school", name:"Học tập & Trường học", icon:"🎓", level:"A2", words:`
subject|/ˈsʌbdʒekt/|n|môn học; chủ đề|Math is my favorite subject.
lecture|/ˈlektʃər/|n|bài giảng|The lecture lasted two hours.
assignment|/əˈsaɪnmənt/|n|bài tập được giao|The assignment is due on Friday.
deadline|/ˈdedlaɪn/|n|hạn chót|I must meet the deadline.
exam|/ɪɡˈzæm/|n|kỳ thi|She passed the exam with high marks.
grade|/ɡreɪd/|n|điểm số; lớp|He got a good grade in English.
scholarship|/ˈskɑːlərʃɪp/|n|học bổng|She won a scholarship to study abroad.
graduate|/ˈɡrædʒueɪt/|v|tốt nghiệp|He graduated from university in 2020.
degree|/dɪˈɡriː/|n|bằng cấp; độ|She has a degree in economics.
attend|/əˈtend/|v|tham dự|Students must attend every class.
revise|/rɪˈvaɪz/|v|ôn tập|I need to revise for the test.
memorize|/ˈmeməraɪz/|v|ghi nhớ, học thuộc|It's hard to memorize so many words.
research|/rɪˈsɜːrtʃ/|n|nghiên cứu|Her research focuses on climate change.
dormitory|/ˈdɔːrmətɔːri/|n|ký túc xá|Many students live in the dormitory.
curriculum|/kəˈrɪkjələm/|n|chương trình học|The school updated its curriculum.
tuition|/tuˈɪʃn/|n|học phí|Tuition fees rise every year.
` },
{ id:"travel", name:"Du lịch", icon:"✈️", level:"A2", words:`
journey|/ˈdʒɜːrni/|n|chuyến đi|The journey took three hours.
luggage|/ˈlʌɡɪdʒ/|n|hành lý|Please keep your luggage with you.
passport|/ˈpæspɔːrt/|n|hộ chiếu|Don't forget your passport.
visa|/ˈviːzə/|n|thị thực|You need a visa to enter that country.
destination|/ˌdestɪˈneɪʃn/|n|điểm đến|Da Nang is a popular destination.
reservation|/ˌrezərˈveɪʃn/|n|việc đặt chỗ|I have a reservation under Nguyen.
depart|/dɪˈpɑːrt/|v|khởi hành|The train departs at 8 a.m.
arrive|/əˈraɪv/|v|đến nơi|We arrived at the hotel late at night.
delay|/dɪˈleɪ/|n|sự chậm trễ|There was a two-hour delay.
boarding pass|/ˈbɔːrdɪŋ pæs/|n|thẻ lên máy bay|Show your boarding pass at the gate.
sightseeing|/ˈsaɪtsiːɪŋ/|n|tham quan|We went sightseeing in Hue.
souvenir|/ˌsuːvəˈnɪr/|n|quà lưu niệm|I bought some souvenirs for my friends.
accommodation|/əˌkɑːməˈdeɪʃn/|n|chỗ ở|Accommodation in the city is expensive.
tour guide|/tʊr ɡaɪd/|n|hướng dẫn viên|Our tour guide spoke fluent English.
currency|/ˈkɜːrənsi/|n|tiền tệ|What is the local currency?
itinerary|/aɪˈtɪnəreri/|n|lịch trình|Our itinerary includes three cities.
` },
{ id:"health", name:"Sức khỏe", icon:"🩺", level:"A2", words:`
headache|/ˈhedeɪk/|n|đau đầu|I have a terrible headache.
fever|/ˈfiːvər/|n|sốt|He has a high fever.
cough|/kɔːf/|n|ho|She has had a cough for a week.
medicine|/ˈmedsn/|n|thuốc|Take this medicine twice a day.
prescription|/prɪˈskrɪpʃn/|n|đơn thuốc|You need a prescription for this drug.
symptom|/ˈsɪmptəm/|n|triệu chứng|What are your symptoms?
recover|/rɪˈkʌvər/|v|hồi phục|He is recovering from surgery.
injury|/ˈɪndʒəri/|n|chấn thương|He missed the match because of an injury.
allergy|/ˈælərdʒi/|n|dị ứng|I have an allergy to peanuts.
exercise|/ˈeksərsaɪz/|n|bài tập thể dục|Regular exercise keeps you healthy.
diet|/ˈdaɪət/|n|chế độ ăn|A balanced diet is important.
nutrition|/nuˈtrɪʃn/|n|dinh dưỡng|Good nutrition helps children grow.
stress|/stres/|n|căng thẳng|Too much stress is bad for you.
insomnia|/ɪnˈsɑːmniə/|n|chứng mất ngủ|He suffers from insomnia.
vaccine|/vækˈsiːn/|n|vắc-xin|The vaccine protects against the flu.
appointment|/əˈpɔɪntmənt/|n|cuộc hẹn|I made an appointment with the dentist.
` },
{ id:"work", name:"Công việc & Sự nghiệp", icon:"💼", level:"B1", words:`
employee|/ɪmˈplɔɪiː/|n|nhân viên|The company has 200 employees.
employer|/ɪmˈplɔɪər/|n|người sử dụng lao động|My employer offers flexible hours.
colleague|/ˈkɑːliːɡ/|n|đồng nghiệp|I get along well with my colleagues.
salary|/ˈsæləri/|n|lương|He earns a good salary.
promotion|/prəˈmoʊʃn/|n|sự thăng chức|She got a promotion last month.
resume|/ˈrezəmeɪ/|n|sơ yếu lý lịch|Send your resume by Friday.
interview|/ˈɪntərvjuː/|n|buổi phỏng vấn|I have a job interview tomorrow.
candidate|/ˈkændɪdət/|n|ứng viên|We interviewed five candidates.
experience|/ɪkˈspɪriəns/|n|kinh nghiệm|She has five years of experience.
skill|/skɪl/|n|kỹ năng|Communication is a key skill.
responsibility|/rɪˌspɑːnsəˈbɪləti/|n|trách nhiệm|It is your responsibility to finish it.
meeting|/ˈmiːtɪŋ/|n|cuộc họp|The meeting starts at nine.
schedule|/ˈskedʒuːl/|n|lịch trình|My schedule is full this week.
negotiate|/nɪˈɡoʊʃieɪt/|v|đàm phán|They negotiated a better price.
resign|/rɪˈzaɪn/|v|từ chức, xin nghỉ việc|He resigned to start his own business.
freelance|/ˈfriːlæns/|adj|làm tự do|She works as a freelance designer.
teamwork|/ˈtiːmwɜːrk/|n|làm việc nhóm|Success depends on teamwork.
overtime|/ˈoʊvərtaɪm/|n|làm thêm giờ|We worked overtime to finish the project.
` },
{ id:"tech", name:"Công nghệ & Internet", icon:"💻", level:"B1", words:`
software|/ˈsɔːftwer/|n|phần mềm|We need to update the software.
hardware|/ˈhɑːrdwer/|n|phần cứng|The hardware is out of date.
download|/ˈdaʊnloʊd/|v|tải xuống|You can download the app for free.
upload|/ˈʌploʊd/|v|tải lên|Upload your photos to the cloud.
password|/ˈpæswɜːrd/|n|mật khẩu|Choose a strong password.
network|/ˈnetwɜːrk/|n|mạng lưới|The network is down.
database|/ˈdeɪtəbeɪs/|n|cơ sở dữ liệu|All data is stored in a database.
server|/ˈsɜːrvər/|n|máy chủ|The server crashed last night.
browser|/ˈbraʊzər/|n|trình duyệt|Open the page in your browser.
application|/ˌæplɪˈkeɪʃn/|n|ứng dụng|This application is easy to use.
artificial intelligence|/ˌɑːrtɪˌfɪʃl ɪnˈtelɪdʒəns/|n|trí tuệ nhân tạo|Artificial intelligence is changing many industries.
cybersecurity|/ˌsaɪbərsɪˈkjʊrəti/|n|an ninh mạng|Cybersecurity is a priority for banks.
encrypt|/ɪnˈkrɪpt/|v|mã hóa|Sensitive data should be encrypted.
backup|/ˈbækʌp/|n|bản sao lưu|Always keep a backup of your files.
digital|/ˈdɪdʒɪtl/|adj|thuộc về kỹ thuật số|The government is promoting digital transformation.
device|/dɪˈvaɪs/|n|thiết bị|You can log in on any device.
platform|/ˈplætfɔːrm/|n|nền tảng|The platform has millions of users.
algorithm|/ˈælɡərɪðm/|n|thuật toán|The algorithm recommends videos to you.
` },
{ id:"environment", name:"Môi trường", icon:"🌿", level:"B1", words:`
pollution|/pəˈluːʃn/|n|sự ô nhiễm|Air pollution is a serious problem.
climate|/ˈklaɪmət/|n|khí hậu|The climate is getting warmer.
global warming|/ˌɡloʊbl ˈwɔːrmɪŋ/|n|sự nóng lên toàn cầu|Global warming melts the polar ice.
recycle|/ˌriːˈsaɪkl/|v|tái chế|We should recycle plastic bottles.
waste|/weɪst/|n|rác thải; sự lãng phí|Reduce food waste at home.
renewable|/rɪˈnuːəbl/|adj|có thể tái tạo|Solar power is a renewable energy.
endangered|/ɪnˈdeɪndʒərd/|adj|có nguy cơ tuyệt chủng|Tigers are an endangered species.
conserve|/kənˈsɜːrv/|v|bảo tồn, tiết kiệm|We must conserve water.
deforestation|/diːˌfɔːrɪˈsteɪʃn/|n|nạn phá rừng|Deforestation destroys animal habitats.
flood|/flʌd/|n|lũ lụt|The flood damaged hundreds of homes.
drought|/draʊt/|n|hạn hán|The drought lasted for months.
emission|/ɪˈmɪʃn/|n|khí thải|Cars produce a lot of emissions.
sustainable|/səˈsteɪnəbl/|adj|bền vững|We need sustainable development.
ecosystem|/ˈiːkoʊsɪstəm/|n|hệ sinh thái|Coral reefs are fragile ecosystems.
habitat|/ˈhæbɪtæt/|n|môi trường sống|Forests are the habitat of many species.
fossil fuel|/ˈfɑːsl fjuːəl/|n|nhiên liệu hóa thạch|Burning fossil fuels releases carbon dioxide.
` },
{ id:"business", name:"Kinh doanh & Tài chính", icon:"📈", level:"B2", words:`
revenue|/ˈrevənuː/|n|doanh thu|The company's revenue rose by 10%.
profit|/ˈprɑːfɪt/|n|lợi nhuận|They made a huge profit this year.
invest|/ɪnˈvest/|v|đầu tư|He invested in real estate.
budget|/ˈbʌdʒɪt/|n|ngân sách|We are working with a tight budget.
inflation|/ɪnˈfleɪʃn/|n|lạm phát|Inflation has pushed prices up.
tax|/tæks/|n|thuế|Everyone has to pay taxes.
loan|/loʊn/|n|khoản vay|She took out a loan to buy a house.
interest rate|/ˈɪntrəst reɪt/|n|lãi suất|The bank raised its interest rate.
shareholder|/ˈʃerhoʊldər/|n|cổ đông|Shareholders approved the plan.
startup|/ˈstɑːrtʌp/|n|công ty khởi nghiệp|She founded a tech startup.
competitor|/kəmˈpetɪtər/|n|đối thủ cạnh tranh|Our competitors lowered their prices.
market share|/ˈmɑːrkɪt ʃer/|n|thị phần|The firm has a 30% market share.
supply chain|/səˈplaɪ tʃeɪn/|n|chuỗi cung ứng|The pandemic disrupted the supply chain.
contract|/ˈkɑːntrækt/|n|hợp đồng|Both sides signed the contract.
expense|/ɪkˈspens/|n|chi phí|Rent is our biggest expense.
assets|/ˈæsets/|n|tài sản|The company's assets exceed $5 million.
audit|/ˈɔːdɪt/|n|cuộc kiểm toán|The firm underwent an annual audit.
bankruptcy|/ˈbæŋkrʌptsi/|n|sự phá sản|The airline filed for bankruptcy.
` },
{ id:"law", name:"Hành chính & Pháp luật", icon:"⚖️", level:"B2", words:`
law|/lɔː/|n|luật pháp|Everyone must obey the law.
regulation|/ˌreɡjuˈleɪʃn/|n|quy định|New regulations came into force in July.
legislation|/ˌledʒɪsˈleɪʃn/|n|pháp luật, hệ thống luật|The legislation protects personal data.
decree|/dɪˈkriː/|n|nghị định|The government issued a new decree.
authority|/əˈθɔːrəti/|n|cơ quan có thẩm quyền; quyền lực|Contact the local authorities.
citizen|/ˈsɪtɪzn/|n|công dân|Every citizen has the right to vote.
rights|/raɪts/|n|quyền lợi|Human rights must be protected.
obligation|/ˌɑːblɪˈɡeɪʃn/|n|nghĩa vụ|Parents have a legal obligation to care for children.
court|/kɔːrt/|n|tòa án|The case went to court.
lawyer|/ˈlɔːjər/|n|luật sư|She hired a lawyer.
witness|/ˈwɪtnəs/|n|nhân chứng|The witness described the accident.
verdict|/ˈvɜːrdɪkt/|n|phán quyết|The jury reached a verdict.
notarize|/ˈnoʊtəraɪz/|v|công chứng|Documents must be notarized.
certificate|/sərˈtɪfɪkət/|n|giấy chứng nhận|He received a birth certificate.
comply|/kəmˈplaɪ/|v|tuân thủ|All companies must comply with the rules.
violate|/ˈvaɪəleɪt/|v|vi phạm|He violated the traffic law.
penalty|/ˈpenlti/|n|hình phạt, tiền phạt|The penalty for speeding is a fine.
jurisdiction|/ˌdʒʊrɪsˈdɪkʃn/|n|thẩm quyền xét xử|The case falls under federal jurisdiction.
` },
{ id:"it-gov", name:"Chuyển đổi số & Chính quyền điện tử", icon:"🏛️", level:"B2", words:`
e-government|/ˈiː ɡʌvərnmənt/|n|chính phủ điện tử|E-government makes public services faster.
digital transformation|/ˈdɪdʒɪtl ˌtrænsfərˈmeɪʃn/|n|chuyển đổi số|Digital transformation is a national priority.
interoperability|/ˌɪntərˌɑːpərəˈbɪləti/|n|khả năng liên thông|Interoperability between systems is essential.
data sharing|/ˈdeɪtə ˈʃerɪŋ/|n|chia sẻ dữ liệu|Data sharing reduces paperwork for citizens.
public service|/ˈpʌblɪk ˈsɜːrvɪs/|n|dịch vụ công|Online public services save time.
electronic signature|/ˌɪlekˈtrɑːnɪk ˈsɪɡnətʃər/|n|chữ ký điện tử|An electronic signature is legally valid.
authentication|/ɔːˌθentɪˈkeɪʃn/|n|xác thực|Two-factor authentication improves security.
infrastructure|/ˈɪnfrəstrʌktʃər/|n|hạ tầng|The country is investing in digital infrastructure.
data center|/ˈdeɪtə ˈsentər/|n|trung tâm dữ liệu|The national data center stores records securely.
cloud computing|/klaʊd kəmˈpjuːtɪŋ/|n|điện toán đám mây|Agencies are moving to cloud computing.
open data|/ˈoʊpən ˈdeɪtə/|n|dữ liệu mở|Open data promotes transparency.
personal data protection|/ˈpɜːrsnl ˈdeɪtə prəˈtekʃn/|n|bảo vệ dữ liệu cá nhân|Personal data protection is now regulated by decree.
one-stop shop|/ˌwʌn stɑːp ˈʃɑːp/|n|bộ phận một cửa|Applicants can submit documents at the one-stop shop.
administrative procedure|/ədˈmɪnɪstreɪtɪv prəˈsiːdʒər/|n|thủ tục hành chính|We aim to simplify administrative procedures.
information system|/ˌɪnfərˈmeɪʃn ˈsɪstəm/|n|hệ thống thông tin|The information system is operated 24/7.
digital identity|/ˈdɪdʒɪtl aɪˈdentəti/|n|định danh điện tử|Citizens can use a digital identity to log in.
stakeholder|/ˈsteɪkhoʊldər/|n|bên liên quan|We consulted all stakeholders.
implement|/ˈɪmplɪment/|v|triển khai, thực hiện|The ministry will implement the plan next year.
` },
{ id:"abstract", name:"Từ học thuật nâng cao", icon:"🧠", level:"C1", words:`
ambiguous|/æmˈbɪɡjuəs/|adj|mơ hồ, nhiều nghĩa|The instructions were ambiguous.
comprehensive|/ˌkɑːmprɪˈhensɪv/|adj|toàn diện|They produced a comprehensive report.
inevitable|/ɪnˈevɪtəbl/|adj|không thể tránh khỏi|Change is inevitable.
substantial|/səbˈstænʃl/|adj|đáng kể|There was a substantial increase in sales.
mitigate|/ˈmɪtɪɡeɪt/|v|giảm nhẹ|Measures were taken to mitigate the risk.
facilitate|/fəˈsɪlɪteɪt/|v|tạo điều kiện, hỗ trợ|Technology can facilitate learning.
underlying|/ˌʌndərˈlaɪɪŋ/|adj|cơ bản, tiềm ẩn|We must address the underlying causes.
controversial|/ˌkɑːntrəˈvɜːrʃl/|adj|gây tranh cãi|It was a controversial decision.
scrutiny|/ˈskruːtəni/|n|sự xem xét kỹ lưỡng|The plan is under public scrutiny.
resilient|/rɪˈzɪliənt/|adj|kiên cường, có khả năng phục hồi|Children are often remarkably resilient.
pragmatic|/præɡˈmætɪk/|adj|thực dụng, thực tế|She takes a pragmatic approach.
coherent|/koʊˈhɪrənt/|adj|mạch lạc|He gave a coherent explanation.
undermine|/ˌʌndərˈmaɪn/|v|làm suy yếu|Rumors undermined public trust.
foster|/ˈfɔːstər/|v|thúc đẩy, nuôi dưỡng|The program fosters creativity.
reluctant|/rɪˈlʌktənt/|adj|miễn cưỡng|He was reluctant to answer.
prevalent|/ˈprevələnt/|adj|phổ biến|This belief is prevalent among young people.
` }
];
