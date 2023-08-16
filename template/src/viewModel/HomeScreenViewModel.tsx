import React, { useEffect } from "react";
import { SCREENS } from "@shared-constants";
import HomeScreen from "@screens/home/HomeScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store/Store";
import { IApiResponse } from "controller/IApiResponse";
import { User } from "models/UserModel";
import { sendGetRequest } from "services/network/Network";
import APIConstants from "core/ApiConstants";
import { setAllUsers } from "redux/actions/AccountAction";
import { push } from "@navigation";

const HomeScreenViewModel = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userAccount);

  useEffect(() => {
    getUserData();
  });
  const getUserData = async () => {
    const res: IApiResponse<User> = await sendGetRequest<User>(
      APIConstants.GetUser,
    );
    dispatch(setAllUsers(res.data));
  };
  const handleItemPress = () => {
  push(SCREENS.DETAIL);
  };

  return (
    <>
      <HomeScreen
        {...{
          userData,
          handleItemPress,
        }}
      />
    </>
  );
};

export default HomeScreenViewModel;
