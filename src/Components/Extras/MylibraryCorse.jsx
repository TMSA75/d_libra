import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import LibraryBookmarkContent from "./libcourse";
import "../User/Library/Library.css";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import FooterButtons from "../User/FooterButtons";
import Mylibrary_dark from "./../../assests/SVG_Files/Mylibrary_dark.svg";
import MyLibrary_light from "./../../assests/SVG_Files/MyLibrary_light.svg";
import { setBookMarkPriority } from "../../Redux/Actions/Client Side/librar.y.action";
import {
  addContentBookmark,
  getBookmarkCourse,
  showAllBoomark,
} from "../../Redux/Actions/bookmark.action";
import { development } from "../../endpoints";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import Bookmark_blue from "../../assests/SVG_Files/New folder/Bookmark_blue.svg";
import Bookmark_red from "../../assests/SVG_Files/New folder/Bookmark_red.svg";
import Bookmark_yellow from "../../assests/SVG_Files/New folder/Bookmark_yellow.svg";
import Bookmark_grey from "../../assests/SVG_Files/New folder/Bookmark_gray.svg";
import Bookmark_green from "../../assests/SVG_Files/New folder/Bookmark_green.svg";
import Green_Bookmark from "../../assests/SVG_Files/New folder/Green_Bookmark.svg";
import { addRecenetViewContent } from "../../Redux/Actions/Client Side/content.action";

import ReuseableCarousel from "../ReusableCarousel";

