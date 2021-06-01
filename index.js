let pup=require("puppeteer");
let gpage;
let gBrowser;
let email="xevile3831@relumyx.com"
let pass="Abcde@123"
let mainObj

pup
.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"],
    slowMo:50,
}).then(function(browser){
    gBrowser=browser;
    return browser.pages();
})
.then(function(pagesArr){
gpage=pagesArr[0];
return gpage.goto("https://www.hackerrank.com/auth/login")
})
.then(function(){
    return gpage.type("#input-1",email)
})
.then(function(){
    return gpage.type("#input-2",pass)
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation(),
     gpage.click("[type='submit']"),
    ])
})
.then(function(){
    return Promise.all([
        gpage.waitForNavigation(),
        gpage.click("[data-attr1='interview-preparation-kit']")
    ])
})
.then(function(){
    return  gpage.waitForSelector("[data-attr1='warmup']");    
})
.then(function(){
    return Promise.all([
         gpage.waitForNavigation(),
         gpage.click("[data-attr1='warmup']")
           ]);
})
.then(function(){
    return  gpage.waitForSelector(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled");    
})
.then(function(){
    return Promise.all([
         gpage.waitForNavigation(),
         gpage.click(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled")
           ]);
})
.then(function(){
    return  gpage.waitForSelector("#tab-1-item-4");    
})
.then(function(){
    return Promise.all([
         gpage.waitForNavigation(),
         gpage.click("#tab-1-item-4")
           ]);
})
.then(function(){
    return  handleLockBtn(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");    
})
.then(function(){
    return gpage.evaluate(
        function (){
         let allCode=document.querySelectorAll(".challenge-editorial-block.editorial-setter-code  .highlight");
         let allLanguage=document.querySelectorAll(".challenge-editorial-block.editorial-setter-code  h3");
         let obj={};
         obj.code=allCode[0].innerText;
         obj.language=allLanguage[0].innerText;
         
         return obj;
        })   
})
.then(function(obj){
    mainObj=obj
    return Promise.all([
        gpage.waitForNavigation(),
        gpage.click("[data-attr2='Problem']")])
})
.then(function(){
    return gpage.waitForSelector(".css-1hwfws3")
})
.then(function(){
    return gpage.click(".css-1hwfws3")
    
})
.then(function(){
    return gpage.type(".css-1hwfws3",mainObj.language)
    
})
.then(function(){
    return gpage.keyboard.press("Enter")
})
.then(function(){
    return gpage.click("[type='checkbox']")
})
.then(function(){
    return gpage.waitForSelector("#input-1")
})
.then(function(){
    return gpage.type("#input-1",mainObj.code)
})
.then(function(){
    return gpage.keyboard.down("Control");
})
.then(function(){
    return gpage.keyboard.down("KeyA");
})
.then(function(){
    return gpage.keyboard.down("KeyX");
})
.then(function(){
    return gpage.keyboard.up("Control");
})
.then(function(){
    return gpage.click(".monaco-editor.no-user-select .vs")
})
.then(function(){
    return gpage.keyboard.down("Control");
})
.then(function(){
    return gpage.keyboard.press("KeyA");
})
.then(function(){
    return gpage.keyboard.press("KeyV");
})
.then(function(){
    return gpage.keyboard.up("Control");
})
.then(function(){
    return gpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
})

.catch(function(err){
    console.log(err)
})



function handleLockBtn(selector){
return new Promise(function (resolve,reject){
    gpage
    .waitForSelector(selector)
    .then(function (){
        return gpage.click(selector);
    })
    .then(function(){
        // lock pa click ho chuka hai
        resolve();
    })
    .catch(function(err){
        resolve();
    });
 
});
}
