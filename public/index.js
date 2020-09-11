import  './app.js';


window.addEventListener('load', () => {
    fetchWeatherApp();
    registerSW();
});

async function fetchWeatherApp(){
    
    const json = await res.json();

    const main = document.querySelector('main');

    json.article.forEach(article =>{
        const el = document.createElement('app.js');
        el.article = article;
        main.appendChild(el)
    })

    

}

async function registerSW() {
    if ('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('./sw.js');
        }catch(e){
            console.log(`SW registration failed`)
        }
    }
}