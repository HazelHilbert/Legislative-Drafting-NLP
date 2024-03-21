import requests

test_url = "http://127.0.0.1:5000/"


def get_comparison_text(filename):
    with open(f'tests/testFiles/{filename}', 'r') as file:
        return file.read()


def test_get_bill():
    response = requests.get(f"{test_url}billText/1254828")
    assert str(response) == '<Response [200]>'
    assert response.text == get_comparison_text('test1.txt')
    assert response.text != get_comparison_text('dummyTest.txt')


def test_citation_string_bill():
    response = requests.get(f"{test_url}citationStringBill/1254828")
    assert response.status_code == 200
    data = response.text
    assert "105 ILCS 5/10-22.6" in data
    assert "105 ILCS 5/34-19" in data
