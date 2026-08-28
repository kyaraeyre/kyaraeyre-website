/*
  Submits a <form> to the HubSpot Forms API via fetch instead of using
  HubSpot's own embed widget, so the form keeps this site's styling.

  Usage: add these attributes to the <form> tag:
    data-hubspot-portal-id="246949822"
    data-hubspot-form-id="109bc2b2-d4c8-4831-9250-6f44ced3720e"

  Field name expectations (match the site's existing contact-form markup):
    first-name, last-name, email, phone, message, property (hidden, optional)

  On success the form is replaced with a thank-you message. On failure the
  form stays, the button re-enables, and an inline note points the visitor
  to phone, text, or email instead.
*/
(function () {
  function getHubspotCookie() {
    var match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return match ? match[1] : null;
  }

  function fieldValue(form, name) {
    var el = form.elements[name];
    return el ? el.value.trim() : "";
  }

  function initHubspotForm(form) {
    var portalId = form.getAttribute("data-hubspot-portal-id");
    var formId = form.getAttribute("data-hubspot-form-id");
    if (!portalId || !formId) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      var property = fieldValue(form, "property");
      var message = fieldValue(form, "message");
      if (property) {
        message = "Property: " + property + (message ? "\n\n" + message : "");
      }

      var fields = [
        { name: "firstname", value: fieldValue(form, "first-name") },
        { name: "lastname", value: fieldValue(form, "last-name") },
        { name: "email", value: fieldValue(form, "email") },
        { name: "phone", value: fieldValue(form, "phone") },
        { name: "message", value: message }
      ].filter(function (f) {
        return f.value;
      });

      var payload = {
        fields: fields,
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      var hutk = getHubspotCookie();
      if (hutk) payload.context.hutk = hutk;

      fetch(
        "https://api.hsforms.com/submissions/v3/integration/submit/" + portalId + "/" + formId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
        .then(function (response) {
          if (!response.ok) throw new Error("HubSpot submission failed");
          var wrapper = document.createElement("div");
          wrapper.className = "form-success";
          wrapper.innerHTML =
            '<h3>I’ve got it!</h3>' +
            "<p>Thank you so much for reaching out! I'm looking forward to connecting and will be in touch soon. 🤗</p>";
          form.replaceWith(wrapper);
        })
        .catch(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
          var errorEl = form.querySelector(".form-error");
          if (!errorEl) {
            errorEl = document.createElement("p");
            errorEl.className = "form-error";
            form.appendChild(errorEl);
          }
          errorEl.textContent =
            "Something went wrong sending that. Please call or text 708-714-2896, or email kyara@williamsluxuryhomes.com instead.";
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll("form[data-hubspot-portal-id]");
    for (var i = 0; i < forms.length; i++) {
      initHubspotForm(forms[i]);
    }
  });
})();
