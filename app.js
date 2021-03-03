//DOM
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const loaderIcon = document.getElementById('loader');
const quoteIcon = document.getElementById('open-quote');

//Loading icon
function showLoading() {
    loaderIcon.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    loaderIcon.hidden = true;
    quoteContainer.hidden = false;
}

//Fetch the quote from API
async function getQuote() {
    showLoading();
    //To deal with CORS policy by calling proxy API first
    const proxyUrl = "https://glacial-hamlet-22173.herokuapp.com/";

    //Fetch API
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //If there is no author
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Someone Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        console.log(data.quoteText.length)
        console.log(data.quoteText)

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            //Just in case the previous quote was long
            quoteText.classList.remove('long-quote');
        }

        //Assure that it's not the same quote
        if (!(quoteText.innerText === data.quoteText)) {
            quoteText.innerText = data.quoteText;

            quoteIcon.hidden = false;
            hideLoading();
        }
        else {
            getQuote();
        }

    }
    catch (e) {
        getQuote();
        console.log("Failed to get quote, error: ", e);
    }
}

//Tweet a quote using the twitter web intent API
function tweetQuote() {
    //Construct tweet url
    const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.innerText} --- ${authorText.innerText}`;

    //Open in a new window
    window.open(tweetURL, '_blank');
}
//Event listener
const twitterBtn = document.getElementById('twitter');
twitterBtn.addEventListener('click', tweetQuote);

const newQuoteBtn = document.getElementById('new-quote');
newQuoteBtn.addEventListener('click', getQuote);

//Initialise loading page
function initialise() {
    hideLoading();
    quoteIcon.hidden = true;
}

initialise();