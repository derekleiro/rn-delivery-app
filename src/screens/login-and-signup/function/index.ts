import { hideModal, showModal } from "../../../store/slices/modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../../../store/slices/bottom-nav";

type passwordValidationProps = {
  password: string;
  //confirmPassword: string;
};
export const passwordValid = (props: passwordValidationProps) => {
  const { password } = props;
  const condition1 = password.trim() !== "";
  const condition2 = password.trim().length >= 6;
  if (condition1 && condition2) {
    return true;
  }
  return false;
};

export const emailValid = (email: string) => {
  const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  return regex.test(email);
};

type resetFieldsType = {
  setEmail: Function;
  setPhoneNumber: Function;
  setPassword: Function;
};
export const resetFields = (props: resetFieldsType) => {
  const { setEmail, setPhoneNumber, setPassword } = props;
  setEmail("");
  setPhoneNumber("");
  setPassword("");
};

type loginResetFieldsType = {
  setEmail: Function;
  setPassword: Function;
};
export const loginResetFields = (props: loginResetFieldsType) => {
  const { setEmail, setPassword } = props;
  setEmail("");
  setPassword("");
};

export const notempty = (
  mode: string,
  email: string,
  password: string,
  phoneNumber?: string
) => {
  if (mode === "login") {
    return email.trim() && password.trim();
  }
  return email.trim() && password.trim() && phoneNumber?.trim();
};

export const userInputsNotempty = (
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  date: string
) => {
  return (
    email.trim() &&
    password.trim() &&
    phoneNumber.trim() &&
    name.trim() &&
    date.trim()
  );
};

const storeUserData = async (value: any, dispatch: any) => {
  try {
    await AsyncStorage.setItem("@user", JSON.stringify(value));
  } catch (e) {
    dispatch(
      showModal({
        type: "error",
        messages: [typeof e === "string" ? e : "Register catch error"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

const deleteUserStoreData = async (dispatch: any) => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    dispatch(
      showModal({
        type: "error",
        messages: [typeof e === "string" ? e : "Register catch error"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

type handleRegisterProps = {
  dispatch: Function;
  showModal: Function;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  name: string;
  date?: string;
  navigation: any;
};
export const handleRegister = async (props: handleRegisterProps) => {
  const {
    showModal,
    email,
    password,
    phoneNumber,
    dispatch,
    navigation,
    name,
    date,
    role,
  } = props;

  if (role === "Provider") {
    if (!notempty("register", email, password, phoneNumber)) {
      dispatch(
        showModal({
          type: "error",
          messages: ["Please fill out every section"],
        })
      );
      return;
    }
  } else {
    if (!userInputsNotempty(name, email, password, phoneNumber, date!)) {
      dispatch(
        showModal({
          type: "error",
          messages: ["Please fill out every section"],
        })
      );
      return;
    }
  }

  const passwordValidation = passwordValid({ password });
  const emailValidation = emailValid(email);

  if (passwordValidation && emailValidation) {
    try {
      const res = await fetch("http://10.0.2.2:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          role,
          email,
          phoneNumber,
          password,
          date,
        }),
      });
      const JsonRes = await res.json();

      if (res.ok) {
        storeUserData(JsonRes.resp, dispatch);
        dispatch(
          showModal({
            type: "success",
            messages: [JsonRes.message],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);
        if (JsonRes.resp.role === "Provider") {
          navigation.navigate("ProviderHome");
          dispatch(navigate("ProviderHome"));
        } else {
          navigation.navigate("Home");
          dispatch(navigate("Home"));
        }
      } else {
        dispatch(
          showModal({
            type: "error",
            messages: [JsonRes.message],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    } catch (e) {
      dispatch(
        showModal({
          type: "error",
          messages: [typeof e === "string" ? e : "Register catch error"],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    }
  } else {
    if (!passwordValidation && !emailValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your email address is in a valid format",
            "Please make sure your password is atleast 6 characters long and the confirmation password matches your password",
          ],
        })
      );
      return;
    }

    if (!emailValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your email address is in a valid format",
          ],
        })
      );
      return;
    }
    if (!passwordValidation) {
      dispatch(
        showModal({
          type: "error",
          messages: [
            "Please make sure your confirmation password matches your password",
          ],
        })
      );
      return;
    }
  }
};

type handleLoginProps = {
  dispatch: Function;
  password: string;
  email: string;
  role: string;
  showModal: Function;
  navigation: any;
};
export const handleLogin = async (props: handleLoginProps) => {
  const { showModal, email, password, dispatch, navigation, role } = props;
  if (!notempty("login", email, password)) {
    dispatch(
      showModal({
        type: "error",
        messages: ["Please fill out every section"],
      })
    );
    return;
  }
  if (!emailValid(email)) {
    dispatch(
      showModal({
        type: "error",
        messages: ["Please make sure your email address is in a valid format"],
      })
    );
    return;
  }
  try {
    const res = await fetch("http://10.0.2.2:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    const JsonRes = await res.json();
    if (res.ok) {
      storeUserData(JsonRes.resp, dispatch);
      dispatch(
        showModal({
          type: "success",
          messages: [JsonRes.message],
        })
      );

      setTimeout(() => dispatch(hideModal()), 3000);
      if (JsonRes.resp.role === "Provider") {
        navigation.navigate("ProviderHome");
        dispatch(navigate("ProviderHome"));
      } else {
        navigation.navigate("Home");
        dispatch(navigate("Home"));
      }
    } else {
      dispatch(
        showModal({
          type: "error",
          messages: [JsonRes.message],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    }
  } catch (e) {
    dispatch(
      showModal({
        type: "error",
        messages: [typeof e === "string" ? e : "Login catch error"],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

type handleLogoutProps = {
  dispatch: Function;
  navigation: any;
};
export const handleLogout = async (props: handleLogoutProps) => {
  const { dispatch, navigation } = props;
  try {
    const res = await fetch("http://10.0.2.2:3000/logout");
    const JsonRes = await res.json();

    if (res.ok) {
      dispatch(
        showModal({
          type: "success",
          messages: [JsonRes.message],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
      deleteUserStoreData(dispatch);
      navigation.navigate("Auth");
    } else {
      dispatch(
        showModal({
          type: "error",
          messages: [JsonRes.message],
        })
      );
      setTimeout(() => dispatch(hideModal()), 3000);
    }
  } catch (e) {
    dispatch(
      showModal({
        type: "error",
        messages: [
          typeof e === "string" ? e : "Error logging user/provider out",
        ],
      })
    );
    setTimeout(() => dispatch(hideModal()), 3000);
  }
};

type fetchProfileProps = {
  dispatch: Function;
  setData: Function;
};
export const fetchProfile = async (props: fetchProfileProps) => {
  const { dispatch, setData } = props;
  AsyncStorage.getItem("@user")
    .then((value: any) => {
      return JSON.parse(value)
    })
    .then(async (user: any) => {
      try {
        const res = await fetch(
          `http://10.0.2.2:3000/profile/${user.role}/${user.accountID}`
        );
        const JsonRes = await res.json();

        if (res.ok) {
          setData(JsonRes.resp);
        } else {
          dispatch(
            showModal({
              type: "error",
              messages: [JsonRes.message],
            })
          );
          setTimeout(() => dispatch(hideModal()), 3000);
        }
      } catch (e) {
        dispatch(
          showModal({
            type: "error",
            messages: [
              typeof e === "string" ? e : "Error fetching user profile",
            ],
          })
        );
        setTimeout(() => dispatch(hideModal()), 3000);
      }
    });
};
