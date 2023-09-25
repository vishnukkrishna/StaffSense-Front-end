import React, { useEffect, useState } from "react";
import InNavList from "../NavBar/InNavList";
import img1 from "../../images/image2.png";
import image1 from "../../images/header-smartphone.png";
import image2 from "../../images/Contactless.png";
import image3 from "../../images/Customer service.png";
import b2 from "../../images/b2.png";
import logo from "../../images/Logo.png";
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';

import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
import { fetchAnnouncements } from '../../data/AnnouncementApi'
import { IoIosArrowDown } from 'react-icons/io'

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

function EmployeeLandingPage() {

  const [announcements, setAnnouncements] = useState([]);
  const [showToTopButton, setShowToTopButton] = useState(false);

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

  return (
    <>
      <Helmet>
        <title>Employee Home | Staffsense</title>
      </Helmet>
      <div className="font-hubballi bg-newColor">
        <InNavList />
        <div className="flex flex-col-reverse lg:flex-row items-center lg:px-4 mt-10">
          <img
            src={img1}
            alt="Image"
            className="w-full lg:w-1/3 h-auto lg:h-auto ml-4 mt-4 lg:ml-0 lg:mt-0"
          />
          <div className="lg:mr-10 mr-4 lg:ml-4 font-hubballi text-center lg:text-left">
            <h1 className="mb-2 text-base lg:text-xl xl:text-2xl lg:mb-4 font-style: italic">
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
            <div className="flex items-center">
              <span className="mr-2">Learn more</span>
              <AiOutlineArrowRight className="" />
            </div>
          </div>
        </div>

        {/* .............................................. */}
        <div className="font-hubballi px-4 lg:px-0 text-center mt-16">
          <div className="text-center font-extrabold text-3xl lg:text-4xl xl:text-5xl">
            Our Services
          </div>
          <div>
            <h1 className="text-center text-xl mt-4">
              "As a data solutions partner to companies, we've focused on creating
              value for our employees"
            </h1>
          </div>
          <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
            {/* Card 1 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-2xl font-semibold mb-2">
                  Hall Booking
                </h5>
                <div className="p-4 bg-white border-t flex justify-center items-center">
                  <img className="w-50 h-50 mt-4" src={image1} alt="" />
                </div>
                <Button className="bg-customColor mt-10 transition duration-300 ease-linear transform hover:scale-110">
                  <Link to="/addmeeting">Book your Meeting Room</Link>
                </Button>

                <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-2xl font-semibold mb-2">
                  Visitor Registration
                </h5>
                <div className="p-4 bg-white border-t flex justify-center items-center">
                  <img className="w-50 h-50" src={image2} alt="" />
                </div>
                <Button className="bg-customColor mt-6 transition duration-300 ease-linear transform hover:scale-110">
                  <Link to="/visitorpage">Register your visitor</Link>
                </Button>
                <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full lg:w-96 border rounded-2xl overflow-hidden shadow-lg bg-white">
              <div className="p-4">
                <h5 className="text-blue-gray text-2xl font-semibold mb-2">
                  Requests & Complaints
                </h5>
                <div className="p-4 bg-white mt-3 border-t flex justify-center items-center">
                  <img className="w-full h-5/6 mt-5" src={image3} alt="" />
                </div>
                <Button className="bg-customColor mt-20 transition duration-300 ease-linear transform hover:scale-110">
                  <Link to="/usercomplaints">Register your Complaints</Link>
                </Button>
                <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
              </div>
            </div>
          </div>
          {/* ................................................... */}
          {/* Announcement blocks */}
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
                    <h1 className="text-lg lg:text-3xl xl:text-3xl">{announcement.event}</h1>
                  </div>
                  <div className="text-start ml-24">
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

        </div>
        {/* ................................................... */}
        <footer className="relative w-full mt-10">
          <div className="mx-auto w-full max-w-7xl px-8">
            <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
              <div className="w-40 h-30 cursor-pointer">
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
              <IoIosArrowDown
                id="to-top-button"
                onClick={goToTop}
                title="Go To Top"
                className="w-5 h-5 text-white animate-bounce"
              >
                &uarr;
              </IoIosArrowDown>
            </div>
          )}
        </footer>
      </div>
    </>
  );
}

export default EmployeeLandingPage;
