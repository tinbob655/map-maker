import React from 'react';
import '../../scss/footer.scss';
import logo from '../../assets/logo.svg';

export default function Footer():React.ReactElement {

    return (
        <React.Fragment>
            <div id="footer">
                <div className="dividerLine"></div>
                <img src={logo} id="footerImage" />
                <p id="footerText">
                    Website created by <a href="https://github.com/tinbob655/map-maker"><u>Tinbob655</u></a>.
                </p>
            </div>
        </React.Fragment>
    );
};