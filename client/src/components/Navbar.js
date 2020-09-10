import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper teal lighten-2">
        <a href="/notes" className="brand-logo">
            Notes
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li>
          <li>
            <NavLink to="/notes">Notes</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};
