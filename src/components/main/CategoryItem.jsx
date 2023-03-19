import { Link } from "react-router-dom";

const CategoryItem = ({ active, nameCategoryItem, category_item_text, link, ...props }) => {

    return (
        <Link to={link} className={nameCategoryItem + ' category-item'}>
            <div className="category-item__img-block ">
                <img {...props} alt='' />
            </div>
            <div className={active ? 'active category-item__text' : 'category-item__text'}>
                {category_item_text}
            </div>
        </Link>
        
    );
}

export default CategoryItem;
