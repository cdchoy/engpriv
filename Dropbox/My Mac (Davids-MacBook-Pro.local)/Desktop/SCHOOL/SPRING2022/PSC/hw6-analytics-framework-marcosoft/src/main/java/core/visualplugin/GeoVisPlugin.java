package core.visualplugin;

import core.framework.GeoData;
import core.framework.GeoVisFramework;

import java.util.ArrayList;
import java.util.List;

/**
 * GeoVisPlugins will display data visually. E.g. - Cartographic Map, Pie Chart, Bar Graph, Etc...
 */
public interface GeoVisPlugin {

  /**
   * Called (only once) when the plug-in is first registered with the framework, giving the plug-in
   * a chance to perform any initial set-up before the data visualization has begun (if necessary).
   *
   * @param framework The {@link GeoVisFramework} instance with which the plug-in was registered.
   */
  void onRegister(GeoVisFramework framework);

  String getGameName();
}