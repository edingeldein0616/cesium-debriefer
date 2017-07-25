import { CesiumDebrieferPage } from './app.po';

describe('cesium-debriefer App', () => {
  let page: CesiumDebrieferPage;

  beforeEach(() => {
    page = new CesiumDebrieferPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
