(async () => {
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const [result] = await browser.tabs.executeScript({
    file: "result.js",
  });

  const { page } = await browser.storage.sync.get("page");
  const { append } = await browser.storage.sync.get("append");

  const location = `logseq://x-callback-url/quickCapture?page=${page}&append=${append}&title=${
    encodeURIComponent(tab.title)
  }&content=${result ? encodeURIComponent(result) : ""}&url=${encodeURIComponent(tab.url)}`;

  const createdTab = await browser.tabs.create({
    active: false,
    url: location,
  });

  window.setTimeout(() => {
    browser.tabs.remove(createdTab.id);
  }, 5000);
})();
