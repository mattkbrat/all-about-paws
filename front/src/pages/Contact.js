// Contact page

import dogPhone from '../components/images/dogPhone.png'

const Contact = () => {
  return (
    <div className="contact-page">

    <h1>CONTACT</h1>
        <div style={{display: "flex", alignItems:"center"}}>
            <div>
                <h2>TO MAKE OR CONFIRM AN APPOINTMENT:</h2>
                <p>
                    <b>Phone:</b> +1 (970) 467-1488
                </p>
                <img src={dogPhone} alt="dogPhone" style={{width: "100%"}}/>
            </div>
            <div style={{alignItems: "right"}}>
                <h2><a href="mailto:fmorgangrooming@gmail.com">EMAIL</a></h2>
                <iframe title="All About Paws Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3042.4688667317323!2d-103.84420237301637!3d40.30975062546576!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x876de9de95b82cef%3A0x1c5d9467668beed2!2sAll%20About%20Paws%20Pet%20Spa%20LLC!5e0!3m2!1sen!2sus!4v1650653417891!5m2!1sen!2sus"
                    width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div style={{alignItems:"stretch", alignText:"center"}}>
            <h2>
                HOURS OF OPERATION:
            </h2>
            <image src="../components/dogPhone.png" alt="Dog Phone" style={{width: "100px", height: "100px"}}/>
            <p>
                Tuesday - Friday: 7:00am - 4:00pm | Saturday: 7:00am - 12:00pm | Monday, Sunday: Closed
            </p>
            <p>
                16329 C/R V • FORT MORGAN, COLORADO • 80701
            </p>
        </div>
    </div>
  );
}

export default Contact;