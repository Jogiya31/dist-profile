import Slider from "react-slick";
import sectionBg from "../assets/images/sectionbg.png";
import { useEffect, useRef, useState } from "react";
import "../assets/css/CarouselPage.css";
import rightArrow from "../assets/images/b-rightArrow.png";
import { useSelector } from "react-redux";

const SchemesSection = () => {
  const scrollerRef = useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;
  const [sectorCards, setsectorCards] = useState([]);

  // get data from redux store
  const allSchemesData = useSelector((state) => state.allScheme.data || []); //allscheme list from Redux store
  const sectorsList = useSelector((state) => state.filters.sectors); // Sectors list from Redux store

  const generateKey = (item) => `${item}-${new Date().getTime()}`;

  const settings = {
    centerMode: true, // Enables center mode
    centerPadding: "0", // Padding around the center card
    slidesToShow: 5, // Show 3 cards at a time
    focusOnSelect: true, // Allows clicking on side cards to bring to center
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  useEffect(() => {
    if (allSchemesData && allSchemesData.Table && allSchemesData.Table.length) {
      // Count occurrences of sec_code
      const secCodeCounts =
        allSchemesData &&
        allSchemesData.Table &&
        allSchemesData.Table.reduce((acc, item) => {
          acc[item.sec_code] = (acc[item.sec_code] || 0) + 1;
          return acc;
        }, {});

      // Map sec_code to Sector_name and format the output
      const formattedOutput = Object.entries(secCodeCounts).map(
        ([sec_code, count]) => {
          const matchingSector =
            sectorsList &&
            sectorsList.Table &&
            sectorsList.Table.find(
              (sector) => String(sector.id) === String(sec_code)
            );
          return {
            title: matchingSector ? matchingSector.Sector_name : '',
            count,
            sec_code,
          };
        }
      );

      setsectorCards(formattedOutput);
    }

    const scroller = scrollerRef.current;

    // Scroll to the beginning when the component renders
    if (scroller) {
      scroller.scrollTo({ left: 0, behavior: "smooth" });
    }

    const autoScroll = () => {
      if (scroller) {
        const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

        // Check if the scroller has reached the end
        if (scroller.scrollLeft >= maxScrollLeft) {
          scroller.scrollTo({ left: 0, behavior: "smooth" }); // Reset to the start
        } else {
          scroller.scrollBy({
            left: 200, // Scroll left by 200px
            behavior: "smooth", // Smooth scrolling
          });
        }
      }
    };

    const interval = setInterval(autoScroll, 2000); // Auto-scroll every 2 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, [allSchemesData, sectorsList]);

  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.pageX - scrollerRef.current.offsetLeft;
    scrollLeft = scrollerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll sensitivity
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
  };
  const handleTouchStart = (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - scrollerRef.current.offsetLeft;
    scrollLeft = scrollerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll sensitivity
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    isDragging = false;
  };

  const createSchemeCard = (
    logoUrl,
    project_name,
    KPIName,
    KPIValue,
    index
  ) => {
    return (
      <div key={index} className="info-card">
        <div className="logoSection">
          <img src={logoUrl} className="Schemelogos" alt="" />
        </div>
        <div className="info-content w-full flex pr-3 pl-3">
          <div className="title w-full flex justify-start text-start ">
            <h4 className="schemeName justify-start text-start">
              {project_name}
            </h4>
          </div>
          <div className="footer flex w-full justify-between">
            <div className="subtitle">
              <p className="justify-start text-start">{KPIName}</p>
              <h3 className="justify-start text-start">{KPIValue}</h3>
            </div>
            <div className="info-arrow">
              <img src={rightArrow} className="w-[19px]" alt="arrow" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container-flex bg-primary-bg pb-12">
        <img src={sectionBg} alt="" />
        <div className="custom-container schemes-slick">
          <div className="flex justify-between">
            <h2 className="text-2xl text-neutral-800 slick-title  font-semibold">
              Schemes available in the District
            </h2>
            <div>
              <img src="" alt="" />
              <img src="" alt="" />
            </div>
          </div>

          {/* Sector Carousel */}
          <Slider {...settings} inert>
            {sectorCards.map((card, index) => {
              console.log("card", card);

              const logoUrl = `images/sector/${card.sec_code}.png`;
              return (
                <div key={index} className="sector-card">
                  <div className="sector-content">
                    <p className="sectorName">Sectors</p>
                    <h3 className="schemeName">{card.title}</h3>
                    <span className="count">{card.count}</span>
                  </div>
                  <img src={logoUrl} className="sectorLogo" alt="" />
                </div>
              );
            })}
          </Slider>

          {/* Information Cards */}
          <div
            className="card-scroller"
            ref={scrollerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {allSchemesData &&
              allSchemesData.Table &&
              allSchemesData.Table.map((item) => {
                const logoUrl = `images/schemes/${item.project_code}.png`;
                const cards = [];

                // Create the first card
                cards.push(
                  createSchemeCard(
                    logoUrl,
                    item.project_name,
                    item.KPIName1,
                    item.KPIValue1,
                    `${generateKey(item)}-1`
                  )
                );

                // Create the second card if KPIName2 exists
                if (item.KPIName2 !== "") {
                  cards.push(
                    createSchemeCard(
                      logoUrl,
                      item.project_name,
                      item.KPIName2,
                      item.KPIValue2,
                      `${generateKey(item)}-2`
                    )
                  );
                }

                return cards; // Return the array of cards for flatMap
              })}
          </div>
        </div>
      </div>
    </>
  );
};
export default SchemesSection;
