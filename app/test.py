import sys
import urllib.request
import json
import database
import time
import unittest
import codecs
import requests

url = "http://api.canitstreamto.me/v1/"


class TestMethods(unittest.TestCase):
    def test1(self):
        response = requests.request("GET",url+"movie")
        self.assertEqual(response.ok,True)
        print("Test 1: Movie endpoint is live!")
    def test2(self):
        response = requests.request("GET",url+"country")
        self.assertEqual(response.ok,True)
        print("Test 2: Country endpoint is live!")
    def test3(self):
        response = requests.request("GET",url+"streaming_service")
        self.assertEqual(response.ok,True)
        print("Test 3: Streaming Service endpoint is live!")
    def test4(self):
        response = requests.request("GET",url+"movie/4791")
        self.assertEqual(response.ok,True)
        print("Test 4: Specific movie endpoint is live!")
    def test5(self):
        response = requests.request("GET",url+"movie/4791/popularity")
        self.assertEqual(response.ok,True)
        print("Test 5: Specific movie popularity endpoint is live!")
    def test6(self):
        response = requests.request("GET",url+"movie/4791/streaming")
        self.assertEqual(response.ok,True)
        print("Test 6: Specific movie streaming services endpoint is live!")

    def test7(self):
        response = requests.request("GET",url+"country/823")
        self.assertEqual(response.ok,True)
        print("Test 7: Specific country endpoint is live!")
    def test8(self):
        response = requests.request("GET",url+"country/823/streaming")
        self.assertEqual(response.ok,True)
        print("Test 8: Specific country streaming endpoint is live!")
    def test9(self):
        response = requests.request("GET",url+"country/823/movie")
        self.assertEqual(response.ok,True)
        print("Test 9: Specific country movie endpoint is live!")

    def test10(self):
        response = requests.request("GET",url+"streaming_service/268")
        self.assertEqual(response.ok,True)
        print("Test 10: Specific streaming service endpoint is live!")
    def test11(self):
        response = requests.request("GET",url+"streaming_service/268/popcountry")
        self.assertEqual(response.ok,True)
        print("Test 11: Specific streaming service popularity endpoint is live!")
    def test12(self):
        response = requests.request("GET",url+"streaming_service/268/movie")
        self.assertEqual(response.ok,True)
        print("Test 12: Specific streaming service movie endpoint is live!")

    def test13(self):
        response = requests.request("GET",url+"fish")
        self.assertEqual(response.status_code,404)
        print("Test 12: Bad endpoint returns 404.")
        














if __name__ == "__main__":
    print("RUNNING BACKEND TESTS")
    unittest.main()



    
