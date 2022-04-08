
function sendPost(){
    const data = document.getElementById("veznev").value+";"+document.getElementById("kernev").value+";"+document.getElementById("email").value+";"+document.getElementById("osztaly").value;
    console.log(data);
      navigator.sendBeacon('http:localhost:3000/feltoltes/'+ data);
      console.log(data);
    }
