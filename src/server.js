import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();

//Define parser for request bodies
app.use(bodyParser.json());

//DB Boilerplate Service
const withDB = async (operations, res) => {
    try{
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db('company-blog');

        await operations(db);
    
        client.close();
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the db', error });
    } 
}

//Define enpoint responses from server
app.get('/api/articles/:name', async (req, res) => {
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articleInfo);
    }, res);
});

app.post('/api/articles/:name/upvote', async (req, res) => {
    const articleName = req.params.name;
    
    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1
            }
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.post('/api/articles/:name/add-comment', async (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;   
    
    withDB(async (db) => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text })
            }
        });
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName });
    
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.listen(8000, () => console.log('Listening on port 8000'));