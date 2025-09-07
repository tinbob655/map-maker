import MapClass from "../mapClass";
import imgToBase64 from "../../../../functions/imgToBase64";
import saveMaps from "./saveMaps";

export default async function createNewMap(event:React.FormEvent, userMaps:MapClass[]):Promise<MapClass[]> {
    event.preventDefault();

    //get the data from the form event
    const target = event.target as typeof event.target & {
        mapName: {value:string},
        backgroundImage: {files:[File]},
    };

    //generate newMap
    let newMap:MapClass;
    const res = await imgToBase64(target.backgroundImage.files[0])

    newMap = new MapClass(res, [], target.mapName.value);

    //add the new map to userMaps and update the frontend
    let oldMaps = userMaps;
    oldMaps.push(newMap);

    //save changes to map to localStorage
    saveMaps(oldMaps);

    return oldMaps;
};