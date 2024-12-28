
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {IMAGEPATH} from '../../assets/Theme';
import { WIDTH,HEIGHT } from '../Helpers/Dimentions';


interface GlobalBackgroundProps {
children: ReactNode;
}


const GlobalBackground: React.FC<GlobalBackgroundProps> = ({children}) => {
return (
<ImageBackground
source={IMAGEPATH.GlobalBackGroundImg1}
style={{width: WIDTH,height:HEIGHT}}
imageStyle={{
resizeMode: 'stretch',
}}>
{children}
</ImageBackground>
);
};


export default GlobalBackground;
