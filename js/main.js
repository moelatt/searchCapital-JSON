const search = document.getElementById('search')
const matchList = document.getElementById('match-list')
const textArea = document.querySelector('#search');
const resetButton = document.querySelector('#resetBtn');

// Search states.json and filter it
const searchStates = async searchText =>{
    const res = await fetch('https://moelatt.github.io/searchCapital-JSON/data/states.json');
    const states = await res.json();

    // get matches to current text input
    let matches = states.filter(state =>{
        const regex = new RegExp(`^${searchText}`, 'gi'); // (^)mean match first letter only, (gi) globla incensitive it will match upper case or lower case.
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(searchText.length == 0){
        matches = [];
        matchList.innerHTML = '';
    }
    outputHTML(matches);
}
const outputHTML = matches => {
    if(matches.length > 0){
        const html = matches.map(eachMatch => 
            `<div class = "card card-body mb-1">
            <h4> 
            <a href ="https://www.google.com/maps/place/${eachMatch.capital}/@${eachMatch.lat}, ${eachMatch.long}" target = "_blank"/>
                ${eachMatch.name}(${eachMatch.abbr}) 
                <span class = "text-primary">
                    ${eachMatch.capital}
                </span>
            </h4>
            please click to see the area on google map
            </div>`).join('');
           
            matchList.innerHTML = html;
    }
}

function resetTextArea(){
    textArea.value = '';
    matchList.value = '';
}

resetButton.addEventListener('click', resetTextArea);
search.addEventListener('input', () => searchStates(search.value));
{/* <small> Lat: ${eachMatch.lat} / Long: ${eachMatch.long}</small> */}
