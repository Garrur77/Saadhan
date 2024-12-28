import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HEIGHT, WIDTH } from "../Helpers/Dimentions";
import { COLORS, FONTS } from "../../assets/Theme";
import CarSvg from "../SvgComponent/ChooseARide/CarSvg";
import Limousine from "../SvgComponent/ChooseARide/Limousine";
import Luxury from "../SvgComponent/ChooseARide/Luxury";
import ElectricCar from "../SvgComponent/ChooseARide/ElectricCar";
import Bike from "../SvgComponent/ChooseARide/Bike";
import Taxi4seat from "../SvgComponent/ChooseARide/Taxi4seat";
import Taxi7seat from "../SvgComponent/ChooseARide/Taxi7seat";
import { useEffect, useState } from "react";
import Downarrow from "../SvgComponent/CarRide/Downarrow";

interface DataItem {
  vehicle: any;
  text1: string;
  text2: string;
  price: string;
  time: any;
}

const ChooseARideComponent = (props: any) => {

  const { nearestVehicleTypes } = props;
  // // console.log("888888888888888",nearestVehicleTypes);

  const [fares, setFares] = useState({});
  // // console.log("faresfaresfares",fares);

  const [nearestVehicleTypes1, setNearestVehicleTypes] = useState({});
  // // console.log("nearestVehicleTypesnearestVehicleTypes",nearestVehicleTypes1);

  const [colorView, setcolorView] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [selectedData, setSelectData] = useState("");
  // // console.log("selectedDataselectedData",selectedData);


  useEffect(() => {
    setFares(nearestVehicleTypes?.allFares);
    setNearestVehicleTypes(nearestVehicleTypes?.nearestVehicleTypes);
  }, [nearestVehicleTypes1]);


  const DATA: DataItem[] = [
    {
      vehicle: <CarSvg />,
      text1: "Just go",
      text2: "Near by you",
      price: "$25.00",
      time: "2 min",
    },
    {
      vehicle: <Limousine />,
      text1: "Limousine",
      text2: "0.2 km",
      price: "$80.00",
      time: "5 min",
    },
    {
      vehicle: <Luxury />,
      text1: "Luxury",
      text2: "0.4 km",
      price: "$50.00",
      time: "3 min",
    },
    {
      vehicle: <ElectricCar />,
      text1: "ElectricCar",
      text2: "0.45 km",
      price: "$25.00",
      time: "2 min",
    },
    {
      vehicle: <Bike />,
      text1: "Bike",
      text2: "0.48 km",
      price: "$15.00",
      time: "3 min",
    },
    {
      vehicle: <Taxi4seat />,
      text1: "Taxi  4 seat",
      text2: "0.5 km",
      price: "$30.00",
      time: "4 min",
    },
    {
      vehicle: <Taxi7seat />,
      text1: "Taxi 7 seat",
      text2: "0.67 km",
      price: "$40.00",
      time: "4 min",
    },
  ];

  return (
    <View>
      <View style={{ marginTop: "3%", alignItems: "center" }}>
        <Downarrow />
      </View>

      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: "1%", marginBottom: "5%" }}
        data={nearestVehicleTypes1}
        renderItem={({ item, index }: { item: DataItem; index: number }) => {
          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.locationview,
                  {
                    backgroundColor:
                      selectedItemIndex === index ? "#F50" : "white",
                  },
                ]}
                onPress={() => {
                  setSelectedItemIndex(index);
                  // setSelectData(item)
                  props.Action();
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View>{item.vehicle}</View>
                  <View style={{ width: WIDTH * 0.3, marginLeft: "7%" }}>
                    <Text allowFontScaling={false} style={styles.canceltext}>{item?.vehicleType}</Text>
                    <Text allowFontScaling={false} style={styles.mobiloitte}>{item?.text2}</Text>
                  </View>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    allowFontScaling={false} style={[
                      styles.canceltext,
                      { color: COLORS.GRAY, fontSize: 20 },
                    ]}
                  >
                    {item?.price}
                  </Text>
                  <Text allowFontScaling={false} style={[styles.mobiloitte, { fontSize: 15 }]}>
                    {item?.time}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ChooseARideComponent;

const styles = StyleSheet.create({
  locationview: {
    flexDirection: "row",
    marginVertical: HEIGHT * 0.02,
    width: WIDTH * 0.9,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backbtn: {
    marginVertical: "1%",
    width: WIDTH * 0.9,
  },
  mobiloitte: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    color: "#C8C7CC",
  },
  canceltext: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    color: "rgba(36, 46, 66, 1)",
  },
});
