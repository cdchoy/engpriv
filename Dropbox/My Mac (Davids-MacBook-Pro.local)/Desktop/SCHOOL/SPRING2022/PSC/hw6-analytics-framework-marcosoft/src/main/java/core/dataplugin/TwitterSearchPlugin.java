package core.dataplugin;
import core.framework.GeoVisFramework;
import twitter4j.*;

import java.util.ArrayList;

import twitter4j.conf.ConfigurationBuilder;

public class TwitterSearchPlugin implements GeoDataPlugin {
    private final Twitter twitter;
    private GeoVisFramework framework;

    public TwitterSearchPlugin() {
        twitter = getConfiguration();
    }

    @Override
    public ArrayList<String> getContent(String keyword, int count) {
        Query query = new Query(keyword + " -filter:retweets -filter:links -filter:replies -filter:images");
        query.setCount(count);
        query.setLocale("en");
        query.setLang("en");
        QueryResult queryResult;
        try {
            queryResult = twitter.search(query);
        } catch (TwitterException e) {
            e.printStackTrace();
            return new ArrayList<String>();
        }
        var contentStatus = queryResult.getTweets();
        var contents = new ArrayList<String>();
        for (var status : contentStatus) {
            contents.add(status.getText());
        }
        return contents;
    }

    @Override
    public void onRegister(GeoVisFramework framework) {
        this.framework = framework;
    }

    @Override
    public String getGameName() {
        return "Twitter Data Plugin";
    }

    /**
     * Get twitter configuration instance.
     * @return instance of twitter factory object
     */
    private Twitter getConfiguration() {
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true).setOAuthConsumerKey("os0OxOS8m9NFf00WXJ0KmoFbE")
                .setOAuthConsumerSecret("20zb06akYocRuI1EGodDJy280PthIqCMIAMYEHjIgzNkX3Axz0")
                .setOAuthAccessToken("1332068880567726089-JmTbNjU4aGaH8OvSBbuxQGgpu515Gq")
                .setOAuthAccessTokenSecret("n7LrlIAQRJkVyJ5b4CstUluHFfKR9DnvOGcFwT6xu7Ahd");
        TwitterFactory tf = new TwitterFactory(cb.build());
        return tf.getInstance();
    }
}
