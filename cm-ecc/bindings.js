var testModule;
var cmECC;

if (process.env.DEBUG) {
  testModule= require('./build/Debug/testModule.node');
  eccModule= require('./build/Debug/eccModule.node');
} else {
  testModule= require('./build/Release/testModule.node');
  eccModule= require('./build/Release/eccModule.node');
}

module.exports = {
  testModule, 
  eccModule
};
