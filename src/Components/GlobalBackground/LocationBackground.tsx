
import React, {ReactNode} from 'react';
import {ImageBackground} from 'react-native';
import {IMAGEPATH} from '../../assets/Theme';
import { WIDTH,HEIGHT } from '../Helpers/Dimentions';


interface LocationBackgroundProps {
children: ReactNode;
}


const LocationBackground: React.FC<LocationBackgroundProps> = ({children}) => {
return (
<ImageBackground
source={IMAGEPATH.LocationBackground}
style={{width: WIDTH,height:HEIGHT}}
imageStyle={{
resizeMode: 'stretch',
}}>
{children}
</ImageBackground>
);
};


export default LocationBackground;
