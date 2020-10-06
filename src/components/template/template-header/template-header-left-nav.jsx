import React from 'react';
import { handleLeftMenuToggle } from '../../../utils/templateGlobals';

import { FaBars } from 'react-icons/fa';

export default () => {
  return (
    <>
      <ul className="template-left-nav" data-test="template-left-nav">
        <li
          className="display-m left-toggle"
          onClick={handleLeftMenuToggle}
          data-test="template-left-nav-toggle"
        >
          <i className="react-icon">
            <FaBars />
          </i>
        </li>
        <li className=" display-m branding">E2 Print Software</li>
      </ul>
    </>
  );
};
