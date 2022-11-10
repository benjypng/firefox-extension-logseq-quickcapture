(async () => {
  const [tab] = await browser.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });

  const [result] = await browser.tabs.executeScript({
    file: "result.js",
  });

  location = `logseq://x-callback-url/quickCapture?url=${tab.url}&title=${
    tab.title
  }&content=${result ? result : ""}`;

  window.close();
})();
