import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Guest/LandingPG/Lp.css";
import { development } from "../../endpoints";
import RVector from "../../assests/RVector.png";
import { Typography } from "@material-ui/core";
import Group89Blue from "../../assests/Group89Blue.png";
import FooterButtons from "../User/FooterButtons";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { viewCourseStatus } from "../../Redux/Actions/Client Side/course.action";
import moment from "moment";
import { courseHistory } from "../../Redux/Actions/history";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Bookmark_blue from "../../assests/SVG_Files/New folder/Bookmark_blue.svg";
import Bookmark_yellow from "../../assests/SVG_Files/New folder/Bookmark_yellow.svg";
import Bookmark_red from "../../assests/SVG_Files/New folder/Bookmark_red.svg";
import Bookmark_green from "../../assests/SVG_Files/New folder/Bookmark_green.svg";
import Bookmark_grey from "../../assests/SVG_Files/New folder/Bookmark_gray.svg";
import Green_Bookmark from "../../assests/SVG_Files/New folder/Green_Bookmark.svg";

import {
  addContentBookmark,
  showAllBoomark,
} from "../../Redux/Actions/bookmark.action";
import Swal from "sweetalert2";
import { setBookMarkPriority } from "../../Redux/Actions/Client Side/librar.y.action";
import ReuseableCarousel from "../ReusableCarousel";

const Recentlyviewed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state) => state.theme.state);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const [history, setHistory] = useState([]);
  const [bookmark, setBookmark] = useState();
  const [count, setCount] = useState(0);
  const [priority, setPriority] = useState("");
  const [showAllBookmark, setShowAllBookmark] = useState([]);

  console.log("showAllBookmark history", history);
  console.log("showAllBookmark", showAllBookmark);

  const handleBack = () => {
    navigate("/");
  };

  const handleDetails = (
    identifier,
    title,
    categoryid,
    postId,
    courseId,
    meta,
    img
  ) => {
    // console.log(category, course, chapter, title, slug, categoryid, postId);

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
  };

  const handleShowAllBookmark = async () => {
    const response = await dispatch(showAllBoomark(role, token));
    console.log(response);
    setShowAllBookmark(response);
  };

  // console.log(count);

  const handleBookMark = async (Contentid) => {
    const response = await dispatch(addContentBookmark(Contentid, role, token));
    // console.log("response", response);
    setBookmark(response);
    !token &&
      Swal.fire({
        title: "Unauthenticated",
        text: "Please login to bookmark",
        iconColor: "red",
        icon: "error",
      });
  };

  useEffect(() => {
    const recentViewedCourses = async () => {
      const response = await dispatch(courseHistory(token, role));
      // console.log("response", response);
      setHistory(response);
    };
    recentViewedCourses();
    handleShowAllBookmark();
  }, [bookmark]);

  return (
    <>
      <div
        className={
          theme
            ? "recentlyviewedmaincontainerlight"
            : "recentlyviewedmaincontainer"
        }
      >
        <button
          onClick={handleBack}
          className="back_button"
          style={{ color: `${theme ? " #363636" : "  #C8C8C8"}` }}
        >
          <ArrowBack className="backbutton_icon" />{" "}
          <span className="backbutton_text">Back</span>
        </button>
        <div className="mainContentContainer recentlyreviewed">
          <div className="recentlyviewedsection">
            <div style={{ display: "flex", alignItems: "center" }}>
              {theme ? (
                <img
                  src={Group89Blue}
                  alt="error"
                  className="recentlyviewedimage"
                />
              ) : (
                <img
                  src={RVector}
                  alt="error"
                  className="recentlyviewedimage"
                />
              )}
              <span
                className={
                  theme ? " recentlyviewedheading" : "recentlyviewedheadingtwo"
                }
              >
                Recently Viewed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="recentlyreviewd_slider_container">
        {history?.length > 0 ? (
          <>
            {history?.map((day) => (
              <div className="content_root_container">
                <div>
                  <span
                    className={
                      theme ? "chapternameclass" : "chapternameclasstwo"
                    }
                  >
                    {day?.chapterName}
                  </span>
                </div>
                <div>
                  {day?.items?.length > 0 ? (
                    <ReuseableCarousel>
                      {day?.items?.map((e) => {
                        return (
                          <div
                            style={
                              window.innerWidth < 800 ? {} : { padding: "3px" }
                            }
                            className={
                              window.innerWidth < 800
                                ? "keen-slider__slide"
                                : "intro-slides"
                            }
                          >
                            <img
                              src={`${development}/media/${e.images}`}
                              className="landingpage_images"
                              // style={{
                              //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                              // }}
                              alt=""
                              onClick={() =>
                                handleDetails(
                                  e?.unique_identifier,
                                  e?.title,
                                  e?.chapterid,
                                  e?.Content_id,
                                  e?.courseid,
                                  e?.meta_description,
                                  e.images?.replaceAll("/", "|")
                                )
                              }
                            />
                            {e?.images ? (
                              <div className="underimagetextcontainer">
                                <Typography
                                  noWrap
                                  component="div"
                                  className="underimagecontent"
                                  style={{
                                    color: theme ? "#363636" : "#FFFFFF",
                                  }}
                                >
                                  <Typography
                                    noWrap
                                    component="div"
                                    className="subcoursenametwo subcoursename"
                                  >
                                    {e?.title}
                                  </Typography>
                                </Typography>
                                <div className="mycontenttagscontainer">
                                  <img
                                    src={
                                      e?.PriorityType ===
                                      showAllBookmark[0]?.name
                                        ? Bookmark_blue
                                        : e?.PriorityType ===
                                          showAllBookmark[1]?.name
                                        ? Bookmark_green
                                        : e?.PriorityType ===
                                          showAllBookmark[2]?.name
                                        ? Bookmark_red
                                        : e?.PriorityType ===
                                          showAllBookmark[3]?.name
                                        ? Bookmark_yellow
                                        : e?.PriorityType ===
                                          showAllBookmark[4]?.name
                                        ? Green_Bookmark
                                        : e.bookmark === "null"
                                        ? Bookmark_grey
                                        : Bookmark_grey
                                    }
                                    alt=""
                                    className="tagstwocontainer"
                                    onClick={() =>
                                      handleBookMark(e?.Content_id)
                                    }
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </ReuseableCarousel>
                  ) : (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <h4>No history for {day?.chapterName}</h4>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress color="inherit" size={60} />
          </Box>
        )}
      </div>

      <FooterButtons />
    </>
  );
};
export default Recentlyviewed;
