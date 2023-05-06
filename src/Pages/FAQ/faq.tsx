import { Accordion } from "@mantine/core";
import Footer from "../../Components/Shared/Footer";
import { Navbar } from "../../Components/Shared/Navbar";

const Faq = () => {
    return (
        <div>
            <Navbar />
            <br></br>
            <div className="ml-40 mr-40">
                <h1><strong>Frequently asked questions</strong></h1>
                <br></br>

                <Accordion iconPosition="right" multiple>
                    <Accordion.Item label="What is Stocklerz?">
                        Stocklerz is a platform that offers a collection of royalty-free digital assets such as photos, illustrations, graphics, and vectors that can be used for personal or business purposes.
                    </Accordion.Item>

                    <Accordion.Item label="What types of digital assets are available on Stocklerz?">
                        Stocklerz offers a wide range of digital assets including photos, videos, graphics, audio and other digital assets.
                    </Accordion.Item>

                    <Accordion.Item label="What is the pricing for assets?">
                        The pricing for assets on Stocklerz varies depending on the type of asset and the license purchased. Some assets may be available for free while others may require a subscription or a one-time payment.
                    </Accordion.Item>

                    <Accordion.Item label="How do I search for assets?">
                        You can search for assets on Stocklerz using keywords or filters such as category, orientation, and color.
                    </Accordion.Item>

                    <Accordion.Item label="What is the resolution of the assets?">
                        The resolution of the assets on Stocklerz depends on the specific asset and its intended use. High-resolution assets are available for purchase.
                    </Accordion.Item>

                    <Accordion.Item label="Can I edit the assets?">
                        Yes, you can edit the assets as long as you do not redistribute them in a manner that is illegal or goes against Stocklerz's terms of service.
                    </Accordion.Item>

                    <Accordion.Item label="Is it permissible for me to use an image that includes a well-known brand, logo, or trademark and then sell it?">
                        Our recommendation is to avoid using any images that contain identifiable logos, trademarks, or other features associated with a particular brand, as these items are likely to be protected by trademark or other legal means. Using such images for commercial purposes could result in legal consequences.
                    </Accordion.Item>

                    <Accordion.Item label="Would it be permissible for me to utilize Stocklerz images of individuals or property in a commercial context?">
                        If an individual is identifiable in an image, it is advisable to contact the artist and request a model release. It is important to note that our license does not impact any patent or trademark rights of a person, so we recommend that our users conduct due diligence to ensure they have the necessary rights to utilize such content. Learn more about  Model and Property Release in our License page.
                    </Accordion.Item>

                    <Accordion.Item label="What are Stocklerz licenses?">
                        In order to use Stocklerz resources, it is important to comply with our Terms of use. These terms outline how our assets can be used and what is not allowed. To better understand these guidelines, we recommend that users check our License and Terms of use, which provide additional information and clarification on how to properly use our resources. By following these guidelines, users can ensure that they are using our assets in a legal and appropriate manner.
                    </Accordion.Item>

                    <Accordion.Item label="How do I receive general support from STOCKLERZ?">
                        You can receive support for STOCKLERZ by contacting their customer support team through email contact@stocklerz.com
                    </Accordion.Item>

                    <Accordion.Item label="How do I receive support for Copyright Infringement?">
                        We do not allow unauthorized distribution of our assets and take copyright violations seriously. Users who infringe copyright may face legal penalties, and we will take action to remove infringing content. Contact us at copyright@stocklerz.com with evidence of infringement, and we will investigate and take necessary action.
                    </Accordion.Item>
                </Accordion>
            </div>
            <br></br>
        
            <Footer />

        </div>
    )

};

export default Faq;