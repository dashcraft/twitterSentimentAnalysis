import { SentimentAnalysisPage } from './app.po';

describe('sentiment-analysis App', () => {
  let page: SentimentAnalysisPage;

  beforeEach(() => {
    page = new SentimentAnalysisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
