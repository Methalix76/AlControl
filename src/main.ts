import { enableProdMode } from '@angular/core'; // <-- ¡Añade esta importación!
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // <-- ¡Añade esta importación!

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: any) => console.log(err)); // <-- ¡Añade ': any' al parámetro 'err'!