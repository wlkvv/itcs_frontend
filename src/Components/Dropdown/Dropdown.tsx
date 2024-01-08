import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styles from "./dropdown.module.scss";
import { setDropdownValueId, setDropdownValueName } from "../../store/filtersSlices"; // Проверьте правильность пути
import Option from "../../Types";

export type DropDownProps = {
  options: Option[];
  title: string;
  handleSelect: (value: Option) => void;
};

const DropDown: React.FC<DropDownProps> = ({
  options,
  title,
  handleSelect,
}) => {
  const dispatch = useDispatch();

  const onSelect = (option: Option) => {
    dispatch(setDropdownValueName(option.name));
    dispatch(setDropdownValueId(option.id));
    handleSelect(option); // если внешний обработчик все еще необходим
  };

  return (
    <Dropdown className="dropdown">
      <Dropdown.Toggle className="dropdown__toggle">
        {title}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown__menu">
        {options.map((option) => (
          <Dropdown.Item onClick={() => onSelect(option)} key={option.id}>
            {option.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDown;
