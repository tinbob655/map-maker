import React from 'react';
import MapClass from '../mapClass';
import saveMaps from '../mapStorageAPI/saveMaps';
import getMaps from '../mapStorageAPI/getMaps';

interface params {
    userMap: MapClass,
    POICoords: [number, number],
    popupCoords: [number, number],
    closeFunc: Function,
};

export default function CreatePOIPopup({userMap, POICoords, popupCoords, closeFunc}:params):React.ReactElement {

    return (
        <React.Fragment>
            <div className="createPOIPopupWrapper" style={{left: popupCoords[0] + 10, top: popupCoords[1]}}>
                <h2>
                    Create POI:
                </h2>
                <div className="dividerLine"></div>
                <form id="createPOIPopupForm" onSubmit={(event) => {createPOI(event)}}>
                    <p className="aboveInput">
                        Name:
                    </p>
                    <input type="text" name="POIName" placeholder="Enter POI name..." />
                    <p>
                        Color:
                    </p>
                    <input type="color" name="POIColor" placeholder="Select color..." />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </React.Fragment>
    );

    function createPOI(event:React.FormEvent) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            POIName: {value: string},
            POIColor: {value: string},
        }

        //create the new poi
        userMap.addPOI(POICoords[0], POICoords[1], target.POIName.value, target.POIColor.value);

        //save the new map in localStorage
        let oldMaps:MapClass[] = getMaps();
        oldMaps[oldMaps.findIndex((map) => {
            if (map.name === userMap.name) {
                return true;
            }
            else return false;
        })] = userMap;
        saveMaps(oldMaps);

        //close this popup
        closeFunc();
    };
};