import MapClass from "./mapClass";
import type { formattedMapType } from "./mapPage";

export default function getMaps():MapClass[] {

    if (localStorage.getItem('savedMaps')) {
        let storageMaps:formattedMapType[] = JSON.parse(localStorage.getItem('savedMaps') as string);
        let maps:MapClass[] = [];
        storageMaps.forEach((storageMap) => {
            maps.push(new MapClass(storageMap.backgroundImage64, storageMap.POIs, storageMap.name));
        });

        return maps;
    }
    else return [];
}