$("#search").change(() => {
  $("#bookmarks").empty();
  const query = $("#search").val();
  dumpBookmarks(query);
});

function dumpBookmarks(query) {
  chrome.bookmarks.getTree((treeNodes) => {
    console.log(treeNodes);
    const bookmarkList = dumpTreeNodes(treeNodes, query);
    $("#bookmarks").append(bookmarkList);
  });
}

function dumpTreeNodes(treeNodes, query) {
  const list = $("<ul>");
  for (let treeNode of treeNodes) {
    const item = dumpNode(treeNode, query);
    list.append(item);
  }
  return list;
}

function dumpNode(treeNode, query) {
  const hasChild =
    treeNode.children !== undefined && treeNode.children.length > 0;

  if (treeNode.title === undefined) {
    if (hasChild) {
      return dumpTreeNodes(treeNode.children, query);
    } else {
      return;
    }
  }

  if (query && !hasChild) {
    if (treeNode.title.toLowerCase().indexOf(query.toLowerCase()) === -1) {
      return;
    }
  }

  const li = $("<li>");

  const anchor = $("<a>");
  anchor.text(treeNode.title);
  //   const httpRequest = new XMLHttpRequest();
  //   httpRequest.open(
  //     "GET",
  //     "http://www.google.com/s2/favicons?domain=stackoverflow.com",
  //     false
  //   );
  //   httpRequest.send();
  //   console.log(httpRequest.responseText);

  const span = $("<span>");

  if (treeNode.url !== undefined && treeNode.url !== "") {
    const img = $("<img>");
    const domain = new URL(treeNode.url).hostname;
    img.attr("src", `https://www.google.com/s2/favicons?domain=${domain}`);
    span.append(img);
  }
  span.append(anchor);

  li.append(span);

  if (hasChild) {
    const childList = dumpTreeNodes(treeNode.children, query);
    li.append(childList);
  } else {
    anchor.attr("href", treeNode.url);
    anchor.click(() => {
      chrome.tabs.create({ url: treeNode.url });
    });
  }

  return li;
}

document.addEventListener("DOMContentLoaded", () => {
  dumpBookmarks();
});
