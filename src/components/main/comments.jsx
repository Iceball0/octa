import CommentsCodeItem from './comments-code-item';
import imgB from '../../assets/img/main/comments/imgB.png';
import imgI from '../../assets/img/main/comments/imgI.png';
import imgList from '../../assets/img/main/comments/imgList.png';
import imgImage from '../../assets/img/main/comments/imgImage.png';
import imgLink from '../../assets/img/main/comments/imgLink.png';
import imgQuote from '../../assets/img/main/comments/imgQuote.png';
import imgElipse from '../../assets/img/main/comments/imgElipse.png';
import imgCode from '../../assets/img/main/comments/imgCode.png';
import imgAdd from '../../assets/img/main/comments/imgAdd.png';

const Comments = () => {
    return (
        <div className='comments'>
            <div className="comments__title">
                0 комментариев
            </div>
            <div className="comments__block">
                <div className="comments-code__elements">
                    <CommentsCodeItem src={imgB} />
                    <CommentsCodeItem src={imgI} />
                    <CommentsCodeItem src={imgList} />
                    <CommentsCodeItem src={imgImage} />
                    <CommentsCodeItem src={imgLink} />
                    <CommentsCodeItem src={imgQuote} />
                    <CommentsCodeItem src={imgElipse} />
                    <CommentsCodeItem src={imgCode} />
                    <CommentsCodeItem src={imgAdd} />
                </div>
                <div className="comments__textarea">
                    <textarea name="" id="" placeholder='Введите текст комментария' >
                    </textarea>
                </div>
            </div>
        </div>
    );
}

export default Comments;
