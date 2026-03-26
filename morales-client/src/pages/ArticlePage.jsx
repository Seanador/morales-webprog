import Button from '../components/Button';
import java from '../assets/images/java.jpeg';
import python from '../assets/images/python_logo.jpg';
import nodeJS from '../assets/images/nodeExpress.jpg';
import mongoDB from '../assets/images/mongo_db.jpg';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Featured here are the languages in which I am knowledgeable in!
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Here are some articles about the programming languages I am familiar with.
        </p>
        <div className="mt-6">
          <Button to="/">Back Home</Button>
        </div>
      </section>

    <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="mb-6">
    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
      Featured Articles
    </p>
    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
  </div>

  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
        <img src={mongoDB} className="h-80 w-120 object-fill block" />      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Article 01
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900">MongoDB</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
       I am currently using and learning MongoDB, and I am excited to share my progress and insights as I learn this powerful NoSQL database. Despite not being a programming language, SQL drove me to learn MongoDB.
      </p>
      <Button className="mt-4">Read More</Button>
    </article>

    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
        <img src={nodeJS} className="h-80 w-120 object-fill block" />
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Article 02
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900">Node and ExpressJS</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        I am currently using NodeJS and ExpressJS for my team and I's capstone project, running on JavaScript, Node and Express will be used for the backend development of our project!
      </p>
      <Button className="mt-4">Read More</Button>
    </article>

    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
        <img src={python} className="h-80 w-120 object-fill block" />
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Article 03
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900">Python</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        I am currently using Python to structure my data in order to create the machine learning predictive model for our capstone project. 
      </p>
      <Button className="mt-4">Read More</Button>
    </article>

    <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
      <div className="flex aspect-4/3 items-center justify-center rounded-[1.25rem] bg-zinc-200">
        <img src={java} className="h-80 w-120 object-fill block" />
      </div>
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
        Article 04
      </p>
      <h3 className="mt-2 text-lg font-semibold text-zinc-900">JAVA</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Java is the first programming language I learned, and it is the language that sparked my interest in programming. I completed school projects using Java and it is certainly the backbone of my programming journey.
      </p>
      <Button className="mt-4">Read More</Button>
    </article>
  </div>
</section>

    </div>
  );
};

export default ArticlePage;