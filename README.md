# 🛰️ Endpoint Extractor – Chrome & Mozilla Extensions

**Endpoint Extractor** is a lightweight extension that extracts all endpoints (URLs) found within a web page and its loaded scripts. It's useful for developers, bug bounty hunters, and penetration testers who want quick visibility into API paths, static file endpoints, and more.

---

## ⚙️ Features

- 🔍 Automatically scans HTML and loaded JavaScript files
- 🧠 Smart endpoint detection using regex
- 📋 One-click **Copy All** functionality
- 💡 Minimal, clean UI
- 🧪 Useful for recon, debugging, and security analysis

---

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/8665f91d-0ef5-4173-919b-83292b5bf64b)


---

## 🚀 Installation (Chrome)

### Option 1: Manual Load (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/shamo0/endpoint-extractor.git
   ```

2. Open Chrome & Go to chrome://extensions in your browser.

3. Enable Developer mode (top right).

4. Click "Load unpacked" and select the endpoint-extractor-chrome/ folder.

5. Click the extension icon → see all discovered endpoints.

## 🚀 Installation (Mozilla)

### Option 1: Manual Load (Developer Mode)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/shamo0/endpoint-extractor.git
   ```

2. Open Firefox and go to about:debugging.

3. Click "This Firefox" on the left.

4. Click "Load Temporary Add-on…".

5. Select any file in endpoint-extractor-mozilla folder (e.g., manifest.json).

6. Your extension should now appear in the toolbar — click to test.

   
## Privacy & Permissions
This extension does not collect, store, or transmit any data. It runs entirely in the user's browser and uses only activeTab and scripting permissions to inspect content
