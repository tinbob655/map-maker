import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import PageHeader from '../../../multiPageComponents/pageHeader';
import MapClass from '../mapClass';
import type { formattedMapType } from '../mapPage';
import './interactiveMapStyle.scss';

let [oldX, oldY]:[number, number] = [0, 0];
let [deltaX, deltaY]:[number, number] = [0, 0];
let transformationMatrix:[number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];

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
                <img id="mapImage" style={{transform: `matrix(${transformationMatrix})`}} src={userMap?.backgroundImage} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {mapDragged(event)}} />
            </div>
        </React.Fragment>
    );

    function dragStarted(event:React.DragEvent):void {
        [oldX, oldY] = [event.clientX, event.clientY];
    };

    function mapDragged(event:React.DragEvent) {

        //calculate the change in mouse position
        const [mouseX, mouseY] = [event.clientX, event.clientY];
        [deltaX, deltaY] = [mouseX - oldX, mouseY - oldY];
        [oldX, oldY] = [mouseX, mouseY];

        //if the drag is stopped then stop the map from teleporting
        if (mouseX === 0 || mouseY === 0) {
            return;
        };

        //apply the translation
        transformationMatrix[4] += deltaX;
        transformationMatrix[5] += deltaY;
        (document.getElementById('mapImage') as HTMLImageElement).style.transform = `matrix(${transformationMatrix})`;
    };
};