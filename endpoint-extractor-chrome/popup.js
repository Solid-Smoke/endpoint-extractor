chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: extractEndpoints
      },
      (injectionResults) => {
        const endpoints = injectionResults[0].result;
        const container = document.getElementById('endpoints');
        const copyBtn = document.getElementById('copy-all');
  
        if (!endpoints.length) {
          container.textContent = 'No endpoints found.';
          copyBtn.style.display = 'none';
          return;
        }
  
        container.textContent = endpoints.join('\n');
  
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(endpoints.join('\n')).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = 'Copy All', 1500);
          });
        };
      }
    );
  });
  
  function extractEndpoints() {
    const regex = /(?<=(\"|%27|`))\/[a-zA-Z0-9_?&=\/\-\#\.]*(?=(\"|'|%60))/g;
    const results = new Set();
  
    const scripts = document.getElementsByTagName("script");
    const fetchPromises = [];
  
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src) {
        fetchPromises.push(
          fetch(src)
            .then((res) => res.text())
            .then((text) => {
              const matches = text.matchAll(regex);
              for (const match of matches) {
                results.add(match[0]);
              }
            })
            .catch((e) => console.log("Error fetching script:", src, e))
        );
      }
    }
  
    const pageMatches = document.documentElement.outerHTML.matchAll(regex);
    for (const match of pageMatches) {
      results.add(match[0]);
    }
  
    return Promise.all(fetchPromises).then(() => Array.from(results));
  }
  