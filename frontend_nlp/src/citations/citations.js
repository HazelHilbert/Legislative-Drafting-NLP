Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
  }
});

document.getElementById("searchButton").addEventListener("click", performSearch);
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        performSearch();
    }
});

async function performSearch() {
    var searchText = document.getElementById("searchInput").value;
    fetch("http://127.0.0.1:5000/billText/" + searchText)
        .then(async response => await response.text())
        .then(data => summariseText(data))
        .catch(error => console.error('Error:', error));
}

async function summariseText(text) {
    fetch("http://127.0.0.1:5000/citationString/" + text)
        .then(async response => await response.text())
        .then(data => displayOutput(data))
        .catch(error => console.error('Error:', error));
}

function displayOutput(text) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "<p>" + text + "</p>";
}