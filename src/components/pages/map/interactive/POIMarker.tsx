import React, {useState} from 'react';
import binIcon from '../../../../assets/buttons/bin-icon.svg';
import xIcon from '../../../../assets/buttons/x-icon.svg';
import getMaps from '../mapStorageAPI/getMaps';
import saveMaps from '../mapStorageAPI/saveMaps';

interface params {
    xCoord: number,
    yCoord: number,
    name: string,
    color: string,
    parentMapName: string,
}

export default function POIMarker({xCoord, yCoord, name, color, parentMapName}:params):React.ReactElement {

    const [showEditPOIWindow, setShowEditPOIWindow] = useState<boolean>(false);

    return (
        <React.Fragment>
            <button onClick={() => {setShowEditPOIWindow(true)}} type="button">
                <div className="POIMarkerWrapper" style={{backgroundColor: color, left: xCoord, top: yCoord}}>
                    <p className="POIMarkerText">
                        -{name}
                    </p>
                </div>
            </button>
            {showEditPOIWindow ? (
                <React.Fragment>

                    {/*the edit POI window*/}
                    <div className="editPOIWindowWrapper" style={{left: xCoord + 50, top: yCoord}}>

                        {/*close popup button*/}
                        <button onClick={() => {setShowEditPOIWindow(false)}} type="button">
                            <img className="buttonImage" style={{position: 'absolute', width: '15%', right: '1px', top: '1px'}} src={xIcon} />
                        </button>

                        <h2>
                            Edit POI
                        </h2>

                        <div className="dividerLine"></div>
                        <form id="editPOIForm" onSubmit={(event) => {editPOIFormSubmitted(event)}}>
                            <p className="aboveInput">
                                Change name:
                            </p>
                            <input name="name" type="text" placeholder="New name..." />

                            <p className="aboveInput">
                                Change colour:
                            </p>
                            <input type="color" name="color" defaultValue={color} placeholder="New colour..." />
                            <input type="submit" value="Submit" />
                        </form>

                        <button onClick={() => {deletePOI()}} type="button">
                            <img src={binIcon} className="buttonImage" style={{marginBottom: '10px'}} />
                        </button>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                </React.Fragment>
            )}
        </React.Fragment>
    );

    function editPOIFormSubmitted(event:React.FormEvent) {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            color?: {value:string},
            name?: {value:string},
        };

        //only run if something was changes
        if (target.color || target.name) {

            let oldMaps = getMaps();
            const editIndex = oldMaps.findIndex((map) => {
                if (map.name === parentMapName) {
                    return true;
                }
                else return false;
            });
            if (editIndex < 0) throw new Error('Could not find POI to edit')

            //edit the POI
            oldMaps[editIndex].editPOI(name, undefined, undefined, target.color?.value || undefined, target.name?.value || undefined);
            saveMaps(oldMaps);

            //close the popup
            setShowEditPOIWindow(false);
        };
    };

    function deletePOI():void {
        let oldMaps = getMaps();

        //find the index of the current map
        const editIndex = oldMaps.findIndex((map) => {
            if (map.name === parentMapName) {
                return true;
            }
            else return false;
        });
        if (editIndex < 0) throw new Error('Could not find map to delete');

        //the map to edit exists, edit it
        oldMaps[editIndex].deletePOI(name);
        saveMaps(oldMaps);

        //close the popup
        setShowEditPOIWindow(false);
    };
};