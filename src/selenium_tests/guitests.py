import unittest

from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class TestGui(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://canitstreamto.me")

    def test_movies_link(self):
    	movies_link = self.driver.find_element_by_link_text("Movies")
    	movies_link.click()
    	self.assertEqual("http://canitstreamto.me/Movies", self.driver.current_url)

    def test_services_link(self):
    	movies_link = self.driver.find_element_by_link_text("Streaming Services")
    	movies_link.click()
    	self.assertEqual("http://canitstreamto.me/services", self.driver.current_url)

    def test_countries_link(self):
    	movies_link = self.driver.find_element_by_link_text("Countries")
    	movies_link.click()
    	self.assertEqual("http://canitstreamto.me/countries", self.driver.current_url)

    def test_about_link(self):
    	movies_link = self.driver.find_element_by_link_text("About Us")
    	movies_link.click()
    	self.assertEqual("http://canitstreamto.me/about", self.driver.current_url)

    def tearDown(self):
    	self.driver.close()

unittest.main()

