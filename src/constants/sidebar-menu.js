import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Thống Kê',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/users',
        title: 'Nguời dùng',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/products',
        title: 'Danh mục',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/profile',
        title: 'Bài Đăng',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/profile',
        title: 'Gói',
    },
    
]

export default sidebar_menu;