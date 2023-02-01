# Team MarcoSoft

For Homework 6 in CMU 17-514, we have chosen to build a data visualization framework that incorporates NLP text sentiment and feature extraction. The reuse of our platforms are useful because different platforms have different makeup of users and the sentiment of them are all diverse. It would be interesting to see how in one platform, the sentiment towards a location changes over time. And it would also be interesting to reuse the framework on different data plugins to see how on different platforms the sentiment toward a location is different (some country are forbidden to go on to websites like twitter, so it would be useful to reuse the framework on such countries' own social voicing platforms). 

### Key abstractions

| Abstractions          | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `GeoVisFrameWork`     | The interface for  the framework implementation.             |
| `GeoVisFrameWorkImpl` | The implementation for the framework.                        |
| `GeoData`             | This class has several key attributes. The text (`String`), the sentiments (`ArrayList<String>`) and the targeted locations (`ArrayList<String>`), which is a representation of the data structure that we pass into the data pipeline plugins. This information is passed to the following class `Cell` for additional processing in the frontend. |
| `Cell`                | The interface for front end data structure object that has `locations: String[], sentiments: [], text: String`. This data structure is exposed to our framework users to allow them to process the information our backend provides. |
| `GeoDataPlugin`       | The interface for data plugins for the framework.            |
| `GeoVisPlugin`        | The interface for visualization plugins for the framework.   |

### Reusable functionality

We provide our users with two reusable data processing categories: text sentiment analysis and location extraction. Our framework allows the user to reuse functionality that has been set up for making Twitter and News API calls. The NLP segments the input text, generates the text sentiment, and then extracts location data. The text sentiment and location data extraction are done automatically, without control or input from the user outside of the initial call to and from the data plugins.

Our framework allows for the following key functionality to its users:

## 1. NLP Text Sentiment and Named Entity Extraction
### from documents using keyword queries in the form of the following:

- [X] Text Sentiment
Using Stanford CoreNLP, we segment and process individual sentences within our framework. These sentences are added to an array that also contains their corresponding text sentiment.

- [X] Location
Core framework logic uses Stanford CoreNLP to assist in Named Entity Extraction (NER) of the following RegexNER tags:
- `LOCATION`
- `COUNTRY`
- `STATE_OR_PROVINCE`
- `NATIONALITY`

Processed sentences that do not have identifiable location-based information are inaccessible to the user. It is left to further work to explore making available additional NER functionality such as Event extraction (using the UD GUM Dependency), Cause of Death (CoreNLP), Organization, Persons, Natural Disasters, and other entities that could be returned to the user for additional processing. We assert that this design choice reduces the burden placed on the user and minimizes effort necessary to use the framework.

## 2. We provide data intake capability and examples
### from data plugins in a manner that allows for ease of reuse given appropriate responsibility assignment.

By choosing to handle the majority of data processing within the framework, we allow the user to focus on what the framework was meant for; location-based data visualization.

## 3. We provide data visualization capability and examples
### that show how one might implement our framework and additional plugins.

## Project Dependencies

Set the build path which must have the following libraries
```
stanford-corenlp-4.4.0
ejml-0.23
stanford-corenlp-4.4.0-models
```
1. Download Stanford CoreNLP:
https://stanfordnlp.github.io/CoreNLP/
- Then add .jar files to resources folder
    - [ ] src/main/resources/stanford-corenlp-4.4.0-javadoc.jar
    - [ ] src/main/resources/stanford-corenlp-4.4.0-models.jar
    - [ ] src/main/resources/stanford-corenlp-4.4.0-sources.jar
    - [ ] src/main/resources/stanford-corenlp-4.4.0.jar
- Right click and add jar files as library using IDE

2. Download Twitter4j:
https://twitter4j.org/en/index.html
- Then add .jar files to resources folder
    - [ ] src/main/resources/twitter4j-appengine-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-appengine-4.0.7.jar
    - [ ] src/main/resources/twitter4j-async-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-async-4.0.7.jar
    - [ ] src/main/resources/twitter4j-core-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-core-4.0.7.jar
    - [ ] src/main/resources/twitter4j-examples-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-examples-4.0.7.jar
    - [ ] src/main/resources/twitter4j-http2-support-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-http2-support-4.0.7.jar
    - [ ] src/main/resources/twitter4j-stream-4.0.7-javadoc.jar
    - [ ] src/main/resources/twitter4j-stream-4.0.7.jar
- Right click and add jar files as library using IDE

3. `run mvn install` in backend
4. `run npm install` in frontend
5. `mvn exec:exec ` in backend, or run "app.java" in using IDE
6. `run npm start` in front end
7. Navigate to `http://localhost:3000/` in your browser
8. Select a `Data` plugin from the dropdown: wait for the backend to log the following:
 - [ ] 
9. Select a `Vis` plugin from the dropdown: wait for the backend to log the following:
 - [ ] `[ Pipeline already started... ]`
10. Click `Visualize`

# Installing New Data Plugins
Please ensure the following points are addressed when installing new Data Plugins

1. Create your primary Java file in the `dataplugin` package folder inside the src/java/core/ directory
2. Your `Data Plugin` must implement the `GeoDataPlugin<P>` interface in Java
3. Please ensure that your `Data Plugin` returns a list of Strings.
4. Add the path of your `Data Plugin` to the list in the core.dataplugin.GeoDataPlugin `META-INF`.

# Installing New Visualization Plugins
Please ensure the following points are addressed when installing new Vis Plugins

1. Create your primary Java file in the `visualplugin` package folder inside the src/java/core/ directory
2. Your `Vis Plugin` must implement the `GeoVisPlugin<P>` interface in Java
3. In the frontend in TypeScript your `Vis Plugin` implementation should match the example implementation.
4. Add the path of your `Data Plugin` to the list in the core.dataplugin.GeoDataPlugin `META-INF`.


