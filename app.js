const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let movies = [
    { id: 1, title: "Drishaym", genre: "Crime-Thriller", releaseYear: 2013, rating: 8.3 },
    { id: 2, title: "Luficer", genre: "Action-Thriller", releaseYear: 2018, rating: 7.5 },
    { id: 3, title: "Narasimham", genre: "Action-Drama", releaseYear: 2000, rating: 7.6 },
];

// GET 
app.get('/movies', (req, res) => {
    res.json(movies);
});

// GET - ID
app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
});

// POST
app.post('/movies', (req, res) => {
    const { title, genre, releaseYear, rating } = req.body;
    if (!title || !genre || !releaseYear || rating == null) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newMovie = {
        id: movies.length ? movies[movies.length - 1].id + 1 : 1,
        title,
        genre,
        releaseYear,
        rating,
    };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

// PATCH 
app.patch('/movies/:id', (req, res) => {
    const { rating } = req.body;
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    if (rating == null) {
        return res.status(400).json({ message: 'Rating is required' });
    }
    movie.rating = rating;
    res.json(movie);
});

// DELETE 
app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' });
    const deletedMovie = movies.splice(movieIndex, 1);
    res.json(deletedMovie[0]);
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
