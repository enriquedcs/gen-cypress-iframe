import config from './config.json'
import MainPage from '../../page-objects/components/MainPage'

describe('iFrame Testing Cypress', () => {
    before(function(){
        cy.visit(`${config.URL3}`)
    })
   
    it('Verify iframe working', () =>{
         
        //let's test iframe
        MainPage.iframeInput("#iframe-window",'.a4bIc')
    })


    it('Verify Nested iframes', () => {

        cy.origin(`${config.URL4}`, () => {
            cy.visit('/frames.html')
            cy.get("#frame1").then(function($iFrame1){
                const iframe2 = $iFrame1.contents().find('#frame2')
                cy.wrap(iframe2).as('iframe2Ind')
                cy.get('@iframe2Ind').then(function($iFrame2){
                    const iFrame2Element = $iFrame2.contents().find('body')
                    cy.wrap(iFrame2Element).find("#click_me_2").click()
                })
            })
        })
    })


    it("Using 'contentDocument' - Nested iFrames", () => {

        cy.origin(`${config.URL4}`, () => {
            cy.visit('/frames.html')
            cy.get("#frame1")
                .its('0.contentDocument')
                .its('body')
                .find('#frame3')
                .its('0.contentDocument')
                .its('body')
                .find('#frame4')
                .its('0.contentDocument')
                .its('body')
                .find("#click_me_4").click()
            //
        })    
    })

})