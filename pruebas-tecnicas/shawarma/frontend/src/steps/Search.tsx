import {useEffect, useState} from 'react';
import {type Data} from '../types';
import {searchData} from '../services/search';
import {toast} from 'sonner';
import {useDebounce} from '@uidotdev/usehooks';

const DEBOUNCE_TIME = 500;

export const Search = ({initialData}: {initialData: Data}) => {
  const [data, setData] = useState<Data>(initialData);
  const [search, setSearch] = useState<string>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('q') ?? '';
  });
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    // update url
    const newPathname =
      debouncedSearch === ''
        ? window.location.pathname
        : `?q=${debouncedSearch}`;

    window.history.replaceState({}, '', newPathname);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!debouncedSearch) {
      setData(initialData);
      return;
    }

    //lamar a la api para filtrar los resultados
    searchData(debouncedSearch).then((res) => {
      const [err, newData] = res;

      if (err) {
        toast.error(err.message);
        return;
      }

      if (newData) setData(newData);
    });
  }, [debouncedSearch, initialData]);

  return (
    <div>
      <h1>Search</h1>
      <form action="">
        <input
          onChange={handleSearch}
          type="search"
          placeholder="Buscar informacion..."
          defaultValue={search}
        />
        <ul>
          {data.map((row) => (
            <li key={row.id}>
              <article>
                {Object.entries(row).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong>
                    {value}
                  </p>
                ))}
              </article>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
};
