import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Lp.css";
import LandingPageImage1 from "../../../assests/SVG_Files/LandingPageImage1.svg";
import darkmode_logo from "../../../assests/SVG_Files/New folder/darkmode_logo.svg";
import lightmode_logo from "../../../assests/SVG_Files/New folder/lightmode_logo.svg";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { courseView } from "../../../Redux/Actions/Client Side/course.view.action";
import { addToRecentViewCourses } from "../../../Redux/Actions/Client Side/course.action";
import { home } from "../../../Redux/Actions/Client Side/home.action";
import { development } from "../../../endpoints";
import FooterButtons from "../../User/FooterButtons";
import { searchCourse } from "../../../Redux/Actions/Client Side/search.action";
import ReuseableCarousel from "../../ReusableCarousel";

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { state } = useLocation();
  const [data, setdata] = useState([]);
  const theme = useSelector((state) => state.theme.state);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);

  const searchOnCourse = async () => {
    const response = await dispatch(searchCourse(state?.search));
    setdata(response);
  };

  const MainCategory = async () => {
    const response = await dispatch(home(token));
    setdata(response);
  };

  useEffect(() => {
    state?.searchKey ? searchOnCourse() : MainCategory();
  }, [state, params, window]);

  const handleViewRecentCourses = async (course) => {
    let hyphenValue = course?.unique_identifier
      ?.toString()
      ?.match(/\d{4}(?=\d{2,3})|\d+/g)
      ?.join("-");
    await dispatch(addToRecentViewCourses(course?.id, role, token));
    await dispatch(courseView(course?.id, role, token));
    navigate(
      `/course/${hyphenValue}_${course?.CategoryName}/${course?.id}`
        ?.replace(/\s+/g, "-")
        ?.replace("?", ""),
      { state: course?.image }
    );
  };

  return (
    <>
      <div
        className="mainContentContainer"
        style={
          theme === true && location.pathname === "/editcoursestructure"
            ? {
                background: "#F3F6FF",
                height: "100%",
                marginTop: "20px",
                // marginLeft: "52px",
              }
            : { marginTop: "20px" }
        }
      >
        <div className="underimagecontent">
          {theme ? (
            <img src={lightmode_logo} alt="" width="150px" height="30.7" />
          ) : (
            <img src={darkmode_logo} alt="" width="150px" height="30.7" />
          )}
        </div>
        <span
          className={theme ? "mycontentheadingtwoo" : "mycontentheadingthree"}
        >
          A web book based learning content library for digital skill
          development
        </span>

        <div className="landingpagesection">
          <img style={{ width: "230px" }} src={LandingPageImage1} alt="" />
        </div>
      </div>
      {!token && (
        <div className="mainContentContainer" style={{ marginTop: 0 }}>
          <div style={{ display: "flex" }}>
            {" "}
            <button
              className="Signup_button Signup"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
            <button
              className="Signup_button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      )}
      {data?.length > 0 ? (
        <div className="landingpage_slider_container">
          {data[0]?.data?.map((item, index) => {
            return (
              <>
                {item?.items?.length !== 0 && (
                  <div className="content_root_container" key={item?.id}>
                    <div>
                      <span
                        className={
                          theme ? "chapternameclass" : "chapternameclasstwo"
                        }
                      >
                        {item?.chaptername.charAt(0).toUpperCase() +
                          item?.chaptername.slice(1)}
                      </span>
                    </div>
                    <ReuseableCarousel>
                      {window.innerWidth < 800
                        ? item?.items?.map((e) => {
                            return (
                              <div className=" keen-slider__slide">
                                <img
                                  src={`${development}/media/${e.image}`}
                                  // onClick={() => navigate("/coursepageguest")}
                                  onClick={() => handleViewRecentCourses(e)}
                                  className="landingpage_images_home"
                                  // style={{
                                  //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                                  // }}
                                  alt="no cover"
                                />
                                {e.image ? (
                                  <div className="landingpagesubsection">
                                    <Typography
                                      noWrap
                                      component="div"
                                      className="subcoursename"
                                      style={{
                                        color: theme ? "#363636" : "#FFFFFF",
                                      }}
                                    >
                                      {e?.CategoryName.charAt(0).toUpperCase() +
                                        e?.CategoryName.slice(1)}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div
                                  style={{
                                    padding: "10px 0px 0px 10px",
                                  }}
                                >
                                  <span
                                    className="Author"
                                    style={{
                                      color: theme ? "#363636" : "#C8C8C8",
                                    }}
                                  >
                                    Author: {e?.authorname}
                                  </span>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span style={{ marginTop: "4px" }}>
                                      {e?.totalratinng === null
                                        ? 0
                                        : e?.totalratinng?.toFixed(1)}
                                    </span>
                                    <Rating
                                      sx={{ ml: 1 }}
                                      name="read-only"
                                      readOnly
                                      precision={0.5}
                                      value={e?.totalratinng}
                                      className="secondratingcomponent"
                                      emptyIcon={
                                        <StarIcon
                                          style={{ color: "#C4C4C4" }}
                                          fontSize="inherit"
                                        />
                                      }
                                    />
                                    <div
                                      className="rating_text"
                                      style={{
                                        paddingLeft: "10px",
                                        color: theme ? "#363636" : "#C8C8C8",
                                      }}
                                    >
                                      ({e?.views})
                                    </div>
                                  </Box>
                                </div>
                              </div>
                            );
                          })
                        : /* {loaded && instanceRef.current && (
                        <>
                          <Arrow
                            left
                            onClick={(e) => {
                              console.log(
                                "clicked",
                                instanceRef.current,
                                instanceRef.current?.prev()
                              );
                              e.stopPropagation() ||
                                instanceRef.current?.prev();
                            }}
                            disabled={currentSlide === 0}
                          />

                          <Arrow
                            onClick={(e) => {
                              console.log(
                                "clicked",
                                instanceRef.current,
                                instanceRef.current?.next()
                              );
                              e.stopPropagation() ||
                                instanceRef.current?.next();
                              // slider.moveToSlide(slider.details().absoluteSlide - 2)
                            }}
                            disabled={
                              currentSlide ===
                              instanceRef.current.track.details.slides.length -
                                1
                            }
                          />
                        </>
                      )} */

                          item?.items?.map((e) => {
                            return (
                              <div
                                style={{ padding: "3px" }}
                                className="intro-slides"
                              >
                                <img
                                  src={`${development}/media/${e.image}`}
                                  // onClick={() => navigate("/coursepageguest")}
                                  onClick={() => handleViewRecentCourses(e)}
                                  className="landingpage_images_home"
                                  // style={{
                                  //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                                  // }}
                                  alt="No cover"
                                />
                                {e.image ? (
                                  <div className="landingpagesubsection">
                                    <Typography
                                      noWrap
                                      component="div"
                                      className="subcoursename"
                                      style={{
                                        color: theme ? "#363636" : "#FFFFFF",
                                      }}
                                    >
                                      {e?.CategoryName.charAt(0).toUpperCase() +
                                        e?.CategoryName.slice(1)}
                                    </Typography>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div
                                  style={{
                                    padding: "10px 0px 0px 10px",
                                  }}
                                >
                                  <span
                                    className="Author"
                                    style={{
                                      color: theme ? "#363636" : "#C8C8C8",
                                    }}
                                  >
                                    Author: {e?.authorname}
                                  </span>
                                  <Box
                                    sx={{
                                      width: 200,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span style={{ marginTop: "4px" }}>
                                      {e?.totalratinng === null
                                        ? 0
                                        : e?.totalratinng?.toFixed(1)}
                                    </span>
                                    <Rating
                                      sx={{ ml: 1 }}
                                      name="read-only"
                                      readOnly
                                      precision={0.5}
                                      value={e?.totalratinng}
                                      className="secondratingcomponent"
                                      emptyIcon={
                                        <StarIcon
                                          style={{ color: "#C4C4C4" }}
                                          fontSize="inherit"
                                        />
                                      }
                                    />
                                    <div
                                      className="rating_text"
                                      style={{
                                        paddingLeft: "10px",
                                        color: theme ? "#363636" : "#C8C8C8",
                                      }}
                                    >
                                      ({e?.views})
                                    </div>
                                  </Box>
                                </div>
                              </div>
                            );
                          })}
                    </ReuseableCarousel>
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
          <CircularProgress color="inherit" size={60} />
        </Box>
      )}

      <FooterButtons />
    </>
  );
};

export default LandingPage;
