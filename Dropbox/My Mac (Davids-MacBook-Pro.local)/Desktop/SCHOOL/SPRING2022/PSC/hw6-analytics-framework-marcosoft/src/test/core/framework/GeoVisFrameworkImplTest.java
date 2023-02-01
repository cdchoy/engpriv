package core.framework;

import core.dataplugin.TwitterSearchPlugin;
import core.visualplugin.GeoVisPlugin;
import org.junit.Before;
import org.junit.Test;

public class GeoVisFrameworkImplTest {

  private GeoVisFrameworkImpl framework;
  private TwitterSearchPlugin twitterSearchPlugin;

  @Before
  public void setUp() throws Exception {
    framework = new GeoVisFrameworkImpl();
    twitterSearchPlugin = new TwitterSearchPlugin();
    framework.registerDataPlugin(twitterSearchPlugin);
  }

  @Test
  public void registerDataPlugin() {
  }

  @Test
  public void registerVisPlugin() {
  }

  @Test
  public void testPipeline() {
    GeoVisPlugin placeHolder = null;
    framework.startPipeline(twitterSearchPlugin, placeHolder);
    framework.processInput("war", 10);
    System.out.println("**------------------------**");
    framework.printGeoDateList();
  }

}