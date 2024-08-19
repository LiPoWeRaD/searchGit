import { useDispatch } from 'react-redux';
import * as nodes from '../store/action-creators/Nodes'
import { bindActionCreators } from 'redux';

const data = {...nodes}

export const UseActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(data, dispatch)
}