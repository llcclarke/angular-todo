describe("app", function() {
  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("Todos App");
  });
  it("should say 'Hello world' on the page", function(){
    browser.get('/')
    expect($$("p").first().getText()).toEqual("Hello World");
  });
});
