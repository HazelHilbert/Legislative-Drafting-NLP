Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("displaySelectedText").onclick = displaySelectedText; 
  }
});

async function displaySelectedText() {
    return Word.run(async (context) => {
        const range = context.document.getSelection();
        range.load("text");
        await context.sync();
        const selectedText = range.text;
        await summariseText(selectedText);

    }).catch(function (error) {
        console.log("Error: " + JSON.stringify(error));
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    });
}

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
    fetch("http://127.0.0.1:5000/summariseText/" + text)
        .then(async response => await response.text())
        .then(data => displayOutput(data))
        .catch(error => console.error('Error:', error));
}

function displayOutput(text) {
    var outputDiv = document.getElementById('output');
    outputDiv.innerHTML = "<p>" + text + "</p>";
}