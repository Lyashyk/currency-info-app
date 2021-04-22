import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'reactstrap';

import { requestTable } from '../../ducks/table';

const Grid = ({ table, currentDate }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestTable(currentDate));
    }, [])



    if (!table[currentDate]) {
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
                    table[currentDate].map((item) => <tr key={item.cc}>
                        <th scope="row">{item.cc}</th>
                        <td>{item.txt}</td>
                        <td>{item.rate}</td>
                    </tr>)
                }
            </tbody>
        </Table>
    )
}

export default Grid;