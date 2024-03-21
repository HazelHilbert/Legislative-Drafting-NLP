import os
import requests
#import app
#import pytests

test_url = "http://127.0.0.1:5000/"

def getComparisonText(filename):
    with open('tests/testFiles/' + filename, 'r') as file:
        data = file.read()
        return data

import unittest

class TestStringMethods(unittest.TestCase):

    def testGetBill(self):
        response = requests.get(test_url + "billText/1254828")
        self.assertEqual(str(response), '<Response [200]>')
        # print(os.getcwd())
        self.assertEqual(response.text, getComparisonText('test1.txt'))
        self.assertNotEqual(response.text, getComparisonText('dummyTest.txt'))


    def testCitationJSON(self):
        response = requests.get(test_url + "citationJSONBill/1254828")
        self.assertEqual(response.status_code, 200)
        data = response.json
        self.assertIn("citations", data)

        
if __name__ == '__main__':
    unittest.main()
