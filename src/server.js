import express from 'express';
import bodyParser from 'body-parser';

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: []
    },
    'learn-node': {
        upvotes: 0,
        comments: []
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: []
    }
};
const app = express();

//Deifine parser for request bodies
app.use(bodyParser.json());

//Define enpoint responses from server
app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name; 
    articlesInfo[articleName].upvotes += 1;

    res.status(200).send(`Article ${articleName} now has ${articlesInfo[articleName].upvotes} upvotes.`);
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const articleName = req.params.name; 
    const { username, text } = req.body;
    
    articlesInfo[articleName].comments.push({ username, text });

    res.status(200).send(articlesInfo[articleName]);
})

app.listen(8000, () => console.log('Listening on port 8000'));