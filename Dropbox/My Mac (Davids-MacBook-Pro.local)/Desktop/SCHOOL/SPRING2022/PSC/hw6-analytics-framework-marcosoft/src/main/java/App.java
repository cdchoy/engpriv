import core.dataplugin.GeoDataPlugin;
import core.framework.GeoVisFrameworkImpl;
import core.visualplugin.GeoVisPlugin;

import com.github.jknack.handlebars.Template;
import fi.iki.elonen.NanoHTTPD;
import gui.GeoVisState;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.ServiceLoader;

import static org.apache.commons.lang3.StringUtils.isNumeric;

public class App extends NanoHTTPD {

    public static void main(String[] args) {
        try {
            new App();
        } catch (IOException ioe) {
            System.err.println("Couldn't start server:\n" + ioe);
        }
    }

    private final List<GeoDataPlugin> dataPlugins;
    private final List<GeoVisPlugin> visPlugins;
    private final GeoVisFrameworkImpl framework;

    public App() throws IOException {
        super(8080);
        this.framework = new GeoVisFrameworkImpl();
        // load data plugins
        dataPlugins = loadDataPlugins();
        for (var dp : dataPlugins) {
            framework.registerDataPlugin(dp);
        }
        // place-holder for vis plugin
        visPlugins = loadVisPlugins();
        for (var vp : visPlugins) {
            framework.registerVisPlugin(vp);
        }

        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        System.out.println("\nRunning! Point your browsers to http://localhost:8080/ \n");
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Map<String, String> params = session.getParms();
        System.out.println("[ Uri: " + uri + " ]");
        if (uri.equals("/plugin")) {
            framework.startPipeline(dataPlugins.get(Integer.parseInt(params.get("i"))), null);
        } else if (uri.equals("/play")){
            // "x" is keyword; "y" is count of content user want
            System.out.println("play params is " + params);
            if (framework.hasGame()) {
                if (isNumeric(params.get("y"))) {
                    framework.processInput(params.get("x"), Integer.parseInt(params.get("y")));
                } else {
                    System.err.println("[ Count invalid... ]");
                }
            } else {
                System.err.println("[ Framework data plugin not set... ]");
            }
        } else if (uri.equals("/start")){
        }
        GeoVisState state = GeoVisState.forGame(this.framework);
        return newFixedLengthResponse(state.toString());
    }


    /**
     * Load data plugins listed in META-INF/services/...
     *
     * @return List of instantiated plugins
     */
    private static List<GeoDataPlugin> loadDataPlugins() {
        ServiceLoader<GeoDataPlugin> plugins = ServiceLoader.load(GeoDataPlugin.class);
        List<GeoDataPlugin> result = new ArrayList<>();
        for (GeoDataPlugin plugin : plugins) {
            System.out.println("Loaded plugin " + plugin.getGameName());
            result.add(plugin);
        }
        return result;
    }

    /**
     * Load visualization plugins listed in META-INF/services/...
     *
     * @return List of instantiated plugins
     */
    private static List<GeoVisPlugin> loadVisPlugins() {
        ServiceLoader<GeoVisPlugin> plugins = ServiceLoader.load(GeoVisPlugin.class);
        List<GeoVisPlugin> result = new ArrayList<>();
        for (GeoVisPlugin plugin : plugins) {
            System.out.println("Loaded plugin " + plugin.getGameName());
            result.add(plugin);
        }
        return result;
    }
}