import { GgapiModule } from './ggapi.module';

describe('GgapiModule', () => {
  let ggapiModule: GgapiModule;

  beforeEach(() => {
    ggapiModule = new GgapiModule();
  });

  it('should create an instance', () => {
    expect(ggapiModule).toBeTruthy();
  });
});
