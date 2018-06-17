import { MainpageModule } from './mainpage.module';

describe('MainpageModule', () => {
  let mainpageModule: MainpageModule;

  beforeEach(() => {
    mainpageModule = new MainpageModule();
  });

  it('should create an instance', () => {
    expect(mainpageModule).toBeTruthy();
  });
});
