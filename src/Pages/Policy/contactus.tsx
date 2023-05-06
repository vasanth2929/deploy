import Footer from "../../Components/Shared/Footer";
import { Navbar } from "../../Components/Shared/Navbar"
import { Input } from "../../Components/Shared/Input";
import { useState } from "react";
import { Button } from "@mantine/core";
import { isEmpty } from "lodash";
import './contactus.css';
import { Link } from "react-router-dom";

const ContactUs = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const isInValid = isEmpty(name) || isEmpty(email);
    const submit = (status: "result") => {
        if (isInValid) return;
        const form = new FormData();
        form.append("name", name);
        form.append("email", email);
        form.append("comment", comment);
            // TODO: Need to store data
        };

    return (
        <div>
            <Navbar />
            <br />
            <div className="flex gap-10">
                <div className="ml-40 mr-40">
                    <h1><strong>Contact Us</strong></h1>
                    <br />
                    <p>With love, we care for our users and contributors. Share your experience with us!</p><br />

                    <div className="flex gap-10">
                        <div className="w-[700px]">
                            <div className="flex gap-5 mt-5">
                                <div className="flex flex-col flex-1">
                                    <label className="mb-1">YOUR FULL NAME</label>
                                    <Input
                                        placholder="Type your name"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <label className="mb-1">YOUR EMAIL ADDRESS</label>
                                    <Input
                                        placholder="example@mail.com"
                                        value={email}
                                        onChange={(e: any) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <br />

                            <div>
                                <label className="mb-1">What kind of assistance do you require?</label>
                                    <Input
                                        placholder="Please provide further details regarding your concern."
                                        value={comment}
                                        onChange={(e: any) => setComment(e.target.value)}
                                    />
                            </div>
                        </div>
                    </div>

                    <br />

                    <Button
                        style={{ background: "#189EFF" }}
                        variant="filled"
                        onClick={() => submit("result")}
                        disabled={isInValid}
                    >
                    Submit
                    </Button>

                    <br />
                    <br />

                    
                    
                </div>

                <div>
                    <h2><strong>Address</strong></h2><br />
                    4th Street Shakthi Nagar,<br />
                    No. 103/2958,<br />
                    Rajapalayam, TamilNadu - 626117<br />
                    India<br /><br />

                    Phone: +91 9361791979<br />
                    Email: <a href="" style={{color: '#189EFF'}}>contact@stocklerz.com</a><br /><br />

                    <h2><strong>Check Out</strong></h2><br />
                    <li><Link to="/terms" style={{color: '#189EFF'}}>Terms of Service</Link></li>
                    <li><Link to="/privacypolicy" style={{color: '#189EFF'}}>Privacy Policy</Link></li>
                    <li><Link to="/faq" style={{color: '#189EFF'}}>FAQ</Link></li>
                    <li><Link to="/license" style={{color: '#189EFF'}}>License</Link></li>



                </div>
            </div>

            <br />
            <br />

            <Footer />
        </div>
    )
}


export default ContactUs;
