import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer class="bg-white  shadow  dark:bg-gray-800  bottom-0 w-full">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              scandiweb
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="https://scandiweb.com/terms-of-service"
                class="hover:underline me-4 md:me-6"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://scandiweb.com/privacy-policy"
                class="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://scandiweb.com/services/magento-demo"
                class="hover:underline me-4 md:me-6"
              >
                Magento 2 Demo Store
              </a>
            </li>
            <li>
              <a
                href="https://scandiweb.com/cookie-policy"
                class="hover:underline"
              >
                Manage Cookies
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
