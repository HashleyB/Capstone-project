import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressBook, faCaretUp, faCaretDown, faHome, faSun, faMoon, faWalking } from '@fortawesome/free-solid-svg-icons'; 
import { useLocation } from 'react-router-dom'; 

import styles from "./styles.module.css";

// eslint-disable-next-line react/prop-types
const Navbar = ({ toggleMode, isDarkMode }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const location = useLocation(); 
    
    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleModeToggle = () => {
      toggleMode(); 
    };

   
    const shouldDisplayDropdown = () => {
      return location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/logout';
    };
  
    return (
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn} onClick={handleDropdownToggle}>
              Ironhash Fitness
              <FontAwesomeIcon icon={isDropdownOpen ? faCaretUp : faCaretDown} />
            </button>
            {isDropdownOpen && shouldDisplayDropdown() && ( 
              <div className={styles.dropdown_content_vertical}>
                <a href="/"><FontAwesomeIcon icon={faHome} />Home</a>
                <a href="trainer-profile"><FontAwesomeIcon icon={faUser} /> Profile</a>
                <a href="/contacts"><FontAwesomeIcon icon={faAddressBook} /> Contacts</a>
                <a href="/logout"><FontAwesomeIcon icon={faWalking} />Logout</a>
              </div>
            )}
          </div>
          <button className={styles.mode_btn} onClick={handleModeToggle}>Toggle Mode
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </nav>
      </div>
    )
}

export default Navbar;
