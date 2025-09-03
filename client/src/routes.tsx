import React from 'react';
import {Routes, Route} from 'react-router';

//import all pages
import Home from './components/pages/home/home';
import Map from './components/pages/map/map';

export default function SiteRoutes():React.ReactElement {

    function getRoutes():React.ReactElement[] {
        let tempRoutesHTML:React.ReactElement[] = [];
        type routeArray = [string, React.ReactElement]
        const routes:routeArray[] = [
            ['/', <Home/>],
            ['/map', <Map/>],
        ];

        routes.forEach((route:routeArray) => {
            tempRoutesHTML.push(
                <Route path={route[0]} element={route[1]} key={route[0]} />
            );
        });

        return tempRoutesHTML;
    };

    return (
        <Routes>
            {getRoutes()}
        </Routes>
    );
};