import * as appConfig from "./features/config/appConfig";


export function initApp(): Promise<void> {
    return new Promise((resolve, reject) => {
        Promise.all([appConfig.loadConfig()]).then((values) => {
            resolve();
        }).catch(() => {
            reject();
        });
    });
}

