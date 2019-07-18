context('PROJECT NAVIGATION TESTS', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:9070950415987:::::'
 const pUsername   = 'DENIS'
 const pPassword   = '1234'
 var   loggedInPage
 var   app_cookie

//LOGIN AND COOKIE SETTING

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


 it('Visit Projects', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Projects').click()
 })

 it('Create Project', () => {
   //cy.setCookie('ORA_WWV_APP_108', app_cookie)
   cy.get('#B29368102051203299').click()

   cy.get('iframe')
    .wait(2000)
    .then($iframe => {
      const iframe = $iframe.contents()
      const myInput0 = iframe.find('#P46_PREVIOUSCUSTOMER')
      const myButton = iframe.find('#B32331518099676987')

      cy
        .wrap(myInput0)
        .select('53', {force: true})
        .should('have.value', '53')

      cy.wrap(myButton).click()

     })

     cy.get('iframe')
       .wait(2000)
       .then($iframe => {
         const iframe = $iframe.contents()
         const myInput0 = iframe.find('#P47_NAME')
         const myInput1 = iframe.find('#P47_PROJECTNUMBER')
         const myInput2 = iframe.find('#P47_DESCRIPTION')
         const myInput3 = iframe.find('#P47_STARTDATE')
         const myInput4 = iframe.find('#P47_ENDDATE')
         const myButton = iframe.find('#B32338633683676992')

         cy
           .wrap(myInput0)
           .type('Project', {force: true})
           .should('have.value', 'Project')

         cy
           .wrap(myInput1)
           .type('1', {force: true})
           .should('have.value', '1')

         cy
          .wrap(myInput2)
          .type('This is a test', { force: true })
          .should('have.value', 'This is a test')

         cy
          .wrap(myInput3)
          .type('01-Jul-19', {force: true})
          .should('have.value', '01-Jul-19')

         cy
          .wrap(myInput4)
          .type('30-Sep-19', {force: true})
          .should('have.value', '30-Sep-19')

         cy.wrap(myButton).click()

         })

         cy.get('iframe')
          .wait(2000)
          .then($iframe => {
            const iframe = $iframe.contents()
            const myButton = iframe.find('#B32343922860676995')

            cy.wrap(myButton).click()

         })

         cy.get('.t-Alert-title')  //simply check the modal has been closed

   })

   it('Create Order inside Project', () => {
     //cy.setCookie('ORA_WWV_APP_108', app_cookie)
     const Order = Math.random().toString(36).substring(2, 8)

     cy.get('#B31960122872238115').click()

     cy.get('iframe')
      .wait(2000)
      .then($iframe => {
        const iframe = $iframe.contents()
        const myInput0 = iframe.find('#P60_PREVIOUSCONTACT')
        const myButton = iframe.find('#B32713429350066123')

        cy
          .wrap(myInput0)
          .select('56', {force: true})
          .should('have.value', '56')

        cy.wrap(myButton).click()

       })

       cy.get('iframe')
         .wait(2000)
         .then($iframe => {
           const iframe = $iframe.contents()
           const myInput0 = iframe.find('#P62_ORDERNUMBER')
           const myInput1 = iframe.find('#P62_STARTDATE')
           const myInput2 = iframe.find('#P62_DELIVERYDATE')
           const myButton = iframe.find('#B32723715648066129')

           cy
             .wrap(myInput0)
             .type(Order, {force: true})
             .should('have.value', Order)

           cy
            .wrap(myInput1)
            .type('01-Jul-19', {force: true})
            .should('have.value', '01-Jul-19')

           cy
            .wrap(myInput2)
            .type('30-Sep-19', {force: true})
            .should('have.value', '30-Sep-19')

           cy.wrap(myButton).click()

           })

           cy.get('iframe')
            .wait(2000)
            .then($iframe => {
              const iframe = $iframe.contents()
              const myButton = iframe.find('#B32729038425066133')

              cy.wrap(myButton).click()

           })

           cy.get('.t-Alert-title')  //simply check the modal has been closed

     })

     it('Create Order Line inside Project', () => {
       //cy.setCookie('ORA_WWV_APP_108', app_cookie)
       const Quantity = Math.floor(Math.random()*100)
       const UnitPrice = Math.floor(Math.random()*1000)

       cy.get('#B32076287681864020').click()

       cy.get('iframe')
        .wait(2000)
        .then($iframe => {
          const iframe = $iframe.contents()
          const myInput0 = iframe.find('#P17_TEMPLATE')
          const myInput1 = iframe.find('#P17_QUANTITY')
          const myInput2 = iframe.find('#P17_UNITPRICE')
          const myButton = iframe.find('#B29316074552203227')

          cy
            .wrap(myInput0)
            .select('19')
            .should('have.value', '19')

          cy
            .wrap(myInput1)
            .type('100')
            .should('have.value', '100')

          cy
            .wrap(myInput2)
            .type('1000')
            .should('have.value', '1000')

          cy.wrap(myButton).click()

         })

       })

})
