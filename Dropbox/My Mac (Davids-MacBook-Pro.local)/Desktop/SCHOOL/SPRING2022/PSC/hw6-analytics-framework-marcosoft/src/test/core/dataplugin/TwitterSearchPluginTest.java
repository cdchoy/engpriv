package core.dataplugin;

public class TwitterSearchPluginTest {
  private TwitterSearchPlugin twitterSearchPlugin;

  @org.junit.Before
  public void setUp() throws Exception {
    twitterSearchPlugin = new TwitterSearchPlugin();
  }

  @org.junit.Test
  public void getContent() {
    var contentList = twitterSearchPlugin.getContent("war", 20);
    for (var content : contentList) {
      System.out.println(content);
    }
  }
}