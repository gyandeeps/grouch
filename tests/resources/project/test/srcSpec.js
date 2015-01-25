describe("test", function(){
    it("addition check", function(){
       expect(add(1, 2)).toEqual(3);
    });
    it("jquery test", function(){
        expect($(document.body)).toBeDefined();
    });
});
