export interface POI {
    xCoord:number,
    yCoord:number,
    name:string,
    color:string,
};

export default class MapClass {
    #backgroundImage64:Base64URLString;
    #POIs:POI[];
    #mapName:string;

    constructor(backgroundImage:Base64URLString, POIs:POI[], mapName:string) {
        this.#backgroundImage64 = backgroundImage;
        this.#POIs = POIs;
        this.#mapName = mapName;
    };

    get name():string {
        return this.#mapName;
    };

    get backgroundImage():string {
        return this.#backgroundImage64;
    };

    addPOI(xCoord:number, yCoord:number, name:string, color:string):void {
        this.#POIs.push({
            xCoord: xCoord,
            yCoord: yCoord,
            name: name,
            color: color,
        });
    };

    editPOI(oldName:string, newXCoord?:number, newYCoord?:number, newColor?:string, newName?:string):void {
        
        //first find the POI we are editing
        let POIToEdit:POI = this.#POIs.find((element) => {
            if (element.name === oldName) {
                return true;
            }
            else return false;
        }) as POI;

        //save the index of the POI for later
        const index:number = this.#POIs.indexOf(POIToEdit);

        //apply the changes
        if (newXCoord) {
            POIToEdit.xCoord = newXCoord;
        };
        if (newYCoord) {
            POIToEdit.yCoord = newYCoord;
        };
        if (newColor) {
            POIToEdit.color = newColor;
        };
        if (newName) {
            POIToEdit.name = newName;
        };

        //now update the POI array with the newly edited POI
        this.#POIs[index] = POIToEdit;
    };

    deletePOI(name:string):void {

        //find the deletion index
        const deletionIndex:number = this.#POIs.findIndex((element) => {
            if (element.name === name) {
                return true;
            }
            else return false;
        });

        if (deletionIndex >= 0) {

            //if the element to delete was found
            this.#POIs.splice(deletionIndex, 1);
        }
        else {

            //if the element to delete was not found
            throw new Error('Could not find the POI to delete: not in POI array');
        };
    };

    convertToObject():{name:string, backgroundImage64:string, POIs:POI[]} {
        return ({
            name: this.#mapName,
            backgroundImage64: this.#backgroundImage64,
            POIs: this.#POIs,
        });
    };
};