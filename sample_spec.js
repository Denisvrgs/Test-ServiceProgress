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

   it('Visit Customers', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.contains('Configuration').click()
     cy.contains('Customers').click()
    })


   it('Create Customer', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     cy.get('#B29235450742203107').click()

     cy.get('iframe')
      .wait(2000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#P7_NAME')
        const myInput1 = iframe.find('#P7_CIF')
        const myInput2 = iframe.find('#P7_BILLINGADDRESS')
        const myButton = iframe.find('#B29237592569203110')

        cy
          .wrap(myInput0)
          .type("Customer1")
          .should('have.value', 'Customer1')
        cy
          .wrap(myInput1)
          .type("1234")
          .should('have.value', '1234')

        cy
          .wrap(myInput2)
          .select('178')
          .should('have.value', '178')

        cy.wrap(myButton).click()
      })

      cy.get('.t-Alert-title')  //simply check the modal has been closed
    })


    it('Activate/deactivate Customers', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('.apex-item-grid-row > :nth-child(1) > label').click()       //Push Active
      cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()       //Edit element

      cy.get('iframe')
       .wait(2000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myButton = iframe.find('#B29237779529203110')

         cy.wrap(myButton).click()                                       //Deactivate
       })

      cy.get(':nth-child(2) > label').click()                            //Push Inactive

      cy.url().should('contain', ':6:')
              .then(($url) => {
                 loggedInPage = $url
                 loggedInPage = loggedInPage.replace('/__/','/ords/')
                 cy.visit(loggedInPage)
             })

      cy.get(':nth-child(2) > [headers="LINK"] > a > .fa').click()        //Edit element

      cy.get('iframe')
       .wait(2000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myButton = iframe.find('#B34893775638025510')

         cy.wrap(myButton).click()                                       //Activate
       })

       cy.get('.apex-item-grid-row > :nth-child(1) > label').click()      //Push Active

       cy.url().should('contain', ':6:')
               .then(($url) => {
                  loggedInPage = $url
                  loggedInPage = loggedInPage.replace('/__/','/ords/')
                  cy.visit(loggedInPage)
              })

    })


   it('Visit Contacts', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.contains('Configuration').click()
      cy.contains('Contacts').click()
    })

    it('Create Contact', () => {
      //cy.setCookie('ORA_WWV_APP_108', app_cookie)
      cy.get('#B29218276591203085').click()

      cy.get('iframe')
       .wait(2000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myInput0 = iframe.find('#P5_NAME')
         const myInput1 = iframe.find('#P5_LASTNAME')
         const myInput2 = iframe.find('#P5_PHONENUMBER1')
         const myInput3 = iframe.find('#P5_CUSTOMER')
         const myInput4 = iframe.find('#P5_ADDRESS')
         const myButton = iframe.find('#B29220250384203087')

         cy
           .wrap(myInput0)
           .type("Contact1")
           .should('have.value', 'Contact1')
         cy
           .wrap(myInput1)
           .type("Last2")
           .should('have.value', 'Last2')

         cy
           .wrap(myInput2)
           .type("666789")
           .should('have.value', '666789')

         cy
           .wrap(myInput3)
           .select('77')
           .should('have.value', '77')

         cy
           .wrap(myInput4)
           .select('178')
           .should('have.value', '178')

         cy.wrap(myButton).click()
       })

       cy.get('.t-Alert-title')  //simply check the modal has been closed
     })



})
