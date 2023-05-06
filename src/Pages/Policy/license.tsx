import Footer from "../../Components/Shared/Footer";
import { Navbar } from "../../Components/Shared/Navbar";
import './license.css';
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const License = () => {
    return (
        <div>
            <Navbar />
            <br />
            <div className="ml-40 mr-40">
                <h1><strong>License - In Short</strong></h1>
                <br />

                <p>At Stocklerz, we have a deep love and respect for our community of creatives. We want you to feel free to download and use our digital assets in any creative way that inspires you. To show our love, we've simplified our licensing terms below.</p>
                <br />

                <div className="boxmodal">
                    <h1>What is allowed?</h1><br />

                    <p><IoIosCheckmarkCircle className="right-icon" /> You are free to use all the assets available on Stocklerz without any charge.</p> <br />
                    <p><IoIosCheckmarkCircle className="right-icon" /> While it's not mandatory, it's appreciated if you give credit to the contributor or Stocklerz for the content used.</p> <br />
                    <p><IoIosCheckmarkCircle className="right-icon" /> Additionally, you have the permission to modify the photos and videos to fit your creative requirements.</p><br /><br />

                    <h1>What is not allowed?</h1><br />

                    <p><IoIosCloseCircle className="wrong-icon" /> Content uploaded to Stocklerz should not be redistributed or sold on other stock or wallpaper platforms.</p><br />
                    <p><IoIosCloseCircle className="wrong-icon" /> It is not permitted to sell unaltered copies of the content, such as selling an exact copy of a stock photo as a poster, print, or on a physical product.</p><br />
                    <p><IoIosCloseCircle className="wrong-icon" /> Identifiable people should not be portrayed in a negative or offensive way. The content with identifiable persons or brands should not be used to create a misleading association with a product or service.</p><br /><br />

                    <h1>Model and Property Release</h1><br />

                    <p>
                        At Stocklerz, we value the rights of individuals and owners, and we want to make sure that any content uploaded to our platform which features identifiable people, private property, trademarks, and visible logos has appropriate releases from those identifiable people or owners. This is meant by the terms &quot;Model Release&quot; and &quot;Property Release&quot;.<br />

                        Model- and Property Releases are particularly important for commercial uses. If you intend to monetize the use of content from Stocklerz, you must ensure that you have obtained necessary Model- and Property Releases from the depicted individuals or owners. Commercial use is loosely defined as all sorts of businesses, where you are actually selling or promoting something, or if you use images for advertising purposes.<br />
                        
                        It is your responsibility to make sure the depicted content (persons, logos, designs, property, etc.) is suitable for your use and does not infringe any rights. We recommend that you refer to intellectual property release requirements to ensure that you are using the content in a manner that complies with legal requirements.<br />

                        Please note that if you are downloading an item of content from Stocklerz and using it for non-commercial, editorial usage, such as talking about or reporting on the issues of the day and matters of public interest, no model or property releases are required. However, if you intend to use the content for commercial purposes, you must ensure that you have appropriate Model- and Property Releases.<br />
                        
                        Stocklerz is not responsible for verifying the existence of a valid model or property release and it is solely the responsibility of the content uploader/contributor to obtain and provide such releases if necessary.<br />
                        
                        In conclusion, we want to make it easy for you to use the content on our platform, but we also want to ensure that you respect the rights of individuals and owners. Before using any content from Stocklerz, put yourself in the position of a depicted person or in the position of an owner or designer: Would you approve of the intended application without being asked? That is the question you should always ask yourself before using a Stocklerz image without obtaining additional permissions.
                    </p><br />

                </div>

            </div>
            <Footer />
        </div>
    )
};

export default License;