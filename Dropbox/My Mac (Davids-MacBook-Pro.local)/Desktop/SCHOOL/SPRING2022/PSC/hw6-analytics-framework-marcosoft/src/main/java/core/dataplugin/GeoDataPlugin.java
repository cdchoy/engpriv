package core.dataplugin;

import core.framework.GeoVisFramework;

import java.util.ArrayList;

/**
 * GeoDataPlugins will port data into the framework.
 * E.g. - Twitter API, News API, or CSV files...
 */
public interface GeoDataPlugin {
  /**
   * Get contents to be processed.
   * @return an array list of strings of texts
   */
  ArrayList<String> getContent(String keyword, int count);


  /**
   * Called (only once) when the plug-in is first registered with the
   * framework, giving the plug-in a chance to perform any initial set-up
   * before the data injection has begun (if necessary).
   *
   * @param framework The {@link GeoVisFramework} instance with which the plug-in
   *                  was registered.
   */
  void onRegister(GeoVisFramework framework);

  String getGameName();
}