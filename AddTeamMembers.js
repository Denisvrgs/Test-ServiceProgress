context('PROJECT NAVIGATION TESTS', () => {
 const loginPage  = 'https://dev4.novoshore.com/ords/f?p=108:LOGIN_DESKTOP:9070950415987:::::'
 const pUsername   = 'JORGE'
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

 it('Visit Team Members', () => {
    //cy.setCookie('ORA_WWV_APP_108', app_cookie)
    cy.contains('Configuration').click()
    cy.contains('Team Members').click()
 })

 it ('Add Team Member', () => {
   cy.get('#B29384248971203318').click()

   //iframe

   cy.get('iframe')
     .wait(2000)
     .then($iframe => {
       const iframe = $iframe.contents()
       const team = iframe.find('#P25_TEAM')
       const employee  = iframe.find('#P25_EMPLOYEE')
       const myButton = iframe.find('#B29386358965203320')
       const myteam = 'GridLines'
       const myemployee = 'Selenium Test'

       cy
         .wrap(team)
         .select(myteam)

       cy
         .wrap(employee)
         .select(myemployee)


       cy.wrap(myButton).click()

       })
    })


  it ('Change Employee', () => {
    var indTeam = 0
    var ind = 0

      cy.contains('tr', 'Team : GridLines')
        .invoke('index').then((i) =>{
          console.log(i)
          console.log('index: ' +i)
          indTeam = i
          //Get the next element from indTeam (HOW??)
          cy.contains('tr', 'Selenium Test')
            .invoke('index').then((i)=>{
              console.log(i)
              ind = i
              cy.get('tr').eq(ind).children().children().children('[class="fa fa-pencil-square-o"]').click()
              //MODAL PAGE
              cy.get('iframe')
               .wait(1000)
               .then($iframe => {
                 const iframe = $iframe.contents()
                 const employee = iframe.find('#P25_EMPLOYEE')
                 const team = iframe.find('#P25_TEAM')
                 const myButton = iframe.find('#B29386406878203320')

                 const myTeam = 'Administration&Managem'
                 const myEmployee = 'Hola Hola'


                 cy
                   .wrap(team)
                   .select(myTeam, {force: true})

                 cy
                   .wrap(employee)
                   .select(myEmployee, {force: true})

                 cy.wrap(myButton).click()

                 cy.get('.t-Alert-title')  //simply check the modal has been closed
              })


            })
        })


  })

  it ('Delete Employee', () => {
    var indTeam = 0
    var ind = 0
    cy.contains('tr', 'Hola Hola')
      .invoke('index').then((i)=>{
        console.log(i)
        ind = i
        cy.get('tr').eq(ind).children().children().children('[class="fa fa-pencil-square-o"]').click()
        //MODAL PAGE
        cy.get('iframe')
         .wait(1000)
         .then($iframe => {
           const iframe = $iframe.contents()
           const myButton = iframe.find('#B29386598595203320')

           cy.wrap(myButton).click()

           cy.get('.t-Alert-title')  //simply check the modal has been closed
        })

  })
 })
})
