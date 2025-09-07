import type MapClass from "../mapClass";
import saveMaps from "../saveMaps";

export default function deleteMap(mapName:string, userMaps:MapClass[]):MapClass[] {

    //find the map to delete
    const deleteIndex:number = userMaps.findIndex((map) => {
        if (map.name === mapName) {
            return true;
        }
        else return false;
    });

    //make sure the map to delete was found
    if (deleteIndex === -1) {
        throw new Error('Could not find map to delete');
    };

    userMaps.splice(deleteIndex, 1);
    
    //save and return the new maps array
    saveMaps(userMaps);
    return userMaps;
};