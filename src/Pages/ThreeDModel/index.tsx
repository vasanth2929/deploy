import React from "react";
import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import Rating from "react-rating-stars-component";
import "./index.css";
import { useQuery } from "react-query";
import { getAssets } from "../../services/assets.service";
import { Loader } from "@mantine/core";

export const ThreeDModel = () => {

  const { data, isLoading } = useQuery(
    "get-videos",
    () => getAssets("type=3DModel"),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);


  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>

      {isLoading ?  (
                      <div className="flex  justify-center items-center h-[200px]">
                        <Loader />
                      </div>
                    )
                 : data.data.length === 0 ? (
                                            <div className="text-center py-4">No 3d models found.</div>
                                            )
                                          : (
        <>

          <div className="max-w-[1440px] mx-auto">
            <h3 className="my-8 text-[30px] font-medium">Free 3D Models</h3>

            <div className="flex gap-9">

              {data.data.map((model) => (
                  <div className="p-[15px] card">
                    <img
                      className="h-[200px] mb-4"
                      src={model.src}
                    />
                    <div className="px-2">
                      <p>{model.title}</p>
                      <p className="text-sm text-[#999999] max-w-[216px] ">
                        Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                        {/* TODO : Replace description  */}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Rating
                            className="rating"
                            size={24}
                            count={5}
                            value={5}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <span className="ml-2">5</span>
                          <span>(100)</span>
                        </div>

                        {/* <div className="flex">
                          <span className="text-[10px]">$</span>
                          <p className="mx-[2px]">0.99</p>
                          <span className="text-[10px]">/month</span>
                        </div> */}

                        <div className="flex">
                          <p>FREE</p>
                        </div>
                      </div>
                    </div>
                  </div>

                // <div className="p-[15px] card">
                //   <img
                //     className="h-[200px] mb-4"
                //     src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                //   />
                //   <div className="px-2">
                //     <p>AI and ML</p>
                //     <p className="text-sm text-[#999999] max-w-[216px] ">
                //       Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                //     </p>

                //     <div className="flex justify-between items-center">
                //       <div className="flex items-center">
                //         <Rating
                //           className="rating"
                //           size={24}
                //           count={5}
                //           value={5}
                //           edit={false}
                //           activeColor="#ffd700"
                //         />
                //         <span className="ml-2">5</span>
                //         <span>(100)</span>
                //       </div>

                //       <div className="flex">
                //         <span className="text-[10px]">$</span>
                //         <p className="mx-[2px]">0.99</p>
                //         <span className="text-[10px]">/month</span>
                //       </div>
                //     </div>
                //   </div>
                // </div>
              ))}

            </div>
          </div>

          <div className="max-w-[1440px] mx-auto">
            <h3 className="my-8 text-[30px] font-medium">Upgrade your skill</h3>

            <div className="flex gap-9">
              <div className="p-[15px] card">
                <img
                  className="h-[200px] mb-4"
                  src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div className="px-2">
                  <p>AI and ML</p>
                  <p className="text-sm text-[#999999] max-w-[216px] ">
                    Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Rating
                        className="rating"
                        size={24}
                        count={5}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <span className="ml-2">5</span>
                      <span>(100)</span>
                    </div>

                    <div className="flex">
                      <span className="text-[10px]">$</span>
                      <p className="mx-[2px]">0.99</p>
                      <span className="text-[10px]">/month</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-[15px] card">
                <img
                  className="h-[200px] mb-4"
                  src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div className="px-2">
                  <p>AI and ML</p>
                  <p className="text-sm text-[#999999] max-w-[216px] ">
                    Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Rating
                        className="rating"
                        size={24}
                        count={5}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <span className="ml-2">5</span>
                      <span>(100)</span>
                    </div>

                    <div className="flex">
                      <span className="text-[10px]">$</span>
                      <p className="mx-[2px]">0.99</p>
                      <span className="text-[10px]">/month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-[15px] card">
                <img
                  className="h-[200px] mb-4"
                  src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div className="px-2">
                  <p>AI and ML</p>
                  <p className="text-sm text-[#999999] max-w-[216px] ">
                    Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Rating
                        className="rating"
                        size={24}
                        count={5}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <span className="ml-2">5</span>
                      <span>(100)</span>
                    </div>

                    <div className="flex">
                      <span className="text-[10px]">$</span>
                      <p className="mx-[2px]">0.99</p>
                      <span className="text-[10px]">/month</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-[15px] card">
                <img
                  className="h-[200px] mb-4"
                  src="https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
                <div className="px-2">
                  <p>AI and ML</p>
                  <p className="text-sm text-[#999999] max-w-[216px] ">
                    Lorem ipsum dolor sit amet, consec tetuer adipiscing elit.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Rating
                        className="rating"
                        size={24}
                        count={5}
                        value={5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <span className="ml-2">5</span>
                      <span>(100)</span>
                    </div>

                    <div className="flex">
                      <span className="text-[10px]">$</span>
                      <p className="mx-[2px]">0.99</p>
                      <span className="text-[10px]">/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>        

        </>
      )}

    </div>
  );
};
