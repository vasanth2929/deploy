import React from "react";
import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import Rating from "react-rating-stars-component";
import "./index.css";
import Footer from "../../Components/Shared/Footer";

export const Courses = () => {
  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>

      <div className="max-w-[1440px] mx-auto">
        <h3 className="my-8 text-[30px] font-medium">Top Courses</h3>

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

      <Footer />
    </div>
  );
};
