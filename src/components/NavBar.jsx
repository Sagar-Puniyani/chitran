

import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/all in one logo 1.png';
import { RainbowButton } from "@/components/magicui/rainbow-button";

const Navbar = () => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    // Replace with your actual GitHub repository path
    fetch('https://api.github.com/repos/sagar-puniyani/chitran')
      .then(response => response.json())
      .then(data => setStars(data.stargazers_count))
      .catch(error => console.error('Error fetching GitHub stats:', error));
  }, []);

  return (
    <>
      <nav className="w-full bg-gray-900 shadow-lg py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <span className="flex flex-row items-center font-bold text-white">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="logo"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-lg md:text-2xl text-teal-400">Chitran</span>
              </Link>
            </span>
          </div>

          {/* GitHub Button */}
          <RainbowButton className="px-3 md:px-8">
            <a
              href="https://github.com/sagar-punyani/chitran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white"
            >
              <Github size={20} className="text-teal-400" />
              <span className="hidden md:flex text-sm font-semibold">
                Star on GitHub
              </span>
              <span className="font-semibold text-teal-400 text-sm md:text-base">
                ⭐ {stars}
              </span>
            </a>
          </RainbowButton>
        </div>
      </nav>
      
      {/* Divider Line */}
      <div className="w-full h-[2px] bg-teal-600"></div>
    </>
  );
};

export default Navbar;
