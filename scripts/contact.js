
const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const formData = {

            name: document.getElementById("contact-name").value.trim(),

            email: document.getElementById("contact-email").value.trim(),

            subject: document.getElementById("contact-subject").value.trim(),

            enquiryType: document.getElementById("contact-enquiry").value,

            message: document.getElementById("contact-message").value.trim()

        };

        try {

            const response = await fetch("https://foodieland-oq9b.onrender.com/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)

            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            alert("Message sent successfully!");

            contactForm.reset();

        }
        catch (error) {

            console.error(error);

            alert("Unable to send message.");

        }

    });

}