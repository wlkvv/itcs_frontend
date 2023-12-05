import psycopg2

try:
    conn = psycopg2.connect(
        dbname="student",
        host="176.57.215.76",
        user="student",
        password="root",
        port="5432"
    )

    with conn:
        with conn.cursor() as cursor:
            cursor.execute("UPDATE public.vacancies SET requirements = ARRAY ['Отличные коммуникативные навыки','Умение организовывать и координировать работу', 'Знание основ интернет-технологий','Опыт работы с онлайн-платформами будет плюсом'], conditions = ARRAY ['Удаленная работа','Гибкий график','Возможность профессионального роста и обучения'] WHERE id=3;")

except psycopg2.Error as e:
    print("Ошибка при подключении к PostgreSQL:", e)

#INSERT INTO public.vacancies (id, title, adress, time, salary, company, city, exp, image, info, requirements, conditions, status) VALUES (1, 'Копирайтер', 'Алексеевская', 'Полный день', 50000, 'Копи-копи', 'Москва', 'Без опыта', 'https://w7.pngwing.com/pngs/299/589/png-transparent-social-media-computer-icons-technical-computer-network-text-computer.png', 'Компания \"Копи-копи\" стремится к совершенству и инновациям. Ее команда талантливых копирайтеров постоянно ищет новые способы выразить идеи и повысить эффективность коммуникации. С каждым текстом, созданным \"Копи-копи\", они продолжают укреплять свою репутацию как надежного партнера, который доставляет не только качественные тексты, но и вдохновение, которое воплощается в каждом слове.', ARRAY['Отличное владение русским языком', 'Умение писать грамотные тексты', 'Креативность и внимательность к деталям'], ARRAY['Гибкий график работы', 'Возможность удаленной работы', 'Оплачиваемый отпуск', 'Профессиональное развитие и обучение', 'Дружеская и поддерживающая рабочая атмосфера'], 'enabled');
'''
import psycopg2

data = [
    {
    'adress':'',
    'image':'',
    'title': 'Редактор',
    'salary': 20000,
    'time': 'Удаленная работа',
    'company': 'Новая газета',
    'city': 'Москва',
    'exp': 'Без опыта',
    'id': 4,
    'info': 'Новая газета - это историческое издание, которое существует уже более ста лет. Они являются одним из самых авторитетных и влиятельных печатных изданий в стране. Новая газета всегда была символом независимой журналистики и свободы слова. Их журналисты и редакторы известны своей профессиональностью, точностью и честностью в отношении информации, которую они предоставляют своим читателям. Новая газета активно освещает важные события и проблемы общества, их репортажи и статьи часто становятся объектом обсуждения и влияют на общественное мнение.',
    'requirements': [
      'Отличное владение русским языком и грамотность',
      'Редакторские навыки и умение работать с текстами',
      'Внимательность к деталям и способность к самоконтролю',
      'Знание стилей и правил редактирования текстов'
    ],
    'conditions': [
      'Удаленная работа',
      'Гибкий график',
      'Возможность профессионального развития и обучения'
    ]
    }
]

connection = psycopg2.connect(
        dbname="student",
        host="192.168.111.132",
        user="student",
        password="root",
        port="5432")

cursor = connection.cursor()

for vacancy in data:
    cursor.execute(
        """
        INSERT INTO vacancies (title, adress, time, salary, company, city, exp, image, id, info, requirements, conditions)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            vacancy['title'],
            vacancy['adress'],
            vacancy['time'],
            vacancy['salary'],
            vacancy['company'],
            vacancy['city'],
            vacancy['exp'],
            vacancy['image'],
            vacancy['id'],
            vacancy['info'],
            vacancy['requirements'],
            vacancy['conditions']
        )
    )
'''


'''
connection.commit()
cursor.close()
connection.close()
'''