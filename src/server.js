import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

//Deifine parser for request bodies
app.use(bodyParser.json());

//Define enpoint responses from server
app.get('/api/articles/:name', async (req, res) => {
    try{
        const articleName = req.params.name;
    
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('company-blog');
        
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articleInfo);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the db', error });
    } 
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    try{
        const articleName = req.params.name; 
    
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('company-blog');
        
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1
            }
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticleInfo)
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the db', error });
    } 
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const articleName = req.params.name; 
    const { username, text } = req.body;
    
    articlesInfo[articleName].comments.push({ username, text });

    res.status(200).send(articlesInfo[articleName]);
});

app.listen(8000, () => console.log('Listening on port 8000'));