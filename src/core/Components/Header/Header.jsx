import { Avatar, Popover } from "antd";
import React from "react";
import { useRef } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { LOCAL_SERVICE } from "../../services/localServ";
import logo from "../../assets/images/main-logo.svg";

import { BiUser } from "react-icons/bi";

function Header({ handleSearchInput }) {
  let searchRef = useRef(null);
  let navigate = useNavigate();
  let handleDebounce = (e, searchRef) => {
    let value = e.target.value;
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      handleSearchInput(value);
    }, 500);
  };

  let handleLogout = () => {
    LOCAL_SERVICE.user.unset();
    navigate("/login");
  };

  let userProfileActions = () => {
    return (
      <div className="profile-action min-w-[17px]">
        <div className="view-profile cursor-pointer hover:bg-slate-200/50 transition-all duration-700 py-4 px-2 flex gap-2 items-center rounded-md">
          <div className="capitalize flex items-center gap-3">
            <div className="avatar user-avatar">
              <Avatar
                size={30}
                icon={<BiUser className="h-full mx-auto" />}
                className="bg-[#5C31D6]"
              />
            </div>
            <p className="username mb-0">{LOCAL_SERVICE.user.get().username}</p>
          </div>
        </div>
        <div
          className="sign-out cursor-pointer hover:bg-slate-200/70 transition-all duration-700 py-4 px-2 flex items-center gap-4 rounded-md"
          onClick={handleLogout}
        >
          <FiLogOut size={22} />
          <div className="capitalize">Log out</div>
        </div>
      </div>
    );
  };

  let renderUserProfile = () => {
    let userInfo = LOCAL_SERVICE.user.get();
    if (userInfo) {
      return (
        <div className="header-avatar">
          <Popover
            placement="bottomRight"
            content={userProfileActions()}
            trigger="click"
            className="cursor-pointer"
          >
            <div className="avatar user-avatar">
              <Avatar
                size={45}
                icon={<BiUser className="h-full mx-auto" />}
                className="bg-[#5C31D6]"
              />
            </div>
          </Popover>
        </div>
      );
    }
  };

  return (
    <div className="header-group">
      <div className="header-area top">
        <div className="container-fluid">
          <div className="header-content-wrapper">
            <div className="header-content d-flex justify-between items-center">
              <div className="header-left-content d-flex">
                <div className="main-logo">
                  <a href="/">
                    <img src={logo} alt="main-logo" />
                  </a>
                </div>
                <form className="search-bar d-flex">
                  <img
                    src="https://templates.envytheme.com/joxi/default/assets/images/icon/search-normal.svg"
                    alt="search-normal"
                  />
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      handleDebounce(e, searchRef);
                    }}
                  />
                </form>
                {renderUserProfile()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-area">
        <div className="container-fluid">
          <div className="header-content-wrapper">
            <div className="header-content d-flex justify-content-between align-items-center">
              <div className="header-right-content d-flex align-items-center">
                <div className="header-right-option btn">
                  <a
                    href="/"
                    className="dropdown-item fullscreen-btn"
                    id="fullscreen-button"
                  >
                    <img
                      src="https://templates.envytheme.com/joxi/default/assets/images/icon/book.svg"
                      alt=""
                    />
                  </a>
                </div>

                {/* <div className="header-right-option btn">
                  <a
                    href="/manager"
                    className="dropdown-item fullscreen-btn"
                    id="fullscreen-button"
                  >
                    <img
                      src="https://templates.envytheme.com/joxi/default/assets/images/icon/element.svg"
                      alt=""
                    />
                  </a>
                </div> */}

                {LOCAL_SERVICE.user.getRole() === "admin" && (
                  <div className="header-right-option btn">
                    <a
                      href="/admin/user-management"
                      className="dropdown-item fullscreen-btn"
                      id="fullscreen-button"
                    >
                      <img
                        src="https://templates.envytheme.com/joxi/default/assets/images/icon/layer.svg"
                        alt=""
                      />
                    </a>
                  </div>
                )}

                <div className="header-right-option btn">
                  <a
                    href="/customer/addcustomer"
                    className="dropdown-item fullscreen-btn"
                    id="fullscreen-button"
                  >
                    <img
                      src="https://templates.envytheme.com/joxi/default/assets/images/icon/profile-2user.svg"
                      alt=""
                    />
                  </a>
                </div>

                {LOCAL_SERVICE.user.getRole() === "admin" && (
                  <div className="header-right-option btn">
                    <a
                      href="/admin/add-user"
                      className="dropdown-item fullscreen-btn"
                      id="fullscreen-button"
                    >
                      <img
                        src="https://templates.envytheme.com/joxi/default/assets/images/icon/user-octagon.svg"
                        alt=""
                      />
                    </a>
                  </div>
                )}
                {LOCAL_SERVICE.user.getRole() === "admin" && (
                  <div className="header-right-option btn">
                    <a
                      href="/admin/user/task-management"
                      className="dropdown-item fullscreen-btn"
                      id="fullscreen-button"
                    >
                      <img
                        src="https://templates.envytheme.com/joxi/default/assets/images/icon/book.svg"
                        alt=""
                      />
                    </a>
                  </div>
                )}
                {LOCAL_SERVICE.user.getRole() === "user" && (
                  <div className="header-right-option btn">
                    <a
                      href="/user/task-tracking"
                      className="dropdown-item fullscreen-btn"
                      id="fullscreen-button"
                    >
                      <img
                        src="https://templates.envytheme.com/joxi/default/assets/images/icon/book.svg"
                        alt=""
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
