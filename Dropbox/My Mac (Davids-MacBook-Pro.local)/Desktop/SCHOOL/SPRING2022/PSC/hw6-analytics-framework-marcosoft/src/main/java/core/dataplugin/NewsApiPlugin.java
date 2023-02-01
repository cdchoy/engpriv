package core.dataplugin;

import core.framework.GeoVisFramework;
import io.github.ccincharge.newsapi.NewsApi;
import io.github.ccincharge.newsapi.datamodels.Article;
import io.github.ccincharge.newsapi.requests.RequestBuilder;
import io.github.ccincharge.newsapi.responses.ApiArticlesResponse;

import java.util.ArrayList;

public class NewsApiPlugin implements GeoDataPlugin {

  private final NewsApi newsApi;
  private GeoVisFramework framework;

  public NewsApiPlugin() {
    this.newsApi = new NewsApi("536319d2446a4fb2b57787869cf603e0");
  }

  /**
   * Get contents to be processed.
   *
   * @param keyword
   * @param count
   * @return an array list of strings of texts
   */
  @Override
  public ArrayList<String> getContent(String keyword, int count) {
    RequestBuilder contentRequest = new RequestBuilder()
            .setQ(keyword)
            .setLanguage("en");
    ApiArticlesResponse apiArticlesResponse = newsApi.sendTopRequest(contentRequest);

    String responseStatus = apiArticlesResponse.status();
    System.out.println("[ Response status: " +responseStatus + " ]");
    // .articles() method returns an ArrayList of articles
    ArrayList<Article> newsArticles = apiArticlesResponse.articles();
    ArrayList<String> titles = new ArrayList<>();
    count = Math.min(newsArticles.size(), count);
    for (int i = 0; i < count; i++) {
      Article currArticle = newsArticles.get(i);
      String currArticleTitle = currArticle.title();
      titles.add(currArticleTitle);
    }
    return titles;
  }

  /**
   * Called (only once) when the plug-in is first registered with the framework, giving the plug-in
   * a chance to perform any initial set-up before the data injection has begun (if necessary).
   *
   * @param framework The {@link GeoVisFramework} instance with which the plug-in was registered.
   */
  @Override
  public void onRegister(GeoVisFramework framework) {
    this.framework = framework;
  }

  /**
   * Return the name of plugin
   * @return the plugin name.
   */
  @Override
  public String getGameName() {
    return "News search plugin";
  }
}
