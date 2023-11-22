describe("TAT Customer Service Center", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });
  it("checks the application title", () => {
    cy.title().should("eq", "TAT Customer Service Center");
  });

  it("fills in the required fields and submits the form", () => {
    const longText = Cypress._.repeat(
      " some text text text some text text text",
      10
    );
    cy.get("#firstName").type("Anakonda");
    cy.get("#lastName").type("Joshua");
    cy.get("#email").type("email@mail.com");
    cy.get("#open-text-area").type(longText, {
      delay: 0,
    });
    cy.contains(".button", "Send").click();
    //cy.get("button[type='submit']").click()

    cy.get(".success").should("be.visible");
    cy.get(".success > strong").should(
      "have.text",
      "Message successfully sent."
    );
  });

  it("displays an error message when submitting the form with an email with invalid formatting", () => {
    cy.get("#firstName").type("Anakonda");
    cy.get("#lastName").type("Joshua");
    cy.get("#email").type("emailmail");
    cy.get("#open-text-area").type(" some text text text some text text text");
    cy.contains(".button", "Send").click();

    cy.get(".error").should("be.visible");
    cy.get(".error > strong").should(
      "have.text",
      "Validate the required fields!"
    );
  });

  it("validate that if a non-numeric value is entered to the number field", () => {
    // cy.get("#firstName").type("Anakonda");
    // cy.get("#lastName").type("Joshua");
    // cy.get("#email").type("email@mail.com");
    cy.get("#phone").type("number").should("have.value", "");
    // cy.get("#open-text-area").type(" some text text text some text text text");
    // cy.get(".button").contains("Send").click();

    // cy.get(".error").should("have.text", "Validate the required fields!");
  });

  it("displays an error message when the phone becomes required but is not filled in before the form submission", () => {
    cy.get("#firstName").type("Anakonda");
    cy.get("#lastName").type("Joshua");
    cy.get("#email").type("email@mail.com");
    cy.get("#phone-checkbox").check();
    cy.contains(".button", "Send").click();

    cy.get(".error").should("be.visible");
    cy.get(".error > strong").should(
      "have.text",
      "Validate the required fields!"
    );
  });

  it("fills and clears the first name, last name, email, and phone fields", () => {
    cy.get("#firstName")
      .type("Anakonda")
      .should("have.value", "Anakonda")
      .clear()
      .should("have.value", "");

    cy.get("#lastName").type("Joshua").should("have.value", "Joshua");
    cy.get("#lastName").clear().should("have.value", "");

    cy.get("#email")
      .type("email@mail.com")
      .should("have.value", "email@mail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("123456789")
      .should("have.value", "123456789")
      .clear()
      .should("have.value", "");
  });

  it("displays an error message when submitting the form without filling the required fields", () => {
    cy.contains(".button", "Send").click();

    cy.get(".error").should("be.visible");
    cy.get(".error > strong").should(
      "have.text",
      "Validate the required fields!"
    );
  });

  it("successfully submits the form using a custom command", () => {
    const data = {
      firstName: "Anakonda",
      lastName: "Joshua",
      email: "email@mail.com",
      text: "some text text text some text text text",
    };
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success > strong").should(
      "have.text",
      "Message successfully sent."
    );
    cy.get(".success").should("be.visible");
  });

  it("selects a product (YouTube) by its content", () => {
    cy.get("select#product option:disabled").should("have.text", "Select");
    // cy.get("#product").find("option").eq(0).should("have.text", "Select");
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("selects a product (Mentorship) by its value", () => {
    cy.get("#product").select("mentorship").should("have.value", "mentorship");
  });

  it("selects a product (Blog) by its index", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('checks the type of service "Feedback"', () => {
    //selector - input[type='radio'] [value='feedback']
    cy.get("input[type='radio']").check("feedback").should("be.checked");
  });

  it("checks each type of service", () => {
    cy.get("input[type='radio']").check("help").should("be.checked");
    cy.get("#support-type")
      .find("input[type='radio']")
      .each((typeOfService) => {
        cy.wrap(typeOfService).check().should("be.checked");
      });
    // cy.get("input[type='radio']").each(($el) => {
    //   cy.wrap($el).check().should("be.checked");
    // });
  });

  it("checks both checkboxes, then unchecks the last one", () => {
    // cy.get("#check input[type='checkbox']").check().should("be.checked");
    cy.get("input[type='checkbox']")
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
    // cy.get("#phone-checkbox").check().should("be.checked");
    // cy.get("#check input[type='checkbox']")
    //   .last()
    //   .uncheck()
    //   .should("not.be.checked");
    // cy.get("#phone-checkbox").uncheck().should("not.be.checked");
  });

  it("selects a file from the fixtures folder", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
    // .should("have.value", "C:\\fakepath\\example.json");
  });

  it(" selects a file simulating a drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", {
        action: "drag-drop",
      })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("selects a file using a fixture to which an alias was given", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get("#file-upload")
      .selectFile("@sampleFile")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it.only("verifies that the privacy policy page opens in another tab without the need for a click", () => {
    cy.contains("a", "Privacy Policy")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
    // cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("access the privacy policy page by removing the target, then clicking on the link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
  });

  it.only("independently test the privacy policy page", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.get("#title").should("have.text", "TAT CSC - Privacy Policy");
    cy.get("#white-background").contains(
      "We do not save data submitted in the TAT CSC application form."
    );
  });
});
