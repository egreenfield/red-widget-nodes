var helper = require("node-red-node-test-helper");
var showNumberNode = require("../show-number.js");

describe('show-number Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "show-number", name: "test name" }];
    helper.load(showNumberNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should execute quietly', function (done) {
    var flow = [
        // { id: "n1", type: "show-number", name: "test name",wires:[["n2"]] },
        // { id: "n2", type: "helper" }
        { id: "n1", type: "show-number", name: "test name" }
    ];
    helper.load(showNumberNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
    //   n2.on("input", function (msg) {
    //     msg.should.have.property('payload', 'uppercase');
    //     done();
    //   });
      n1.receive({ payload: "7890" });
      setTimeout(()=>{done();},10);
    });
  });
});
