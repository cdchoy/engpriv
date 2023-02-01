package core.visualplugin;

import core.framework.GeoVisFramework;
import twitter4j.Twitter;

public class GoogleChartsPlugin implements GeoVisPlugin {

    private final String gCharts;
    private GeoVisFramework framework;

    public GoogleChartsPlugin() {
        gCharts = "gCharts";
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
        return "Google charts plugin";
    }
}
