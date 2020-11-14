let db;
const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.target.result;
  if (event.oldVersion < 1) {
    // Creates an object store with a listID keypath that can be used to query on.
    const pending = db.createObjectStore("pending", {
      autoIncrement:true
    });
    // Creates a statusIndex that we can query on.
    pending.createIndex("nameIndex", "name");
  }
};

request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log( '<li>Error loading database.</li>');
  console.log(event);
};

function saveRecord(record) {
  // create a transaction on the pending db with readwrite access
  // access your pending object store
  // add record to your store with add method.
  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const budgetStore = transaction.objectStore("pending");
  budgetStore.add(record);        
}

function checkDatabase() {

  db = request.result;
  const transaction = db.transaction(["pending"], "readwrite");
  const budgetStore = transaction.objectStore("pending");

  
  const getAll = budgetStore.getAll();
  console.log("get all:");
  console.log(getAll);
  // open a transaction on your pending db
  // access your pending object store
  // get all records from store and set to a variable
  getAll.onsuccess = function () {
    console.log("getall success");
    console.log(getAll);
    if (getAll.result.length > 0) {

      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          db = request.result;
          console.log("celaring?");
          const transaction = db.transaction(["pending"], "readwrite");
          const budgetStore = transaction.objectStore("pending");
          budgetStore.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener('online', checkDatabase);
