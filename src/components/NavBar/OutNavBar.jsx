import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import logo from "../../images/Logo.png";
import { useNavigate } from "react-router-dom";
import { BsBell } from 'react-icons/bs'
import { Badge } from "@material-tailwind/react";


function OutNavBar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const handleClick = () => {
    navigate("/user");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 drop-shadow-3xl ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center transition-transform duration-300 hover:translate-x-2">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center transition-transform duration-300 hover:translate-x-2">
          Company
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#feature" className="flex items-center transition-transform duration-300 hover:translate-x-2">
          Our Features
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-2xl font-fontHubballi"
      >
        <a href="#" className="flex items-center transition-transform duration-300 hover:translate-x-2">
          About us
        </a>
      </Typography>
    </ul>
  );
  return (
    // <div>
    <div className="pt-24 bg-newColor">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="cursor-pointer">
            <a href="#">
              <img
                src={logo}
                alt="Logo"
                className="w-1/2 h-1/2 max-w-full max-h-full md:w-60 sm:h-40 sm:w-20 md:h-15 xl:w-56 xl:h-14 flex items-center transition-transform duration-300 hover:translate-x-4"
              />
            </a>

          </div>

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="mr-3 cursor-pointer hidden lg:block">
              <Menu
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 25 },
                }}
              >
                <MenuHandler>
                  <div>
                    <Badge content={0} className="" max={999} color="red">
                      <BsBell className="w-7 h-7 text-customColor transition-transform duration-300 ease-in-out transform hover:scale-110" />
                    </Badge>
                  </div>
                </MenuHandler>
                <MenuList className="mt-5">
                  <MenuItem>Menu Item 1</MenuItem>
                  <MenuItem>Menu Item 2</MenuItem>
                </MenuList>
              </Menu>
            </div>

            <Button
              size="sm"
              className="hidden lg:inline-block rounded-full w-36 bg-customColor h-12 text-lg drop-shadow-md transition-transform duration-300 ease-in-out transform hover:scale-110"
              onClick={handleClick}
            >
              <span>Login Now</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w- text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <Button
            size="sm"
            fullWidth
            className="mb-2 bg-customColor drop-shadow-md"
            onClick={handleClick}
          >
            <span>Login Now</span>
          </Button>
        </MobileNav>
      </Navbar>
    </div>
    // </div>
  );
}

export default OutNavBar;
