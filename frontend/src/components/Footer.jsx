import React, { useState } from "react";
import ContactUs from "./ContactUs";

function Footer() {
  const [showContactForm, setShowContactForm] = useState(false);

  const toggleContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex items-center bg-white border-t border-gray-100 dark:bg-gray-950 dark:border-gray-800">
      <div className="container flex md:flex-row items-center justify-center md:justify-between gap-4 px-4 py-2 md:gap-6 md:px-6">
        <p className="text-[8px] sm:text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
          Made with love by the © Coding Club. All rights reserved.
        </p>
        <div className="flex items-center gap-4 md:gap-2">
          <div className="text-[7px] md:text-sm font-medium rounded-md dark:text-gray-50">
            <button onClick={toggleContactForm}>Contact Us</button>
          </div>
        </div>
      </div>
      {showContactForm && <ContactUs />}
    </footer>
  );
}

export default Footer;
