import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServerRendering } from '@angular/platform-server';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app/app.config';

const serverConfig: ApplicationConfig = {
    providers: [provideServerRendering()],
};

const bootstrap = () => bootstrapApplication(AppComponent, mergeApplicationConfig(appConfig, serverConfig));

export default bootstrap;