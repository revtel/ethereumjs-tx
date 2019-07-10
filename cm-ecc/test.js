const eccModule = require('./').eccModule;
const cmEcc = new eccModule.CMECC();
cmEcc.hello();
cmEcc.signTest();
