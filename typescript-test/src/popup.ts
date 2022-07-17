
function searchRally(){
    const rallyId: HTMLInputElement = document.getElementById('rallyId') as HTMLInputElement;
    chrome.tabs.create({url: `https://rally1.rallydev.com/#/51484715613d/search?keywords=${rallyId?.value}`});
}

function openNewTab(event: any){
    const anchor = event.target;
    
    chrome.tabs.create({url: anchor.href});
}

chrome.history.search({text: "rally1.rallydev.com"}).then((items: chrome.history.HistoryItem[])=>{
    console.log(items);
    const displayItems:chrome.history.HistoryItem[]  = [];
    const urlSet: Set<string> = new Set();
    for(const item of items){
        if(item.url === undefined || urlSet.has(item.url)){
            continue;
        }

        urlSet.add(item.url);
        displayItems.push(item);
        if(displayItems.length >= 10){
            break;
        }
    }
    console.log(displayItems);
    const ul: HTMLUListElement = document.createElement('ul');
    for(const item of displayItems){
        const a: HTMLAnchorElement = document.createElement('a');
        a.href = item.url!;
        a.innerText = item.title!;
        a.addEventListener("click", openNewTab);
        
        const li: HTMLLIElement = document.createElement('li');
        li.appendChild(a);
        ul.appendChild(li);
    }
    document.getElementById("historyArea")!.appendChild(ul);
});

document.getElementById("searchButton")!.addEventListener("click", searchRally);