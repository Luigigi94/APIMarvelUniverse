import { Link } from 'react-router-dom';

function HeaderItem({name, Icon, route}:any) {
    return (
        <div className="text-blue-950 flex items-center gap-3 text-[18px] font-semibold cursor-pointer hover:underline">
            <Icon/>
            <Link to={route}>{name}</Link>
        </div>
    )
}

export default HeaderItem;