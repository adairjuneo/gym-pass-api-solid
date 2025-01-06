import { Environment } from 'vitest/environments';

export default <Environment>{
  transformMode: 'web',
  name: 'prisma',
  async setup() {
    // console.log('Execute');

    return {
      async teardown() {
        // console.log('Finalizou');
      },
    };
  },
};
