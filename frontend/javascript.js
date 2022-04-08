var url = "http://localhost:3000/attekintes";
var id = "attekintes";

async function generator(url, id) {
    var request = await new XMLHttpRequest()

request.open('GET', url, true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
view(data, request, id);

}

request.send()
  }

  function view(data, request, id){
      if(id == "attekintes"){
    if (request.status >= 200 && request.status < 400) {
         data.forEach((query) => {
          console.log(request.status);
          var div = document.createElement("tr");
            var mainContainer = document.getElementById(id);
          div.innerHTML = "<td>"+query.id+"</td>"+
          "<td><input id='veznev"+query.id+"' placeholder='"+query.veznev+"' value='"+query.veznev+"'/></td>"+
          "<td><input id='kernev"+query.id+"' placeholder='"+query.kernev+"' value='"+query.kernev+"'/></td>"+
          "<td><input id='email"+query.id+"' placeholder='"+query.email+"' value='"+query.email+"'/></td>"+
          "<td><input id='osztaly"+query.id+"' placeholder='"+query.osztaly+"' value='"+query.osztaly+"'/></td>"+
          "<td><button class='btn btn-danger' onclick = 'deleterecord("+query.id+")' type = 'submit' value='Submit'>Törlés</button>"+
          "<button class='btn btn-warning ml-2' onclick = 'update("+query.id+")'>Mentés</button></td>" ;
          mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
await generator(url, id);
}

function deleterecord(id){
  navigator.sendBeacon('http://localhost:3000/torles/'+ id);
  console.log(id);
}
function update(id){
  const data = id + ";"+ document.getElementById("veznev"+id).value + ";"+ document.getElementById("kernev"+id).value + ";"+ document.getElementById("email"+id).value + ";"+ document.getElementById("osztaly"+id).value;
  
  navigator.sendBeacon('http://localhost:3000/frissites/'+ data);
  console.log(data);
}

generate_html();