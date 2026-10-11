const github = 'https://github.com/sabinabashirova66-netizen';
const photo = `${github}/Resume/raw/refs/heads/main/sabina.jpg`;

const experience = [
  {
    title: 'Стартап «Alive Group»',
    subtitle: 'Разработчик',
    description: 'Разработка Telegram-ботов, создание и вёрстка веб-сайтов, помощь команде в технических деталях IT-проектов.',
  },
  {
    title: 'Курсовой проект',
    subtitle: 'Автоматизированная система турниров',
    description: 'Разработка системы для организации и автоматического подсчёта результатов турниров.',
  },
  {
    title: 'Учебные проекты',
    subtitle: 'Разработчик игр и симуляций',
    description: 'Создание игры-кликера с системой улучшений и симулятора «Марсианская колония».',
  },
];

const languages = ['Русский — отлично', 'Английский — базовый', 'Немецкий — изучаю', 'Кыргызский', 'Узбекский'];
const skills = ['HTML5', 'CSS3', 'Базы данных', 'Git', 'Разработка Telegram-ботов'];

function SectionTitle({ children }) {
  return <h2 className="section-marker">/ {children}</h2>;
}

function Entry({ title, date, subtitle, description }) {
  return (
    <article className="entry">
      <div className="entry-header">
        <span>{title}</span>
        {date && <span className="entry-date">{date}</span>}
      </div>
      <p className="entry-subtitle">{subtitle}</p>
      <p className="entry-text">{description}</p>
    </article>
  );
}

function DetailList({ items }) {
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function App() {
  return (
    <>
      <div className="top-line" />
      <main className="resume">
        <section className="left-column">
          <h1 className="name">Сабина<br />Баширова</h1>
          <p className="job-title">Frontend-разработчик / Студент направления Программные технологии</p>

          <SectionTitle>EDUCATION</SectionTitle>
          <Entry
            title="Кыргызско-Германский университет прикладной информатики (INAI.KG)"
            date="2026 - Наст. время"
            subtitle="Направление: Прикладная информатика, 2 курс"
            description="Успеваемость: средний балл GPA за 1 курс — 3.67 из 4.0."
          />

          <SectionTitle>WORK EXPERIENCE</SectionTitle>
          {experience.map((item) => <Entry key={item.title} {...item} />)}
        </section>

        <aside className="right-column">
          <img src={photo} alt="Фото Сабины Башировой" className="photo" />

          <SectionTitle>CONTACTS</SectionTitle>
          <ul>
            <li>Моб.: [9965511145]</li>
            <li>E-mail: <a href="mailto:sabinabashirova66@gmail.com">sabinabashirova66@gmail.com</a></li>
            <li>City: Бишкек</li>
            <li>GitHub: <a href={github} target="_blank" rel="noreferrer">sabinabashirova66-netizen</a></li>
          </ul>

          <SectionTitle>ABOUT</SectionTitle>
          <DetailList items={['Возраст: 18 лет']} />

          <SectionTitle>LANGUAGES</SectionTitle>
          <DetailList items={languages} />

          <SectionTitle>SKILLS</SectionTitle>
          <DetailList items={skills} />

          <SectionTitle>HOBBIES</SectionTitle>
          <DetailList items={['Спорт']} />
        </aside>
      </main>
    </>
  );
}
