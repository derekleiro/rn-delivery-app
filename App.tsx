// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

import Modal from "./src/components/modal";
import { Provider, useSelector } from "react-redux";
import configureStore from "./src/store/index";
import Navigator from "./src/screens";
import * as Device from "expo-device";

const App = () => {
  return (
    <Provider store={configureStore}>
      <AppChild />
    </Provider>
  );
};

const AppChild = () => {
  const { modal } = useSelector((state) => state.modal);
  const [renderApp, setRenderApp] = useState<boolean>(false);
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const handleAuthSet = () => {
    setRenderApp(true);
  };

  useEffect(() => {
    if (Device.osName === "Android") {
      NavigationBar.setBackgroundColorAsync(`#e1def4`);
    }
    // TODO: Check Auth state then switch
    // handleAuthSet();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      {modal.messages.length !== 0 && (
        <Modal type={modal.type} messages={modal.messages} />
      )}
      {/* {!renderApp && <IntroSlides onDone={handleAuthSet} />} */}

      <Navigator />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
