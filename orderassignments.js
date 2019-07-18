context('Method 1: Unit testing APEX', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:9070950415987:::::'
 const pUsername   = 'DENIS'
 const pPassword   = '1234'
 var   loggedInPage
 var   app_cookie

before(function() {
   cy.server()
   cy.route('POST', 'ords/wwv_flow.accept').as('login')
   cy.visit(loginPage)
   cy.clearCookie('LOGIN_USERNAME_COOKIE')
   cy.get('#P9999_USERNAME')
       .clear()
       .should('be.empty')
       .type(pUsername)
       .should('have.value',pUsername)
   cy.get('#P9999_PASSWORD')
       .should('be.empty')
       .type(pPassword)
       .should('have.value',pPassword)
   cy.contains('Sign In').click()
   cy.wait(['@login'])
   cy.url().should('contain', ':1:')
           .then(($url) => {
              loggedInPage = $url
              loggedInPage = loggedInPage.replace('/__/','/ords/')
              cy.visit(loggedInPage)
          })
   cy.getCookie('ORA_WWV_APP_108').then(($Cookie) => {
           app_cookie = $Cookie.value
       })
 })

 beforeEach(function () {
     Cypress.Cookies.preserveOnce('ORA_WWV_APP_108')
 })

   it('Visit Order Assignments', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.contains('Configuration').click()
     cy.contains('Order Assignments').click()
    })


   it('Create Order Assignments', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.get('#B29282126054203187').click()

     cy.get('iframe')
      .wait(2000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#P13_ORDER_CONTAINER')
        const myInput1 = iframe.find('#P13_TEAM')
        const myInput2 = iframe.find('#P13_EMPLOYEE')
        const myButton = iframe.find('#B29284219827203190')

         let orderLength = myInput0.options.length;
         let orderIndex = Math.floor(Math.random() * orderLength);
         let customer = document.getElementById("P13_ORDER").options[orderIndex].text;

        cy
          .wrap(myInput0)
          .type(customer)
          .should('have.value', customer)

         let teamLength = document.getElementById("P13_TEAM").length;
         let teamIndex = Math.floor(Math.random() * teamLength);
         let team = document.getElementById("P13_TEAM").options[teamIndex].text;

        cy
          .wrap(myInput1)
          .type(team)
          .should('have.value', team)


         let employeeLength = document.getElementById("P13_EMPLOYEE").length;
         let employeeIndex = Math.floor(Math.random() * employeeLength);
         let employee = document.getElementById("P13_EMPLOYEE").options[employeeIndex].text;

        cy
          .wrap(myInput2)
          .select(employee)
          .should('have.value', employee)

        cy.wrap(myButton).click()
      })

      cy.get('.t-Alert-title')  //simply check the modal has been closed
    })
   })
