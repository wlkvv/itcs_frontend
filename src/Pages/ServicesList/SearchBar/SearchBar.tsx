import "./SearchBar.sass"
import {FaSearch, FaPlus} from "react-icons/fa";
import { useSearch } from '../../../hooks/useSearch.ts';
import { useAuth } from "../../../hooks/users/useAuth.ts";
import { useToken } from "../../../hooks/users/useToken.ts";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const { query, updateQuery } = useSearch();
    const { access_token } = useToken();
    const {is_authenticated, is_moderator, user_name, auth} = useAuth()
    const navigate = useNavigate();
  
    const handleChange = (value: string) => {
      updateQuery(value);
    }
    const handleCreateService = () => {
        navigate("/service/0");
    };

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
            {is_moderator && (
                <button type="button" onClick={handleCreateService} title="Создать новую услугу">
                    <FaPlus className={"search-icon"}/>
                </button>
            )}

        </form>
    )
}

export default SearchBar;