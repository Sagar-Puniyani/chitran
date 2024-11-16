import { Link } from 'react-router-dom';
import img1 from '../assets/beautiful-girl-with-autumn-leaves-photo.png';
import textadd from '../assets/text add thumbnail 3.jpg';
import myphoto from '../assets/my photo.jpg';
import comingsoon from '../assets/coming soon 2.jpg';

import ShineBorder from "@/components/ui/shine-border";
import Particles from "@/components/ui/particles";

"use client";

const ImageCard = ({ imageSrc, altText }) => {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-md shadow-lg bg-gray-800">
      <img
        src={imageSrc}
        alt={altText}
        className="absolute inset-0 w-full h-full object-contain rounded-md"
      />
    </div>
  );
};

const Home = () => {

  const cards = [
    { 
      title: 'Remove Background', 
      imageSrc: img1, 
      altText: 'Remove Background', 
      path: '/removeBG' 
    },
    { 
      title: 'Add Text in BG', 
      imageSrc: textadd, 
      altText: 'Add Text in BG', 
      path: '/addtext' 
    },
    { 
      title: 'Edit Manually', 
      imageSrc: comingsoon, 
      altText: 'Edit Manually', 
      path: '/enhancer' 
    },
    { 
      title: 'About Me', 
      imageSrc: myphoto, 
      altText: 'Sagar Talagana', 
      path: '/about' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col items-center p-6 text-white">
      <h1 className="text-3xl font-extrabold text-center mb-10 text-teal-400">
        All-in-One Photo Editing Suite
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 w-full max-w-6xl">
        {cards.map((card, index) => (
          <Link key={index} to={card.path} className="group">
            <ShineBorder
              className="h-72 w-full bg-gray-800 p-1 rounded-lg shadow-lg transition duration-300 hover:scale-105"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <div className="h-full w-full bg-gray-900 p-4 rounded-md flex flex-col justify-between">
                <ImageCard imageSrc={card.imageSrc} altText={card.altText} />
                <h2 className="text-lg font-semibold text-center mt-4 text-teal-400">
                  {card.title}
                </h2>
              </div>
            </ShineBorder>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-center">
        <Link to="https://talaganaSagar.vercel.app/">
          <h2 className="text-sm font-semibold text-gray-400 hover:text-teal-400">
            Made with ❤️ by <span className="font-bold">Sagar</span>
          </h2>
        </Link>
      </footer>

      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </div>
  );
};

export default Home;
