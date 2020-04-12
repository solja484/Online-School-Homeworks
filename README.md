# Online-School-Homeworks
---
*Server part:* https://github.com/natahiko/Online-School-Homework-Server

---

**Що нового Соля зробила:**
- пофіксила цю бісящу менюшку і тепер там все нарешті красиво
- після едіта предмета модальне вікно уже закривається)
- додавання і едіт багатьох гіперлінків в дз (якщо нічого не ввести в базу не передається "")
- додавання + редагування + видалення олімпіади
- додавання + редагування + видалення олімпіадного завдання
- оцінювання + редагування оцінки олімпіадних завдань (вчитель)
- додавання + редагування відповіді на олімпіади


**Що Соля не зробила:**
- кнопочки "назад" на сторінках предмета і домашки (або breadcrumbs)
- не розібралася з тим як вибирати і додавати конкурси 
- а ще поки з додатковими джерелами і їх гіперлінками

**Таски Солі від Натахи:**
- [ ] ЯКЩО ти передаєш десь в функцію не JSON, а айдішку або будь-яке інше значення, то тобі треба писати: onclick=editSomething('"+smth.id+"') (з одинарними кавичками) - бо всі помилки "серверу" які я фіксила були через таке

- [ ] при додаванні домашки, коли ти додав домашку в якій було 3 гіперлінка наступний раз відкривається модалка в якій теж 3 поля для гіперлінків, а має бути одне -> //TODO @solja clear hyperlinks fields

- [ ] коли заходиш в редагування домашки, дедлайн який був до цього повинен автозаповнюватись в полі дедлайну. Якщо я щось едітнула а потім іду едітати щось інше, то воно модвльне вікно заповнює старими значеннями (з попередньої домашки) + після збереження змін модальне вікно незакривається -> //TODO @solja edithometask + аналогічно в редагуванні завдань олімпіад (без тудушки бо не знаю де вона має бути)

- [ ] зроби мінімальну валідацію на додавання конкурса (не пусті поля + ще щось якщо захочеш придумувати) -> //TODO @solja addCompetititon validation

- [ ] і в предметах і в олімпіадах десь у вчителя має бути видно код доступу для учнів, я в методах /getteachersubjects та /getteacherolympiads вертаю id предмета або олімпіади, закнь його десь щоб було видно і видно гарно (прям велике)

- [ ] кнопоки видалення на завданнях у вчителя бажаться (кидала скрін)
- [ ] завдання ті які активні теж їдуть при зменшенні екрана
- [ ] зараз у нас завдання в олімпіадах які вже не активні підсвічуються дуже негарним сірим кольором, зроби якийсь стиль, щоб було красиво, але при цьому було понятно що вони уже просрочені, або навпаки виділяти треба якимось кольором непросрочені + зробити якийсь інший фон для відповіді, бо непонятно де відповідь

- [ ] після додавання завдання щоб закривалось модальне вікно + чистити поля модального вікна-> //TODO @solja addTask
- [ ] після едіта щоб обновлялись на сторінці значення -> //TODO @solja editTask
- [ ] на додаванні школи після того як додала школу і відкриваю знову вікно треба прибирати класи валідності полів + те саме на редагуванні школи
- [ ] на редагуванні школи не заповнюється автоматично телефон та номер будинку

---

**Таски Натахі від Солі:**
- [x] видаляй мої коменти-пояснення після того як прочитаєш
- [x] у методах editHomework() i addHomework() (personalInfo.js) ajax повертає ерор і помилки на сервері
- [x] у завдань є source_id (посилання на олімпіаду), ми у звіті написали sourSe_id не з тою с, то я вже тут пишу правильно
- [x] редагування, додавання, видалення олімпіади editOlympiad(id) addOlympiad(teach_id) deleteOlympiad(id)
- [x] повертати інфу про олімпіади fillTeacherOlympiads(id) fillPupilOlympiads(id)
- [x] повертати інфу про всі завдання олімпіади fillTeacherOlympiadTasks() fillPupilOlympiadTasks()
- [x] повертати інформацію про конкурс(поки що повертай якийсь рандомний) fillCompetition()
- [x] зроби методи для додаванна конкурсів у адміністратора (як з містами було)
- [x] видалення завдання deleteOlympiadTask()
- [x] editTask() i addTask() -> TODO @natasha editTask()  i TODO @natasha addTask()
- [x] повертати всю інфу завдання fillOlympiadTask()
- [x] повертати всю інфу відповіді fillAnswerField
- [x] submitAnswer - зберігати нову відповідь у базі даних
- [x] submitMark + editMark

**Що нового Натаха зробила:**
* додала на сервері заголовки, тепер не повинно бути CORS помилок на методах які працюють + мона тестить в будь-якому браузері без розширення
* поміняла всі алерти на помилки методів на console.log, щоб видно було помилки іне бісило при тестуванні
* описала і поміняла трохи бд(але то все я з тобою погоджувала) - зато тепер вона ніби повна
* getAllCompetitionNames() -> вертає список назв дисциплін конкурсів та їх id для того щоб створювати selector для створення конкурсу до олімпіади -> requests.js -> getAllCompetitionNames - але уже він непотрібний
* в /getolympiadtasksandsources повертаю атрибут active, який просто обраховується на бекенді
* при заповленні олімпіад зробила щоб і джерела і завдання повертались в одному запиті і відповідно заповняється воно тепер все трохи інакше, але замість 3 запитів на бек - лише 1
* зробила табличку з етапами в sql - треба буде додати до нашої моделі, але це зато 3-тя нормальна форма
* повністю зробила додавання конкурсів у адміна + селектор для вибору курсів при додаванні олімпіади у вчителя
* розбила метод fillAnswerFields на fillAnswerFieldsPupil та fillAnswerFieldsTeacher
* fillAnswerFieldsPupil  - враховано випадки:
        1) не здав до дедлайну
        2) не здав після дедлайну
        3) здав і може редагувати (дедлайн не настав)
        4) здав і дедлайн настав
* setSchoolsTable - заповнення таблиці шкіл у адміна + при додаванні школи школа додається в таблицю
* editSchool + deleteSchool так, щоб інфа на фронті теж оновлювалась
* fillAnswerFieldsTeacher, вчитель бачить всі відповіді на курс в модальному вікні може переглянути роботу, виставити оцінку, коментар і зберегти
* у предметах та олімпіадах зробила кнопочки "перглянути всіх учнів", щоб мона було перейти на їх профіль
* додала в предмети і олімпіади кнопочку "переглянути профіль вчителя" - повністю працює