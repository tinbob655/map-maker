import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import PageHeader from '../../../multiPageComponents/pageHeader';
import MapClass from '../mapClass';
import type { formattedMapType } from '../mapPage';
import './interactiveMapStyle.scss';

export default function InteractiveMap():React.ReactElement {
    const location:{state:{formattedMap:formattedMapType}} = useLocation();

    const [userMap, setUserMap] = useState<MapClass>();

    //set userMap
    useEffect(() => {
        const tempMap = location.state.formattedMap;
        if (tempMap) {
            setUserMap(new MapClass(tempMap.backgroundImage64, tempMap.POIs, tempMap.name));
        }
        else throw new Error(`Could not find map to render. Received state of: ${location.state}`);
    }, []);

    return (
        <React.Fragment>
            <PageHeader title={userMap?.name || ''} subtitle="View your interactive map" />
            <div id="mapWrapper">
                <img id="mapImage" src={userMap?.backgroundImage} />
            </div>
        </React.Fragment>
    );
};