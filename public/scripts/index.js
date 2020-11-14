import {initialFetch} from "./apiCode"
import {sendTransaction} from "./apiCode"


initialFetch();

document.querySelector("#add-btn").onclick = function() {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function() {
  sendTransaction(false);
};
