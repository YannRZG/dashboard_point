import Link from 'next/link';
import Image from 'next/image';
import Thp from '/app/images/thp.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-2">
        {/* Logo ou Nom de l'application */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-[150px] h-[60px]"> {/* Conteneur avec position relative */}
            <Image
              src={Thp}
              alt="PointTHP Logo"
              fill
              sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 100px"
              style={{ objectFit: 'contain' }} // Ajuste l'image pour contenir dans le conteneur
              priority
            />
          </div>
        </Link>
        {/* Liens de navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
        {/* Menu mobile */}
        <button className="md:hidden flex items-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Menu mobile déroulant */}
      <div className="md:hidden bg-gray-800">
        <div className="p-4 space-y-4">
          <Link
            href="/"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="block text-white hover:text-gray-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
