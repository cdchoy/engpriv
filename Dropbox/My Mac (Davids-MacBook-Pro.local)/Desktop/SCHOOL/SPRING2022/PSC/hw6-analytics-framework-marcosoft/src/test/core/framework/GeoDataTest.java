package core.framework;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class GeoDataTest {

  private List<GeoData> geoDataList;

  @Before
  public void setUp() throws Exception {
    GeoData data1 = new GeoData("Onetwoonetwo");
    GeoData data2 = new GeoData("three");
    geoDataList = new ArrayList<>();
    geoDataList.add(data1);
    geoDataList.add(data2);
  }

  @Test
  public void testJson() {
    Gson gson = new Gson();
    var json = gson.toJson(geoDataList);
    System.out.println(json);
  }
}