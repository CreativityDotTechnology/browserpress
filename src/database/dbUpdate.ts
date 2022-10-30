import {AddWebsitePayload, DeleteWebsitePayload, SavePagesPayload, SaveStylePayload, StateUpdate, StateUpdateType, Website} from '../interfaces';
import Chance from 'chance';
import {db} from './db';

// Used for generating globally unique user IDs
const chance = new Chance();

// Returns a database update function
export const dbUpdate = async (action: StateUpdate) => {

        switch(action.type) {
            case StateUpdateType.ADD_WEBSITE:
                const addWebsitePayload = action.payload as AddWebsitePayload;
                const newWebsite: Website = {
                    id: chance.guid(),
                    name: addWebsitePayload.name,
                    createdDate: new Date(),
                    pages: []
                }
                try {
                   await db.websites.add(newWebsite);
                } catch (e: any) {
                    console.log(e);
                }
                break;
            case StateUpdateType.DELETE_WEBSITE:
                const deleteWebsitePayload = action.payload as DeleteWebsitePayload;
                try {
                    await db.websites.delete(deleteWebsitePayload.id);
                } catch (e: any) {
                    console.log(e);
                }
                break;
            case StateUpdateType.SAVE_STYLE:
                const saveStylePayload = action.payload as SaveStylePayload;
                try {
                    await db.websites.update(saveStylePayload.id, {
                        styleConfig: saveStylePayload.styleConfig
                    });
                } catch (e: any) {
                    console.log(e);
                }
                break;
            case StateUpdateType.SAVE_PAGES:
                const savePagesPayload = action.payload as SavePagesPayload;
                try {
                    await db.websites.update(savePagesPayload.id, {
                        pages: savePagesPayload.pages
                    });
                } catch (e: any) {
                    console.log(e);
                }
                break;
        }
    
}


