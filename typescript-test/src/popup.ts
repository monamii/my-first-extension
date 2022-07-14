
function searchRally(){
    const rallyId: HTMLInputElement = document.getElementById('rallyId') as HTMLInputElement;

    console.log(rallyId);
    console.log(rallyId?.value);
    chrome.tabs.create({url: `https://rally1.rallydev.com/#/51484715613d/search?keywords=${rallyId?.value}`});
}

document.getElementById("searchButton")!.addEventListener("click", searchRally);