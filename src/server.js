import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid';

var moodIntances = [];

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/all', (req, res) => {

    res.status(200).json(moodIntances)
});

app.get('/:username', (req, res) => {
    const { username } = req.params;
    var history = moodIntances.filter( mood => {
        if(mood.username === username) {
            return true;
        }
        return false;
    });
    console.log("history: ", history);
    res.status(200).json(history);
});


app.post('/:username', (req, res) => {
    var insertMood = req.body;
    if(insertMood) {
        delete insertMood.showTimeline;
        delete insertMood.history;        
        moodIntances.push(insertMood);
        res.status(200).json(insertMood);
    } else {
        res.status(400).json({ message: 'Request body should be a mood' });
    }
    // if (text) {
    //     fakeTodos.push(insertedTodo);
    //     res.status(200).json(insertedTodo);
    // } else {
    // }
});

app.listen(8080, () => console.log("Server listening on port 8080"));