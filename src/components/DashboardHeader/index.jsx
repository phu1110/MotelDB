import React from 'react';
import {image} from '../../constants/URL'
import './styles.css';
import NotificationIcon from '../../assets/icons/notification.svg';
import SettingsIcon from '../../assets/icons/settings.svg';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
function DashboardHeader ({ btnText, onClick }) {
    const {user} = useContext(UserContext);
    return(
        <div className='dashbord-header-container'>
            {btnText && 
                <button className='dashbord-header-btn' onClick={onClick}>{btnText}</button>
            }

            <div className='dashbord-header-right'>
                {user && user.firstname && <span> Chào mừng {user.lastname + " " + user.firstname}</span>}
                {/* <img 
                    src={NotificationIcon}
                    alt='notification-icon'
                    className='dashbord-header-icon' />
                <img 
                    src={SettingsIcon}
                    alt='settings-icon'
                    className='dashbord-header-icon' /> */}
               <img
                                src={`${image}/${localStorage.getItem('avatar')}`}
                                className="dashboard-content-avatar "
                                alt="not found"
                            />
            </div>
        </div>
    )
}

export default DashboardHeader;