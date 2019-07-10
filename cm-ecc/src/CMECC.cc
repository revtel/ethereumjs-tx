#include "CMECC.h"
#include <stdio.h>
#include <string.h>
#include <stdint.h>

extern "C" {
  #include "uECC.h"
}

Nan::Persistent<v8::FunctionTemplate> CMECC::constructor;

NAN_MODULE_INIT(CMECC::Init) {
  v8::Local<v8::FunctionTemplate> ctor = Nan::New<v8::FunctionTemplate>(CMECC::New);
  constructor.Reset(ctor);
  ctor->InstanceTemplate()->SetInternalFieldCount(1);
  ctor->SetClassName(Nan::New("CMECC").ToLocalChecked());

  Nan::SetPrototypeMethod(ctor, "hello", Hello);
  Nan::SetPrototypeMethod(ctor, "signTest", SignTest);

  target->Set(Nan::New("CMECC").ToLocalChecked(), ctor->GetFunction());
}

NAN_METHOD(CMECC::New) {
  // create a new instance and wrap our javascript instance
  CMECC* ecc = new CMECC();
  ecc->Wrap(info.Holder());
  info.GetReturnValue().Set(info.Holder());
}

NAN_METHOD(CMECC::Hello) {
  printf("Hello world from C!\n");
}

void printBytes(uint8_t *bytes, int length) {
  printf("'");
  for (int i = 0; i < length; i++) {
    printf("%02x", bytes[i]);
  }
  printf("',\n");
}

void ethSignTest() {
    uint8_t privateKey[32] = {
      0x1e, 0x04, 0xc9, 0xcf, 0x41, 0x95, 0xbc, 0x67, 
      0x91, 0xa1, 0xe2, 0x5d, 0x55, 0xbe, 0x2c, 0x83,
      0x32, 0xd0, 0xb8, 0x7d, 0xf1, 0xba, 0x6c, 0xa4,
      0xed, 0x94, 0x15, 0x45, 0x2f, 0xe7, 0x15, 0xdf
    };
    uint8_t hash[32] = {
      0x1f, 0x51, 0xbb, 0xb0, 0x33, 0xfd, 0xd1, 0x5d, 
      0x5b, 0x93, 0x48, 0xd4, 0x2e, 0x76, 0x8f, 0x85, 
      0xda, 0x60, 0x88, 0x49, 0x63, 0xff, 0xf0, 0x3c, 
      0xa8, 0x2e, 0x09, 0x5f, 0x19, 0x6c, 0x4e, 0xf0
    };
    uint8_t sig[64] = {0};
    const struct uECC_Curve_t * curve = uECC_secp256k1();

    if (!uECC_sign(privateKey, hash, sizeof(hash), sig, curve)) {
        printf("uECC_sign() failed\n");
        return;
    }

    printBytes(sig, 64);
}

NAN_METHOD(CMECC::SignTest) {
  ethSignTest();
}
