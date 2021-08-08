// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//'http://202.164.38.204:9002/auth'

export const environment = {
  production: true,
  keyclockurl: 'https://13.232.228.145:9002/auth/',
  keyclockrealm: 'TestIOT',
  keyclockclientId: 'test-client2',
  socketurl:'http://202.164.38.204:9001/',
  api:"http://202.164.38.204:3003"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
