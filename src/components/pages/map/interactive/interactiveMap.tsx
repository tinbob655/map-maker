import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import PageHeader from '../../../multiPageComponents/pageHeader';
import MapClass from '../mapClass';
import type { formattedMapType } from '../mapPage';
import './interactiveMapStyle.scss';
import CreatePOIPopup from './createPOIPopup';
import POIMarker from './POIMarker';

let [oldX, oldY]:[number, number] = [0, 0];
let [deltaX, deltaY]:[number, number] = [0, 0];
let transformationMatrix:[number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];

export default function InteractiveMap():React.ReactElement {
    const location:{state:{formattedMap:formattedMapType}} = useLocation();

    const [userMap, setUserMap] = useState<MapClass>();
    const [POIPopup, setPOIPopup] = useState<React.ReactElement>(<></>);
    const [POIMarkers, setPOIMarkers] = useState<React.ReactElement[]>([]);

    //set userMap
    useEffect(() => {
        const tempMap = location.state.formattedMap;
        if (tempMap) {
            setUserMap(new MapClass(tempMap.backgroundImage64, tempMap.POIs, tempMap.name));
        }
        else throw new Error(`Could not find map to render. Received state of: ${location.state}`);
    }, []);

    //set eventListeners
    useEffect(() => {
        (document.getElementById('mapImage') as HTMLImageElement).addEventListener('wheel', (event:WheelEvent) => {mapZoomed(event), {active: true}})
    });

    //create markers for each POI when the map is changed
    useEffect(() => {
        let tempPOIMarkersHTML:React.ReactElement[] = [];
        userMap?.POIs.forEach((POI) => {
            tempPOIMarkersHTML.push(
                <POIMarker color={POI.color} xCoord={POI.xCoord} yCoord={POI.yCoord} name={POI.name} parentMapName={userMap.name} />
            );
        });
        setPOIMarkers(tempPOIMarkersHTML)
    }, [userMap]);

    return (
        <React.Fragment>
            <PageHeader title={userMap?.name || ''} subtitle="View your interactive map" />
            <div id="mapWrapper">
                <img id="mapImage" style={{transform: `matrix(${transformationMatrix})`}} src={userMap?.backgroundImage} onDragStart={(event) => {dragStarted(event)}} onDrag={(event) => {mapDragged(event)}} onClick={(event) => {addPOI(event)}}/>
                {POIMarkers}
            </div>
            {POIPopup}
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

    function mapZoomed(event:WheelEvent):void {
        
        //calculate the transformation
        const scrollAmount = event.deltaY;
        transformationMatrix[0] -= (scrollAmount / 1000);

        //apply the transformation if we are within certain bounds
        const bounds = [0.1, 10];
        if (transformationMatrix[0] >= bounds[0] && transformationMatrix[0] <= bounds[1]) {

            //we are good to apply the transformation
            transformationMatrix[3] = transformationMatrix[0];
            (document.getElementById('mapImage') as HTMLImageElement).style.transform = `matrix(${transformationMatrix})`;
            event.preventDefault();
        }
        else {

            //we are not good to apply the transformation, roll back the changes to transformationMatrix
            transformationMatrix[0] = transformationMatrix[3];
        };
    };

    function addPOI(event:React.MouseEvent):void {
        event.preventDefault();

        //clear any existing popups
        setPOIPopup(<></>);

        //calculate the distance from the top left of the map that the POI was added
        const target = event.target as typeof event.target & {
            getBoundingClientRect: Function
        };
        const [xCoordClick, yCoordClick] = [event.clientX, event.clientY];
        interface rect {
            x: number,
            y: number,
            width: number,
            height: number,
            top: number,
            bottom: number,
            left: number,
            right: number,
        };
        const rect: rect = target.getBoundingClientRect();
        const [xMargin, yMargin] = [rect.x, rect.y];

        //the distance from the side of the image to where the user has clicked will be the click coord - distance to edge of screen
        const [xCoord, yCoord] = [xCoordClick - xMargin, yCoordClick - yMargin];

        //open the POI creation popup
        setPOIPopup(<CreatePOIPopup userMap={userMap as MapClass} POICoords={[xCoord, yCoord]} popupCoords={[xCoordClick, yCoordClick]} closeFunc={() => {setPOIPopup(<></>)}} />);
    };
};