package core.framework;

import java.util.List;

public interface GeoVisFramework {

  String getName();

  String toJson();

  List<String> getRegisteredDataPluginName();

  List<String> getRegisteredVisPluginName();

  boolean hasGame();
}