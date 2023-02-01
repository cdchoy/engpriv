package gui;

import core.framework.GeoVisFramework;

import java.util.Arrays;
import java.util.List;

public class GeoVisState {

  private final String name;
  private final String cells;
  private final Plugin[] dataPlugins;
  private final Plugin[] visPlugins;

  private GeoVisState(String name, String cells, Plugin[] dataPlugins, Plugin[] visPlugins) {
    this.name = name;
    this.cells = cells;
    this.dataPlugins = dataPlugins;
    this.visPlugins = visPlugins;
  }

  public static GeoVisState forGame(GeoVisFramework framework) {
    String name = framework.getName();
    String cells = framework.toJson();
    Plugin[] dataPlugins = getDataPlugins(framework);
    Plugin[] visPlugins = getVisPlugins(framework);
    return new GeoVisState(name,cells,dataPlugins,visPlugins);
  }

  private static Plugin[] getDataPlugins(GeoVisFramework framework) {
    List<String> pluginNames = framework.getRegisteredDataPluginName();
    return toPlugins(pluginNames);
  }

  private static Plugin[] getVisPlugins(GeoVisFramework framework) {
    List<String> pluginNames = framework.getRegisteredVisPluginName();
    return toPlugins(pluginNames);
  }

  private static Plugin[] toPlugins(List<String> pluginNames) {
    Plugin[] plugins = new Plugin[pluginNames.size()];
    for (int i=0; i<pluginNames.size(); i++){
      String link = "/plugin?i="+ i;
      plugins[i] = new Plugin(pluginNames.get(i), link);
    }
    return plugins;
  }

  public String getName() {
    return name;
  }

  public Plugin[] getDataPlugins() {
    return dataPlugins;
  }

  public Plugin[] getVisPlugins() {
    return visPlugins;
  }

  @Override
  public String toString() {
    return ("{ \"name\": \"" + this.name + "\"," +
            " \"cells\": " +  cells + "," +
            " \"data-plugins\": " +  Arrays.toString(dataPlugins) + "," +
            " \"vis-plugins\": " +  Arrays.toString(visPlugins) + "}").replace("null", "");
  }
}

