const city =document.querySelector(".city");
const temp=document.querySelector(".temp");
const icon=document.querySelector("#icon");
const descript=document.querySelector("#description");

function geoFindMe() {

   
              
     
  
      function success(position) {
        const latitude  = (position.coords.latitude).toPrecision(5);
        const longitude = (position.coords.longitude).toPrecision(5);
        console.log(longitude);
        console.log(latitude);
        
        const api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d605c1e48e548149beb92b9e0190091f`;
      
        fetch(api)
    .then((response)=>
    {
      return response.json();
    })
    .then(data=>{

      const{name}=data;
      const{feels_like}=data.main;
      const{id}=data.weather[0];
      const{main}=data.weather[0];

      var src;
      if(id>=200 && id<=250)
      {
        src="thunderstorm.png";
      }
     
      else if(id>=300 && id<=550)
      {
        src="rain.png";
      }
      else if(id>=600 && id<=630)
      {
        src="snow.png";
      }
      else if(id>=700 && id<=790)
      {
        src="mist.png";
      }
      else if(id==800)
      {
        src="clear.png";
      }
      else if(id>=801 && id<=806)
      {
        src="cloud.png";
      }
      console.log(main);
      $("#heading").remove();
      $("#locate").remove();
      $("#button").remove();
      city.innerHTML=name.toUpperCase();
      icon.innerHTML=`<img src="img/${src}">`;
      descript.textContent=main.toUpperCase();
        
      
      
      const celsius=((feels_like)-273).toPrecision(3);
      document.querySelector("#msg").innerHTML="<h3>CURRENT WEATHER FEELS LIKE</h3>";
      temp.innerHTML =  `${celsius}<span>&#176<\span>C`;

     
    })
        
      }
    
      function error() {
       
        $("#heading").remove();
      $("#locate").remove();
      $("#button").remove();
        city.innerHTML = 'UNABLE TO RETRIEVE YOUR LOCATION<br>PLEASE TRY AGAIN!';
      }
    
      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
      }
  
      
    
    }

    document.querySelector("#button").addEventListener('click',geoFindMe,100);