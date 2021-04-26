import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";

import {
  requestTable,
  toggleFavoriteCurrency,
  getFavoritesCarrencyList,
  getUnremarkableCurrencyList,
  getDataByCarrentDate,
} from "../../ducks/table";

import { IconFavorites } from "../icons";

const CarrencyList = ({ list, isFavorites }) => {
  const dispatch = useDispatch();

  if (!list) {
    return null;
  }

  return list.map(({ code, title, rate }) => (
    <tr key={code}>
      <th scope="row">{code}</th>
      <td>{title}</td>
      <td>{rate}</td>
      <td>
        <button
          className="ContentTable-action"
          onClick={() => {
            dispatch(toggleFavoriteCurrency(code));
          }}
        >
          <div className="ContentTable-iconContainer">
            <IconFavorites isFavorites={isFavorites} />
          </div>
        </button>
      </td>
    </tr>
  ));
};

const Grid = ({ currentDate }) => {
  const dispatch = useDispatch();
  const currencyList = useSelector(getDataByCarrentDate);
  const favoritesCarrencyList = useSelector(getFavoritesCarrencyList);
  const unremarkableCurrencyList = useSelector(getUnremarkableCurrencyList);

  useEffect(() => {
    if (!currencyList) {
      dispatch(requestTable(currentDate));
    }
  }, [dispatch, currentDate, currencyList]);

  if (!currencyList) {
    return null;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Rate</th>
        </tr>
      </thead>

      <tbody>
        <CarrencyList list={favoritesCarrencyList} isFavorites />

        <CarrencyList list={unremarkableCurrencyList} />
      </tbody>
    </Table>
  );
};

export default Grid;
