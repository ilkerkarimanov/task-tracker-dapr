import {TaskModel} from "./task.model";
import {Guid} from "guid-typescript";
import {TaskCreateModel} from "./taskCreate.model";
import {TaskEditModel} from "./taskEdit.model";
import axios from "axios";
import * as TaskApiMapper from "./taskApiMapper";
import * as appConfig from "../config/appConfig";
import {AppConfigModel} from "../config/appConfig.model";
import app from "../../app";

export default class TaskAPI {

    private static asyncTimeoutInMS: number = 1000;
    private static initialTasks: TaskModel[] = [
        {
            taskId: Guid.parse('32bdb931-81b5-4ba8-9666-33a3b12184c6'),
            taskName: 'Task 1',
            taskCreatedBy: 'ilker.karimanov@hotmail.com',
            taskCreatedOn: new Date(),
            taskDueDate: new Date(),
            taskAssignedTo: 'ilker.karimanov@hotmail.com',
            isCompleted: false,
            isOverdue: false
        },
        {
            taskId: Guid.parse('33bdb931-81b5-4ba8-9666-33a3b12184c6'),
            taskName: 'Task 1',
            taskCreatedBy: 'ilker.karimanov@hotmail.com',
            taskCreatedOn: new Date(),
            taskDueDate: new Date(),
            taskAssignedTo: 'testme@hotmail.com',
            isCompleted: false,
            isOverdue: false
        },
    ];
    
    private static getAppConfig(): AppConfigModel {
        return appConfig.getConfig();
    }
    static async getTaskById(taskId: string): Promise<TaskModel> {
        return new Promise<TaskModel>(async (resolve) => {
            try {
                const appConfig = TaskAPI.getAppConfig();
                const serviceMethod = "api/tasks";
                
                //const url = `http://${appConfig.daprSidecarUrl}/v1.0/invoke/${appConfig.daprApiId}/method/${serviceMethod}/${taskId}`;
                
                const url =`http://${appConfig.webApiGwUrl}/task-api-dapr/${serviceMethod}/${taskId}`;
                const response = await axios.get<any[]>(url);
                const data = TaskApiMapper.createTaskResponse(response.data);
                resolve(data);
            } catch (error) {
                console.log('Error:', error);
                resolve(new TaskModel());
            }
        });
    }

    static async listTasks(): Promise<TaskModel[]> {
        return new Promise<TaskModel[]>(async (resolve) => {
            try {
                const appConfig = TaskAPI.getAppConfig();
                const serviceMethod = "api/tasks";
                
                // const url = `http://${appConfig.daprSidecarUrl}/v1.0/invoke/${appConfig.daprApiId}/method/${serviceMethod}`;

                const url =`http://${appConfig.webApiGwUrl}/task-api-dapr/${serviceMethod}`;

                const response = await axios.get<any[]>(url);
                const data = response.data.map((resp: any) => TaskApiMapper.createTaskResponse(resp));
                resolve(data);
            } catch (error) {
                console.log('Error:', error);
                resolve([]);
            }
        });
    }

    static async addTask(task: TaskCreateModel): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                const appConfig = TaskAPI.getAppConfig();
                const serviceMethod = "api/tasks";
                
                //const url = `http://${appConfig.daprSidecarUrl}/v1.0/invoke/${appConfig.daprApiId}/method/${serviceMethod}`;

                const url =`http://${appConfig.webApiGwUrl}/task-api-dapr/${serviceMethod}`;

                await axios.post(url, TaskApiMapper.createAddTaskRequest(task));
                resolve();
            } catch (error) {
                console.log('Error:', error);
                resolve();
            }
        })
    }

    static async editTask(task: TaskEditModel): Promise<void> {
        return new Promise(async (resolve) => {
            try {
                const appConfig = TaskAPI.getAppConfig();
                const serviceMethod = "api/tasks";
                
                //const url = `http://${appConfig.daprSidecarUrl}/v1.0/invoke/${appConfig.daprApiId}/method/${serviceMethod}`;

                const url =`http://${appConfig.webApiGwUrl}/task-api-dapr/${serviceMethod}`;

                await axios.put(
                    url,
                    TaskApiMapper.createEditTaskRequest(task)
                );
                resolve();
            } catch (error) {
                console.log('Error:', error);
                resolve();
            }
        })
    }

    static async listTasksByAssignee(userName: string): Promise<TaskModel[]> {
        return new Promise<TaskModel[]>(async (resolve) => {
            try {
                const appConfig = TaskAPI.getAppConfig();
                const serviceMethod = "api/tasksbyassignee";
                
                //const url = `http://${appConfig.daprSidecarUrl}/v1.0/invoke/${appConfig.daprApiId}/method/${serviceMethod}/${userName}`;

                const url =`http://${appConfig.webApiGwUrl}/task-api-dapr/${serviceMethod}/${userName}`;

                const response = await axios.get<any[]>(url);
                const data = response.data.map((resp: any) => TaskApiMapper.createTaskResponse(resp));
                resolve(data);
            } catch (error) {
                console.log('Error:', error);
                resolve([]);
            }
        });
    }
}