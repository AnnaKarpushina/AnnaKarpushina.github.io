import './styles.scss';

import heartSvg from '../../assets/heart.svg';
import Images from '../Images';

const Title = () => (
    <h1 className="title">
        I <Images className="title_img" src={heartSvg} alt="Heart" /> L A M P
    </h1>
);

export default Title;
