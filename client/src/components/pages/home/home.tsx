import React from 'react';
import PageHeader from '../../multiPageComponents/pageHeader';
import { Link } from 'react-router';

export default function Home():React.ReactElement {

    return (
        <React.Fragment>
            <PageHeader title="Map Maker" subtitle="Make you own, custom maps"/>

            <h2 className="alignRight">
                Welcome to map maker
            </h2>
            <p className="alignRight">
                On this site you can upload your own image and have a map generated from it. The map will be fully intractable. You can then add map markers for important POIs and even save your work for later!
            </p>
            <div className="dividerLine"></div>
            <h2>
                Get started
            </h2>
            <Link to="/map">
                <h3>
                    Click here to get going!
                </h3>
            </Link>
        </React.Fragment>
    );
};