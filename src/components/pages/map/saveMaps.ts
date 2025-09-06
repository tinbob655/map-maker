import type MapClass from "./mapClass";
import type { formattedMapType } from "./mapPage";

export default function saveMaps(mapArray:MapClass[]):void {

    //need to convert each element to a string
    let formattedMaps:formattedMapType[] = [];
    mapArray.forEach((map) => {
        formattedMaps.push(map.convertToObject());
    });

    //finally, save the maps
    localStorage.setItem('savedMaps', JSON.stringify(formattedMaps));
};