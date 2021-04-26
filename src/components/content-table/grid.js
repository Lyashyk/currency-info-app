import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';

import { requestTable, getDataByCarrentDate } from '../../ducks/table';

import { IconFavorites } from '../icons';

const Grid = ({ currentDate }) => {
    const dispatch = useDispatch();
    const currencyList = useSelector(getDataByCarrentDate);

    useEffect(() => {
        if (!currencyList) {
            dispatch(requestTable(currentDate));
        }
    }, [dispatch, currentDate, currencyList])



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
                {
                    currencyList.map(({ code, title, rate }) => (
                        <tr key={code}>
                            <th scope="row">{code}</th>
                            <td>{title}</td>
                            <td>{rate}</td>
                            <td>
                                <div className="ContentTable-iconContainer">
                                    <IconFavorites />
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default Grid;