import React from 'react';
import './NavBar.css';

const navBar = (props) => {
    return (
        <section id="unav">
            <div className="container">
                <nav>
                    <ul>
                        <li><img src={"https://support.t-mobile.com/___sbsstatic___/sftp-sync/images/tmo-logo-sm.png"}
                                alt={"T-Moile"}/></li>
                        <li><a href="/community/account" title="Account">Account</a></li>
                        <li><a href="/community/coverage" title="Coverage">Coverage</a></li>
                        <li><a href="/community/deals" title="Deals">Deals</a></li>
                        <li><a href="/community/phones-tablets-devices" title="Devices">Devices</a></li>
                        <li><a href="/community/business" title="T-Mobile For Business">For Business</a></li>
                        <li><a href="/community/plans-services" title="Plans &amp; Services">Plans &amp; Services</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
};

export default navBar;