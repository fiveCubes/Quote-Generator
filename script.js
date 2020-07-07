//Get quote from api

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function loading()
{
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading 
function complete()
{
  if(!loader.hidden)
  {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
async function getQuote()
{
  loading();
  const proxyUrl = 'https://stark-wave-63975.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
      const response = await fetch(proxyUrl+apiUrl);
      const data = await response.json();
      console.log(data);

      if(data.quoteAuthor ==="")
      {
        authorText.innerText= "Unknown";
      }
      else
      {
      authorText.innerText= data.quoteAuthor;
      }
      //add and remove class based on text length to reduce font size of longer text.
      if(data.quoteText.length >120)
      {
          quoteText.classList.add('long-quote');
      }
      else
      {
       quoteText.classList.remove('long-quote');
      }

      quoteText.innerText = data.quoteText;
      
      complete();
      
  }
  catch(error)
  {
      getQuote();
      console.log('whoops, no quote ' ,error);
  }
}

function tweetQuote()
{
  const quote = quoteText.innerHtml;
  const author = authorText.innerHtml;
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl,'_blank');
}

//Event Listeners

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);


//onload
getQuote();
