import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'browserpress',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null, // disable service workers,
      copy: [
        { src: 'assets' }
      ]
    }
  ],
};
