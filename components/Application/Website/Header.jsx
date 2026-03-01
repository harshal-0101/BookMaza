"use client";

import React, { useState } from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaUser, FaShoppingBag, FaHeart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import "./Header.css";
import Image from "next/image";
import logo from "../../images/PUSTAK-MAZA-LOGO.png";
import { About } from '@/routes/WebsiteRoute';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header-container">
      <div className="navbar">

        {/* TOP BAR */}
        {/* <div className="top-container">
          <div className="contactnumber">+91 9876543210</div>
          <div className="social-media">
            <Link href="#"><FaInstagram /></Link>
            <Link href="#"><FaFacebook /></Link>
            <Link href="#"><FaTwitter /></Link>
            <Link href="#"><FaLinkedin /></Link>
          </div>
        </div> */}

        <hr />

        {/* MAIN NAV */}
        <div className="main-nav">
          <div className="logo">
            <Image src={logo} alt="logo" className="logoimg" />
          </div>

          <div className="search-book">
            <input type="search" placeholder="Search books.." />
            <button className="SearchBTN"><FaSearch /></button>
          </div>

          <div className="lists desktop-only">
            <ul>
              <li><Link className="listbtn" href="/my-account"><FaUser /> <span className='listbtntext'>Account</span></Link></li>
              <li><Link className="listbtn" href="/checkout"><FaShoppingBag /> <span className='listbtntext'>Cart</span></Link></li>
              <li><Link className="listbtn" href="/wishlist"><FaHeart /> <span className='listbtntext'>Wishlist</span></Link></li>
            </ul>
          </div>

          {/* HAMBURGER */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* PAGE MENU */}
        <div className={`page-list ${menuOpen ? "active" : ""}`}>
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><Link href={About}>ABOUT US</Link></li>
            <li><Link href="/booklist">BOOKS</Link></li>
            <li><Link href="/new-release">NEW RELEASE</Link></li>
            <li><Link href="/contact-us">CONTACT US</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Header;
