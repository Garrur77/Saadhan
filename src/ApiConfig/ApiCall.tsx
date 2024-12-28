import { Alert } from "react-native";
import instance from "../ApiConfig/APiIntercept";
import { showMessage } from "react-native-flash-message";

export const callGetApi = async (Endpoints: string, SucessDisplay: boolean) => {
  let loading = true;
  try {
    const response = await instance(Endpoints);
    // // console.log('Response:', response.data);

    if (response?.data?.responseCode === 200) {
      {
        SucessDisplay &&
          showMessage({
            message: response?.data?.message,
            type: "success",
            icon: "success",
            duration: 1000,
          });
      }

    }
    loading = false;
    return { loading, response: response.data, error: null };
  } catch (error: any) {
    loading = false;
    // console.log("HERERRER IS SERVERERROR", error.response.status);

    if (error.response.status === 503) {
      showMessage({
        message: "Server Error",
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
    }
    if (error.response.status === 402) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        // message: ,
        type: "warning",
        icon: "warning",
        duration: 1000,
      });
    }
    if (error.response.status === 404) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        type: "warning",
        icon: "warning",
        duration: 1000,
      });
    }
    // showMessage({
    //   message: error?.response?.data?.responseMessage,
    //   type: "danger",
    //   icon: "danger",
    //   duration: 1000,
    // });
    console.error(Endpoints, "Error:", error, error.response);
    return { loading, response: null, error };
  }
};

export const callPostApi = async (
  endpoint: string,
  data: object,
  SucessDisplay: boolean,
  // headers:object,
) => {
  let loading = true;

  try {
    const response = await instance.post(endpoint, data);

    if (response?.data?.responseCode === 200) {
      {
        SucessDisplay &&
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            duration: 1000,
          });
      }

    } else if (response?.data?.responseCode === 200) {
      {
        SucessDisplay &&
          showMessage({
            message: response?.data?.responseMessage,
            type: "success",
            icon: "success",
            duration: 1000,
          });
      }

    }
    else if (response.data.responseCode === 400) {
      showMessage({
        message: response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
    }
    else if (response.data.responseCode === 201) {
      showMessage({
        message: response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
    }

    loading = false;
    return { loading, response: response.data, error: null };
  } catch (error: any) {
    loading = false;

    // console.log("ERROR-Response true:", error?.response);
    if (error.response && error.response.status === 503) {
      showMessage({
        message: "Server Error",
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
    } else if (error.response && error.response.status === 400) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 1000,
      });

      // console.log("ERROR-Respons4e00:", error?.response?.data?.message);
      // Alert.alert(error?.response?.data?.responseMessage);
    }
    else if (error.response && error.response.status == 404) {
      showMessage({
        message: error?.response?.data?.responseMessage,
        type: "danger",
        icon: "danger",
        duration: 1000,
      });
      // console.log("ERROR-Response 404:", error?.response?.data?.message);
      // Alert.alert(error?.response?.data?.responseMessage);
    } else if (error.response && error.response.status === 1000) {
      showMessage({
        message: "Server Error please try after a short time",
        type: "warning",
        icon: "warning",
        duration: 1000,
      });
      // console.log("ERROR-Response1000:", error?.response?.data?.message);
      // Alert.alert(error?.response?.data?.responseMessage);
    } else {
      // showMessage({
      //   message: error?.response?.data?.responseMessage,
      //   type: "danger",
      //   icon: "danger",
      //   duration: 1000,
      // });
      console.error(endpoint, "Error:", error, error.response);
    }
    loading = false;
    return { loading, response: null, error };
  }
};

// let payload = {
//     method: 'get',
//     url: Endpoints
// }

// if (Parameter) {
//     payload['params'] = Parameter
// }
