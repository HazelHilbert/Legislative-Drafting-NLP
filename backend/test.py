import unittest

import app


class testEndpoints(unittest.TestCase):

    def test_hello_world(self):
        response = self.app.get('/')
        self.assertEqual(response.data.decode(), 'Hello World')





