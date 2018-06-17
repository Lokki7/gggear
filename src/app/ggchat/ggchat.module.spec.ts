import { GgchatModule } from './ggchat.module';

describe('GgchatModule', () => {
  let ggchatModule: GgchatModule;

  beforeEach(() => {
    ggchatModule = new GgchatModule();
  });

  it('should create an instance', () => {
    expect(ggchatModule).toBeTruthy();
  });
});
