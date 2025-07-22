import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About Image Search App
      </h1>

      <p className="mb-4 text-slate-700">
        This application allows users to search and explore high-quality images
        using the{' '}
        <Link
          to={'https://unsplash.com/developers'}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          Unsplash API
        </Link>
        . It features live search, image results, pagination, and a responsive
        interface.
      </p>

      <p className="mb-4 text-slate-700">
        Built as part of the&nbsp;
        <Link
          to="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-blue-500"
        >
          RS School React course
        </Link>
      </p>

      <p className="text-slate-600 italic">
        Created by{' '}
        <Link
          to={'https://github.com/NatashaSolntseva'}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-500"
        >
          Natasha Solntseva
        </Link>
      </p>
    </div>
  );
};

export default About;
