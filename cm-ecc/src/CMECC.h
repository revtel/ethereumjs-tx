#include <nan.h>

class CMECC : public Nan::ObjectWrap {
public:
  static NAN_MODULE_INIT(Init);
  static NAN_METHOD(New);
  static Nan::Persistent<v8::FunctionTemplate> constructor;

  static NAN_METHOD(Hello);
  static NAN_METHOD(SignTest);
};
