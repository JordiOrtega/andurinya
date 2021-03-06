import React from 'react';

const header = (props) => (
    <header id="header">
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper dark-primary-color">
                    <a href="" className="brand-logo center truncate">{props.title}</a>
                    <ul className="left hide-on-med-and-down">
                        <li><a href="" className="white-text"><i className="material-icons left">autorenew</i></a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
);

export default header;