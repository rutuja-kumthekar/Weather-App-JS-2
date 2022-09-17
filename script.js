let loc =document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempvalue=document.getElementById("temp-value");
let climate =document.getElementById("climate");
let iconfile;
const searchInput=document.getElementById("search-input");
const searchButton=document.getElementById("search-button");

// Stop Browser Refresh
searchButton.addEventListener('click', (e)=>
{

e.preventDefault();
getWeather(searchInput.value);// Function someone click on function call this function.
searchInput.value='';


});

//------------------------------ CODE FOR ALL CITIES---------------------------------------

const getWeather=async (city)=>
{
// for wrong input use try and catch method.
    try{

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dab3af44de7d24ae7ff86549334e45bd`,
            // Instead of cors locally use https:// and mode:'Cors'
            {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        
        loc.textContent=name;
        climate.textContent=main;
        tempvalue.textContent=Math.round(feels_like-273);
      //-----------------------------------------------------------------------------  
        // Weather condition codes.
        if(id<300 && id>200)
        {
            //flaticon.com
            tempicon.src="./icons/thunderstorm.svg"
        }
       else  if(id<400 && id>300)
        {
            tempicon.src="./icons/cloud-solid.svg"
        }
       else if(id<600&& id>500)
        {
            tempicon.src="./icons/rain.svg"
        }
       else  if(id<700 && id>600)
        {
            tempicon.src="./icons/snow.svg"
        }
       else  if(id<800 && id>700)
        {
            tempicon.src="./icons/clouds.svg"
        }
         else if(id==800)
        {
            tempicon.src="./icons/clouds-and-sun.svg"
        }
    }
catch(error)
{
    alert('city not found');
}

};



//--------------------------------------CODE FOR CURRENT LOCATION.--------------------------------------------
// Longitude and Latitude

window.addEventListener("load" ,()=>{

let long;
let lat;

// Allow the Location.
if(navigator.geolocation)
{
    // current location.
    navigator.geolocation.getCurrentPosition((position)=>
    {

   
    
    long=position.coords.longitude;
    lat=position.coords.latitude;
    
    // Create the local server. 
    const proxy="https://cors-anywhere.herokuapp.com/";
            
        // Store the Api.  
        // Cordinate API From geolocation co-ordinate
        const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=dab3af44de7d24ae7ff86549334e45bd     `

        fetch(api).then((response)=>{
                
                
            return response.json();


        })

        .then (data =>
            {
                    // JSON to Normal Javascript
                    const{name}=data;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];

                    // Current Data 
                    loc.textContent=name;
                    climate.textContent=main;
                    tempvalue.textContent=Math.round(feels_like-273);// Temp in kelvin.
                    
                     // Weather condition codes.
                    if(id<300 && id>200)
                    {
                        tempicon.src="./icons/thunderstorm.svg"
                    }
                   else  if(id<400 && id>300)
                    {
                        tempicon.src="./icons/cloud-solid.svg"
                    }
                   else if(id<600&& id>500)
                    {
                        tempicon.src="./icons/rain.svg"
                    }
                   else  if(id<700 && id>600)
                    {
                        tempicon.src="./icons/snow.svg"
                    }
                   else  if(id<800 && id>700)
                    {
                        tempicon.src="./icons/clouds.svg"
                    }
                     else if(id==800)
                    {
                        tempicon.src="./icons/clouds-and-sun.svg"
                    }
                       console.log(data);


            })
}

 )}
})
