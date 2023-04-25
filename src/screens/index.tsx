import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./user-screens/home";
import AuthScreen from "./login-and-signup";
import ProfileScreen from "./user-screens/profile";
import OrdersScreen from "./user-screens/orders";
import ProviderInventory from "./provider-screens/inventory";
import ProviderProfile from "./provider-screens/profile";
import ProviderHome from "./provider-screens/home";
import CheckoutScreen from "./user-screens/checkout";
import ProviderReports from "./provider-screens/reports";

const screens: any = {
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  Orders: {
    screen: OrdersScreen,
    navigationOptions: {
      header: null,
    },
  },
  Checkout: {
    screen: CheckoutScreen,
    navigationOptions: {
      header: null,
    },
  },
  ProviderHome: {
    screen: ProviderHome,
    navigationOptions: {
      header: null,
    },
  },
  ProviderInventory: {
    screen: ProviderInventory,
    navigationOptions: {
      header: null,
    },
  },
  ProviderProfile: {
    screen: ProviderProfile,
    navigationOptions: {
      header: null,
    },
  },
  ProviderReports: {
    screen: ProviderReports,
    navigationOptions: {
      header: null,
    },
  },
};

const SignedInStack = createStackNavigator(screens);

export default createAppContainer(SignedInStack);
