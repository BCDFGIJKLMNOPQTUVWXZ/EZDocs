import { Link } from 'react-router-dom';
import DocumentImg from '../assets/Document.png';
import FormImg from '../assets/Form.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center px-6 py-14 bg-[#E9D8FD] min-h-screen">
      {/* Title */}
      <h2 className="text-4xl font-bold text-[#8B5FBF] mb-12">
        Services we provide
      </h2>

      {/* Service Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 min-h-[420px]">
          <div className="bg-[#E9D8FD] p-6 rounded-xl mb-6">
            <img
              className="w-60 rounded"
              src={DocumentImg}
              alt="Simplify Document"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#8B5FBF] mb-3">
            Simplify a Document
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Upload a document with complex wording and EZDocs will rewrite it in
            simpler, easy-to-understand language.
          </p>
           <Link to="/simplify-document">
            <button className="bg-[#C18BFA] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#8B5FBF] transition duration-300">
            Try Simplifying
            </button>
           </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 min-h-[420px]">
          <div className="bg-[#E9D8FD] p-6 rounded-xl mb-6">
            <img
              className="w-60 rounded"
              src={FormImg}
              alt="Check and Simplify Form"
            />
          </div>
          <h3 className="text-2xl font-bold text-[#8B5FBF] mb-3">
            Check & Simplify a Form
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            Upload your filled form. EZDocs will check if everything is filled
            correctly and tell you what documents are required.
          </p>
          <Link to="/check-form">
            <button className="bg-[#C18BFA] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#8B5FBF] transition duration-300">
            Start Checking
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
