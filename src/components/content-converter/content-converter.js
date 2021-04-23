import { useEffect, useState, useCallback } from 'react';
import { Spinner } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Label, Input, FormGroup, FormFeedback } from 'reactstrap';

import { writeToLocalStorige, readFromLocalStorige } from "../../utils";
import { getList, getIsLoading, request } from '../../ducks/converter';
import { getConversion } from './helpers';

import './content-converter.css';
import imgAction from './seeds/convert-image.png';

const ContentConverter = () => {
    const DEFAULT_CHANGEABLE_CURRENCY_CODE = 'UAH';
    const DEFAULT_SELECT_CURRENCY_CODE = 'USD';

    const dispatch = useDispatch();

    const isLoading = useSelector(getIsLoading);
    const list = useSelector(getList);

    useEffect(() => {

        if (!list || list.length < 1) {
            dispatch(request());
        }
    }, [dispatch, list]);

    // states

    const [changeableCurrencyAmount, setChangeableCurrencyAmount] = useState(100);
    const [changeableCurrencyCode, setChangeableCurrencyCode] = useState();
    const [selectCurrencyCode, setSelectCurrencyCodeCodeChange] = useState();

    // useEffects

    useEffect(() => {
        const currentChangeableCurrencyCode = readFromLocalStorige('changeable-currency_code') || DEFAULT_CHANGEABLE_CURRENCY_CODE

        const isExist = list.find(item => item.code === currentChangeableCurrencyCode)
        if (isExist && !changeableCurrencyCode) {
            setChangeableCurrencyCode(isExist.code)
        }
    }, [list, changeableCurrencyCode]);

    useEffect(() => {
        const currentSelectCurrencyCode = readFromLocalStorige('select-currency_code') || DEFAULT_SELECT_CURRENCY_CODE

        const isExist = list.find(item => item.code === currentSelectCurrencyCode)
        if (isExist && !selectCurrencyCode) {
            setSelectCurrencyCodeCodeChange(isExist.code)
        }
    }, [list, selectCurrencyCode]);

    // handleChanges

    const handleChangeableCurrencyChange = useCallback(e => { setChangeableCurrencyAmount(e.target.value) }, []);

    const handleChangeableCurrencyCodeChange = useCallback(e => {
        setChangeableCurrencyCode(e.target.value);

        writeToLocalStorige('changeable-currency_code', e.target.value);
    }, []);

    const handleSelectCurrencyCodeCodeChange = useCallback(e => {
        setSelectCurrencyCodeCodeChange(e.target.value);

        writeToLocalStorige('select-currency_code', e.target.value);
    }, []);

    // utils

    const getSelectCurrencyValue = () => getConversion(list, changeableCurrencyCode, selectCurrencyCode, changeableCurrencyAmount);

    const swapCode = () => {
        const _selectCurrencyCode = selectCurrencyCode;
        const _changeableCurrencyCode = changeableCurrencyCode;

        setChangeableCurrencyCode(_selectCurrencyCode);
        setSelectCurrencyCodeCodeChange(_changeableCurrencyCode);

        writeToLocalStorige('changeable-currency_code', _selectCurrencyCode);
        writeToLocalStorige('select-currency_code', _changeableCurrencyCode);
    };

    return (
        <div className="ContentConverter">
            {
                isLoading &&

                <div className="ContentConverter-loader">
                    <Spinner color="warning" size="64px" />
                </div>
            }

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
                            value={changeableCurrencyCode}
                            onChange={handleChangeableCurrencyCodeChange}
                        >
                            {
                                list.map(({ code }) => <option key={code}>{code}</option>)
                            }
                        </Input>
                    </FormGroup>
                </div>

                <div className="ContentConverter-gridAction">
                    <button className="ContentConverter-gridActionButton" onClick={swapCode}>
                        <img src={imgAction} alt="ContentConverter-imgAction" className="ContentConverter-image" />
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
                            value={selectCurrencyCode}
                            onChange={handleSelectCurrencyCodeCodeChange}
                        >
                            {
                                list.map(({ code }) => <option key={code}>{code}</option>)
                            }
                        </Input>
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default ContentConverter;