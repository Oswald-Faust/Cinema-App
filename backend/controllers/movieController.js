import asyncHandler from "express-async-handler"
import Movie from "../models/Movie.js";
import { Movies } from "../Data/movie.js";

const importMovie = asyncHandler(async(req, res) => {
    await Movie.deleteMany({});

    const movies = await Movie.insertMany(Movies);
    res.status(201).json(movies);
});

const createMovie = asyncHandler(async(req, res) => {
    try {

        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        const movie = new Movie({
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._Id,       
        });

        if (movie) {
            const createMovie = await movie.save();
            res.status(201).json(createMovie);
        } else {
            res.status(400);
            throw new Error("Invalid movie data");
        }
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
});

const deleteMovie = asyncHandler(async(req, res) => {
    try {
        const movie = await Movie.findById()
        if (movie) {
            await movie.remove();
            res.json({message : "Movie removed"});
        }
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch(error) {
        res.status(400).json({message : error.message});
    }
})

const deleteAllMovies = asyncHandler(async(req, res) => {
    try {
        await Movie.deleteMany({});
        res.json({message: "All movies removed"});
    } catch (error) {
        res.status(400).json({message : error.message}); 
    }
});

const updateMovie = asyncHandler(async(req, res) => {
    try {

        const {
            name,
            desc,
            image,
            titleImage,
            rate,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        const movie = await Movie.findById(req.params.id);
        if (movie) {
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;
        
            const updateMovie = await movie.save();
            res.status(201).json(updateMovie);
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message : error.message});
    }
})

const getMovies = asyncHandler(async(req, res) => {
    try {
        //choisir les films avec les differents filtres
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name : { $regex : search, $options: "i"} }),
        }

        const page = Number(req.query.pageNumber) || 1 ;
        const limit = 2;
        const skip = (page - 1) * limit;

        const movies = await Movie.find(query)
        .sort({createdAt: -1 })
        .skip(skip)
        .limit(limit);
 
        const count = await Movie.countDocuments(query);
        res.json({ movies, page, pages: Math.ceil(count/limit), totalMovies: count });

    } catch (error) {
        res.statuts(400).json({message : error.message  })
    }
})

const getMoviesbyId = asyncHandler(async(req, res) => {
    try {
        //choisir les films avec l'id du film
       const movie = await Movie.findById(req.params.id)
       if (movie) {
        res.json(movie);
       } else {
        res.status(404);
        throw new Error("Movie not found");
       }
    } catch (error) {
        res.statuts(400).json({message : error.message  })
    }
})

const getRandomMovies = asyncHandler(async(req, res) => {
    try {
        
        const movies = await Movie.aggregate([{ $sample : { size : 8} }])
    res.json(movies);
    } catch (error) {
        res.statuts(400).json({message : error.message })
    }
});

export {createMovie,
    deleteMovie,
    updateMovie,
    deleteAllMovies,
    getMovies,
    getMoviesbyId,
    getRandomMovies,
    importMovie,
}