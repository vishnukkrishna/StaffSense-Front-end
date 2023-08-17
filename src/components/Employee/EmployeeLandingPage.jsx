import React from "react";
import InNavList from "../NavBar/InNavList";
import img1 from "../../images/image2.png";
import image1 from "../../images/header-smartphone.png";
import image2 from "../../images/Contactless.png";
import image3 from "../../images/Customer service.png";
import b2 from "../../images/b2.png";
import logo from "../../images/Logo.png";

import { AiOutlineArrowRight } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

import { Button } from "@material-tailwind/react";

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

function EmployeeLandingPage() {
  return (
    <div className="font-hubballi">
      <InNavList />
      <div className="flex flex-col-reverse lg:flex-row items-center lg:px-4 mt-10">
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
      {/* .............................................. */}
      <div className="font-hubballi px-4 lg:px-0 text-center mt-10">
        <div className="text-center font-extrabold text-3xl lg:text-4xl xl:text-5xl">
          Our Services
        </div>
        <div>
          <h1 className="text-center">
            "As a data solutions partner to companies, we've focused on creating
            value for our employees"
          </h1>
        </div>
        <div className="flex flex-col space-y-6 mt-10 lg:space-y-0 lg:flex-row lg:justify-center lg:space-x-4">
          {/* Card 1 */}
          <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
            <div className="p-4">
              <h5 className="text-blue-gray text-xl font-semibold mb-2">
                Hall Booking
              </h5>
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img className="w-50 h-50 mt-4" src={image1} alt="" />
              </div>
              <Button className="bg-customColor mt-4">
                Book your Meeting Room
              </Button>
              <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
            <div className="p-4">
              <h5 className="text-blue-gray text-xl font-semibold mb-2">
                Visitor Registration
              </h5>
              <div className="p-4 bg-gray-100 border-t flex justify-center items-center">
                <img className="w-50 h-50" src={image2} alt="" />
              </div>
              <Button className="bg-customColor">Register your visitor</Button>
              <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full lg:w-96 border rounded-lg overflow-hidden shadow-lg bg-gray-100">
            <div className="p-4">
              <h5 className="text-blue-gray text-xl font-semibold mb-2">
                Requests & Complaints
              </h5>
              <div className="p-4 bg-gray-100 mt-3 border-t flex justify-center items-center">
                <img className="w-full h-5/6 mt-4" src={image3} alt="" />
              </div>
              <Button className="bg-customColor mt-14">
                Register your Complaints
              </Button>
              <div className="flex justify-center items-center space-x-4 cursor-pointer"></div>
            </div>
          </div>
        </div>
        {/* ................................................... */}
        {/* Announcement blocks */}
        <div className="flex font-hubballi mt-10 bg-bgColor flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-1/2 p-4">
            <div className="text-center">
              <h1 className="font-extrabold text-2xl lg:text-3xl xl:text-5xl">
                Announcements
              </h1>
            </div>
            <div className="flex flex-col p-6 md:p-10 lg:p-20">
              <div className="mt-5 flex items-center">
                <FaStar className="mr-2" />
                <h1 className="text-3xl">Tech Fest</h1>
              </div>
              <p className="p-2 text-2xl">IT tech fest on 20th July</p>

              <div className="mt-5 flex items-center">
                <FaStar className="mr-2" />
                <h1 className="text-3xl">Cultural Events</h1>
              </div>
              <p className="p-2 ml-7 text-2xl">IT tech fest on 20th July</p>

              <div className="mt-5 flex items-center">
                <FaStar className="mr-2" />
                <h1 className="text-3xl">Onam Celebrations</h1>
              </div>
              <p className="p-2 ml-7 text-2xl">
                Hi team experts, we are planning to celebrate Onam
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <img
              src={b2}
              alt="User Uploaded Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* ................................................... */}
      <footer className="relative w-full mt-10">
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
  );
}

export default EmployeeLandingPage;
