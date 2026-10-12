import photo from './sabina.jpg';

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
  return <div className="section-marker">/ {children}</div>;
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

function Header() {
  return (
    <>
      <p className="name">Сабина<br />Баширова</p>
      <p className="job-title">Frontend-разработчик / Студент направления Программные технологии</p>
    </>
  );
}

function Education() {
  return (
    <section>
      <SectionTitle>EDUCATION</SectionTitle>
      <Entry
        title="Кыргызско-Германский университет прикладной информатики (INAI.KG)"
        date="2026 - Наст. время"
        subtitle="Направление: Прикладная информатика, 2 курс"
        description="Успеваемость: средний балл GPA за 1 курс — 3.67 из 4.0."
      />
    </section>
  );
}

function Experience() {
  return (
    <section>
      <SectionTitle>WORK EXPERIENCE</SectionTitle>
      {experience.map((item) => <Entry key={item.title} {...item} />)}
    </section>
  );
}

function Contacts() {
  return (
    <section>
      <SectionTitle>CONTACTS</SectionTitle>
      <DetailList items={[
        'Моб.: [9965511145]',
        'E-mail: sabinabashirova66@gmail.com',
        'City: Бишкек',
        'GitHub: sabinabashirova66-netizen',
      ]} />
    </section>
  );
}

function Profile() {
  return (
    <aside className="right-column">
      <img src={photo} alt="Фото" className="photo" />
      <Contacts />
      <SectionTitle>ABOUT</SectionTitle>
      <DetailList items={['Возраст: 18 лет']} />
      <SectionTitle>LANGUAGES</SectionTitle>
      <DetailList items={languages} />
      <SectionTitle>SKILLS</SectionTitle>
      <DetailList items={skills} />
      <SectionTitle>HOBBIES</SectionTitle>
      <DetailList items={['Спорт']} />
    </aside>
  );
}

export default function App() {
  return (
    <>
      <div className="top-line" />
      <main className="resume">
        <div className="left-column">
          <Header />
          <Education />
          <Experience />
        </div>
        <Profile />
      </main>
    </>
  );
}
