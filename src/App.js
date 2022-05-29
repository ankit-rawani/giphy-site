import React, {useEffect, useState} from 'react'
import './App.css';
import Searchbar from './components/Searchbar';
import Results from './components/Results';
import useDebounce from './hooks/useDebounce';

function searchGIF(query, offset) {
  return fetch(`http://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${query}&limit=6&offset=${offset}`)
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
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if(debouncedQuery) {
      searchGIF(debouncedQuery, offset).then(res => {
        if(res.meta.status == 200) {
          setIsLoaded(true);
          setdata(res.data);
          setTotal(res.pagination.total_count);
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

  }, [debouncedQuery]);

  return (
    <div className="App">
      <Searchbar query={query} setquery={setquery} />
      <Results isLoaded={isLoaded} data={data} total={total} setOffset={setOffset} currentOffet={offset} />
    </div>
  );
}

export default App;
