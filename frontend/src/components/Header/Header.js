import React, {useEffect, useState} from 'react';
import { useHistory, useLocation,Link, useNavigate } from 'react-router-dom';
import { IconButton, ListItemIcon } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Avatar from '@material-ui/core/Avatar';
import HelpIcon from '@mui/icons-material/Help';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import onClickOutside from "react-onclickoutside";
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import TopicIcon from '@mui/icons-material/Topic';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ArticleIcon from '@mui/icons-material/Article';
import axios from 'axios';
import './Header.css';
import './Sidebar.css';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState("");
    const [URL, setURL] = useState("/user");
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const SidebarItem = [
        {
          title: 'Home',
          path: '/',
          icon: <HomeIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
           path: `${URL}/profile`,
          icon: <PersonIcon/>,
          cName: 'nav-text'
        },

        {
            title: 'Make Requests',
            path: `/request/add`,
            icon: <AssignmentIcon/>,
            cName: 'nav-text'
          },

          {
            title: 'My Requests',
            path: `/requests`,
            icon: <AssignmentIcon/>,
            cName: 'nav-text'
          },

          {
            title: 'Business Tips',
            path: `/tips`,
            icon: <HelpIcon/>,
            cName: 'nav-text'
          },
  

        {
            title: 'Loan Scheme',
            path: `/loan`,
            icon: <AttachMoneyIcon/>,
            cName: 'nav-text'
          },

        {
            title: 'Categories',
            path: `/topic/view`,
            icon: <InsertCommentIcon/>,
            cName: 'nav-text'
          },
        {
          title: 'Payments',
          path: `/history`,
          icon: <InsertCommentIcon/>,
          cName: 'nav-text'
        },
       
        

          {
            title: 'Support Service',
            path: `/help`,
            icon: <HelpIcon/>,
            cName: 'nav-text'
          },
       
        {
            title: 'Feedback',
            path: `/student/review/${user._id}`,
            icon: <FeedbackIcon />,
            cName: 'nav-text'
        },
    ];

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("userAuthToken")|| localStorage.getItem("adminAuthToken") ){
            setIsSignedIn(true)

            //get user data
            if(localStorage.getItem("user")){
                setUser(JSON.parse(localStorage.getItem('user')))
            }
            

            if(localStorage.getItem("userAuthToken")){
                setURL(`/user`)
            }

        }else{
            setIsSignedIn(false)
        }
    }, [user._id,location])

    function profile() {
        navigate(`${URL}/profile/`)
    }

    function cart() {
        navigate(`cart/${user._id}`)
    }


    function signin() {
        navigate('/user/signin')
    }

    function signup() {
        navigate('/user/signup')
    }
    
    //logout
    async function logout(){
        localStorage.clear();
        navigate('/')
    }

    const showSidebar = () => setSidebar(!sidebar);

    Header.handleClickOutside = () => setSidebar(false);

    function home(){
        navigate('/')
    }
    
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top header-bg">
                    <div className="container-fluid ">
                        <ul>
                            {sidebar ? <IconButton><DehazeIcon fontSize="large" style={{ color: blue[0] }}/></IconButton> :
                            <IconButton onClick={showSidebar}>
                                <DehazeIcon fontSize="large" style={{ color: "white",top:20,position:"relative",left:50}}/>
                            </IconButton>
                            }      
                        </ul>
                        <div className="header-title">
                            <h3 onClick={home}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ceylon &nbsp; Capital &nbsp; Corp</h3>

                            <button className="home_button">
                {" "}
                <a href="/" className="home_button">Home</a>
              </button>
              <button className="home_button">
                <a href="/category/view" className="home_button">Category</a>
              </button>
              <button className="home_button">
                <a href="/request/add" className="home_button">Requests</a>
              </button>
              <button className="home_button" >
                <a href="/request/view" className="home_button">About Us</a>
              </button>
              <button className="home_button" >
              <a href="/workshops" className="home_button">WorkShop</a>
              </button>
              <button className="home_button" >
              <a onClick={cart} className="home_button">Cart</a>
              </button>
                        </div>
                        {isSignedIn && (
                <div  align="center" className="log_out_button" >
                  <Button className="log_out_button" style={{ color:"white", fontWeight:600}}
                      disableElevation
                      size="small"
                      onClick={logout}
                      endIcon={<ExitToAppIcon  style={{ color:"white"}} />}
                  >
                    Log Out
                  </Button>
                </div>
            )}
                        <ul className="mx-3">
                            {isSignedIn ?
                                <div>
                                    <IconButton onClick={profile}>
                                        <Avatar alt="user" src={`${user.imgUrl}`} />
                                    </IconButton> 
                                </div>
                                :
                                <div>
                                    <button className="signing" style={{position :'relative',top:10,right:-40}} onClick={signin}>
                                        Sign In
                                    </button>
                                    <button className="signing" style={{position :'relative',top:-28,right:90}} onClick={signup}>
                                        Sign Up
                                    </button>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='mb-4 mt-3' align="center" style={{marginTop:30}}>
                            <img src="/images/Logo.png" width="60px" alt="logo"/>
                        </li>
                        {SidebarItem.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span className="nav-span">{item.title}</span>
                                </Link>
                            </li>
                        );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside
};

export default onClickOutside(Header, clickOutsideConfig);