import unittest

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestGui(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)
        self.driver.get("http://www.canitstreamto.me")

# testing navbar and routing
    def test_movies_link(self):
    	movies_link = self.driver.find_element_by_link_text("Movies")
    	movies_link.click()
    	self.assertEqual("http://www.canitstreamto.me/movie", self.driver.current_url)

    def test_services_link(self):
    	movies_link = self.driver.find_element_by_link_text("Streaming Services")
    	movies_link.click()
    	self.assertEqual("http://www.canitstreamto.me/streaming_service", self.driver.current_url)

    def test_countries_link(self):
    	movies_link = self.driver.find_element_by_link_text("Countries")
    	movies_link.click()
    	self.assertEqual("http://www.canitstreamto.me/country", self.driver.current_url)

    def test_about_link(self):
    	movies_link = self.driver.find_element_by_link_text("About Us")
    	movies_link.click()
    	self.assertEqual("http://www.canitstreamto.me/about", self.driver.current_url)

# testing instances
    def test_movie_instance(self):
        movies_link = self.driver.find_element_by_link_text("Movies")
        movies_link.click()
        first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
        first_movie_link.click()
        assert "Rating" in self.driver.page_source
        assert "Desc" in self.driver.page_source
        assert "Cast" in self.driver.page_source
        assert "Popular Countries" in self.driver.page_source
        assert "Compatible Streaming Services" in self.driver.page_source

    def test_country_instance(self):
        countries_link = self.driver.find_element_by_link_text("Countries")
        countries_link.click()
        first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
        first_country_link.click()
        assert "Population" in self.driver.page_source
        assert "Spoken Languages" in self.driver.page_source
        assert "Top Streaming Services" in self.driver.page_source
        assert "Top Movies" in self.driver.page_source

    def test_streaming_service_instance(self):
        services_link = self.driver.find_element_by_link_text("Streaming Services")
        services_link.click()
        first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
        first_service_link.click()
        assert "Pricing" in self.driver.page_source
        assert "Top Countries That Use" in self.driver.page_source
        assert "Top Movies on" in self.driver.page_source

# testing that instances link to other instances
    def test_movie_link_to_country(self):
        movies_link = self.driver.find_element_by_link_text("Movies")
        movies_link.click()
        first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
        first_movie_link.click()
        first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][1]/div[@class='card']/div[@class='col-sm-8']/p[4]/ol/li[1]/a")
        first_country_link.click()
        assert "Population" in self.driver.page_source
        assert "Spoken Languages" in self.driver.page_source
        assert "Top Streaming Services" in self.driver.page_source
        assert "Top Movies" in self.driver.page_source

    def test_movie_link_to_service(self):
        movies_link = self.driver.find_element_by_link_text("Movies")
        movies_link.click()
        first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
        first_movie_link.click()
        first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][1]/div[@class='card']/div[@class='col-sm-8']/p[5]/ul/li/a")
        first_service_link.click()
        assert "Pricing" in self.driver.page_source
        assert "Top Countries That Use" in self.driver.page_source
        assert "Top Movies on" in self.driver.page_source


    def tearDown(self):
    	self.driver.close()

unittest.main()

