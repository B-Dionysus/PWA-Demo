import {initialFetch} from "./apiCode"
import {sendTransaction} from "./apiCode"



// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("../service-worker.js", { scope: "/" })
//     .then(() => console.log("Service Worker registered successfully."))
//     .catch(error => console.log("Service Worker registration failed:", error));
// }

initialFetch();

document.querySelector("#add-btn").onclick = function() {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function() {
  sendTransaction(false);
};
