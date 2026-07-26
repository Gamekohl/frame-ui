import { bootstrapApplication } from '@angular/platform-browser';

import { TemplatesApp } from './app';
import { appConfig } from './app.config';

bootstrapApplication(TemplatesApp, appConfig).catch((error: unknown) => console.error(error));
