import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBack } from "@mui/icons-material";
import { GetDashboardDataWithAuthorization } from "../../../Redux/Actions/Dashboard.Data.action";
import { development } from "../../../endpoints";
import FooterButtons from "../../User/FooterButtons";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { addRecenetViewContent } from "../../../Redux/Actions/Client Side/content.action";

import ReuseableCarousel from "../../ReusableCarousel";

const CoursePageGuest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.state);
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const [data, setdata] = useState([]);

  const [coursesWithTopics, setCoursesWithTopics] = useState([]);
  const [chaptersWithTopics, setChaptersWithTopics] = useState([]);

  const handleBack = () => {
    navigate("/");
  };

  // console.log("coursesWithTopics", coursesWithTopics);
  // console.log("chaptersWithTopics", chaptersWithTopics);

  useEffect(() => {
    const authDashboardData = async () => {
      const response = await dispatch(
        GetDashboardDataWithAuthorization(params?.id, role, token)
      );
      console.log("Get Dashboard Data Response", response);

      const responseChapter = await dispatch(
        GetDashboardDataWithAuthorization(params?.id, role, token)
      );

      setChaptersWithTopics(response?.data?.slice(1));
      console.log("response?.data?.shift()", response?.data?.slice(1));

      setCoursesWithTopics(responseChapter?.data[0]);
      setdata(response);
    };
    authDashboardData();
  }, [params]);

  const handleDetailPageNavigate = async (
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
      <button
        onClick={handleBack}
        className="back_button"
        style={{ color: `${theme ? " #363636" : "  #C8C8C8"}` }}
      >
        <ArrowBack className="backbutton_icon" />{" "}
        <span className="backbutton_text">Back</span>
      </button>
      <div className="mainContentContainer">
        <div className="mainContentContainer " style={{ marginTop: "20px" }}>
          {data?.slugimg ? (
            <div className="slugImage">
              <img
                src={`${development}/media/${data?.slugimg}`}
                alt=""
                className="coursemainimage "
              />
            </div>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <CircularProgress color="inherit" size={30} />
            </Box>
          )}

          <span
            style={{ marginTop: "10px" }}
            className={theme ? "mycontentheadtwoo" : "mycontentheadthree"}
          >
            {data?.dropdown?.parent?.CategoryName !== undefined
              ? data?.dropdown?.parent?.CategoryName?.charAt(0).toUpperCase() +
                data?.dropdown?.parent?.CategoryName?.slice(1)
              : null}
          </span>
        </div>
      </div>
      {data?.data?.length > 0 ? (
        <>
          <div className="landingpage_slider_container coursemainpage_container">
            {coursesWithTopics?.lecture?.length > 0 && (
              <div className="content_root_container">
                {/* <>
                  {item?.lecture?.length > 0 && ( */}
                <div>
                  <span
                    className={
                      theme ? "chapternameclass" : "chapternameclasstwo"
                    }
                  >
                    {coursesWithTopics?.CategoryName?.charAt(0).toUpperCase() +
                      coursesWithTopics?.CategoryName?.slice(1)}
                  </span>
                </div>

                {coursesWithTopics?.lecture?.length !== 0 ? (
                  <div>
                    <ReuseableCarousel>
                      {coursesWithTopics?.lecture?.map((e) => {
                        console.log(e?.meta_description);
                        return (
                          <div className=" keen-slider__slide">
                            <img
                              onClick={() =>
                                handleDetailPageNavigate(
                                  e?.unique_identifier,
                                  e?.title,
                                  coursesWithTopics?.id,
                                  e?.id,
                                  e?.courseid,
                                  e?.meta_description,
                                  e.images?.replaceAll("/", "|")
                                )
                              }
                              src={`${development}/media/${e.images}`}
                              className="landingpage_images"
                              // style={{
                              //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                              // }}
                              alt=""
                            />
                            {e.images ? (
                              <div className="coursepageguestsection">
                                <p
                                  className="coursepageguesttext"
                                  style={{
                                    color: theme ? "#363636" : "#FFFFFF",
                                  }}
                                >
                                  {e?.title?.charAt(0).toUpperCase() +
                                    e?.title?.slice(1)}
                                </p>
                                {/* <Typography
                                          noWrap
                                          component="div"
                                          className="subcoursename"
                                          style={{
                                            color: theme
                                              ? "#363636"
                                              : "#FFFFFF",
                                          }}
                                        >
                                          {e?.title?.charAt(0).toUpperCase() +
                                            e?.title?.slice(1)}
                                        </Typography> */}
                                <div></div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        );
                      })}
                    </ReuseableCarousel>
                  </div>
                ) : (
                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    className={theme ? "two" : "one"}
                  >
                    No content found
                  </h5>
                )}
              </div>
            )}
          </div>

          {chaptersWithTopics?.length > 0 ? (
            <div className="landingpage_slider_container coursemainpage_container">
              {chaptersWithTopics?.map((item) => {
                return (
                  <div className="content_root_container">
                    {/* <>
                  {item?.lecture?.length > 0 && ( */}
                    <div>
                      <span
                        className={
                          theme ? "chapternameclass" : "chapternameclasstwo"
                        }
                      >
                        {item?.CategoryName?.charAt(0).toUpperCase() +
                          item?.CategoryName?.slice(1)}
                      </span>
                    </div>

                    {item?.lecture?.length !== 0 ? (
                      <>
                        <ReuseableCarousel>
                          {window.innerWidth < 800
                            ? item?.lecture?.map((e) => {
                                // console.log(e?.meta_description)
                                return (
                                  <div className=" keen-slider__slide">
                                    <img
                                      onClick={() =>
                                        handleDetailPageNavigate(
                                          e?.unique_identifier,
                                          e?.title,
                                          item?.id,
                                          e?.id,
                                          e?.courseid,
                                          e?.meta_description,
                                          e.images?.replaceAll("/", "|")
                                        )
                                      }
                                      src={`${development}/media/${e.images}`}
                                      className="landingpage_images"
                                      // style={{
                                      //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                                      // }}
                                      alt=""
                                    />
                                    {e.images ? (
                                      <div className="coursepageguestsection">
                                        <p
                                          className="coursepageguesttext"
                                          style={{
                                            color: theme
                                              ? "#363636"
                                              : "#FFFFFF",
                                          }}
                                        >
                                          {e?.title?.charAt(0).toUpperCase() +
                                            e?.title?.slice(1)}
                                        </p>
                                        {/* <Typography
                                          noWrap
                                          component="div"
                                          className="subcoursename"
                                          style={{
                                            color: theme
                                              ? "#363636"
                                              : "#FFFFFF",
                                          }}
                                        >
                                          {e?.title?.charAt(0).toUpperCase() +
                                            e?.title?.slice(1)}
                                        </Typography> */}
                                        <div></div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                );
                              })
                            : item?.lecture?.map((e) => {
                                // console.log(e?.meta_description)
                                return (
                                  <div
                                    style={{ padding: "3px" }}
                                    className="intro-slides"
                                  >
                                    <img
                                      onClick={() =>
                                        handleDetailPageNavigate(
                                          e?.unique_identifier,
                                          e?.title,
                                          item?.id,
                                          e?.id,
                                          e?.courseid,
                                          e?.meta_description,
                                          e.images?.replaceAll("/", "|")
                                        )
                                      }
                                      src={`${development}/media/${e.images}`}
                                      className="landingpage_images"
                                      // style={{
                                      //   filter: `${e.disable ? "brightness(15%)" : ""}`,
                                      // }}
                                      alt=""
                                    />
                                    {e.images ? (
                                      <div className="coursepageguestsection">
                                        <p
                                          className="coursepageguesttext"
                                          style={{
                                            color: theme
                                              ? "#363636"
                                              : "#FFFFFF",
                                          }}
                                        >
                                          {e?.title?.charAt(0).toUpperCase() +
                                            e?.title?.slice(1)}
                                        </p>
                                        {/* <Typography
                                          noWrap
                                          component="div"
                                          className="subcoursename"
                                          style={{
                                            color: theme
                                              ? "#363636"
                                              : "#FFFFFF",
                                          }}
                                        >
                                          {e?.title?.charAt(0).toUpperCase() +
                                            e?.title?.slice(1)}
                                        </Typography> */}
                                        <div></div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                );
                              })}
                        </ReuseableCarousel>
                      </>
                    ) : (
                      <h5
                        style={{
                          textAlign: "center",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        className={theme ? "two" : "one"}
                      >
                        No content found
                      </h5>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <h5
              style={{
                textAlign: "center",
                marginTop: "10px",
                display: "flex",
                justifyContent: "center",
              }}
              className={theme ? "two" : "one"}
            >
              No content found
            </h5>
          )}
        </>
      ) : (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
          <CircularProgress color="inherit" size={30} />
        </Box>
      )}

      <FooterButtons />
    </>
  );
};
export default CoursePageGuest;
