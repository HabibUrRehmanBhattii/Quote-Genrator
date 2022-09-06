const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuots = [];

// When Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden=true;
}

// When Loading completed

function completed() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Get a new Quotes
function newQuote() {
    loading();
  //Random selector
  const quote = apiQuots[Math.floor(Math.random() * apiQuots.length)];
  // If author is null filled it with Unkown Author
  if (!quote.author) {
    authorText.textContent = "Unkown";
  } else {
    authorText.textContent = quote.author;
  }
  //If quote lenght is long change class

  if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  //Hide loader after getting quote
  completed();
}

// Get Quotes from API
async function getQuotes() {
    loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuots = await response.json();
    newQuote();
  } catch (error) {
    //Handle Error
    console.log("Whoops, no quotes", error);
  }
}

//Tweet Quote

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_black");
}

//Event Listener
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// Run when Load

getQuotes();
