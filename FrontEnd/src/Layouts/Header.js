import React from "react";
import Clock from "../Components/common/Clock";
import logo from "../assets/images/logo-large.png";

const Header = () => {
  return (
    <React.Fragment>
      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="https://scandiweb.com" class="flex items-center">
              <img
                src={logo}
                class="mr-3 h-4 sm:h-6"
                alt="Flowbite Logo"
              />
              
            </a>

            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    <Clock />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
