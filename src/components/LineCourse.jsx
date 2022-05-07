import { FaTrashAlt } from 'react-icons/fa';
import { Label } from 'reactstrap';

const LineCourse = () => {
  return <li className="item">
        <input type="checkbox" onChange={""} checked={"false"} />
        <label style={'color: red'} onDoubleClick={""}></label>
        <FaTrashAlt onClick={""} role="button" tabIndex="0" aria-label={''} />
    </li>;
};

export default LineCourse;