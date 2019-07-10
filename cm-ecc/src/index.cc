#include <nan.h>
#include "CMECC.h"

NAN_MODULE_INIT(InitModule) {
  CMECC::Init(target);
}

NODE_MODULE(eccModule, InitModule);
