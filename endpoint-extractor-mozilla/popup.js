document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copy-all");
  const filterInput = document.getElementById('filter');
  const output = document.getElementById("endpoints");
  const pathToggle = document.getElementById('path-toggle');
  let cleanPath = '';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTabUrl = new URL(tabs[0].url);
    cleanPath = currentTabUrl.pathname;
  });

  chrome.tabs.executeScript({ code: `(${extractEndpoints.toString()})()` }, (results) => {
    const endpoints = results && results[0] ? results[0] : [];
    

    if (!endpoints.length) {
      output.textContent = "No endpoints found.";
      copyBtn.style.display = "none";
      return;
    }

    const applyFilter = () => {
      const keyword = filterInput.value.trim().toLowerCase();
      const onlyCurrentPath = pathToggle.checked;
      let filtered = endpoints.filter(endpoint =>
        endpoint.toLowerCase().includes(keyword)
      );

      if (onlyCurrentPath) {
        filtered = filtered.filter(endpoint =>
          endpoint.startsWith(cleanPath)
        );
      }

      if (!filtered.length) {
        output.textContent = "No matching endpoints found.";
        copyBtn.style.display = "none";
      } else {
        output.textContent = filtered.join("\n");
        copyBtn.style.display = "block";
      }

      copyBtn.onclick = () => {
        navigator.clipboard.writeText(filtered.join("\n")).then(() => {
          copyBtn.textContent = "Copied!";
          setTimeout(() => copyBtn.textContent = "Copy All", 1500);
        });
      };
    };

    applyFilter();
    filterInput.addEventListener("input", applyFilter);
    pathToggle.addEventListener("change", applyFilter);
  });
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
