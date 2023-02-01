package core.framework;

import java.util.ArrayList;

/**
 * Data structure that holds the following information:
 */
public class GeoData {

  // text -> coreNLP, does segmentation, processing, determines: sentiment -> send text to
    // NLPLocation -> determines if a location is present in the data ->

  // text -> textSentiment.NLP -> add to GeoData object
  // text -> location.NLP -> get loc data ->  add to GeoData object
  // text -> events.NLP -> add to GeoData object
  //

  private String text;
  private ArrayList<String> sentiments;
  private ArrayList<String> locations;
  /** If location is not null, determine location address. */
  private String locationAddress;
  /** If location is not null, determine location coordinates in longitude and latitude. */
  private double[] locationCoordinates;
  /** If we detect an event in text, store here. */
  private String event;

  GeoData(String text) {
    this.text = text;
  }

  public String getEvent() {
    return event;
  }

  public void setEvent(String event) {
    this.event = event;
  }

  public String toString() {
    return "[TEXT:: " + text + " ]" + "\n"
            + sentiments.toString() + "\n"
            + locations.toString();
  }

  public ArrayList<String> getSentiments() {
    return sentiments;
  }

  public void setSentiments(ArrayList<String> sentiments) {
    this.sentiments = sentiments;
  }

  public ArrayList<String> getLocations() {
    return locations;
  }

  public void setLocations(ArrayList<String> locations) {
    this.locations = locations;
  }
}
