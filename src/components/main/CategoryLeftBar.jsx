import CategoryItem from './CategoryItem';
import mainImg from '../../assets/img/main/mainimg.svg'
import subscribeImg from '../../assets/img/main/subscribe.png'
import libraryImg from '../../assets/img/main/library.svg'
import historyImg from '../../assets/img/main/history.png'
import myVideoImg from '../../assets/img/main/MyVideo.svg'
import viewNextImg from '../../assets/img/main/viewnext.svg'
import likesImg from '../../assets/img/main/Likes.svg'

const CategoryLeftBar = () => {

    const token = localStorage.getItem("accessToken");

    return (
        <div className='category-leftbar'>
            
            { token ? 
                <>
                <CategoryItem category_item_text='Главная' link="/" src={mainImg} active={true} />
                <CategoryItem category_item_text='Подписки' link="/subscribes" src={subscribeImg} nameCategoryItem={"category-item__borger"} active={false} />
                <CategoryItem category_item_text='Библиотека' link="/" src={libraryImg} active={false} />
                <CategoryItem category_item_text='История' link="/" src={historyImg} active={false} />
                <CategoryItem category_item_text='Ваши видео' link="/own_video" src={myVideoImg} active={false} />
                <CategoryItem category_item_text='Смотреть позже' link="/" src={viewNextImg} active={false} />
                <CategoryItem category_item_text='Понравившиеся' link="/favourite" src={likesImg} nameCategoryItem={"category-item__borger"} active={false} />
                </>
                : <CategoryItem category_item_text='Главная' src={mainImg} nameCategoryItem={"category-item__borger"} active={true} /> }
        </div>
    );
}

export default CategoryLeftBar;
