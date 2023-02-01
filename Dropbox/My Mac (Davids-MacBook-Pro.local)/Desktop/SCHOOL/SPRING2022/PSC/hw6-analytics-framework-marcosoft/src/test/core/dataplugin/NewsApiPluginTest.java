package core.dataplugin;

import org.junit.Before;
import org.junit.Test;

public class NewsApiPluginTest {

  private NewsApiPlugin newsApiPlugin;

  @Before
  public void setUp() throws Exception {
    newsApiPlugin = new NewsApiPlugin();
  }

  @Test
  public void getContent() {
    var contents = newsApiPlugin.getContent("war", 10);
    for (var content: contents) {
      System.out.println(content);
    }
  }
}