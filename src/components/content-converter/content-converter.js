import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, Input, FormGroup, FormFeedback, Spinner } from "reactstrap";

import {
  getList,
  getIsLoading,
  getItemBySelectCurrencyCode,
  getItemByChangeableCurrencyCode,
  request,
  setChangeableCurrencyCodeCallback,
  setSelectCurrencyCodeCallback,
  swapCurrencyCodeCallback,
} from "../../ducks/converter";
import { getConversion } from "./helpers";

import "./content-converter.css";
import imgAction from "./seeds/convert-image.png";

const ContentConverter = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const list = useSelector(getList);
  const itemBySelectCurrencyCode = useSelector(getItemBySelectCurrencyCode);
  const itemByChangeableCurrencyCode = useSelector(
    getItemByChangeableCurrencyCode,
  );

  useEffect(() => {
    if (list.length < 1) {
      dispatch(request());
    }
  }, [dispatch, list]);

  const [changeableCurrencyAmount, setChangeableCurrencyAmount] = useState(100);

  const handleChangeableCurrencyChange = useCallback((e) => {
    setChangeableCurrencyAmount(e.target.value);
  }, []);

  const handleChangeableCurrencyCodeChange = useCallback(
    (e) => {
      dispatch(setChangeableCurrencyCodeCallback(e.target.value));
    },
    [dispatch],
  );

  const handleSelectCurrencyCodeCodeChange = useCallback(
    (e) => {
      dispatch(setSelectCurrencyCodeCallback(e.target.value));
    },
    [dispatch],
  );

  const getSelectCurrencyValue = () =>
    getConversion(
      itemBySelectCurrencyCode,
      itemByChangeableCurrencyCode,
      changeableCurrencyAmount,
    );

  const swapCode = useCallback(() => {
    dispatch(swapCurrencyCodeCallback());
  }, [dispatch]);

  if (!itemBySelectCurrencyCode || !itemByChangeableCurrencyCode) {
    return null;
  }

  return (
    <div className="ContentConverter">
      {isLoading && (
        <div className="ContentConverter-loader">
          <Spinner color="warning" size="64px" />
        </div>
      )}

      <div className="ContentConverter-grid">
        <div className="ContentConverter-gridInputItem">
          <FormGroup>
            <Label for="changeableCurrency">Меняю</Label>
            <Input
              type="number"
              name="number"
              id="changeableCurrency"
              value={changeableCurrencyAmount}
              onChange={handleChangeableCurrencyChange}
              invalid={!changeableCurrencyAmount}
            />
            <FormFeedback>Введите количество валюты</FormFeedback>
          </FormGroup>
        </div>

        <div className="ContentConverter-gridSelectItem">
          <FormGroup>
            <Label for="changeableCurrencyCode">Валюта</Label>
            <Input
              type="select"
              name="select"
              id="changeableCurrencyCode"
              value={itemByChangeableCurrencyCode.code}
              onChange={handleChangeableCurrencyCodeChange}
            >
              {list.map(({ code }) => (
                <option key={code}>{code}</option>
              ))}
            </Input>
          </FormGroup>
        </div>

        <div className="ContentConverter-gridAction">
          <button
            className="ContentConverter-gridActionButton"
            onClick={swapCode}
          >
            <img
              src={imgAction}
              alt="ContentConverter-imgAction"
              className="ContentConverter-image"
            />
          </button>
        </div>

        <div className="ContentConverter-gridInputItem">
          <FormGroup>
            <Label for="selectCurrency">Получаю</Label>
            <Input
              type="number"
              name="number"
              id="selectCurrency"
              value={getSelectCurrencyValue()}
              disabled
            />
          </FormGroup>
        </div>

        <div className="ContentConverter-gridSelectItem">
          <FormGroup>
            <Label for="selcetCurrencyCode">Валюта</Label>
            <Input
              type="select"
              name="select"
              id="selcetCurrencyCode"
              value={itemBySelectCurrencyCode.code}
              onChange={handleSelectCurrencyCodeCodeChange}
            >
              {list.map(({ code }) => (
                <option key={code}>{code}</option>
              ))}
            </Input>
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default ContentConverter;
