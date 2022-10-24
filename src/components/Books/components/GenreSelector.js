import { useState, useEffect } from "react";
import { Chip } from "@mui/material";

const genreArray = [
    'Comedy',
    'Science fiction',
    'Biography',
    'Triller',
    'Action',
    'Comic',
    'Mystery',
    'Historical'
];

export const GenreSelector = ({ onGenreChange, initialValue }) => {

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const genre = [];

        genreArray.map(() => genre.push(false));

        if (initialValue) {
            let index = genreArray.findIndex((val) => val === initialValue);
            genre[index] = true;
        }

        setGenre(genre);
    }, [initialValue])

    const changeHandler = (index) => {
        const temp = Array(genre.length).fill(false);
        temp[index] = true;
        let idx = temp.findIndex((val) => val === true);
        setGenre(temp);
        onGenreChange(genreArray[idx]);
    }


    return <div className="genreSelector my-2">
        <h5 className="my-2">Select Genre</h5>
        <div className='col'>
            {
                genreArray.map((key, index) => <Chip
                    label={key}
                    key={key}
                    className={`me-2 my-2 ${genre[index] && 'bg-dark text-white'}`}
                    onClick={() => changeHandler(index)} />)
            }
        </div>
    </div>
}