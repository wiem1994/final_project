import React from "react";
import "./Contact.css";

function Contact() {
    return (
        <div className="full_block">
            <div className="first_part">
                <div>
                    <h3 className="first_part_title">Let's get in touch</h3>

                    <p className="paragraph">
                        We're open for any suggestion or just to have a chat
                    </p>
                </div>
                <div>
                    <p>Address: 19 Street Riley, Tunisia 2016</p>

                    <p>Phone: + 1235 2355 98</p>

                    <p>Email: info@yoursite.com</p>

                    <p>Website: makeupforever.com</p>
                </div>
            </div>
            <div className="second_part">
                <h3 className="second_part_title">Get in touch</h3>
                <div>
                    <div>
                        <input
                            className="i_id_input"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <input
                            className="i_id_input"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                </div>

                <input
                    className="i_id_input"
                    type="text"
                    placeholder="Subject"
                />

                <input
                    type="text"
                    placeholder="Message"
                    id="input_message"
                    className="i_id_input"
                />
                <hr />

                <button
                    id="but_ton_contact_c"
                    onClick={() =>
                        alert(
                            "Your message has been sent successfully, we will get in touch with you as soon as possible ! "
                        )
                    }
                >
                    Send Message
                </button>
            </div>
        </div>
    );
}
export default Contact;
