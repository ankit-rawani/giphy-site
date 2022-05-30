import React, {useEffect, useState} from 'react'
import './App.css';
import Searchbar from './components/Searchbar';
import Results from './components/Results';
import useDebounce from './hooks/useDebounce';
import Loading from './components/Loading';

function searchGIF(query, offset) {
  return fetch(`https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}&limit=6&offset=${offset}`)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      return [];
    });
}

function App() {
  const [query, setquery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if(debouncedQuery) {
      const offset = (page-1)*6;
      searchGIF(debouncedQuery, offset).then(res => {
        if(res.meta.status === 200) {
          setIsLoaded(true);
          setdata(res.data);
          setTotal(Math.min(res.pagination.total_count, 4999));
          console.log(res);
        }
        else {
          setIsLoaded(false);
          setdata([]);
        }
      });
    }
    else {
      setdata([]);
      setIsLoaded(true);
    }

  }, [debouncedQuery, page]);

  return (
    <div className="App">
      <Searchbar query={query} setquery={setquery} />
      {
        debouncedQuery ? 
        (<Results 
          isLoaded={isLoaded} 
          data={data} 
          total={total} 
          setPage={setPage} 
          currentPage={page} 
        />) : (
          <div>
            <h1>Type something to search giphy...</h1>
            <Loading />
          </div>
        )
      }
    </div>
  );
}

export default App;
