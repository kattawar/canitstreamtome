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
		assert "PURPOSE" in self.driver.page_source
		assert "STATS" in self.driver.page_source
		assert "DATA" in self.driver.page_source
		assert "TOOLS" in self.driver.page_source
		assert "LINKS" in self.driver.page_source

# testing instances
	def test_movie_instance(self):
		movies_link = self.driver.find_element_by_link_text("Movies")
		movies_link.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='movie']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_movie_link.click()
		assert "Rating" in self.driver.page_source
		assert "Desc" in self.driver.page_source
		assert "Cast" in self.driver.page_source
		assert "Popular Countries" in self.driver.page_source
		assert "Compatible Streaming Services" in self.driver.page_source

	def test_country_instance(self):
		countries_link = self.driver.find_element_by_link_text("Countries")
		countries_link.click()
		first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='country']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_country_link.click()
		self.assertEqual("http://www.canitstreamto.me/country/823", self.driver.current_url)

	def test_streaming_service_instance(self):
		services_link = self.driver.find_element_by_link_text("Streaming Services")
		services_link.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='streaming_service']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_service_link.click()
		assert "URL" in self.driver.page_source
		assert "Pricing" in self.driver.page_source
		assert "Top Countries That Use" in self.driver.page_source
		assert "Top Movies on" in self.driver.page_source

# testing that instances link to other instances
	def test_movie_link_to_country(self):
		movies_link = self.driver.find_element_by_link_text("Movies")
		movies_link.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='movie']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_movie_link.click()
		first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][1]/div[@class='card']/div[@class='col-sm-12']/p/ol/li[1]/a")
		first_country_link.click()
		self.assertEqual("http://www.canitstreamto.me/country/1060", self.driver.current_url)

	def test_movie_link_to_service(self):
		movies_link = self.driver.find_element_by_link_text("Movies")
		movies_link.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='movie']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_movie_link.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][2]/div[@class='card']/div[@class='col-sm-12']/p/ul/li[1]/a")
		first_service_link.click()
		assert "URL" in self.driver.page_source
		assert "Pricing" in self.driver.page_source
		assert "Top Countries That Use" in self.driver.page_source
		assert "Top Movies on" in self.driver.page_source

	def test_service_link_to_country(self):
		service_link = self.driver.find_element_by_link_text("Streaming Services")
		service_link.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='streaming_service']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_service_link.click()
		first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][1]/div[@class='card']/div[@class='col-sm-12']/p/ol/li[1]/a")
		first_country_link.click()
		self.assertEqual("http://www.canitstreamto.me/country/1060", self.driver.current_url)

	def test_service_link_to_movie(self):
		service_link = self.driver.find_element_by_link_text("Streaming Services")
		service_link.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='streaming_service']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_service_link.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][2]/div[@class='card']/div[@class='col-sm-12']/p/ol/li[1]/a")
		first_movie_link.click()
		assert "Rating" in self.driver.page_source
		assert "Desc" in self.driver.page_source
		assert "Cast" in self.driver.page_source
		assert "Popular Countries" in self.driver.page_source
		assert "Compatible Streaming Services" in self.driver.page_source

	def test_country_link_to_service(self):
		countries_link = self.driver.find_element_by_link_text("Countries")
		countries_link.click()
		first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='country']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_country_link.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][1]/div[@class='card']/div[@class='col-sm-12']/p/ol/li[1]/a")
		first_service_link.click()
		assert "URL" in self.driver.page_source
		assert "Pricing" in self.driver.page_source
		assert "Top Countries That Use" in self.driver.page_source
		assert "Top Movies on" in self.driver.page_source

	def test_country_link_to_movie(self):
		countries_link = self.driver.find_element_by_link_text("Countries")
		countries_link.click()
		first_country_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='country']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_country_link.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div[@class='container']/div[@class='row'][2]/div[@class='col-sm-6'][2]/div[@class='card']/div[@class='col-sm-12']/p/ol/li[1]/a")
		first_movie_link.click()
		assert "Rating" in self.driver.page_source
		assert "Desc" in self.driver.page_source
		assert "Cast" in self.driver.page_source
		assert "Popular Countries" in self.driver.page_source
		assert "Compatible Streaming Services" in self.driver.page_source

  # testing filter
	def test_filter_services_free(self):
		services_link = self.driver.find_element_by_link_text("Streaming Services")
		services_link.click()
		filters = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='row']/div[@class='col-sm-3'][2]/div[@class='Select is-clearable is-searchable Select--single']/div[@class='Select-control']")
		filters.click()
		free_filter = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='row']/div[@class='col-sm-3'][2]/div[@class='Select is-clearable is-focused is-open is-searchable Select--single']/div[@class='Select-menu-outer']/div[@id='react-select-3--list']/div[@id='react-select-3--option-0']")
		free_filter.click()
		first_service_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='streaming_service']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_service_link.click()
		assert "URL" in self.driver.page_source
		assert "Pricing" in self.driver.page_source
		assert "Top Countries That Use" in self.driver.page_source
		assert "Top Movies on" in self.driver.page_source

	def test_filter_movies(self):
		movies_link = self.driver.find_element_by_link_text("Movies")
		movies_link.click()
		filters = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='row']/div[@class='col-sm-3'][2]/div[@class='Select is-clearable is-searchable Select--multi']/div[@class='Select-control']")
		filters.click()
		select_genre = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='row']/div[@class='col-sm-3'][2]/div[@class='Select is-clearable is-focused is-open is-searchable Select--multi']/div[@class='Select-menu-outer']/div[@id='react-select-3--list']/div[@id='react-select-3--option-0']")
		select_genre.click()
		first_movie_link = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/div/div[@class='movie']/section/div[@class='container']/div[@class='row'][1]/div[@class='col-sm-2'][1]/a/div[@class='card']")
		first_movie_link.click()
		assert "Rating" in self.driver.page_source
		assert "Desc" in self.driver.page_source
		assert "Cast" in self.driver.page_source
		assert "Popular Countries" in self.driver.page_source
		assert "Compatible Streaming Services" in self.driver.page_source

  # testing search
	def test_search(self):
		search_box = self.driver.find_element_by_xpath("/html/body/div[@id='reactEntry']/div[@class='App']/nav[@class='navbar navbar-inverse']/div[@class='container']/div[@class='navbar-collapse collapse']/div[@class='navbar-form navbar-right']/div/form/div[@class='form-group']/input[@class='form-control']")
		search_box.click()
		search_box.send_keys("the")
		search_box.send_keys(Keys.RETURN)
		self.assertEqual("http://www.canitstreamto.me/search?value=the", self.driver.current_url)
		assert "Movies" in self.driver.page_source
		assert "Countries" in self.driver.page_source
		assert "Streaming Services" in self.driver.page_source

	def tearDown(self):
		self.driver.close()

unittest.main()
