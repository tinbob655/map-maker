import React, {useEffect, useState} from 'react';
import PageHeader from '../../multiPageComponents/pageHeader';
import MapClass from './mapClass';
import './mapStyles.scss';

export default function MapPage():React.ReactElement {

    const [userMaps, setUserMaps] = useState<MapClass[]>([]);

    //get any saved user maps on page load
    useEffect(() => {

        //function to fetch the user's saved maps
        async function getMaps():Promise<MapClass[]> {

            //attempt to find user's maps
            try {
                const userMaps = await fetch('http://localhost:5000/api/getMaps');
                const data = await userMaps.json();
                return data;
            } catch(error) {

                //if there was a server error
                throw error;
            };
        };

        getMaps().then((maps) => {

            //check if the user actually had any maps saved
            if (maps.length > 0) {

                setUserMaps(maps);
            };
        });
    }, []);

    function getMapsHTML():React.ReactElement[] {

        //only run if the user has maps saved
        if (userMaps.length > 0) {
            let tempMapsHTML:React.ReactElement[] = [];
            userMaps.forEach((map) => {
                tempMapsHTML.push(
                    <p>
                        -{map.name}
                    </p>
                )
            })
            return tempMapsHTML;
        }
        else return [<></>];
    };

    function createNewMap(event:React.FormEvent) {
        event.preventDefault();

        //get the data from the form event
        const target = event.target as typeof event.target & {
            mapName: {value:string},
            backgroundImage: {value:string},
        };
        const mapName:string = target.mapName.value;
        const backgroundImage:string = target.backgroundImage.value;
    };

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
                    {getMapsHTML()}
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
                <form id="createNewMapForm" onSubmit={(event) => {createNewMap(event)}}>
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