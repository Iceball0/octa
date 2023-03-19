import CategoryItem from './CategoryItem';
import fireImg from '../../assets/img/main/fire.svg'
import musicImg from '../../assets/img/main/music.svg'
import translationsImg from '../../assets/img/main/translations.svg'


const NavigationsLeftBar = () => {
    return (
        <div className='category-leftbar'>
            <CategoryItem category_item_text='В тренде' src={fireImg} active={false} />
            <CategoryItem category_item_text='Музыка' src={musicImg} active={false} />
            <CategoryItem category_item_text='Трансляции' src={translationsImg} nameCategoryItem={"category-item__borger"} active={false} />

        </div>
    );
}

export default NavigationsLeftBar;
