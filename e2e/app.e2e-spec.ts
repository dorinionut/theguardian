import { TelecomShopPage } from './app.po';

describe('telecom-shop App', () => {
  let page: TelecomShopPage;

  beforeEach(() => {
    page = new TelecomShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
