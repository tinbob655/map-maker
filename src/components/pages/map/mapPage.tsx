import React, {useEffect, useState} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader';
import MapClass from './mapClass';
import './mapStyles.scss';
import createNewMap from './createNewMap';
import deleteMap from './deleteMap';
import xIcon from '../../../assets/buttons/x-icon.svg';
import { Link } from 'react-router';
import getMaps from './getMaps';

export interface formattedMapType {
    name: string,
    backgroundImage64:string,
    POIs: {
        name: string,
        xCoord: number,
        yCoord: number,
        color: string,
    }[],
}[];

export default function MapPage():React.ReactElement {

    const [userMaps, setUserMaps] = useState<MapClass[]>([]);
    const [mapsHTML, setMapsHTML] = useState<React.ReactElement[]>([]);
    const [refresh, setRefresh] = useState<number>(Math.random());

    //get any saved user maps on page load
    useEffect(() => {
        if (localStorage.getItem('savedMaps')) {

            //the user has maps saved, get them
            let tempMaps:MapClass[] = getMaps();
            setUserMaps(tempMaps);
            setRefresh(Math.random());
        };
    }, []);

    //will fire when refresh changes
    useEffect(() => {

        //keep mapsHTML up to date
        //only run if the user has maps
        if (userMaps.length > 0) {
            let tempMapsHTML:React.ReactElement[] = [];
            userMaps.forEach((map) => {
                tempMapsHTML.push(
                    <React.Fragment>
                        <table>
                            <thead>
                                <tr>
                                    <td style={{width: '80%'}}>
                                        <Link to="/interactiveMap" state={{formattedMap: map.convertToObject()}} >
                                            <h3 className="alignRight">
                                                -{map.name}
                                            </h3>
                                        </Link> 
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setUserMaps(deleteMap(map.name, userMaps));
                                            setRefresh(Math.random())
                                            }} type="button">
                                            <img src={xIcon} className="buttonImage" />
                                        </button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </React.Fragment>
                );
            });
            setMapsHTML(tempMapsHTML);
        }
        else {
            setMapsHTML([]);
        };
    }, [refresh]);

    return (
        <React.Fragment>
            <PageHeader title="Your maps" subtitle="View, edit and save your maps" />
            <h2 className="alignRight">
                Load an existing map
            </h2>

            {/*user's maps section*/}
            {userMaps.length > 0 ? (
                <React.Fragment>

                    {/*there are maps which the user has saved, show the user their maps*/}
                    {mapsHTML}
                </React.Fragment>
            ) : (
                <React.Fragment>

                    {/*the user does not have any maps, tell them this*/}
                    <p className="alignRight">
                        You currently don't have any maps saved. To create a new map, use the section below.
                    </p>
                </React.Fragment>
            )}

            <div className="dividerLine"></div>

            {/*create new map section*/}
            <h2 className="alignLeft">
                Create a new map
            </h2>
            <p className="alignLeft">
                Creating a new map is a very quick process and will require you to upload an image for us to use as the map background. This image will not be saved on our servers and we will not be able to view it.
            </p>
            <button onClick={() => {document.getElementById('createNewMapFormWrapper')?.classList.toggle('shown')}} type="button">
                <h3>
                    Click here to get started!
                </h3>
            </button>
            <div id="createNewMapFormWrapper">
                <form id="createNewMapForm" onSubmit={(event) => {
                    createNewMap(event, userMaps).then((res) => {
                        setUserMaps(res);
                        setRefresh(Math.random());
                    })}}>
                    <p className="aboveInput">
                        Map name:
                    </p>
                    <input type="text" name="mapName" placeholder="Enter map name..." required/>
                    <p className="aboveInput">
                        Map image:
                    </p>
                    <label className="fileUploadWrapper">
                        <input type="file" accept="image/png" name="backgroundImage" required/>
                        Click here to choose file:
                    </label>

                    <input type="submit" name="submit" value="Create map" />
                </form>
            </div>
        </React.Fragment>
    );
};