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
import { Helmet } from 'react-helmet'

import {
  AiFillInstagram,
  AiOutlineArrowRight,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BiLogoFacebookCircle, BiDownArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { fetchAnnouncements } from '../../data/AnnouncementApi'
import { Typography } from "@material-tailwind/react";

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
  const [announcements, setAnnouncements] = useState([]);

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
        <title>HomePage | Staffsense</title>
      </Helmet>
      <div className="font-hubballi">
        <div className="font-hubballi w-full">
          <OutNavBar />
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:mr-10 mr-20 ml-20 font-hubballi">
            <h1 className="font-bold text-xl lg:text-3xl xl:text-4xl mb-4">
              As a members’ life and priority changes, so should their saving
              priorities.
            </h1>
            <h1 className="text-base lg:text-xl xl:text-2xl mb-4">
              Mango creates a customized employee savings benefit to build member
              financial wellness. By aligning their life-stages and financial
              profile.
            </h1>
            <h1 className="text-base lg:text-xl xl:text-2xl">
              Members will be able to apportion savings between long-term,
              short-term, and group risk (death and disability).
            </h1>
          </div>

          <img
            src={img}
            alt="Image"
            className="w-full lg:w-1/3 h-auto lg:h-1/4 mt-4 lg:mt-0"
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row items-center lg:px-4">
          <img
            src={img1}
            alt="Image"
            className="w-full lg:w-1/3 h-auto lg:h-1/4 ml-8 mt-4 lg:ml-0 lg:mt-0"
          />
          <div className="lg:mr-10 mr-4 lg:ml-20 font-hubballi">
            <h1 className="mb-2 text-lg lg:text-xl xl:text-2xl lg:mb-4">
              FUTURE NEXT-----------------
            </h1>
            <h1 className="lg:text-3xl xl:text-4xl font-bold mb-4">About Us</h1>
            <p className="text-base lg:text-xl xl:text-2xl">
              At StaffSense, we solidly endeavor towards making an incentive for
              our clients and that we associate. StaffSense is the leading and
              best software company in Kerala dealing with solutions like ERP,
              e-commerce, mobile application and so on. This goal is reflected in
              the entirety of our solutions- every one of them standing tall as an
              industry signal in its classification, consistently conveying worth
              to our clients, for many years.
            </p>
            <div className="flex items-center">
              <span className="mr-2">Learn more</span>
              <AiOutlineArrowRight className="" />
            </div>
          </div>
        </div>

        <div className="font-hubballi px-4 lg:px-0 text-center mt-10">
          <div className="text-center font-extrabold text-3xl lg:text-4xl xl:text-5xl">
            Our Features
          </div>
          <div>
            <h1 className="text-center">
              We can offer to our solutions to our current and forthcoming clients
              so both our current and future client can pursue an educated
              speculation choice.
            </h1>
          </div>
          <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
            {/* Card 1 */}
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
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
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
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
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
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
        <div className="font-hubballi px-4 lg:px-0 text-center mt-10">
          <div className="text-center font-extrabold text-3xl lg:text-4xl xl:text-5xl">
            Our Leaders
          </div>
          <div>
            <h1 className="text-center">
              "As a data solutions partner to companies, we've focused on creating
              value for our clients"
            </h1>
          </div>
          <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
            {/* Card 1 */}
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Vishnu Krishnakumar
                </h5>
                <p>Founder</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <AiFillInstagram className="text-2xl" />
                  <AiFillLinkedin className="text-2xl" />
                  <BiLogoFacebookCircle className="text-2xl" />
                  <AiFillTwitterCircle className="text-2xl" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Vishnu Krishnakumar
                </h5>
                <p>CEO</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <AiFillInstagram className="text-2xl" />
                  <AiFillLinkedin className="text-2xl" />
                  <BiLogoFacebookCircle className="text-2xl" />
                  <AiFillTwitterCircle className="text-2xl" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img className="w-36 h-36" src={profile} alt="" />
              </div>
              <div className="p-4">
                <h5 className="text-blue-gray text-xl font-semibold mb-2">
                  Vishnu Krishnakumar
                </h5>
                <p>SEO Expert</p>
                <div className="flex justify-center items-center space-x-4 cursor-pointer">
                  <AiFillInstagram className="text-2xl" />
                  <AiFillLinkedin className="text-2xl" />
                  <BiLogoFacebookCircle className="text-2xl" />
                  <AiFillTwitterCircle className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* .......................................................... */}
        <div className="flex font-hubballi h-[600px] mt-8 bg-bgColor">
          <div className="w-1/2 p-4">
            <img
              src={b1}
              alt="User Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-1/2 p-4">
            <h1 className="text-center font-extrabold text-2xl lg:text-3xl xl:text-5xl mt-6">
              Our Service Approach
            </h1>
            <p className="p-10 font-thin text-1xl lg:text-1xl xl:text-2xl">
              Our approach in handling a project is designed in a flow that can
              ensure the requirement of the client is fulfilled intact.
            </p>
            <div className="flex flex-col cursor-pointer">
              <div className="flex justify-between bg-white  h-16">
                <p className="p-4 text-2xl">Develop a Concept</p>
                <BiDownArrow className="mr-8 mt-6" />
              </div>
              <div className="flex justify-between bg-white mt-6 h-16">
                <p className="p-4 text-2xl">Build and Evolve</p>
                <BiDownArrow className="mr-8 mt-6" />
              </div>
              <div className="flex justify-between bg-white mt-6 h-16">
                <p className="p-4 text-2xl">Implement</p>
                <BiDownArrow className="mr-8 mt-6" />
              </div>
            </div>
          </div>
        </div>
        {/* ................................................... */}
        <div className="flex font-hubballi h-[600px] mt-0 bg-bgColor">
          <div className="w-1/2 p-4">
            <h1 className="text-center font-extrabold text-2xl lg:text-3xl xl:text-5xl mt-6">
              Announcements
            </h1>
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex flex-col p-20">
                <div className="mt-5 flex items-center">
                  <FaStar className="mr-2" />
                  <h1 className="text-3xl"> {announcement.event}</h1>
                </div>
                <p className="p-2 ml-7 text-2xl"> {announcement.note}</p>
              </div>
            ))}
          </div>
          <div className="w-1/2 p-4">
            <img
              src={b2}
              alt="User Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* ................................................... */}
        <div className="h-[200px] mt-10">
          <h1 className="text-3xl m-20 p-10">OUR CLIENTELE</h1>
        </div>
        <footer className="relative w-full">
          <div className="mx-auto w-full max-w-7xl px-8">
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
        </footer>
      </div>
    </>
  );
}

export default OutHomePage;
