import React from 'react'
import { useState } from 'react'
import { useGetNewMoviesQuery, useGetTopMoviesQuery, useGetRandomMoviesQuery } from '../../redux/api/movies';
import { useFetchGenresQuery} from '../../redux/api/genre';
import SliderUtil from '../../components/SliderUtil';


const MoviesContainerPage = () => {

    const { data } = useGetNewMoviesQuery();
    const { data: topMovies } = useGetTopMoviesQuery();
    const { data: genres } = useFetchGenresQuery();
    const { data: randomMovies } = useGetRandomMoviesQuery();
  
    const [selectedGenre, setSelectedGenre] = useState(null);
  
    const handleGenreClick = (genreId) => {
      setSelectedGenre(genreId);
    };
  
    const filteredMovies = data?.filter(
      (movie) => selectedGenre === null || movie.genre === selectedGenre
    );
  
    return (
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <nav className=" ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
          {genres?.map((g) => (
            <button
              key={g._id}
              className={`transition duration-300 ease-in-out hover:bg-gray-400 block p-2 rounded mb-[1rem] text-lg ${
                selectedGenre === g._id ? "bg-gray-400" : "" }`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </nav>
  
        <section className="flex flex-col justify-center items-center w-full lg:w-auto px-10">
          <div className="w-full lg:w-[80rem] mb-8 ">
            <h1 className="mb-5 font-semibold border-b-2 border-gray-500">Choose For You 🎞️</h1>
            <SliderUtil data={randomMovies} />
          </div>
  
          <div className="w-full lg:w-[80rem] mb-8">
            <h1 className="mb-5 font-semibold border-b-2 border-gray-500">Top Movies ⭐</h1>
            <SliderUtil data={topMovies} />
          </div>
  
          <div className="w-full lg:w-[80rem] mb-8">
            <h1 className="mb-5 font-semibold border-b-2 border-gray-500">Choose Movie 🎥</h1>
            <SliderUtil data={filteredMovies} />
          </div>
        </section>
      </div>
    );
  };
  
  export default MoviesContainerPage;