const MylibraryCorse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.state);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const [data, setdata] = useState([]);
  const [bookmark, setBookmark] = useState();
  const [count, setCount] = useState(0);
  const [priority, setPriority] = useState("");
  const [showAllBookmark, setShowAllBookmark] = useState([]);

  const handleBack = () => {
    navigate("/");
  };

  const libraryByCourse = async () => {
    const response = await dispatch(getBookmarkCourse(role, token));
    console.log("response", response);
    setdata(response);
  };

  // const priority = () => {
  //   const response = dispatch(setBookMarkPriority(token));
  //   console.log(response);
  // };
  const handleShowAllBookmark = async () => {
    const response = await dispatch(showAllBoomark(role, token));
    // console.log(response);
    setShowAllBookmark(response);
  };

  useEffect(() => {
    libraryByCourse();
    handleShowAllBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBookmarkLocally = (courseIndex, chapterIndex) => {
    const tempData = [...data];
    let PriorityType = "";
    for (let i = 0; i < showAllBookmark?.length; i++) {
      if (
        tempData?.[courseIndex]?.Chapter?.[chapterIndex]?.Prioritytype ===
        showAllBookmark?.[i]?.name
      ) {
        if (i === showAllBookmark?.length - 1) {
          PriorityType = null;
        } else {
          PriorityType = showAllBookmark?.[i + 1]?.name;
        }
        break;
      }
    }
    tempData[courseIndex].Chapter[chapterIndex].Prioritytype = PriorityType;
    setdata(tempData);
  };

  const handleBookMark = async (Contentid, courseIndex, chapterIndex) => {
    updateBookmarkLocally(courseIndex, chapterIndex);
    const response = await dispatch(addContentBookmark(Contentid, role, token));
    setBookmark(response);
    !token &&
      Swal.fire({
        title: "Unauthenticated",
        text: "Please login to bookmark",
        iconColor: "red",
        icon: "error",
      });
  };

  const hanldeDetails = async (
    identifier,
    title,
    categoryid,
    postId,
    courseId,
    meta,
    img
  ) => {
    let hyphenValue = identifier
      ?.toString()
      ?.match(/\d{4}(?=\d{2,3})|\d+/g)
      ?.join("-");
    navigate(
      `/topic/${hyphenValue}_${title}/${postId}/${categoryid}/${courseId}/${meta}/${img}`
        ?.replace(/\s+/g, "-")
        ?.replace("?", ""),
      {
        state: {
          path: location.pathname,
        },
      }
    );

    await dispatch(addRecenetViewContent(postId, role, token));
  };

  return (
    <>
      <div
        className={
          theme ? "library_root_container_simple" : "library_root_container"
        }
      >
        <button onClick={handleBack} className="back_button librarybackbutton">
          <ArrowBack className="backbutton_icon" />{" "}
          <span className="backbutton_text">Back</span>
        </button>
        <div className="header_library_container">
          <span style={{ display: "flex", alignItems: "center" }}>
            {theme ? (
              <img
                src={MyLibrary_light}
                alt=""
                className="recentlyviewedimage librarymainicon"
              />
            ) : (
              <img
                src={Mylibrary_dark}
                alt=""
                className="recentlyviewedimage librarymainicon"
              />
            )}

            <span
              className="mylibrary_text"
              style={{ color: `${theme ? " #008EEC " : "white"}` }}
            >
              My Library
            </span>
          </span>
          <span
            style={{
              color: `${theme ? " #008EEC " : "white"}`,
              paddingTop: "10px",
            }}
          >
            By Course
          </span>
        </div>
      </div>
      <div className="librarycoursecontainer">
        <Button
          className={theme ? "bycourse_button_sub" : "bycourse_button"}
          onClick={() => navigate("/LibraryBookmark")}
          style={{ color: "white" }}
          endIcon={<HiOutlineArrowNarrowRight />}
        >
          By Bookmark
        </Button>
      </div>
      <div className="landingpage_slider_container libraryrootcontainer">
        {data?.length > 0 ? (
          <>
            {data?.map((item, courseIndex) => {
              // console.log("item", item);
              return (
                <>
                  {item?.Chapter?.length !== 0 && (
                    <div className="content_root_container">
                      <div>
                        <span
                          className={
                            theme ? "chapternameclass" : "chapternameclasstwo"
                          }
                        >
                          {item.Coursename === null
                            ? "No Course Name"
                            : item.Coursename?.charAt(0).toUpperCase() +
                              item.Coursename?.slice(1)}
                        </span>
                      </div>
                      <div>
                        <ReuseableCarousel>
                          {item?.Chapter?.map((e, chapterIndex) => {
                            return (
                              <div
                                style={
                                  window.innerWidth < 800
                                    ? {}
                                    : { padding: "3px" }
                                }
                                className={
                                  window.innerWidth < 800
                                    ? "keen-slider__slide"
                                    : "intro-slides"
                                }
                              >
                                <img
                                  src={`${development}/media/${e.contentimage}`}
                                  className="landingpage_images"
                                  style={{
                                    filter: `${
                                      e.disabled ? "brightness(15%)" : ""
                                    }`,
                                  }}
                                  alt=""
                                  onClick={() =>
                                    hanldeDetails(
                                      e?.unique_identifier,
                                      e?.contentname,
                                      e.Chapterid,
                                      e?.contentid,
                                      e?.courseid,
                                      e?.meta_description,
                                      e.Contentimage?.replaceAll("/", "|")
                                    )
                                  }
                                />
                                {e.contentimage ? (
                                  <div className="underimagetextcontainer">
                                    <Typography
                                      noWrap
                                      component="div"
                                      className="underimagecontent"
                                    >
                                      <Typography
                                        noWrap
                                        component="div"
                                        className="subcoursenametwo subcoursename"
                                      >
                                        {e.contentname}
                                      </Typography>
                                    </Typography>
                                    {e?.Prioritytype !== null && (
                                      <div className="mycontenttagscontainer">
                                        {token ? (
                                          <img
                                            src={
                                              e.bookmark === null
                                                ? Bookmark_grey
                                                : e?.Prioritytype ===
                                                  showAllBookmark[0]?.name
                                                ? Bookmark_blue
                                                : e?.Prioritytype ===
                                                  showAllBookmark[1]?.name
                                                ? Bookmark_green
                                                : e?.Prioritytype ===
                                                  showAllBookmark[2]?.name
                                                ? Bookmark_red
                                                : e?.Prioritytype ===
                                                  showAllBookmark[3]?.name
                                                ? Bookmark_yellow
                                                : e?.Prioritytype ===
                                                  showAllBookmark[4]?.name
                                                ? Green_Bookmark
                                                : e.bookmark === "null"
                                                ? Bookmark_grey
                                                : Bookmark_grey
                                            }
                                            alt=""
                                            className="tagstwocontainer"
                                            onClick={() =>
                                              handleBookMark(
                                                e?.contentid,
                                                courseIndex,
                                                chapterIndex
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                          />
                                        ) : (
                                          <img
                                            src={Bookmark_grey}
                                            alt=""
                                            className="tagstwocontainer"
                                            style={{
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleBookMark(
                                                e?.contentid,
                                                courseIndex,
                                                chapterIndex
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          })}
                        </ReuseableCarousel>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </>
        ) : (
          <h2
            style={
              theme
                ? { color: "black", textAlign: "center", marginTop: "30px" }
                : { color: "white", textAlign: "center", marginTop: "30px" }
            }
          >
            No content found
          </h2>
        )}
      </div>
      <FooterButtons />
    </>
  );
};

export default MylibraryCorse;
