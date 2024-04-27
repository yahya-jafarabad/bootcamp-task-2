const Btn_GetTransactions = document.querySelector(".get-transactions");
const Dom_Transactions_list = document.querySelector(".dom-transactions-list");
const Search_Input = document.querySelector(".search-input");


//* BASE-URL
const app = axios.create({
   baseURL: 'http://localhost:3000'
});

//* VARIABLE
let MyDate = new Date();
let All_Transactions = [];
const filters = {
   Search_values: "",
};

document.addEventListener("DOMContentLoaded", () => {
   app
      .get("/transactions")
      .then((res) => {
         All_Transactions = res.data;
      })
      .catch((err) => console.log(err.message));
});

//* GET ALL TRANSACTIONS
Btn_GetTransactions.addEventListener("click", () => {
   Btn_GetTransactions.textContent = "همه تراکنش ها";
   Dom_Transactions_list.innerHTML = "";
   Transactions_list(All_Transactions);
   Sort_Price();
});

//* SEARCH BOX
Search_Input.addEventListener("input", (e) => {
   filters.Search_values = e.target.value;
   if (filters.Search_values != "") {
      Dom_Transactions_list.innerHTML = "";
      app.get(`/transactions?refId_like=${filters.Search_values}`).then((res) => {
         const filterd = res.data;
         Transactions_list(filterd);
      }).catch((err) => { console.log(err.message); });
   } else if (filters.Search_values == "") {
      Dom_Transactions_list.innerHTML = "";
      Transactions_list(All_Transactions);
   }
});

//* SORT-DATE
function Sort_Price () {
   const select = document.querySelectorAll("#sort_price , #sort_date");
   select.forEach((s) => {
      s.addEventListener("change", (e) => {
         const filter = e.target.value;
         const Set = e.target.dataset.set;
         app.get(`transactions?_sort=${Set}&_order=${filter}`).then((res) => {
            const Filterd_Transaction = res.data;
            Dom_Transactions_list.innerHTML = "";
            Transactions_list(Filterd_Transaction);
         }).catch((err) => { console.log(err.message); });
      });
   });
}

//* TRANSACTIONS-LIST
function Transactions_list (all) {
   return all.forEach((item) => {
      const time = Get_Time(item.date);
      const date = Get_Date(item.date);
      const dom = document.createElement("tr");
      dom.innerHTML = `
        <td class="p-5" id="row">${item.id}</td>
        <td class="" id="transaction">${item.type}</td>
        <td class="" id="price">${item.price}</td>
        <td class="" id="tracking">${item.refId}</td>
        <td class="" id="date"><span>${date}</span> <span>ساعت ${time}</span></td>`;
      Dom_Transactions_list.appendChild(dom);
   });
}


//* Get_Date & Get_Time
function Get_Date (date_item) {
   let UTC = date_item;
   let date = new Date(UTC);
   return now_date = date.toLocaleDateString("fa");
}
function Get_Time (date_item) {
   let UTC = date_item;
   let date = new Date(UTC);
   let now_date = date.toLocaleDateString("fa");
   return now_time = date.toLocaleTimeString("fa", { hour: "2-digit", minute: "2-digit" });
}