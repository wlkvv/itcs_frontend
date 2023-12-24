import "./SearchBar.sass"
import {FaSearch} from "react-icons/fa";
import { useSearch } from '../../../hooks/useSearch.ts';

const SearchBar = () => {
    const { query, updateQuery } = useSearch();
  
    const handleChange = (value: string) => {
      updateQuery(value);
    }

    return (
        <form className="search-bar-wrapper" action="/api/services/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </form>
    )
}

export default SearchBar;