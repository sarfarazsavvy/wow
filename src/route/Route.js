import SignUpRetailer from '../component/SignUpRetailer';
import sideMenu from '../route/sideMenu';
import forgot from '../component/forgot';
import splash from '../component/splash';
import getStarted5 from './../component/login';
import loginwithemail from './../component/loginwithemail';
import loginwithnumber from './../component/loginwithnumber';
import signup from './../component/signup';
import signupgoogle from './../component/signupgoogle';
import login from './../component/login';
import reviewDetail from './../component/reviewDetail';
import reportdetail from './../component/reportdetail';
import events from './../component/events';
import wowmenual from './../component/wowmenual';
import eventdetail from './../component/eventdetail';
import mosque from './../component/mosque';
import mosquedetail from './../component/mosquedetail';
import halaldetail from './../component/halaldetail';
import cause from './../component/cause';
import halal from './../component/halal';
import dua from './../component/dua';
import extranumber from './../component/extranumber';
import menualmenu from './../component/menualmenu';
import menualdetails from './../component/menualdetails';
import reviews from './../component/reviews';
import duadetail from './../component/duadetail';
import causedetail from './../component/causedetail';
import createevent from './../component/createevent';
import createcause from './../component/createcause';
import createdua from './../component/createdua';
import slider from './../component/slider';
import home2 from './../component/home2';
import otp from './../component/otp';
import about from './../component/about';
import mission from './../component/mission';
import vision from './../component/vision';
import generaldocs from './../component/generaldocs';
import myprofile from './../component/myprofile';
import Chat from './../component/chat';
import helpline from './../component/helpline';
import gallery from './../component/gallery';
import verifynumber from './../component/verifynumber';
import dashBoardBottomRetailer from './dashBoardBottomRetailer';
import {createStackNavigator} from 'react-navigation-stack';
//import SafeAreaView from 'react-native-safe-area-view';
import SafeAreaView from 'react-native-safe-area-context';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const Route =  createStackNavigator({

    login: {
        screen: login,
        navigationOptions: {
            header: null,
        },
    },
    loginwithemail: {
        screen: loginwithemail,
        navigationOptions: {
            header: null,
        },
    },
    loginwithnumber: {
        screen: loginwithnumber,
        navigationOptions: {
            header: null,
        },
    },
    signup: {
        screen: signup,
        navigationOptions: {
            header: null,
        },
    },
    signupgoogle: {
        screen: signupgoogle,
        navigationOptions: {
            header: null,
        },
    },
    reviewDetail: {
        screen: reviewDetail,
        navigationOptions: {
            header: null,
        },
    },
    reportdetail: {
        screen: reportdetail,
        navigationOptions: {
            header: null,
        },
    },
    tab2: {
        screen: dashBoardBottomRetailer,
        navigationOptions: {
            header: null,
        },
    },
   
    SignUpRetailer: {
        screen: SignUpRetailer,
        navigationOptions: {
            header: null,
        },
    },
    menualmenu: {
        screen: menualmenu,
        navigationOptions: {
            header: null,
        },
    },
    forgot: {
        screen: forgot,
        navigationOptions: {
            header: null,
        },
    },
    events: {
        screen: events,
        navigationOptions: {
            header: null,
        },
    },
    wowmenual: {
        screen: wowmenual,
        navigationOptions: {
            header: null,
        },
    },
    mosque: {
        screen: mosque,
        navigationOptions: {
            header: null,
        },
    },
    cause: {
        screen: cause,
        navigationOptions: {
            header: null,
        },
    },
    extranumber: {
        screen: extranumber,
        navigationOptions: {
            header: null,
        },
    },
    menualdetails: {
        screen: menualdetails,
        navigationOptions: {
            header: null,
        },
    },
    reviews: {
        screen: reviews,
        navigationOptions: {
            header: null,
        },
    },
    helpline: {
        screen: helpline,
        navigationOptions: {
            header: null,
        },
    },
    generaldocs: {
        screen: generaldocs,
        navigationOptions: {
            header: null,
        },
    },
    halal: {
        screen: halal,
        navigationOptions: {
            header: null,
        },
    },
    myprofile: {
        screen: myprofile,
        navigationOptions: {
            header: null,
        },
    },
    halaldetail: {
        screen: halaldetail,
        navigationOptions: {
            header: null,
        },
    },
    eventdetail: {
        screen: eventdetail,
        navigationOptions: {
            header: null,
        },
    },
    mosquedetail: {
        screen: mosquedetail,
        navigationOptions: {
            header: null,
        },
    },
    about: {
        screen: about,
        navigationOptions: {
            header: null,
        },
    },
    mission: {
        screen: mission,
        navigationOptions: {
            header: null,
        },
    },
    vision: {
        screen: vision,
        navigationOptions: {
            header: null,
        },
    },
    dua: {
        screen: dua,
        navigationOptions: {
            header: null,
        },
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            header: null,
        },
    },
    duadetail: {
        screen: duadetail,
        navigationOptions: {
            header: null,
        },
    },
    causedetail: {
        screen: causedetail,
        navigationOptions: {
            header: null,
        },
    },
    createevent: {
        screen: createevent,
        navigationOptions: {
            header: null,
        },
    },
    gallery: {
        screen: gallery,
        navigationOptions: {
            header: null,
        },
    },
    createcause: {
        screen: createcause,
        navigationOptions: {
            header: null,
        },
    },
    createdua: {
        screen: createdua,
        navigationOptions: {
            header: null,
        },
    },
    slider: {
        screen: slider,
        navigationOptions: {
            header: null,
        },
    },
    otp: {
        screen: otp,
        navigationOptions: {
            header: null,
        },
    },
    verifynumber: {
        screen: verifynumber,
        navigationOptions: {
            header: null,
        },
    },
    splash: {
        screen: splash,
        navigationOptions: {
            header: null,
        },
    },
    home2: {
        screen: sideMenu,
        navigationOptions: {
            header: null,
        },
     },
    
  },{
      initialRouteName: 'splash'
    //   initialRouteName: 'selectColor'
  })

export default createAppContainer(Route);

