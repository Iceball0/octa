import CategoryItem from './CategoryItem';

import SettingsImg from '../../assets/img/main/Settingsimg.svg'
import ReportsImg from '../../assets/img/main/Reportsimg.svg'
import HelpImg from '../../assets/img/main/Helpimg.svg'
import FitbackImg from '../../assets/img/main/Fitbackimg.svg'


const OthersLeftBar = () => {
    return (
        <div className='category-leftbar'>
            <CategoryItem category_item_text='Настройки' src={SettingsImg} active={false} />
            <CategoryItem category_item_text='Жалобы' src={ReportsImg} active={false} />
            <CategoryItem category_item_text='Справки' src={HelpImg} active={false} />
            <CategoryItem category_item_text='Отправить отзыв' src={FitbackImg} nameCategoryItem={"category-item__borger"} active={false} />
        </div>
    );
}

export default OthersLeftBar;
