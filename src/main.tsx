
import { createRoot } from 'react-dom/client'
import './styles/styles.scss'
import App from './components/App/App.tsx'
import { BrowserRouter } from 'react-router-dom'

function setupNetworkLoader() {
  const loaderEl = document.getElementById("network-loader");

  if (!loaderEl) return;

  let pending = 0;
  let receivedData = false;
  let showTimer: number | null = null;
  const showDelayMs = 200;

  const show = () => {
    loaderEl.classList.remove("network-loader--hidden");
    loaderEl.setAttribute("aria-hidden", "false");
  };

  const hide = () => {
    loaderEl.classList.add("network-loader--hidden");
    loaderEl.setAttribute("aria-hidden", "true");
  };

  const cancelScheduledShow = () => {
    if (showTimer === null) return;
    window.clearTimeout(showTimer);
    showTimer = null;
  };

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (...args) => {
    if (pending === 0) {
      receivedData = false;
    }

    pending++;
    if (showTimer === null && loaderEl.classList.contains("network-loader--hidden")) {
      showTimer = window.setTimeout(() => {
        showTimer = null;

        if (pending > 0 || !receivedData) {
          show();
        }
      }, showDelayMs);
    }
    let requestReceivedData = false;

    try {
      const response = await originalFetch(...args);

      if (response.ok) {
        try {
          await response.clone().json();
          requestReceivedData = true;
        } catch {
          // The caller handles response body errors through its normal fetch flow.
        }
      }

      return response;
    } finally {
      pending = Math.max(0, pending - 1);
      receivedData = receivedData || requestReceivedData;

      if (pending === 0 && receivedData) {
        cancelScheduledShow();
        hide();
      }
    }
  };
}

setupNetworkLoader();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)