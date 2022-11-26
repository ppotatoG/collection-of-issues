import { VscNewFolder } from "react-icons/vsc";
import { HiUserCircle } from "react-icons/hi";
import React from "react";

import 'styles/header.scss';

const header = () => {
    return (
        <header className="header">
            <div className="inner">
                <h1><a href="./" rel="noopener noreferrer">collection of issues</a></h1>
                <ul>
                    <li><a href="./search" rel="noopener noreferrer"><HiUserCircle /></a></li>
                    <li><a href="./search" rel="noopener noreferrer"><VscNewFolder /></a></li>
                </ul>
            </div>
        </header>
    )
}

export default header;