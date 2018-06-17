import { GgdjModule } from './ggdj.module';

describe('GgdjModule', () => {
  let ggdjModule: GgdjModule;

  beforeEach(() => {
    ggdjModule = new GgdjModule();
  });

  it('should create an instance', () => {
    expect(ggdjModule).toBeTruthy();
  });
});
