package core.framework;

import com.google.gson.Gson;
import core.dataplugin.GeoDataPlugin;
import core.visualplugin.GeoVisPlugin;

import edu.stanford.nlp.pipeline.CoreDocument;
import edu.stanford.nlp.pipeline.CoreEntityMention;
import edu.stanford.nlp.pipeline.CoreSentence;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class GeoVisFrameworkImpl implements GeoVisFramework {

  private final String name = "DOPE FRAMEWORK";
  private static ArrayList<GeoData> geoDataList;
  StanfordCoreNLP pipeline;
  Properties props;
  private GeoDataPlugin currDataPlugin;
  private GeoVisPlugin currVisPlugin;
  private final List<GeoDataPlugin> registeredDataPlugins;
  private final List<GeoVisPlugin> registeredVisPlugins;

  public GeoVisFrameworkImpl() {
    geoDataList = new ArrayList<>();
    registeredDataPlugins = new ArrayList<>();
    registeredVisPlugins = new ArrayList<>();
  }

  /**
   * Registers a new {@link GeoDataPlugin} with the game framework
   */
  public void registerDataPlugin(GeoDataPlugin plugin) {
    plugin.onRegister(this);
    registeredDataPlugins.add(plugin);
  }

  /**
   * Registers a new {@link GeoDataPlugin} with the game framework
   */
  public void registerVisPlugin(GeoVisPlugin plugin) {
    plugin.onRegister(this);
    registeredVisPlugins.add(plugin);
  }

  /**
   * Starts the data pipeline for the provided data and visualization plugins.
   *
   * @param dataPlugin provided data plugin (e.g. twitter search etc.)
   * @param visPlugin  provided visualization plugin
   */
  public void startPipeline(GeoDataPlugin dataPlugin, GeoVisPlugin visPlugin) {
    System.out.println("[ Initializing Pipeline... ]");
    if (currDataPlugin != dataPlugin) {
      currDataPlugin = dataPlugin;
    }
    if (currVisPlugin != visPlugin) {
      currVisPlugin = visPlugin;
    }
    System.out.println("Updated current plugins.");
    if (pipeline != null) {
      System.out.println("[ Pipeline already started... ]");
      return;
    }
    // set up pipeline properties
    props = new Properties();
    // set the list of annotators to run
    props.setProperty("annotators", "tokenize,ssplit,pos,lemma,ner,regexner,parse,depparse,coref," +
            "kbp,quote,sentiment");
    System.out.println("Set properties.");
    // set a property for an annotator, in this case the coref annotator is being set to use the
    // neural algorithm
    props.setProperty("coref.algorithm", "neural");
    // set property... to determine... locations?...

    // build pipeline
    pipeline = new StanfordCoreNLP(props);
    System.out.println("[ Created new pipeline. ]");
  }

  /**
   * Get contents from data plugin. Render the contents using CoreNLP API. Only one process of
   * content can run at the same time.
   * @param keyword
   * @param cnt
   */
  public synchronized void processInput(String keyword, int cnt) {
    // Error handling
    if (currDataPlugin == null) {
      System.err.println("[ Current data plugin is not selected ]");
      return;
    }

    var contents = currDataPlugin.getContent(keyword, cnt);
    // For every bit of content, extract and create a GeoData object to hold the information
    for (var content : contents) {
      var geoData = renderContent(content);
      if (geoData != null)
        geoDataList.add(geoData);
    }
  }

  private GeoData renderContent(String content) {
    System.out.println("Rendering content...");

    // Create the new GeoData Object
    GeoData data = new GeoData(content);
    // create a document object
    CoreDocument document = new CoreDocument(content);
    // annotate the document
    pipeline.annotate(document);

    ArrayList<String> sentiments = extractSentiments(document);
    data.setSentiments(sentiments);

    ArrayList<String> locations = extractLocations(document);
    data.setLocations(locations);

    if (!sentiments.isEmpty() && !locations.isEmpty()) {
      System.out.println("Content rendered.");
      return data;
    } else {
      return null;
    }
  }

  private ArrayList<String> extractLocations(CoreDocument document) {
    // Add every... location entity? to a list of entities?...
    ArrayList<String> entities = new ArrayList<>();
    for (CoreEntityMention entity : document.entityMentions()) {
      if (entity.entityType().equals("LOCATION")
              || entity.entityType().equals("COUNTRY")
              || entity.entityType().equals("STATE_OR_PROVINCE")
              || entity.entityType().equals("NATIONALITY")) {
        System.out.println("Adding location: " + entity.text());
        entities.add(entity.text());
      }
    }
    return entities;
  }

  /**
   * Get the sentiment list of every sub-sentence that contains a location.
   *
   * @param document nlp component containing the core sentence
   * @return a list of sentiments ("positive" / "negative")
   */
  private ArrayList<String> extractSentiments(CoreDocument document) {
    // Add every sentence of the text to an array of strings and sentiments

    ArrayList<String> sentiments = new ArrayList<>();
    for (CoreSentence sentence : document.sentences()) {
      // list of the ner tags
      List<String> nerTags = sentence.nerTags();
      if (!nerTags.contains("LOCATION")
              && !nerTags.contains("COUNTRY")
              && !nerTags.contains("STATE_OR_PROVINCE")
              && !nerTags.contains("NATIONALITY")) {
        continue;
      }
      System.out.println("Adding sentiment: " + sentence.sentiment());
      sentiments.add(sentence.sentiment());
    }

    return sentiments;
  }

  public void printGeoDateList() {
    for (var geoData : geoDataList) {
      System.out.println(geoData.toString());
    }
  }

  @Override
  public String toJson() {
    Gson gson = new Gson();
    var json = gson.toJson(geoDataList);
    return json;
  }

  @Override
  public List<String> getRegisteredDataPluginName() {
    List<String> names = new ArrayList<>();
    for (var plugin : registeredDataPlugins) {
      names.add(plugin.getGameName());
    }
    return names;
  }

  @Override
  public List<String> getRegisteredVisPluginName() {
    List<String> names = new ArrayList<>();
    for (var plugin : registeredVisPlugins) {
      names.add(plugin.getGameName());
    }
    return names;
  }

  @Override
  public boolean hasGame() {
    return currDataPlugin != null;
  }

  public GeoVisPlugin getCurrVisPlugin() {
    return currVisPlugin;
  }

  public GeoDataPlugin getCurrDataPlugin() {
    return currDataPlugin;
  }

  @Override
  public String getName() {
    return name;
  }
}