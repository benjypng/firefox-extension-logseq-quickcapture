const main = async () => {
  const getCurrentTab = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    return tab;
  };

  const buildURL = async () => {
    const { page } = await browser.storage.sync.get("page");
    const { append } = await browser.storage.sync.get("append");
    const tab = await getCurrentTab();

    // browser.tabs.executeScript is different from Chrome
    const [result] = await browser.tabs.executeScript(tab.id, {
      file: "result.js",
    });

    let url;
    if (page === "cursor") {
      url = `logseq://x-callback-url/quickCapture?page=""&append=false&title=${encodeURIComponent(
        tab.title,
      )}&content=${encodeURIComponent(result)}&url=${encodeURIComponent(tab.url)}`;
    } else {
      url = `logseq://x-callback-url/quickCapture?page=${page}&append=${append}&title=${encodeURIComponent(
        tab.title,
      )}&content=${encodeURIComponent(result)}&url=${encodeURIComponent(tab.url)}`;
    }
    return url;
  };

  const url = await buildURL();
  const tab = await browser.tabs.create({
    active: true,
    url,
  });
  setTimeout(async () => {
    await browser.tabs.remove(tab.id);
  }, 1000);
};

main();
