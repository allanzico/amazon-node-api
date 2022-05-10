const express = require ('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;



 const generateScrapeUrl = (apiKey) =>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/',(req, res) => {
res.send('WELCOME TO THIS SERVER');
});


//Get product details
app.get('/products/:productId', async(req, res)=> {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.de/-/en/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//Get product reviews
app.get('/products/:productId/reviews', async(req, res)=> {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.de/product-reviews//${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//Get product offers
app.get('/products/:productId/offers', async(req, res)=> {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.de/dp/offer-listing/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//Get From search term
app.get('/search/:searchQuery', async(req, res)=> {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScrapeUrl(api_key)}&url=https://www.amazon.de/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () =>console.log(`server running on port ${PORT}`));