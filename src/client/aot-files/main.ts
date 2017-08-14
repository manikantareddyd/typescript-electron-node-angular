import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
console.log('Running AOT compiled');
enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);