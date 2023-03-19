import CategoryLeftBar from './CategoryLeftBar';
import FollowLeftBar from './FollowLeftBar';
import NavigationsLeftBar from './NavigationLeftBar';
import OthersLeftBar from './OthersLeftBar';

const LeftNavBar = () => {

    const token = localStorage.getItem("accessToken");

    return (
        <div className="left-navbar">
            <CategoryLeftBar />
            { token ? <FollowLeftBar /> : '' } 
            <NavigationsLeftBar />
            <OthersLeftBar />
        </div>
    );
}

export default LeftNavBar;
