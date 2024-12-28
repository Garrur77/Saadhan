
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {IMAGEPATH} from '../../assets/Theme';
import { WIDTH,HEIGHT } from '../Helpers/Dimentions';


interface MapBackgroundProps {
children: ReactNode;
}


const MapBackground: React.FC<MapBackgroundProps> = ({children}) => {
return (
<ImageBackground
source={IMAGEPATH.MapBackground}
style={{width: WIDTH,height:HEIGHT}}
imageStyle={{
resizeMode: 'stretch',
}}>
{children}
</ImageBackground>
);
};


export default MapBackground;
