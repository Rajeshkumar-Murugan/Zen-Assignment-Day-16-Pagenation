let i = 0; //for loop index value intialization
let g=0; // previous button count
let last= 0; // last button
let next=0;

// creating HTML code in JS starts
const Alignment = document.createElement("div");
Alignment.setAttribute("class", "Alignment");
document.body.append(Alignment);

const tableResponsive = document.createElement("div");
tableResponsive.setAttribute("class", "table-responsive");
tableResponsive.setAttribute("id", "name");
Alignment.append(tableResponsive);

const Container = document.createElement("div");
Container.setAttribute("class", "d-flex justify-content-center");
Container.setAttribute("id", "buttons");
Alignment.append(Container);
  
const table = document.createElement("table");
table.setAttribute("class", "table table-bordered")
table.setAttribute("id", "table")
tableResponsive.append(table);

const thead = document.createElement("thead");
thead.setAttribute("class", "thead")

const tbody = document.createElement("tbody");
tbody.setAttribute("class", "tbody")

table.append(thead, tbody);

thead.innerHTML = `
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
  `

// creating HTML code in JS starts

// Async function to fetch json file starts
async function userdetails() {
  const data = await fetch("https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", { method: "GET" });
  const users = await data.json();
  return users;
  
}


// Async function to fetch json file ends

// Async function to display values on the table starts
async function displayuser(i) {
  let arrlength = i + 10;
  console.log("arrlenght"+arrlength)
 //Condition for previous button Starts
  if(i == 0 ){
    g=0; 
  }
  else if(i > 0)
  {
     g=i-10;
    }
       
 //Condition for previous button Ends

  //Condition for next button Starts
  if(i == 90){
    next=90;
    console.log("Next i: "+i)
    console.log("Next value: "+g) 
     
  }
  else if(i >= 0)
  {
     next=i+10;
    console.log("Next i: "+i) 
    console.log("Next value: "+g) 
    }
       
 //Condition for next button Starts

  const user = await userdetails();

  tbody.innerHTML = ""; //whipping table data
  
  //for loop to display table and data starts 
  for (; i < arrlength; i++) {
    const Cols = document.createElement("tr");
    Cols.setAttribute("class", "trow");
    Cols.setAttribute("id", "tr");
    tbody.append(Cols);

    Cols.innerHTML += `
   
    <td>${user[i].id}</td>
    <td>${user[i].name}</td>
    <td>${user[i].email}</td>
   
   `;
  }
   //for loop to display table and data ends
}

// Async function to display values on the table starts
displayuser(0)

async function lastbutton(){
    const details = await userdetails();
    last = details.length-10
    return details
}
lastbutton()

//Pagination buttons starts
Container.innerHTML += ` 
<button onClick="displayuser(i)"  class="btn active">First</button>
<button onClick="displayuser(last)"  class="btn">Last</button>
<button onClick="displayuser(next)"  class="btn">Next</button>
<button onClick="displayuser(g)"  class="btn">Previous</button>
<button onClick="displayuser(i)"  class="btn">1</button>`

for(let j=0; j<9; j++){
   Container.innerHTML += `<button onClick="displayuser(${j*10+10}, ${j+2})"  class="btn">${j+2}</button>`  
}
//Pagination buttons Ends

// condition to update the active button class starts
var header = document.getElementById("buttons");
var btns = header.getElementsByClassName("btn");
for (let l = 0; l < btns.length; l++) {
  btns[l].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
// condition to update the active button class starts