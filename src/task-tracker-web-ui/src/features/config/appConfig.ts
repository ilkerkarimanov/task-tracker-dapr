import {AppConfigModel} from "./appConfig.model";
import axios from "axios";

let appConfig: AppConfigModel = { daprSidecarUrl: "", daprApiId: "", webApiGwUrl: '' };

async function fetchConfig(): Promise<AppConfigModel> {
    try {
        const result = await axios.get<AppConfigModel>('/assets/app.config.json');
        console.log(result.data);
        return Promise.resolve<AppConfigModel>(result.data);
    }
    catch (error) {
        console.log('Error:', error);
        return Promise.resolve<AppConfigModel>({ daprSidecarUrl: '', daprApiId: '', webApiGwUrl: ''});
    }
}
export async function loadConfig(): Promise<void>
{
    appConfig = await fetchConfig();
}
export function getConfig(): AppConfigModel {
    return appConfig;
}