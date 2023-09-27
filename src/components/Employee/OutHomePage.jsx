import React, { useEffect, useState } from "react";
import OutNavBar from "../NavBar/OutNavBar";
import img from "../../images/image1.png";
import img1 from "../../images/image2.png";
import card1 from "../../images/collaboration.webp";
import card2 from "../../images/innovation.webp";
import card3 from "../../images/deliver.webp";
import profile from "../../images/profile-pic.jpg";
import b1 from "../../images/b1.png";
import b2 from "../../images/b2.png";
import logo from "../../images/Logo.png";
import kiei from "../../images/kiei.png"
import { Helmet } from 'react-helmet'
import {
  AiFillInstagram,
  AiOutlineArrowRight,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { fetchAnnouncements } from '../../data/AnnouncementApi'
import { Typography } from "@material-tailwind/react";
import { IoIosArrowDown } from 'react-icons/io'
import { TiArrowUpOutline } from 'react-icons/ti'

const LINKS = [
  {
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    items: ["Quick Links", "About", "Careers", "Contacts"],
  },
  {
    items: ["Services", "AI & ML", "App Development", "Consultation"],
  },
];

const currentYear = new Date().getFullYear();

function OutHomePage() {
  const [showToTopButton, setShowToTopButton] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);
  const customBgColorClass1 = showContent1 ? "bg-customColor" : "bg-white";
  const customBgColorClass2 = showContent2 ? "bg-customColor" : "bg-white";
  const customBgColorClass3 = showContent3 ? "bg-customColor" : "bg-white";



  const toggleContent1 = () => {
    setShowContent1(!showContent1);
    setShowContent2(false);
    setShowContent3(false);
  };

  const toggleContent2 = () => {
    setShowContent2(!showContent2);
    setShowContent1(false);
    setShowContent3(false);
  };

  const toggleContent3 = () => {
    setShowContent3(!showContent3);
    setShowContent1(false);
    setShowContent2(false);
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowToTopButton(true);
    } else {
      setShowToTopButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchAnnouncementData();
  }, []);

  const fetchAnnouncementData = async () => {
    try {
      const data = await fetchAnnouncements();
      console.log(data, "anithing");
      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    }
  };

  const MovingObject = () => {
    useEffect(() => {
      // JavaScript logic for animation
      const movingElement = document.querySelector('.moving-object');

      if (movingElement) {
        const animationDuration = 5; // Animation duration in seconds
        const animationDistance = 100; // Animation distance in pixels

        movingElement.style.animation = `moveObject ${animationDuration}s linear infinite`;

        // Adjust the translateX value based on your desired animation distance
        movingElement.style.transform = `translateX(${animationDistance}rem)`;

        // Reset the animation when it's completed
        movingElement.addEventListener('animationiteration', () => {
          movingElement.style.transform = 'translateX(0)';
        });
      }
    }, []);
  }

  return (
    <>
      <Helmet>
        <title>HomePage | Staffsense</title>
      </Helmet>
      <div className="font-hubballi bg-bgColor">
        <div className="w-full">
          <OutNavBar />
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:mr-10 xl:ml-24 mr-4 ml-4 font-hubballi">
            <h1 className="font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-4">
              As a members’ life and priority changes, so should their saving
              priorities.
            </h1>
            <h1 className="text-sm lg:text-base xl:text-lg 2xl:text-xl mb-4">
              Mango creates a customized employee savings benefit to build member
              financial wellness. By aligning their life-stages and financial
              profile.
            </h1>
            <h1 className="text-sm lg:text-base xl:text-lg 2xl:text-xl">
              Members will be able to apportion savings between long-term,
              short-term, and group risk (death and disability).
            </h1>
          </div>

          <img
            src={img}
            alt="Image"
            className="w-full lg:w-1/3 h-auto lg:h-auto mt-4 xl:ml-64 lg:mt-0"
          />
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center lg:px-4">
          <img
            src={img1}
            alt="Image"
            className="w-full lg:w-1/3 h-auto lg:h-auto ml-4 mt-4 lg:ml-0 lg:mt-0"
          />
          <div className="lg:mr-10 mr-4 lg:ml-4 font-hubballi text-center lg:text-left">
            <h1 className="mb-2 text-base lg:text-xl xl:text-2xl">
              FUTURE NEXT
            </h1>
            <h1 className="lg:text-3xl xl:text-4xl font-bold mb-4">About Us</h1>
            <p className="text-sm lg:text-base xl:text-xl">
              At StaffSense, we solidly endeavor towards making an incentive for
              our clients and that we associate. StaffSense is the leading and
              best software company in Kerala dealing with solutions like ERP,
              e-commerce, mobile application, and so on. This goal is reflected in
              the entirety of our solutions - every one of them standing tall as an
              industry signal in its classification, consistently conveying worth
              to our clients, for many years.
            </p>
            <div className="flex items-center cursor-pointer">
              <span className="mr-2">Learn more</span>
              <AiOutlineArrowRight className="" />
            </div>
          </div>
        </div>

        {/* ......................................................................... */}

        <div className="font-hubballi px-4 lg:px-0 text-center mt-24">
          <div className="text-center font-extrabold text-xl lg:text-3xl xl:text-4xl">
            Our Leaders
          </div>
          <div className="text-lg mt-5">
            <h1 className="text-center">
              "As a data solutions partner to companies, we've focused on creating
              value for our clients"
            </h1>
          </div>
          <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
            {/* Card 1 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-white border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-1">
                  Vishnu Krishnakumar
                </h5>
                <p className="mb-1">Founder</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <a href="https://www.instagram.com/vishnu_k_krishna/">
                    <AiFillInstagram className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.linkedin.com/in/vishnukrishnakumar/">
                    <AiFillLinkedin className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100008371385629">
                    <BiLogoFacebookCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://twitter.com/_v_i_c_h_o_o_z_">
                    <AiFillTwitterCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-white border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-1">
                  Vishnu Krishnakumar
                </h5>
                <p className="mb-1">CEO</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <a href="https://www.instagram.com/vishnu_k_krishna/">
                    <AiFillInstagram className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.linkedin.com/in/vishnukrishnakumar/">
                    <AiFillLinkedin className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100008371385629">
                    <BiLogoFacebookCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://twitter.com/_v_i_c_h_o_o_z_">
                    <AiFillTwitterCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-white border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-1">
                  Vishnu Krishnakumar
                </h5>
                <p className="mb-1">SEO Expert</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <a href="https://www.instagram.com/vishnu_k_krishna/">
                    <AiFillInstagram className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.linkedin.com/in/vishnukrishnakumar/">
                    <AiFillLinkedin className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100008371385629">
                    <BiLogoFacebookCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                  <a href="https://twitter.com/_v_i_c_h_o_o_z_">
                    <AiFillTwitterCircle className="text-2xl social-icon transition-transform duration-300 transform hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ................................................................................. */}

        <div className="font-hubballi px-4 lg:px-0 text-center mt-20">
          <div id="feature" className="text-center font-extrabold text-xl lg:text-3xl xl:text-4xl">
            Our Features
          </div>
          <div className="mt-5">
            <h1 className="text-center text-lg">
              We can offer to our solutions to our current and forthcoming clients
              so both our current and future client can pursue an educated
              speculation choice.
            </h1>
          </div>
          <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
            {/* Card 1 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Collaborate
                </h5>
                <p>
                  We acquire various abilities and differed perspectives when we
                  cooperate towards accomplishing our common perspective.
                </p>
              </div>
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img src={card1} alt="" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Innovate
                </h5>
                <p>
                  We develop better innovation. Taking on an innovation benefit
                  improvised and unique results will be followed.
                </p>
              </div>
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img src={card2} alt="" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Deliver
                </h5>
                <p>
                  We accept, our most extreme objective is to convey results by
                  delivering through our services for valued customers.
                </p>
              </div>
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img src={card3} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* .............................................. */}

        <div className="flex flex-col lg:flex-row font-hubballi mt-20 bg-bgColor rounded-3xl">
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={b1}
              alt="User Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 mt-32">
            <h1 className="w-4/5 ml-4 md:w-4/5 md:ml-24 font-sansserif text-start text-xl font-black lg:text-3xl xl:text-5xl">
              Our Service Approach
            </h1>
            <div className="w-4/5 mt-4 ml-4 md:w-4/5 md:ml-24">
              <p className="text-xs md:text-sm lg:text-xl xl:text-2xl text-gray-600">
                Our approach in handling a project is designed in a flow that can ensure the requirement of the client is fulfilled intact.
              </p>
            </div>

            <div className="group w-4/5 mt-12 mx-auto cursor-pointer">
              <div
                className={`flex justify-between cursor-pointer ${customBgColorClass1} rounded-lg p-4 transition duration-300`}
                onClick={toggleContent1}
              >
                <p className={`text-xl font-bold ${showContent1 ? 'text-white' : 'text-black'}`}>
                  Develop a Concept
                </p>
                <div className="arrow">
                  <IoIosArrowDown
                    className={`w-5 h-5 mr-5 mt-1 text-gray-500 ${showContent1 ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </div>
              <div className={`${showContent1 ? 'block' : 'hidden'} mt-2 space-y-6 text-gray-600 bg-white rounded-xl`}>
                <p className="p-4 text-base lg:text-lg xl:text-xl">
                  Drafting the extent of the need and making a rundown of the
                  highlights and prerequisites wanted in the project.
                </p>
              </div>
            </div>
            <div className="group mt-6 w-4/5 mx-auto cursor-pointer">
              <div
                className={`flex justify-between cursor-pointer ${customBgColorClass2} rounded-lg p-4 transition duration-300`}
                onClick={toggleContent2}
              >
                <p className={`text-xl font-bold ${showContent2 ? 'text-white' : 'text-black'}`}>
                  Build and Evolve
                </p>
                <div className="arrow">
                  <IoIosArrowDown
                    className={`w-5 h-5 mr-5 mt-1 text-gray-500 ${showContent2 ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </div>
              <div className={`${showContent2 ? 'block' : 'hidden'} mt-2 space-y-6 text-gray-600 bg-white rounded-xl`}>
                <p className="p-4 text-base lg:text-lg xl:text-xl">Structuring the parts of the solutions, doing operational and functional tests and consolidating the required output.</p>
              </div>
            </div>
            <div className="group mt-6 w-4/5 mx-auto cursor-pointer">
              <div
                className={`flex justify-between cursor-pointer ${customBgColorClass3} rounded-lg p-4 transition duration-300`}
                onClick={toggleContent3}
              >
                <p className={`text-xl font-bold ${showContent3 ? 'text-white' : 'text-black'}`}>
                  Implement
                </p>
                <div className="arrow">
                  <IoIosArrowDown
                    className={`w-5 h-5 mr-5 mt-1 text-gray-500 ${showContent3 ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </div>
              <div className={`${showContent3 ? 'block' : 'hidden'} mt-2 space-y-6 text-gray-600 bg-white rounded-xl`}>
                <p className="p-4 text-base lg:text-lg xl:text-xl">Launch of the solution in the environment and setting up to make the product run effectively and up to the standards.</p>
              </div>
            </div>
          </div>
        </div>


        {/* ................................................... */}
        <div className="flex font-hubballi mt-10 rounded-3xl bg-white flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <div className="text-center">
              <h1 className="text-center font-sansserif text-lg md:text-xl lg:text-3xl xl:text-5xl mt-6">
                Announcements
              </h1>
            </div>
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex flex-col p-2 md:p-4">
                <div className="mt-2 md:mt-5 flex items-center">
                  <FaStar className="mr-2 text-lg md:text-xl lg:text-xl" />
                  <h1 className="text-base md:text-lg lg:text-3xl xl:text-3xl">{announcement.event}</h1>
                </div>
                <div className="text-start">
                  <p className="p-3 md:ml-7 text-sm md:text-base lg:text-2xl xl:text-xl">
                    {announcement.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={b2}
              alt="User Uploaded Image"
              className="w-full h-auto lg:h-full object-cover"
            />
          </div>
        </div>
        {/* ............................... */}



        {/* ............................... */}


        {/* ................................................... */}
        <footer className="relative w-full mt-10">
          <div className="mx-auto w-full max-w-7xl px-4">
            <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
              <div className="w-40 h-30">
                <img src={logo} alt="Logo" />
              </div>
              <div className="grid grid-cols-3 justify-between gap-4">
                {LINKS.map(({ title, items }) => (
                  <ul key={title}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-3 font-medium opacity-40"
                    >
                      {title}
                    </Typography>
                    {items.map((link) => (
                      <li key={link}>
                        <Typography
                          as="a"
                          href="#"
                          color="gray"
                          className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                        >
                          {link}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
              <Typography
                variant="small"
                className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
              >
                &copy; {currentYear}{" "}
                <a href="https://vishnukrishnakumar.com/">StaffSense</a>. All
                Rights Reserved.
              </Typography>
            </div>
          </div>
          {showToTopButton && (
            <div className="cursor-pointer fixed z-90 animate-bounce bottom-8 right-8 border-0 w-10 h-10 rounded-full shadow-lg bg-customColor text-2xl font-bold flex items-center justify-center">
              <TiArrowUpOutline
                id="to-top-button"
                onClick={goToTop}
                title="Go To Top"
                className="w-5 h-5 text-white animate-bounce"
              >
                &uarr;
              </TiArrowUpOutline>
            </div>
          )}
        </footer>
      </div>
    </>
  );
}

export default OutHomePage;
