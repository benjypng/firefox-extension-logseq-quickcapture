(async function () {
  async function getCurrentTab() {
    let [tab] = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    return tab;
  }

  async function buildURL() {
    const { page } = await browser.storage.sync.get("page");
    const { append } = await browser.storage.sync.get("append");
    const tab = await getCurrentTab();

    const [result] = await browser.tabs.executeScript({
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
  }

  const url = await buildURL();

  const tab = await browser.tabs.create({
    active: false,
    url,
  });

  setTimeout(async () => {
    await browser.tabs.remove(tab.id);
  }, 100);
})();
