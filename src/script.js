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

  location = `logseq://x-callback-url/quickCapture?url=${tab.url}&title=${
    tab.title
  }&content=${result !== "" ? result : ""}&page=${page}&append=${append}`;

  window.close();
})();
