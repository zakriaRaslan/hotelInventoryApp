import { InjectionToken } from '@angular/core';
import { appConfig } from './appConfig.interface';
import { environment } from '../environments/environment';

export const App_Service_Config = new InjectionToken<appConfig>('app.config');

export const App_Config: appConfig = {
  apiEndPoint: environment.apiEndPoint,
};
